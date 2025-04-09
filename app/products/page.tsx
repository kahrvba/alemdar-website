"use client"

import { useEffect, useState, useRef, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"

// Component that uses searchParams
function ProductsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get("category")
  const [loading, setLoading] = useState(true)
  const contactRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // If a category is specified, redirect to the appropriate category page
    if (category) {
      // Map the category parameter to the corresponding route
      const categoryRoutes: Record<string, string> = {
        "arduino": "/products/arduino",
        "solar": "/products/Solar",
        "electronics": "/products/electronics",
        "sound": "/products/SoundSystem",
        "3d printer and cnc": "/products/arduino?category=3D%20Printer%20and%20CNC",
        "connecters": "/products/arduino?category=Connecters",
        "development Boards": "/products/arduino?category=Development%20Boards",
        "esp-wifi": "/products/arduino?category=ESP-WiFi",
        "lcd and display": "/products/arduino?category=LCD%20and%20Display",
        "led products": "/products/arduino?category=Led%20Products",
        "motor and motor driver": "/products/arduino?category=Motor%20and%20Motor%20Driver",
        "plates and breadboards": "/products/arduino?category=Plates%20and%20Breadboards",
        "power": "/products/arduino?category=Power",
        "programming and debugger boards": "/products/arduino?category=Programming%20and%20Debugger%20Boards",
        "raspberry": "/products/arduino?category=Raspberry",
        "robotic kits & education products": "/products/arduino?category=Robotic%20Kits%20%26%20Education%20Products",
        "sensors and modules": "/products/arduino?category=Sensors%20and%20Modules",
        "smd microcontroller": "/products/arduino?category=SMD%20Microcontroller",
        "wireless communication": "/products/arduino?category=Wireless%20Communication"
      }

      const route = categoryRoutes[category.toLowerCase()]
      if (route) {
        router.push(route)
      } else {
        // If category doesn't match any known route, set loading to false to show the not found message
        setLoading(false)
      }
    } else {
      // If no category is specified, redirect to the categories page
      router.push("/products/categories")
    }
  }, [category, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Navigation */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
          <Navbar activeSection="products" />
        </div>

        <div className="flex-1 flex items-center justify-center pt-20">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-lg text-gray-300">Redirecting to product category...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
        <Navbar activeSection="products" />
      </div>

      <main className="flex-1 container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-red-900/30 text-red-400 border-red-500/30 py-1.5 px-4">
            Category Not Found
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Product Category Not Found
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Sorry, we couldn&apos;t find the product category &ldquo;{category || 'unknown'}&rdquo;. Please check the URL or browse our available categories.
          </p>
          <Button
            onClick={() => router.push("/products/categories")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Browse All Categories
          </Button>
        </div>
      </main>

      <Footer contactRef={contactRef as React.RefObject<HTMLElement>} />
    </div>
  )
}

// Main page component with Suspense boundary
export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex flex-col">
        <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
          <Navbar activeSection="products" />
        </div>
        <div className="flex-1 flex items-center justify-center pt-20">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-lg text-gray-300">Loading products...</p>
          </div>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}