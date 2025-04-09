import { useState, useEffect } from "react";
import ProductCard from "./product-card";
import { Skeleton } from "./ui/skeleton";

interface Products {
  id: number;
  english_name: string;
  // turkish_name: string;
  image_filename: string;
  category: string;
  quantity: number;
  price: number;
  description: string;
}

export default function SoundProducts() {
  const [soundProducts, setSoundProducts] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSound = async () => {
      try {
        const response = await fetch('/api/SoundProducts');
        const data = await response.json();
        console.log('Products data:', data);
        setSoundProducts(data);
      } catch (error) {
        console.log("failed to fetch products from sound/route.ts", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSound();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {[1, 2, 3].map((index) => (
          <div key={index} className="flex flex-col space-y-3">
            <Skeleton className="h-48 w-full rounded-xl" />
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {[1, 2, 3].map((selectedId, index) => {
        const product = soundProducts.find(p => p.id === selectedId);
        if (!product) return null;

        return (
          <ProductCard
            key={product.id}
            title={product.english_name}
            image={product.image_filename || "/placeholder.svg"}
            category={product.category || "sound"}
            quantity={product.quantity}
            price={product.price}
            description={product.description}
            index={index}
            alt={`${product.english_name} - ${product.category} product`}
          />
        );
      })}
    </div>
  );
}
