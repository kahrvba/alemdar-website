"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowRight, Zap, Cpu, Microchip, Volume2, ChevronRight, Star } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"



// Category data
const categories = [
  {
    id: "solar",
    title: "Solar Solutions",
    description:
      "Harness the power of the sun with our cutting-edge solar panels, inverters, and complete renewable energy systems.",
    image: "/Solar.jpg?height=400&width=600",
    icon: Zap,
    color: "from-green-600 to-emerald-600",
    textColor: "text-green-400",
    products: 40,
    featured: true,
    rating: 4.9,
  },
  {
    id: "electronics",
    title: "Electronics",
    description:
      "Discover premium electronic components, testing equipment, and circuit solutions for your innovative projects.",
    image: "/electronics.jpg?height=400&width=600",
    icon: Cpu,
    color: "from-blue-600 to-indigo-600",
    textColor: "text-blue-400",
    products: 430,
    featured: true,
    rating: 4.8,
  },
  {
    id: "arduino",
    title: "Arduino",
    description:
      "Explore our range of Arduino boards, shields, sensors, and complete development kits for makers and innovators.",
    image: "/arduino.jpg?height=400&width=600",
    icon: Microchip,
    color: "from-purple-600 to-pink-600",
    textColor: "text-purple-400",
    products: 332,
    featured: false,
    rating: 4.7,
  },
  {
    id: "sound",
    title: "Sound Systems",
    description:
      "Experience crystal-clear audio with our professional sound systems, speakers, amplifiers, and audio solutions.",
    image: "/SoundSystem.jpg?height=400&width=600",
    icon: Volume2,
    color: "from-amber-600 to-orange-600",
    textColor: "text-amber-400",
    products: 70,
    featured: false,
    rating: 4.6,
  },
]

// Featured testimonials
const testimonials = [
  {
    name: "Alex Johnson",
    role: "Tech Innovator",
    company: "Future Labs",
    text: "The quality of electronics from TechPower has transformed our prototyping process. Highly recommended!",
    avatar: "/placeholder.svg?height=60&width=60",
    category: "electronics"
  },
  {
    name: "Sarah Chen",
    role: "Sustainability Director",
    company: "EcoSolutions",
    text: "Their solar solutions are unmatched in efficiency and reliability. We've deployed them across multiple projects.",
    avatar: "/placeholder.svg?height=60&width=60",
    category: "solar"
  },
  {
    name: "Marcus Rivera",
    role: "Sound Engineer",
    company: "Acoustic Studios",
    text: "The sound systems from TechPower deliver exceptional clarity and depth. Perfect for professional applications.",
    avatar: "/placeholder.svg?height=60&width=60",
    category: "sound"
  }
]

