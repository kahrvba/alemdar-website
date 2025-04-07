import { useState, useEffect } from "react";
import ProductCard from "./product-card";

interface Products {
  id: number;
  english_name: string;
  // turkish_name: string;
  category: string;
  // barcode: string;
  quantity: number;
  price: number;
  image_filename: string;
  description: string;
}

export default function Electronics() {
  const [electronicsProducts, setElectronicsProducts] = useState<Products[]>([]);

  useEffect(() => {
    const fetchElectronics = async () => {
      try {
        const response = await fetch('api/electronics');
        const data = await response.json();
        console.log('Products data:', data);
        setElectronicsProducts(data);
      } catch (error) {
        console.log("failed to fetch products from electronics/route.ts", error);
      }
    };
    fetchElectronics();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {[1, 2, 3].map((selectedId, index) => {
        const product = electronicsProducts.find(p => p.id === selectedId);
        if (!product) return null;

        return (
          <ProductCard
            key={product.id}
            title={product.english_name}
            category={product.category || "electronics"}
            quantity={product.quantity}
            price={product.price}
            image={product.image_filename || "/placeholder.svg"}
            description={product.description}
            index={index}
            alt={`${product.english_name} - ${product.category} product`}
          />
        );
      })}
    </div>
  );
}
