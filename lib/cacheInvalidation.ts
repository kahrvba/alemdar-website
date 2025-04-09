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
  // The category parameter is kept for API consistency
  console.log(`Invalidating cache for category: ${category}`);
  invalidateCache(['/api/arduino']);
}

/**
 * Invalidate cache when a product is updated
 * @param productId The ID of the updated product
 */
export function invalidateProductCache(productId: number): void {
  // The productId parameter is kept for API consistency
  console.log(`Invalidating cache for product ID: ${productId}`);
  invalidateCache(['/api/arduino']);
}

const cacheInvalidation = {
  invalidateCache,
  invalidateAllCache,
  invalidateCategoryCache,
  invalidateProductCache
};

export default cacheInvalidation;