export default function ProductCategories() {
  const router = useRouter()
  const contactRef = useRef<HTMLElement>(null)

  // Define refs for sections
  const heroRef = useRef<HTMLDivElement>(null)
  const categoriesRef = useRef<HTMLDivElement>(null)
  const bannerRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)

  // Track if sections are in view
  const [heroInView, setHeroInView] = useState(true)
  const [categoriesInView, setCategoriesInView] = useState(false)
  const [bannerInView, setBannerInView] = useState(false)
  const [testimonialsInView, setTestimonialsInView] = useState(false)

  // Set up intersection observers
  useEffect(() => {
    const options = {
      threshold: 0.1,
      rootMargin: '0px'
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.target === heroRef.current) {
          setHeroInView(entry.isIntersecting)
        } else if (entry.target === categoriesRef.current) {
          setCategoriesInView(entry.isIntersecting)
        } else if (entry.target === bannerRef.current) {
          setBannerInView(entry.isIntersecting)
        } else if (entry.target === testimonialsRef.current) {
          setTestimonialsInView(entry.isIntersecting)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, options)

    if (heroRef.current) observer.observe(heroRef.current)
    if (categoriesRef.current) observer.observe(categoriesRef.current)
    if (bannerRef.current) observer.observe(bannerRef.current)
    if (testimonialsRef.current) observer.observe(testimonialsRef.current)

    return () => observer.disconnect()
  }, [])

  // Navigate to products page with category filter
  const navigateToCategory = (categoryId: string) => {
    // Map the category ID to the corresponding route
    const categoryRoutes: Record<string, string> = {
      "arduino": "/products/arduino",
      "solar": "/products/Solar",
      "electronics": "/products/electronics",
      "sound": "/products/SoundSystem"
    }

    const route = categoryRoutes[categoryId.toLowerCase()]
    if (route) {
      router.push(route)
    } else {
      // Fallback to the query parameter approach
      router.push(`/products?category=${categoryId}`)
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
        <Navbar activeSection="products" />
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[80vh] flex items-center pt-24 pb-12 md:pt-32 md:pb-16 text-white"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(67,56,202,0.2),rgba(12,10,9,0))]"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-40 right-20 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-left"
            >
              <Badge
                className="mb-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 border-blue-500/30 backdrop-blur-sm py-1.5 px-4"
              >
                Explore Our Categories
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-6 leading-tight">
                Cutting-Edge <br />Product Categories
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-xl text-gray-500 dark:text-white">
                Discover our comprehensive range of high-quality products designed to power your innovation and technological needs.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={() => router.push("/products")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Browse All Products <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
                >
                  Request Catalog
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full h-[500px] rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm z-10 rounded-2xl"></div>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="grid grid-cols-2 gap-4 p-6 w-full max-w-lg">
                    {categories.map((category, index) => (
                      <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        className="relative overflow-hidden rounded-xl aspect-square"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-black/80 z-10"></div>
                        <Image
                          src={category.image || "/placeholder.svg"}
                          alt={category.title}
                          fill
                          className="object-cover z-0"
                        />
                        <div className="absolute inset-0 z-20 p-4 flex flex-col justify-between">
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                            <category.icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white">{category.title}</h3>
                            <p className={`${category.textColor} text-sm`}>{category.products} Products</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/20 rounded-full blur-xl"></div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute -left-10 top-1/4 bg-gradient-to-r from-green-600/90 to-emerald-600/90 text-white px-4 py-2 rounded-full backdrop-blur-sm shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  <span>Sustainable Solutions</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="absolute -right-10 top-2/3 bg-gradient-to-r from-blue-600/90 to-indigo-600/90 text-white px-4 py-2 rounded-full backdrop-blur-sm shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4" />
                  <span>Premium Components</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronRight className="h-8 w-8 rotate-90 text-purple-500 opacity-70" />
          </motion.div>
          <span className="text-sm text-gray-700">Scroll to explore</span>
        </div>
      </section>

      {/* Categories Section */}
      <section
        ref={categoriesRef}
        className="py-20 md:py-28 relative text-gray-100"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-gray-400/50 to-background"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={categoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-purple-900/30 text-purple-400 border-purple-500/30 py-1.5 px-4">
              Our Product Lines
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-6">
              Explore Our Categories
            </h2>
            <p className="text-xl text-gray-500 dark:text-gray-100 max-w-3xl mx-auto">
              Browse through our specialized product categories, each offering premium solutions for your technological needs.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={categoriesInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 max-w-6xl mx-auto"
          >
            {categories.map((category) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                className="relative group"
              >
                <Card className="overflow-hidden bg-transparent border border-gray-800 group-hover:border-gray-700 transition-all duration-500 h-full w-full text-white">
                  {/* Glow effect on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`}></div>

                  <div className="relative w-full h-80 overflow-hidden">
                    {/* Featured badge */}
                    {category.featured && (
                      <div className="absolute top-4 right-4 z-20">
                        <Badge className="bg-gradient-to-r from-yellow-600/90 to-amber-600/90 text-white border-none py-1 px-3">
                          <Star className="h-3.5 w-3.5 mr-1 fill-white" /> Featured
                        </Badge>
                      </div>
                    )}

                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-center w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-500 group-hover:translate-y-0">
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center mr-4 shadow-lg`}>
                          <category.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">{category.title}</h3>
                          <div className="flex items-center">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < Math.floor(category.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-500"}`}
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-gray-200 text-sm">{category.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-200 mb-6 line-clamp-2 md:line-clamp-none">{category.description}</p>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className={`${category.textColor} font-medium text-lg`}>{category.products}</span>
                          <span className="text-gray-300 ml-1">Products</span>
                        </div>
                        <Button
                          onClick={() => navigateToCategory(category.id)}
                          className={`bg-gradient-to-r ${category.color} hover:opacity-90 text-white shadow-lg`}
                        >
                          Explore <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Animated border effect */}
                <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-md`} style={{ transform: 'scale(1.02)' }}></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        ref={testimonialsRef}
        className="py-16 md:py-24 relative text-gray-100"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-blue-900/30 text-blue-400 border-blue-500/30 py-1.5 px-4">
              Customer Experiences
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-6">
              What Our Clients Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => {
              const category = categories.find(c => c.id === testimonial.category);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="bg-transparent backdrop-blur-sm border border-gray-800 rounded-xl p-6 h-full text-white">
                    <div className={`w-full h-1 bg-gradient-to-r ${category?.color || 'from-blue-600 to-purple-600'} rounded-full mb-6`}></div>
                    <p className="text-gray-900 dark:text-white mb-6 italic">&ldquo;{testimonial.text}&rdquo;</p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-800">
                        <Image
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{testimonial.name}</h4>
                        <p className="text-sm text-gray-900 dark:text-white">{testimonial.role}, {testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Banner */}
      <section
        ref={bannerRef}
        className="py-16 md:py-24 relative text-white"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={bannerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl overflow-hidden relative"
          >
            {/* Background with blur effect */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80 backdrop-blur-md z-10"></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-20 p-8 md:p-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm py-1.5 px-4">
                    Complete Collection
                  </Badge>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    Discover Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Complete Product Range</span>
                  </h2>
                  <p className="text-gray-100 text-lg mb-8 max-w-lg">
                    Browse our full catalog featuring premium electronics, solar solutions, Arduino products, and
                    professional sound systems all in one place.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button
                      size="lg"
                      onClick={() => router.push("/products")}
                      className="bg-white text-purple-900 hover:bg-gray-100"
                    >
                      View All Products <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-white text-purple-900 hover:bg-gray-100"
                    >
                      Download Catalog
                    </Button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mt-12">
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white mb-1">872+</div>
                      <div className="text-gray-200 text-sm">Products</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white mb-1">24/7</div>
                      <div className="text-gray-200 text-sm">Support</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white mb-1">4.8</div>
                      <div className="text-gray-200 text-sm">Rating</div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  {/* Logo showcase */}
                  <div className="relative h-80 md:h-96">
                    <motion.div
                      animate={{ rotateY: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="relative w-40 h-40">
                        <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/20 shadow-lg bg-gray-900/50 backdrop-blur-sm flex items-center justify-center">
                          <Image
                            src="/logo.png"
                            alt="Alemdar Teknik Logo"
                            width={100}
                            height={100}
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Circular text */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border-2 border-white/10 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0"
                    >
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path
                          id="circlePath"
                          d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                          fill="none"
                        />
                        <text fill="#ffffff">
                          <textPath xlinkHref="#circlePath" className="text-xs">
                            TECHPOWER • PREMIUM PRODUCTS • INNOVATION • QUALITY •
                          </textPath>
                        </text>
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer contactRef={contactRef as React.RefObject<HTMLElement>} />
    </div>
  )
}


