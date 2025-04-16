"use client"
import type React from "react"
import { useState, useEffect, useRef, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Filter,
  ArrowUpDown,
  X,
  Zap,
  Sun,
  Battery,
  ChevronRight,
  Star,
  ShoppingCart,
  Eye,
  BarChart,
  Home,
  Factory,
  Lightbulb,
  AlertCircle,
  PackageSearch
} from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SolarProducts from "@/components/solarfetchedProducts"
import useCachedFetch from "@/hooks/useCachedFetch"

// Define the SolarProduct interface
interface SolarProduct {
  id: number;
  name: string;
  rating: number;
  image_filename: string;
  category: string;
  quantity: number;
  price: number;
  description: string;
}

// Solar statistics
const solarStats = [
  { label: "CO₂ Reduction", value: "2.5M", unit: "tons/year", icon: Zap },
  { label: "Energy Generated", value: "9.8M", unit: "kWh/year", icon: Sun },
  { label: "Customers", value: "50K+", unit: "KKTC", icon: Home },
]

export default function SolarProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortOption, setSortOption] = useState("price-asc")
  const [activeFilters, setActiveFilters] = useState(0)
  const [,setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [isMounted, setIsMounted] = useState(false)
  const contactRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const [filterMenuOpen, setFilterMenuOpen] = useState(false)
  // Fetch solar products and category counts from API
  const {
    data: apiData,
    isLoading: isProductsLoading,
    error: productsError
  } = useCachedFetch<{
    products: SolarProduct[];
    categoryCounts: { category: string; count: number; }[];
  }>('/api/solar', {}, {
    cacheTTL: 5 * 60 * 1000,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    retryCount: 3,
    retryDelay: 1000
  });

  // Create categories array with counts from database
  const categories = useMemo(() => {
    const counts = apiData?.categoryCounts || [];
    return [
      { 
        id: "Solar Panels", 
        label: "Solar Panels", 
        count: counts.find(c => c.category === "Solar Panels")?.count || 0 
      },
      { 
        id: "Inverters", 
        label: "Inverters", 
        count: counts.find(c => c.category === "Inverters")?.count || 0 
      },
      { 
        id: "Battery Storage", 
        label: "Battery Storage", 
        count: counts.find(c => c.category === "Battery Storage")?.count || 0 
      },
      { 
        id: "Mounting Systems", 
        label: "Mounting Systems", 
        count: counts.find(c => c.category === "Mounting Systems")?.count || 0 
      },
      { 
        id: "Charge Controllers", 
        label: "Charge Controllers", 
        count: counts.find(c => c.category === "Charge Controllers")?.count || 0 
      },
      { 
        id: "Monitoring Systems", 
        label: "Monitoring Systems", 
        count: counts.find(c => c.category === "Monitoring Systems")?.count || 0 
      },
      { 
        id: "Solar Accessories", 
        label: "Solar Accessories", 
        count: counts.find(c => c.category === "Solar Accessories")?.count || 0 
      },
      { 
        id: "Off-Grid Kits", 
        label: "Off-Grid Kits", 
        count: counts.find(c => c.category === "Off-Grid Kits")?.count || 0 
      },
      { 
        id: "Solar Water Heaters", 
        label: "Solar Water Heaters", 
        count: counts.find(c => c.category === "Solar Water Heaters")?.count || 0 
      },
      { 
        id: "Solar Lighting", 
        label: "Solar Lighting", 
        count: counts.find(c => c.category === "Solar Lighting")?.count || 0 
      }
    ];
  }, [apiData?.categoryCounts]);

  // Update the solarProductsData reference
  const solarProductsData = apiData?.products;

  // Create featured products from API data
  const featuredProducts = solarProductsData
    ?.filter(product => product.rating >= 4) // Filter products with high ratings
    .slice(0, 3) // Take the first 3 products
    .map(product => ({
      ...product,
      id: product.id,
      name: product.name,
      category: product.category || 'Solar',
      description: product.description,
      image: product.image_filename,
      price: product.price,
      rating: product.rating,
      reviews: Math.floor(Math.random() * 100) + 10, // Random number of reviews
      stock: product.quantity > 10 ? 'In Stock' : 'Low Stock',
      featured: true,
      powerOutput: '400W',
      efficiency: '21.5%',
      capacity: '5kWh',
      cycles: '5000+'
    })) || []

  // Set isMounted to true after component mounts
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // Set loading to false after a short delay to simulate loading state
  useEffect(() => {
    if (!isMounted) return

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [isMounted])

  // Parallax effect for hero section
  useEffect(() => {
    if (!isMounted) return

    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (heroRef.current) {
        heroRef.current.style.backgroundPositionY = `${scrollPosition * 0.5}px`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMounted])

  // Animate stats on scroll
  useEffect(() => {
    if (!isMounted || !statsRef.current) return

    let animated = false; // Flag to track if animation has run

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            animated = true; // Set flag to prevent re-animation
            
            const counters = statsRef.current?.querySelectorAll(".stat-counter")
            counters?.forEach((counter) => {
              const target = counter as HTMLElement
              const targetValue = parseInt(target.getAttribute("data-target") || "0", 10)
              let startValue = 0
              const steps = 60 // More steps for smoother counting
              const increment = targetValue / steps
              let currentStep = 0

              const updateCounter = () => {
                currentStep++
                startValue = Math.min(Math.ceil(increment * currentStep), targetValue)
                target.textContent = startValue.toString()

                if (currentStep < steps) {
                  requestAnimationFrame(updateCounter)
                }
              }

              updateCounter()
            })
            
            // Unobserve after animation starts
            observer.unobserve(entry.target)
          }
        })
      },
      { 
        threshold: 0.5,
        rootMargin: '-50px'
      }
    )

    observer.observe(statsRef.current)
    
    return () => {
      observer.disconnect()
      animated = false
    }
  }, [isMounted])

  // Sort options
  const sortOptions = [
    { id: "price-asc", label: "Price: Low to High" },
    { id: "price-desc", label: "Price: High to Low" },
    { id: "name-asc", label: "Name: A to Z" },
    { id: "name-desc", label: "Name: Z to A" },
    { id: "efficiency", label: "Highest Efficiency" },
    { id: "power", label: "Highest Power Output" },
  ]

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId)
      }
      return [...prev, categoryId]
    })
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setSortOption("price-asc")
  }

  useEffect(() => {
    let count = 0
    if (searchQuery) count++
    if (selectedCategories.length > 0) count++
    if (sortOption !== "price-asc") count++
    setActiveFilters(count)
  }, [searchQuery, selectedCategories, sortOption])

  const getCurrentSortLabel = () => {
    return sortOptions.find((option) => option.id === sortOption)?.label || "Sort"
  }

  // Animation variants for motion components

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
        <Navbar activeSection="products" />
      </div>

      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative h-[50vh] md:h-[60vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background"></div>

        {/* Solar panel pattern overlay */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="solar-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect x="5" y="5" width="40" height="40" fill="none" stroke="#10b981" strokeWidth="1" />
              <rect x="55" y="5" width="40" height="40" fill="none" stroke="#10b981" strokeWidth="1" />
              <rect x="5" y="55" width="40" height="40" fill="none" stroke="#10b981" strokeWidth="1" />
              <rect x="55" y="55" width="40" height="40" fill="none" stroke="#10b981" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#solar-pattern)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge className="mt-10 bg-green-900/30 text-green-400 border-green-500/30 py-1.5 px-4">
              Solar Solutions
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 mb-6">
              Harness the Power of the Sun
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Discover our comprehensive range of solar panels, inverters, and complete renewable energy systems
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
                onClick={() => {
                  const productsSection = document.getElementById("products-section")
                  if (productsSection) {
                    productsSection.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              >
                Browse Products <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg"  className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700">
                Solar Calculator
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Animated sun rays */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Solar pattern overlay */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern id="solar-pattern-sun" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <rect x="5" y="5" width="40" height="40" fill="none" stroke="#10b981" strokeWidth="1" />
                <rect x="55" y="5" width="40" height="40" fill="none" stroke="#10b981" strokeWidth="1" />
                <rect x="5" y="55" width="40" height="40" fill="none" stroke="#10b981" strokeWidth="1" />
                <rect x="55" y="55" width="40" height="40" fill="none" stroke="#10b981" strokeWidth="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#solar-pattern-sun)" />
            </svg>
          </div>
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-yellow-500/20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </div>
      </div>

      {/* Solar Stats Section */}
      <section ref={statsRef} className="relative py-12 bg-gradient-to-b from-background via-gray-900/30 to-background">
        {/* Solar pattern overlay */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="solar-pattern-stats" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect x="5" y="5" width="40" height="40" fill="none" stroke="#10b981" strokeWidth="1" />
              <rect x="55" y="5" width="40" height="40" fill="none" stroke="#10b981" strokeWidth="1" />
              <rect x="5" y="55" width="40" height="40" fill="none" stroke="#10b981" strokeWidth="1" />
              <rect x="55" y="55" width="40" height="40" fill="none" stroke="#10b981" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#solar-pattern-stats)" />
          </svg>
        </div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solarStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-gradient-to-r from-green-600 to-teal-600 border border-gray-800 rounded-xl p-6 text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-green-900/30 flex items-center justify-center">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-4xl font-bold text-white mb-2">
                  <span className="stat-counter" data-target={stat.value.replace(/[^0-9]/g, "")}>
                    0
                  </span>
                  <span className="text-green-400">{stat.value.includes("+") ? "+" : ""}</span>
                </h3>
                <p className="text-black mb-1">{stat.label}</p>
                <p className="text-sm text-black">{stat.unit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="relative py-16 bg-gradient-to-b from-background via-gray-900/30 to-background">
        {/* Solar pattern overlay */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="solar-pattern-featured" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect x="5" y="5" width="40" height="40" fill="none" stroke="#10b981" strokeWidth="1" />
              <rect x="55" y="5" width="40" height="40" fill="none" stroke="#10b981" strokeWidth="1" />
              <rect x="5" y="55" width="40" height="40" fill="none" stroke="#10b981" strokeWidth="1" />
              <rect x="55" y="55" width="40" height="40" fill="none" stroke="#10b981" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#solar-pattern-featured)" />
          </svg>
        </div>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-blue-900/30 text-blue-400 border-blue-500/30 py-1.5 px-4">
              Featured Products
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-600 mb-6">
              Top-Rated Solar Solutions
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Explore our best-selling solar products, designed for maximum efficiency and reliability
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isProductsLoading ? (
              // Loading state for featured products
              [...Array(3)].map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="overflow-hidden bg-gray-900/30 border border-gray-800 h-full">
                    <div className="relative p-6">
                      <div className="relative h-48 mb-6 flex items-center justify-center">
                        <Skeleton className="h-full w-full rounded-lg" />
                      </div>
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                      <Skeleton className="h-4 w-24 mb-4" />
                      <div className="flex justify-between">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : productsError ? (
              // Error state
              <div className="col-span-3 py-12 text-center">
                <div className="bg-red-900/20 border border-red-800 rounded-lg p-6 max-w-md mx-auto">
                  <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Unable to Load Featured Products</h3>
                  <p className="text-gray-300 mb-6">We&apos;re having trouble loading our featured products. Please try again later.</p>
                </div>
              </div>
            ) : featuredProducts.length === 0 ? (
              // No products state
              <div className="col-span-3 py-12 text-center">
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 max-w-md mx-auto">
                  <PackageSearch className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No Featured Products</h3>
                  <p className="text-gray-300 mb-6">Check back soon for our featured solar products.</p>
                </div>
              </div>
            ) : (
              // Normal state with products
              featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >

                <Card className="overflow-hidden bg-gray-900/30 border border-gray-800 group-hover:border-gray-700 transition-all duration-300 h-full">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl"></div>

                  <div className="relative p-6">
                    {/* Stock badge */}
                    <Badge
                      className={`absolute top-4 right-4 z-10 ${product.stock === "Low Stock" ? "bg-amber-600/90 text-white" : "bg-green-600/90 text-white"} border-none`}
                    >
                      {product.stock}
                    </Badge>

                    <div className="relative h-48 mb-6 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-b from-green-900/10 to-blue-900/10 rounded-lg"></div>
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={150}
                        height={150}
                        className="object-contain transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div>
                      <div className="flex items-center mb-2">
                        <Badge className="bg-green-900/30 text-green-400 border-green-500/30">{product.category}</Badge>
                        {product.featured && (
                          <Badge className="ml-2 bg-amber-900/30 text-amber-400 border-amber-500/30">
                            <Star className="h-3 w-3 mr-1 fill-amber-400" /> Featured
                          </Badge>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                      <p className="text-gray-400 mb-4 line-clamp-2">{product.description}</p>

                      {/* Product specs */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {product.powerOutput && (
                          <div className="flex items-center text-sm">
                            <Zap className="h-3.5 w-3.5 mr-1 text-green-400" />
                            <span className="text-gray-300">{product.powerOutput}</span>
                          </div>
                        )}
                        {product.efficiency && (
                          <div className="flex items-center text-sm">
                            <BarChart className="h-3.5 w-3.5 mr-1 text-green-400" />
                            <span className="text-gray-300">Efficiency: {product.efficiency}</span>
                          </div>
                        )}
                        {product.capacity && (
                          <div className="flex items-center text-sm">
                            <Battery className="h-3.5 w-3.5 mr-1 text-green-400" />
                            <span className="text-gray-300">Capacity: {product.capacity}</span>
                          </div>
                        )}
                        {product.cycles && (
                          <div className="flex items-center text-sm">
                            <Sun className="h-3.5 w-3.5 mr-1 text-green-400" />
                            <span className="text-gray-300">Cycles: {product.cycles}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center mb-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-500"}`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-gray-400 text-sm">({product.reviews})</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-green-400">${product.price.toFixed(2)}</span>
                        <div className="flex space-x-2">
                          <Button size="icon" variant="outline" className="rounded-full h-9 w-9 border-gray-700">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="icon" className="rounded-full h-9 w-9 bg-green-600 hover:bg-green-700">
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Main Products Section */}
      <section id="products-section" className="relative py-16 bg-gradient-to-b from-background via-gray-900/30 to-background">
        {/* Solar pattern overlay */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="solar-pattern-grid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect x="5" y="5" width="40" height="40" fill="none" stroke="#10b981" strokeWidth="1" />
              <rect x="55" y="5" width="40" height="40" fill="none" stroke="#10b981" strokeWidth="1" />
              <rect x="5" y="55" width="40" height="40" fill="none" stroke="#10b981" strokeWidth="1" />
              <rect x="55" y="55" width="40" height="40" fill="none" stroke="#10b981" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#solar-pattern-grid)" />
          </svg>
        </div>
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-600 mb-4">
                Solar Products
              </h2>
              <p className="text-black dark:text-white max-w-3xl">
                Browse our complete collection of solar panels, inverters, batteries, and accessories for your renewable
                energy needs
              </p>
            </motion.div>
          </div>

          {/* Category Tabs */}
          <div className="mb-8">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="relative">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="h-full w-full bg-gradient-to-r from-green-900/20 via-teal-900/20 to-blue-900/20 blur-3xl"></div>
                </div>
                <TabsList className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 bg-background/50 backdrop-blur-sm border border-gray-800 rounded-lg overflow-x-auto">
                  <TabsTrigger
                    value="all"
                    onClick={() => setSelectedCategories([])}
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-900/50 data-[state=active]:to-blue-900/50 data-[state=active]:text-white"
                  >
                    All Products
                  </TabsTrigger>
                  <TabsTrigger
                    value="panels"
                    onClick={() => setSelectedCategories(["Solar Panels"])}
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-900/50 data-[state=active]:to-blue-900/50 data-[state=active]:text-white"
                  >
                    Solar Panels
                  </TabsTrigger>
                  <TabsTrigger
                    value="inverters"
                    onClick={() => setSelectedCategories(["Inverters"])}
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-900/50 data-[state=active]:to-blue-900/50 data-[state=active]:text-white"
                  >
                    Inverters
                  </TabsTrigger>
                  <TabsTrigger
                    value="batteries"
                    onClick={() => setSelectedCategories(["Battery Storage"])}
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-900/50 data-[state=active]:to-blue-900/50 data-[state=active]:text-white"
                  >
                    Batteries
                  </TabsTrigger>
                  <TabsTrigger
                    value="kits"
                    onClick={() => setSelectedCategories(["Off-Grid Kits"])}
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-900/50 data-[state=active]:to-blue-900/50 data-[state=active]:text-white"
                  >
                    Off-Grid Kits
                  </TabsTrigger>
                  <TabsTrigger
                    value="accessories"
                    onClick={() => setSelectedCategories(["Solar Accessories"])}
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-900/50 data-[state=active]:to-blue-900/50 data-[state=active]:text-white"
                  >
                    Accessories
                  </TabsTrigger>
                </TabsList>
              </div>
            </Tabs>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-grow">
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-green-900/20 to-blue-900/20 blur-xl rounded-lg transform scale-105 opacity-70"></div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search solar products..."
                  className="pl-10 bg-background/50 backdrop-blur-sm border-gray-700 focus:border-green-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Desktop Filters */}
            <div className="hidden md:flex gap-2">
              {/* Category Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-gray-700 bg-background/50 backdrop-blur-sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter by Category
                    {selectedCategories.length > 0 && (
                      <Badge className="ml-2 bg-green-600 hover:bg-green-700" variant="secondary">
                        {selectedCategories.length}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-background/90 backdrop-blur-md border-gray-700 w-64 max-h-[70vh] overflow-auto"
                >
                  <div className="p-2">
                    <Input placeholder="Search categories..." className="mb-2 bg-background/50 border-gray-700" />
                  </div>
                  <Separator className="bg-gray-800" />
                  <div className="py-2">
                    {categories.map((category) => (
                      <DropdownMenuItem
                        key={category.id}
                        onClick={() => {
                          // If category is already selected, remove it, otherwise set it as the only selected category
                          if (selectedCategories.includes(category.id)) {
                            setSelectedCategories([])
                            setActiveTab("all")
                          } else {
                            setSelectedCategories([category.id])
                            // Update active tab based on category
                            if (category.id === "Solar Panels") setActiveTab("panels")
                            else if (category.id === "Inverters") setActiveTab("inverters")
                            else if (category.id === "Battery Storage") setActiveTab("batteries")
                            else if (category.id === "Off-Grid Kits") setActiveTab("kits")
                            else if (category.id === "Solar Accessories") setActiveTab("accessories")
                            else setActiveTab("all")
                          }
                        }}
                        className={`flex justify-between items-center ${selectedCategories.includes(category.id) ? "bg-green-900/20 text-green-400" : ""}`}
                      >
                        <span>{category.label}</span>
                        <Badge variant="outline" className="bg-background/50 border-gray-700 ml-2">
                          {category.count}
                        </Badge>
                      </DropdownMenuItem>
                    ))}
                  </div>
                  {selectedCategories.length > 0 && (
                    <>
                      <Separator className="bg-gray-800" />
                      <div className="p-2">
                        <Button
                          variant="ghost"
                          onClick={() => {
                            clearFilters()
                            setActiveTab("all")
                          }}
                          className="w-full text-green-400 hover:text-green-300 hover:bg-green-900/20"
                        >
                          Clear Filters
                        </Button>
                      </div>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Sort Options */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-gray-700 bg-background/50 backdrop-blur-sm">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    {getCurrentSortLabel()}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-background/90 backdrop-blur-md border-gray-700">
                  {sortOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.id}
                      onClick={() => setSortOption(option.id)}
                      className={sortOption === option.id ? "bg-green-900/20 text-green-400" : ""}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Clear Filters Button (only show when filters are active) */}
              {activeFilters > 0 && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    clearFilters()
                    setActiveTab("all")
                  }}
                  className="text-green-400 hover:text-green-300 hover:bg-green-900/20"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              )}
            </div>

            {/* Mobile Filters */}
            <div className="flex md:hidden gap-2">
              {/* Mobile Category Filter */}
              <DropdownMenu open={filterMenuOpen} onOpenChange={setFilterMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex-1 border-gray-700 bg-background/50 backdrop-blur-sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter & Sort
                    {activeFilters > 0 && (
                      <Badge className="ml-2 bg-green-600 hover:bg-green-700" variant="secondary">
                        {activeFilters}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-background/90 backdrop-blur-md border-gray-700 w-[90vw]">
                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-3">Categories</h3>
                    <div className="grid grid-cols-1 gap-2 mb-6">
                      {categories.slice(0, 6).map((category) => (
                        <Button
                          key={category.id}
                          variant={selectedCategories.includes(category.id) ? "default" : "outline"}
                          className={`justify-start ${selectedCategories.includes(category.id) ? "bg-green-600" : "border-gray-700"}`}
                          onClick={() => {
                            if (selectedCategories.includes(category.id)) {
                              setSelectedCategories([])
                            } else {
                              setSelectedCategories([category.id])
                            }
                          }}
                        >
                          {category.label}
                          <Badge
                            className="ml-auto"
                            variant={selectedCategories.includes(category.id) ? "outline" : "secondary"}
                          >
                            {category.count}
                          </Badge>
                        </Button>
                      ))}
                    </div>

                    <Separator className="bg-gray-800 my-4" />

                    <h3 className="font-medium text-lg mb-3">Sort By</h3>
                    <div className="grid grid-cols-1 gap-2 mb-6">
                      {sortOptions.map((option) => (
                        <Button
                          key={option.id}
                          variant={sortOption === option.id ? "default" : "outline"}
                          className={`justify-start ${sortOption === option.id ? "bg-green-600" : "border-gray-700"}`}
                          onClick={() => setSortOption(option.id)}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>

                    <div className="flex justify-between">
                      <Button
                        variant="outline"
                        className="border-gray-700"
                        onClick={() => {
                          clearFilters()
                          setActiveTab("all")
                          setFilterMenuOpen(false)
                        }}
                      >
                        Clear All
                      </Button>
                      <Button 
                        className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
                        onClick={() => {
                          setFilterMenuOpen(false)
                        }}
                      >
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Active Filters Display */}
          <AnimatePresence>
            {activeFilters > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-wrap gap-2 mb-6"
              >
                {searchQuery && (
                  <Badge variant="outline" className="bg-background/50 border-gray-700 flex items-center gap-1">
                    Search: {searchQuery}
                    <button onClick={() => setSearchQuery("")}>
                      <X className="h-3 w-3 ml-1" />
                    </button>
                  </Badge>
                )}

                {selectedCategories.map((categoryId) => (
                  <Badge
                    key={categoryId}
                    variant="outline"
                    className="bg-background/50 border-gray-700 flex items-center gap-1"
                  >
                    {categories.find((c) => c.id === categoryId)?.label}
                    <button
                      onClick={() => {
                        handleCategoryChange(categoryId)
                        setActiveTab("all")
                      }}
                    >
                      <X className="h-3 w-3 ml-1" />
                    </button>
                  </Badge>
                ))}

                {sortOption !== "price-asc" && (
                  <Badge variant="outline" className="bg-background/50 border-gray-700 flex items-center gap-1">
                    {getCurrentSortLabel()}
                    <button onClick={() => setSortOption("price-asc")}>
                      <X className="h-3 w-3 ml-1" />
                    </button>
                  </Badge>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className=" relative mt-8">
            <Tabs value={activeTab} defaultValue="all">
              <TabsList className="hidden">
                <TabsTrigger value="all">All Products</TabsTrigger>
                <TabsTrigger value="panels">Solar Panels</TabsTrigger>
                <TabsTrigger value="inverters">Inverters</TabsTrigger>
                <TabsTrigger value="batteries">Batteries</TabsTrigger>
              </TabsList>
              <TabsContent value={activeTab} className="mt-0">
                <SolarProducts
                  preview={false}
                  categoryFilter={selectedCategories.length > 0 ? selectedCategories[0] : ""}
                  sortOption={sortOption}
                  searchQuery={searchQuery}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-16 bg-gradient-to-b from-background via-gray-900/30 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-blue-900/30 text-blue-400 border-blue-500/30 py-1.5 px-4">Applications</Badge>
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 mb-6">
              Solar Solutions For Every Need
            </h2>
            <p className="text-black dark:text-white max-w-3xl mx-auto">
              Our solar products are designed for a wide range of applications, from residential homes to commercial
              buildings
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-black overflow-hidden group hover:border-gray-700 transition-all duration-300">
              <div className="h-2 bg-gradient-to-r from-green-500 to-teal-500"></div>
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 rounded-full bg-green-900/30 flex items-center justify-center">
                  <Home className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-green-400 transition-colors">
                  Residential
                </h3>
                <p className="text-gray-400 mb-4">
                  Complete solar solutions for homes, including panels, inverters, and battery storage systems.
                </p>
                <Button variant="ghost" className="text-green-400 hover:text-green-300 hover:bg-green-900/20 p-0 group">
                  Learn More <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-black overflow-hidden group hover:border-gray-700 transition-all duration-300">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-teal-500"></div>
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center">
                  <Factory className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                  Commercial
                </h3>
                <p className="text-gray-400 mb-4">
                  High-capacity solar systems for businesses, warehouses, and commercial buildings.
                </p>
                <Button variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 p-0 group">
                  Learn More <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-black overflow-hidden group hover:border-gray-700 transition-all duration-300">
              <div className="h-2 bg-gradient-to-r from-teal-500 to-cyan-500"></div>
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 rounded-full bg-teal-900/30 flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-teal-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-teal-400 transition-colors">
                  Off-Grid
                </h3>
                <p className="text-gray-400 mb-4">
                  Standalone solar power systems for remote locations, cabins, and off-grid applications.
                </p>
                <Button variant="ghost" className="text-teal-400 hover:text-teal-300 hover:bg-teal-900/20 p-0 group">
                  Learn More <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solar Calculator CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-blue-900/90"></div>

            {/* Solar panel pattern overlay */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <pattern id="solar-pattern-cta" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                  <rect x="2" y="2" width="20" height="20" fill="none" stroke="#ffffff" strokeWidth="1" />
                  <rect x="27" y="2" width="20" height="20" fill="none" stroke="#ffffff" strokeWidth="1" />
                  <rect x="2" y="27" width="20" height="20" fill="none" stroke="#ffffff" strokeWidth="1" />
                  <rect x="27" y="27" width="20" height="20" fill="none" stroke="#ffffff" strokeWidth="1" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#solar-pattern-cta)" />
              </svg>
            </div>

            <div className="relative z-10 p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge className="mb-4 bg-white/20 text-white border-white/30 py-1.5 px-4">Solar Calculator</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Calculate Your Solar Savings</h2>
                  <p className="text-gray-200 mb-6">
                    Use our advanced solar calculator to estimate how much you could save by switching to solar energy.
                    Input your location, energy usage, and preferences to get a personalized report.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button size="lg" className="bg-gradient-to-r   from-green-900/90 to-blue-900/90 text-white hover:bg-white cursor-pointer">
                      Start Calculation <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                    
                  </div>
                </div>
                <div className="relative h-64 md:h-80">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-48 h-48">
                      <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sun className="h-24 w-24 text-yellow-400" />
                      </div>
                      <motion.div
                        className="absolute inset-0"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        {[...Array(12)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-8 bg-yellow-400/60"
                            style={{
                              top: "50%",
                              left: "50%",
                              transformOrigin: "0 0",
                              transform: `rotate(${i * 30}deg) translateY(-100%)`,
                            }}
                          ></div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer contactRef={contactRef as React.RefObject<HTMLElement>} />
    </div>
  )
}
