"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, ShoppingCart, Heart, Package, DollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  title: string
  description?: string
  image: string
  category: string
  index: number
  quantity: number
  price: number
  alt?: string
}

export default function ProductCard({
  title,
  description,
  image,
  category,
  index,
  quantity,
  price,
  alt
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "electronics":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "solar":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "arduino":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      case "sound":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const formatPrice = (price: number | string) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
  }

  return (
    <motion.div
      className="product-card h-full"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        className="overflow-hidden bg-gray-900 border-gray-800 transition-all duration-300 hover:border-gray-700 dark:bg-gray-900/50 h-full flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-48 overflow-hidden flex-shrink-0">
          <Image
            src={image || "/placeholder.svg"}
            alt={alt || title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={cn("object-contain transition-transform duration-500", isHovered ? "scale-105" : "scale-100")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
          <Badge className={cn("absolute top-3 left-3 border", getCategoryColor(category))}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Badge>
        </div>
        <CardContent className="p-5 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-2 text-white line-clamp-2">{title}</h3>
          <p className="text-gray-400 mb-4 line-clamp-3 flex-grow">{description}</p>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2 text-gray-300">
              <Package className="h-4 w-4 text-blue-400" />
              <span>{quantity} in stock</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <DollarSign className="h-4 w-4 text-green-400" />
              <span className="font-semibold">${formatPrice(price)}</span>
            </div>
          </div>

          <div className="flex justify-between items-center mt-auto">
            <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 p-0">
              View Details <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

