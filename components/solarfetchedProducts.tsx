import ProductCard from "./product-card";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { AlertCircle, RefreshCw, PackageSearch, Clock } from "lucide-react";
import useCachedFetch from "@/hooks/useCachedFetch";

interface SolarProduct {
  id: number;
  name: string; // API returns 'name' instead of 'english_name'
  rating: number;
  image_filename: string;
  category: string;
  quantity: number;
  price: number;
  description: string;
}

interface SolarProductsProps {
  preview?: boolean;
  categoryFilter?: string;
  sortOption?: string;
  searchQuery?: string;
}

export default function SolarProducts({
  preview = false,
  categoryFilter = "",  // Changed from ''
  sortOption = "price-asc",  // Changed from 'price-asc'
  searchQuery = ""  // Changed from ''
}: SolarProductsProps) {
  // Use our custom hook for cached data fetching
  const {
    data: solarProducts,
    isLoading,
    error,
    refetch
  } = useCachedFetch<SolarProduct[]>('/api/solar', {}, {
    cacheTTL: 5 * 60 * 1000, // Cache for 5 minutes
    revalidateOnFocus: true,  // Revalidate when tab gets focus
    revalidateOnReconnect: true, // Revalidate when internet reconnects
    retryCount: 3,
    retryDelay: 1000, // Start with 1s delay, then exponential backoff
    onError: (err) => console.error("Failed to fetch solar products:", err)
  });

  // Filter products based on search query and category
  const filteredProducts = solarProducts?.filter(product => {
    // Filter by search query
    const matchesSearch = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;

    // Filter by category
    const matchesCategory = categoryFilter
      ? product.category?.toLowerCase() === categoryFilter.toLowerCase()
      : true;

    return matchesSearch && matchesCategory;
  }) || [];

  // Sort products based on sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "rating-desc":
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  // Products to display based on preview mode
  const productsToDisplay = preview
    ? sortedProducts.filter(p => [1, 2, 3].includes(p.id)).slice(0, 3)
    : sortedProducts;

  // Show error message with retry button
  if (error && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-6 max-w-md mx-auto">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Unable to Load Products</h3>
          <p className="text-gray-300 mb-6">{error.message || "An error occurred while loading products."}</p>
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

  // Show message when no products match the filters
  if (filteredProducts.length === 0 && !isLoading && searchQuery) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 max-w-md mx-auto">
          <PackageSearch className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Products Found</h3>
          <p className="text-gray-300 mb-6">We couldn&apos;t find any products matching your search criteria.</p>
          <Button
            onClick={() => {
              // This would typically clear filters in the parent component
              // For now, just refetch all products
              refetch();
            }}
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            Clear Filters
          </Button>
        </div>
      </div>
    );
  }

  // Show message when no products in category
  if (filteredProducts.length === 0 && !isLoading && categoryFilter && !searchQuery) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 max-w-md mx-auto">
          <Clock className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Coming Soon</h3>
          <p className="text-gray-300 mb-6">Products in this category will be available soon.</p>
          <Button
            onClick={() => {
              // This would typically clear filters in the parent component
              refetch();
            }}
            variant="outline"
            className="border-green-700 text-green-400 hover:bg-green-900/30"
          >
            Browse All Products
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
              <div className="absolute inset-0 bg-gradient-to-r from-green-900/10 to-blue-900/10 rounded-xl blur-md transform scale-105"></div>
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

  // Normal product display
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {preview
        ? [1, 2, 3].map((selectedId, index) => {
            const product = solarProducts?.find(p => p.id === selectedId);
            if (!product) return null;

            return (
              <ProductCard
                key={product.id}
                title={product.name} // Using name instead of english_name
                category={product.category || "solar"}
                quantity={product.quantity}
                price={product.price}
                image={product.image_filename || "/placeholder.svg"}
                description={product.description}
                index={index}
                alt={`${product.name} - ${product.category} product`}
              />
            );
          })
        : productsToDisplay.map((product, index) => (
            <ProductCard
              key={product.id}
              title={product.name} // Using name instead of english_name
              category={product.category || "solar"}
              quantity={product.quantity}
              price={product.price}
              image={product.image_filename || "/placeholder.svg"}
              description={product.description}
              index={index}
              alt={`${product.name} - ${product.category} product`}
            />
          ))}
    </div>
  );
}

