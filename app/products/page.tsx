"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Skeleton } from "@/components/ui/skeleton"
import ProductCard from "@/components/product-card"
import { Search, SlidersHorizontal } from "lucide-react"

interface Product {
  id: number
  english_name: string
  english_names?: string // For Arduino products compatibility
  category: string
  quantity: number
  price: number
  image_filename: string
  description: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [stockFilter, setStockFilter] = useState("all")

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const categories = ['arduino', 'solar', 'electronics', 'sound']
        const allProducts = await Promise.all(
          categories.map(async (category) => {
            const response = await fetch(`/api/${category}`)
            const data = await response.json()
            return data
          })
        )
        setProducts(allProducts.flat())
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAllProducts()
  }, [])

  const filteredProducts = products.filter(product => {
    const matchesSearch = (product.english_name || product.english_names || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    const matchesStock = stockFilter === "all" 
      || (stockFilter === "inStock" && product.quantity > 0)
      || (stockFilter === "outOfStock" && product.quantity === 0)

    return matchesSearch && matchesCategory && matchesPrice && matchesStock
  })

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-8">
          {/* Search and Filter Skeletons */}
          <div className="flex flex-col md:flex-row gap-4">
            <Skeleton className="h-10 w-full md:w-1/2" />
            <Skeleton className="h-10 w-full md:w-1/4" />
            <Skeleton className="h-10 w-full md:w-1/4" />
          </div>
          
          {/* Product Grid Skeletons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((index) => (
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
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-8">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="arduino">Arduino</SelectItem>
              <SelectItem value="solar">Solar</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="sound">Sound Systems</SelectItem>
            </SelectContent>
          </Select>

          <Select value={stockFilter} onValueChange={setStockFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Stock Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Items</SelectItem>
              <SelectItem value="inStock">In Stock</SelectItem>
              <SelectItem value="outOfStock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" /> Price Range
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              title={product.english_name || product.english_names || ""}
              category={product.category}
              quantity={product.quantity}
              price={product.price}
              image={product.image_filename || "/placeholder.svg"}
              description={product.description}
              index={index}
              alt={`${product.english_name || product.english_names} - ${product.category} product`}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No products found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}