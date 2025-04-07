import { useState, useEffect } from "react";
import ProductCard from "./product-card";

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

export default function Solar() {
  const [solarProducts, setSolarProducts] = useState<Products[]>([]);

  useEffect(() => {
    const fetchSolar = async () => {
      try {
        const response = await fetch('api/solar');
        const data = await response.json();
        console.log('Products data:', data);
        setSolarProducts(data);
      } catch (error) {
        console.log("failed to fetch products from solar/route.ts", error);
      }
    };
    fetchSolar();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {[1, 2, 3].map((selectedId, index) => {
        const product = solarProducts.find(p => p.id === selectedId);
        if (!product) return null;

        return (
          <ProductCard
            key={product.id}
            title={product.english_name}
            image={product.image_filename || "/placeholder.svg"}
            category={product.category || "solar"}
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
 
