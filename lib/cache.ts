// Cache implementation for API requests
type CacheEntry<T = unknown> = {
  data: T;
  timestamp: number;
  expiresAt: number;
};

class ApiCache {
  private cache: Map<string, CacheEntry<unknown>> = new Map();
  private defaultTTL: number = 5 * 60 * 1000; // 5 minutes in milliseconds

  // Get data from cache
  get<T = unknown>(key: string): T | null {
    const entry = this.cache.get(key);

    // If entry doesn't exist or is expired, return null
    if (!entry || Date.now() > entry.expiresAt) {
      if (entry) {
        // Clean up expired entry
        this.cache.delete(key);
      }
      return null;
    }

    return entry.data as T;
  }

  // Set data in cache with optional TTL
  set<T = unknown>(key: string, data: T, ttl: number = this.defaultTTL): void {
    const timestamp = Date.now();
    const expiresAt = timestamp + ttl;

    this.cache.set(key, {
      data,
      timestamp,
      expiresAt
    });
  }

  // Check if cache has a valid entry for key
  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;

    // Check if entry is expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  // Delete a specific entry
  delete(key: string): void {
    this.cache.delete(key);
  }

  // Clear all cache
  clear(): void {
    this.cache.clear();
  }

  // Get cache size
  size(): number {
    return this.cache.size;
  }

  // Get all cache keys
  getKeys(): IterableIterator<string> {
    return this.cache.keys();
  }

  // Get time to live for a cache entry in milliseconds
  ttl(key: string): number | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const remaining = entry.expiresAt - Date.now();
    return remaining > 0 ? remaining : null;
  }
}

// Create a singleton instance
const apiCache = new ApiCache();

export default apiCache;
