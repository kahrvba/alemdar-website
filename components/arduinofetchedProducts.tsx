import ProductCard from "./product-card";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { AlertCircle, RefreshCw, PackageSearch, Clock } from "lucide-react";
import useCachedFetch from "@/hooks/useCachedFetch";

interface Product {
    id: number;
    english_names: string;
    // turkish_names: string;
    category: string;
    quantity: number;
    price: number;
    description?: string;
    image_filename?: string;
}

interface ArduinoProps {
  preview?: boolean;
  categoryFilter?: string;
  sortOption?: string;
  searchQuery?: string;
}

export default function Arduino({ preview = false, categoryFilter = '', sortOption = 'price-asc', searchQuery = '' }: ArduinoProps) {
  // Use our custom hook for cached data fetching
  const {
    data: arduinoProducts,
    isLoading,
    error,
    refetch
  } = useCachedFetch<Product[]>('/api/arduino', {}, {
    cacheTTL: 5 * 60 * 1000, // Cache for 5 minutes
    revalidateOnFocus: true,  // Revalidate when tab gets focus
    revalidateOnReconnect: true, // Revalidate when internet reconnects
    retryCount: 3,
    retryDelay: 1000, // Start with 1s delay, then exponential backoff
    onError: (err) => console.error("Failed to fetch products:", err)
  });

  // Show error message with retry button
  if (error && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-6 max-w-md mx-auto">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Unable to Load Products</h3>
          <p className="text-gray-300 mb-6">{error.message || 'An error occurred while loading products.'}</p>
          <Button
            onClick={() => {
              // Use the refetch function from our hook
              refetch();
            }}
            className="bg-red-600 hover:bg-red-700"
          >
            <RefreshCw className="h-4 w-4 mr-2" /> Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <div key={index} className="flex flex-col space-y-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10 rounded-xl blur-md transform scale-105"></div>
              <Skeleton className="h-48 w-full rounded-xl relative z-10" />
            </div>
            <div className="space-y-2 p-4">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <div className="flex justify-between items-center pt-4">
                <Skeleton className="h-4 w-[100px]" />
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Filter products by category and search query
  let filteredProducts = arduinoProducts || [];

  // Apply category filter if provided - strict equality matching
  if (categoryFilter && categoryFilter.trim() !== '') {
    filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);

    // Log for debugging
    console.log(`Filtering by category: "${categoryFilter}"`);
    console.log(`Found ${filteredProducts.length} products with exact category match`);
  }

  // Apply search filter if provided
  if (searchQuery && searchQuery.trim() !== '') {
    const query = searchQuery.toLowerCase().trim();
    filteredProducts = filteredProducts.filter(product =>
      product.english_names.toLowerCase().includes(query) ||
      (product.description && product.description.toLowerCase().includes(query))
    );
  }

  // Never fall back to all products if filters are applied
  let productsToDisplay = filteredProducts;

  // Sort products based on sortOption
  productsToDisplay = [...productsToDisplay].sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return (a.price || 0) - (b.price || 0);
      case "price-desc":
        return (b.price || 0) - (a.price || 0);
      case "name-asc":
        return (a.english_names || '').localeCompare(b.english_names || '');
      case "name-desc":
        return (b.english_names || '').localeCompare(a.english_names || '');
      default:
        return 0;
    }
  });

  // Check if we have no results but filters are applied
  const hasNoResults = productsToDisplay.length === 0;
  const isSearching = searchQuery && searchQuery.trim() !== '';
  const isFilteringByCategory = categoryFilter && categoryFilter.trim() !== '';

  // Render appropriate message or products
  if (hasNoResults) {
    if (isSearching) {
      // No search results message
      return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-8 max-w-md mx-auto">
            <PackageSearch className="h-16 w-16 text-gray-500 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-white mb-3">No Products Found</h3>
            <p className="text-gray-300 mb-6">
              We couldn&apos;t find any products matching <span className="font-semibold text-blue-400">&quot;{searchQuery}&quot;</span>.
              Please try a different search term or browse our categories.
            </p>
            <Button
              onClick={() => window.location.href = '/products/arduino'}
              className="bg-blue-600 hover:bg-blue-700"
            >
              View All Products
            </Button>
          </div>
        </div>
      );
    } else if (isFilteringByCategory) {
      // No products in category message
      return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-8 max-w-md mx-auto">
            <Clock className="h-16 w-16 text-amber-500 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-white mb-3">Coming Soon</h3>
            <p className="text-gray-300 mb-6">
              Products in the <span className="font-semibold text-amber-400">{categoryFilter}</span> category
              will be available soon. Please check back later or browse our other categories.
            </p>
            <Button
              onClick={() => window.location.href = '/products/arduino'}
              className="bg-amber-600 hover:bg-amber-700"
            >
              Explore Other Categories
            </Button>
          </div>
        </div>
      );
    }
  }

  // Normal product display
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {preview
        ? [1, 2, 3].map((selectedId, index) => {
            const product = arduinoProducts?.find(p => p.id === selectedId);
            if (!product) return null;

            return (
              <ProductCard
                key={product.id}
                title={product.english_names}
                category={product.category}
                quantity={product.quantity}
                price={product.price}
                image={product.image_filename || "/placeholder.svg"}
                description={product.description}
                index={index}
                alt={`${product.english_names} - ${product.category} product`}
              />
            );
          })
        : productsToDisplay.map((product, index) => (
            <ProductCard
              key={product.id}
              title={product.english_names}
              category={product.category}
              quantity={product.quantity}
              price={product.price}
              image={product.image_filename || "/placeholder.svg"}
              description={product.description}
              index={index}
              alt={`${product.english_names} - ${product.category} product`}
            />
          ))}
    </div>
  );
}
