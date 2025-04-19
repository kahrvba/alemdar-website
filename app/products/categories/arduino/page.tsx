"use client"
import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {Search,Filter,X,Cpu,Zap,ChevronRight,ChevronLeft,Lightbulb,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {DropdownMenu,DropdownMenuContent,DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import Arduino from "@/components/arduinofetchedProducts"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Sort options
const sortOptions = [
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating-desc", label: "Highest Rated" },
  { id: "newest", label: "Newest Arrivals" },
]

export default function ArduinoProductsPage() {

  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortOption, setSortOption] = useState("price-asc")
  const [activeTab, setActiveTab] = useState("all")
  const [isMounted, setIsMounted] = useState(false)
  const contactRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

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

  // Categories for Arduino products
  const categories = [
    { id: "3D Printer and CNC", label: "3D Printer and CNC", count: 42 },
    { id: "Arduino", label: "Arduino", count: 78 },
    { id: "Connectors", label: "Connectors", count: 34 },
    { id: "Development Boards", label: "Development Boards", count: 65 },
    { id: "ESP-WIFI", label: "ESP-WIFI", count: 48 },
    { id: "LCD and Display", label: "LCD and Display", count: 64 },
    { id: "Led Products", label: "Led Products", count: 42 },
    { id: "Motor and Motor Drivers", label: "Motor and Motor Drivers", count: 53 },
    { id: "Plates and Breadboards", label: "Plates and Breadboards", count: 93 },
    { id: "Power", label: "Power", count: 39 },
    { id: "Programming and Debugger Boards", label: "Programming and Debugger Boards", count: 37 },
    { id: "Raspberry", label: "Raspberry", count: 45 },
    { id: "Robotic Kits & Educational Products", label: "Robotic Kits & Educational Products", count: 37 },
    { id: "Sensors & Modules", label: "Sensors & Modules", count: 156 },
    { id: "SMD Microcontrollers", label: "SMD Microcontrollers", count: 29 },
    { id: "Wireless Communication", label: "Wireless Communication", count: 51 },
  ]

  // Get current sort label
  const getCurrentSortLabel = () => {
    const option = sortOptions.find((opt) => opt.id === sortOption)
    return option ? option.label : "Sort By"
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
        <Navbar activeSection="products" />
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center pt-24 pb-12 md:pt-32 md:pb-16 bg-[url('/arduino.jpg')] bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background"></div>

        {/* Animated dots */}
        <div className="absolute inset-0 overflow-hidden">
          {isMounted && [...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-blue-500"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                opacity: 0.3 + Math.random() * 0.7,
              }}
              animate={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              }}
              transition={{
                duration: 10 + Math.random() * 20,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-left"
            >
              <Badge className="mb-4 bg-blue-900/30 text-blue-400 border-blue-500/30 py-1.5 px-4">
                Arduino Products
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-6 leading-tight">
                Explore Arduino <br />Boards & Accessories
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-xl text-black dark:text-white">
                Discover our complete range of Arduino boards, shields, sensors, and accessories for your next
                project
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Products Section */}
      <section id="products-section" className="">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Badge className="mb-4 bg-blue-900/30 text-blue-400 border-blue-500/30 py-1.5 px-4">
                Arduino Collection
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-6">
                Arduino Products
              </h2>
              <p className="text-xl text-black max-w-3xl mx-auto dark:text-white">
                Browse our selection of Arduino boards, shields, sensors, and accessories for your next
                project
              </p>
            </motion.div>
          </div>

          {/* Category Tabs */}
          <div className="mb-8">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="relative">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="h-full w-full bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20 blur-3xl"></div>
                </div>
                <div className="relative flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-0 z-10 bg-background/80 border border-gray-800 rounded-l-lg h-full"
                    onClick={() => {
                      const tabsContainer = document.querySelector('.tabs-container');
                      if (tabsContainer) {
                        tabsContainer.scrollBy({ left: -200, behavior: 'smooth' });
                      }
                    }}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <div className="tabs-container w-full overflow-x-auto scrollbar-hide px-8">
                    <TabsList className="flex w-max space-x-1 bg-background/50 backdrop-blur-sm border border-gray-800 rounded-lg p-1">
                      <TabsTrigger
                        value="all"
                        onClick={() => {
                          setIsLoading(true); // Show loading state
                          setSelectedCategories([]);
                          // Set loading to false after a short delay to allow the filter to apply
                          setTimeout(() => setIsLoading(false), 300);
                        }}
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-900/50 data-[state=active]:to-purple-900/50 data-[state=active]:text-white whitespace-nowrap"
                      >
                        All Products
                      </TabsTrigger>
                      {categories.map((category) => (
                        <TabsTrigger
                          key={category.id}
                          value={category.id.toLowerCase().replace(/\s+/g, '-')}
                          onClick={() => {
                            setIsLoading(true); // Show loading state
                            setSelectedCategories([category.id]);
                            // Set loading to false after a short delay to allow the filter to apply
                            setTimeout(() => setIsLoading(false), 300);
                          }}
                          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-900/50 data-[state=active]:to-purple-900/50 data-[state=active]:text-white whitespace-nowrap"
                        >
                          {category.label}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 z-10 bg-background/80 border border-gray-800 rounded-r-lg h-full"
                    onClick={() => {
                      const tabsContainer = document.querySelector('.tabs-container');
                      if (tabsContainer) {
                        tabsContainer.scrollBy({ left: 200, behavior: 'smooth' });
                      }
                    }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Search and Filter Bar */}
              <div className="flex flex-col md:flex-row gap-4 mb-8 mt-8">
                {/* Search */}
                <div className="relative flex-grow">
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-900/20 to-purple-900/20 blur-xl rounded-lg transform scale-105 opacity-70"></div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search Arduino products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-background/50 border-gray-800 focus:border-blue-500 rounded-lg"
                    />
                  </div>
                </div>

                {/* Filter Button */}
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="border-gray-800 bg-background/50 hover:bg-background/80 hover:border-gray-700"
                      >
                        <Filter className="h-4 w-4 mr-2" />
                        Filter & Sort
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
                              className={`justify-start ${selectedCategories.includes(category.id) ? "bg-blue-600" : "border-gray-700"}`}
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
                              className={`justify-start ${sortOption === option.id ? "bg-blue-600" : "border-gray-700"}`}
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
                              setSelectedCategories([])
                              setSortOption("price-asc")
                              setSearchQuery("")
                            }}
                          >
                            Reset All
                          </Button>
                          <Button className="bg-blue-600 hover:bg-blue-700">Apply Filters</Button>
                        </div>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Active Filters */}
              <AnimatePresence>
                {(selectedCategories.length > 0 || sortOption !== "price-asc") && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-wrap gap-2 mb-6"
                  >
                    <div className="text-sm text-gray-400 mr-2 flex items-center">Active filters:</div>
                    {selectedCategories.map((category) => (
                      <Badge key={category} variant="outline" className="bg-background/50 border-gray-700 flex items-center gap-1">
                        {category}
                        <button onClick={() => setSelectedCategories([])}>
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
              <TabsContent value={activeTab} className="mt-8">
                {isLoading ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                      <motion.div key={index} variants={itemVariants} className="flex flex-col space-y-3">
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
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <Arduino
                    preview={false}
                    categoryFilter={selectedCategories.length > 0 ? selectedCategories[0] : ""}
                    sortOption={sortOption}
                    searchQuery={searchQuery}
                  />
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Technical Resources Section */}
      <section className="py-16 bg-gradient-to-b from-background via-gray-900/30 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-green-900/30 text-green-400 border-green-500/30 py-1.5 px-4">Resources</Badge>
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-500 mb-6">
              Technical Resources
            </h2>
            <p className="text-black max-w-3xl mx-auto">
              Access tutorials, documentation, and project ideas to get the most out of your Arduino products
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-black overflow-hidden group hover:border-gray-700 transition-all duration-300">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center">
                  <Cpu className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                  Getting Started Guides
                </h3>
                <p className="text-gray-400 mb-4">
                  Step-by-step tutorials to help you get started with Arduino programming and hardware.
                </p>
                <Button variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 p-0 group">
                  View Guides <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-black border-gray-800 overflow-hidden group hover:border-gray-700 transition-all duration-300">
              <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">
                  Project Ideas
                </h3>
                <p className="text-gray-400 mb-4">
                  Explore creative project ideas and tutorials for all skill levels using Arduino boards.
                </p>
                <Button
                  variant="ghost"
                  className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/20 p-0 group"
                >
                  Discover Projects{" "}
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-black border-gray-800 overflow-hidden group hover:border-gray-700 transition-all duration-300">
              <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500"></div>
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 rounded-full bg-green-900/30 flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-green-400 transition-colors">
                  Documentation
                </h3>
                <p className="text-gray-400 mb-4">
                  Access comprehensive documentation for all Arduino products and libraries.
                </p>
                <Button variant="ghost" className="text-green-400 hover:text-green-300 hover:bg-green-900/20 p-0 group">
                  Read Documentation{" "}
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer contactRef={contactRef as React.RefObject<HTMLElement>} />
    </div>
  )
}
