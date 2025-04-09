import { useState, useEffect } from 'react';
import apiCache from '@/lib/cache';

type FetchOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  signal?: AbortSignal;
  cache?: RequestCache;
};

type UseCachedFetchOptions = {
  cacheTTL?: number; // Time to live in milliseconds
  revalidateOnFocus?: boolean;
  revalidateOnReconnect?: boolean;
  dedupingInterval?: number; // Minimum time between refetches
  retryCount?: number;
  retryDelay?: number; // Base delay for exponential backoff
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
};

type FetchState<T> = {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isValidating: boolean;
};

export default function useCachedFetch<T = any>(
  url: string,
  fetchOptions: FetchOptions = {},
  cacheOptions: UseCachedFetchOptions = {}
) {
  const {
    cacheTTL = 5 * 60 * 1000, // 5 minutes default
    revalidateOnFocus = true,
    revalidateOnReconnect = true,
    dedupingInterval = 2000, // 2 seconds
    retryCount = 3,
    retryDelay = 1000, // 1 second
    onSuccess,
    onError
  } = cacheOptions;

  const cacheKey = `${url}-${JSON.stringify(fetchOptions)}`;

  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    isLoading: true,
    isValidating: false
  });

  const [lastFetchTime, setLastFetchTime] = useState<number>(0);
  const [retries, setRetries] = useState<number>(0);

  // Function to fetch data
  const fetchData = async (shouldUseCache = true): Promise<void> => {
    // Check if we're already validating and it's within deduping interval
    if (state.isValidating && Date.now() - lastFetchTime < dedupingInterval) {
      return;
    }

    // Check cache first if we should use cache
    if (shouldUseCache && apiCache.has(cacheKey)) {
      const cachedData = apiCache.get<T>(cacheKey);
      setState(prev => ({
        ...prev,
        data: cachedData,
        isLoading: false
      }));

      if (onSuccess && cachedData) onSuccess(cachedData);

      // If we're not revalidating, return early
      if (!state.isValidating) return;
    }

    // Set loading/validating state
    setState(prev => ({
      ...prev,
      isLoading: prev.data === null,
      isValidating: true
    }));

    try {
      // Create abort controller for this request
      const controller = new AbortController();
      const signal = controller.signal;

      // Set timeout
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      // Merge the signal with any existing signal
      const options = {
        ...fetchOptions,
        signal
      };

      const response = await fetch(url, options);
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json() as T;

      // Update cache
      apiCache.set<T>(cacheKey, data, cacheTTL);

      // Update state
      setState({
        data,
        error: null,
        isLoading: false,
        isValidating: false
      });

      setLastFetchTime(Date.now());
      setRetries(0); // Reset retries on success

      if (onSuccess) onSuccess(data);

    } catch (error: any) {
      console.error(`Error fetching ${url}:`, error);

      // Don't update state if the component is unmounted or request was aborted
      if (error.name === 'AbortError') {
        setState(prev => ({
          ...prev,
          error: new Error('Request timed out'),
          isLoading: false,
          isValidating: false
        }));

        if (onError) onError(new Error('Request timed out'));
        return;
      }

      setState(prev => ({
        ...prev,
        error,
        isLoading: false,
        isValidating: false
      }));

      // Retry logic
      if (retries < retryCount) {
        const nextRetry = retries + 1;
        setRetries(nextRetry);

        // Exponential backoff
        const delay = retryDelay * Math.pow(2, nextRetry - 1);

        console.log(`Retrying in ${delay}ms... (Attempt ${nextRetry}/${retryCount})`);

        setTimeout(() => {
          fetchData(false); // Don't use cache for retries
        }, delay);
      } else if (onError) {
        onError(error);
      }
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchData();

    // Set up revalidation on focus
    const handleFocus = () => {
      if (revalidateOnFocus) {
        setState(prev => ({ ...prev, isValidating: true }));
        fetchData();
      }
    };

    // Set up revalidation on reconnect
    const handleReconnect = () => {
      if (revalidateOnReconnect) {
        setState(prev => ({ ...prev, isValidating: true }));
        fetchData();
      }
    };

    if (revalidateOnFocus) {
      window.addEventListener('focus', handleFocus);
    }

    if (revalidateOnReconnect) {
      window.addEventListener('online', handleReconnect);
    }

    return () => {
      if (revalidateOnFocus) {
        window.removeEventListener('focus', handleFocus);
      }

      if (revalidateOnReconnect) {
        window.removeEventListener('online', handleReconnect);
      }
    };
  }, [url, JSON.stringify(fetchOptions)]);

  // Function to manually trigger a refetch
  const refetch = () => {
    setState(prev => ({ ...prev, isValidating: true }));
    fetchData(false); // Skip cache when manually refetching
  };

  // Function to mutate the data
  const mutate = (newData: T | ((data: T | null) => T)) => {
    const data = typeof newData === 'function'
      ? (newData as Function)(state.data)
      : newData;

    // Update state
    setState(prev => ({ ...prev, data }));

    // Update cache
    apiCache.set<T>(cacheKey, data, cacheTTL);
  };

  return {
    ...state,
    refetch,
    mutate
  };
}
