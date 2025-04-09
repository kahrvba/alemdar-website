import apiCache from './cache';

/**
 * Invalidate cache for specific endpoints
 * @param endpoints Array of endpoint paths to invalidate
 */
export function invalidateCache(endpoints: string[]): void {
  endpoints.forEach(endpoint => {
    // Find all cache keys that match this endpoint
    const cacheKeys = Array.from(apiCache.getKeys())
      .filter(key => key.startsWith(endpoint));
    
    // Delete each matching cache entry
    cacheKeys.forEach(key => {
      console.log(`Invalidating cache for: ${key}`);
      apiCache.delete(key);
    });
  });
}

/**
 * Invalidate all cache entries
 */
export function invalidateAllCache(): void {
  console.log('Invalidating all cache entries');
  apiCache.clear();
}

/**
 * Invalidate cache for a specific product category
 * @param category The category to invalidate
 */
export function invalidateCategoryCache(category: string): void {
  invalidateCache(['/api/arduino']);
}

/**
 * Invalidate cache when a product is updated
 * @param productId The ID of the updated product
 */
export function invalidateProductCache(productId: number): void {
  invalidateCache(['/api/arduino']);
}

export default {
  invalidateCache,
  invalidateAllCache,
  invalidateCategoryCache,
  invalidateProductCache
};
