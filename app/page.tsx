"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Tilt from 'react-parallax-tilt'
import { Canvas } from "@react-three/fiber"
import { Environment, PresentationControls } from "@react-three/drei"
import { ArrowRight, Cpu, Zap, Lightbulb, ChevronRight, Code, Layers, Sun, Wrench, AudioLines } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import HeroScene from "@/components/hero-scene"
import Model from "@/components/model"
import { Suspense } from 'react'
import Electronics from "@/components/elecrtocisfetchedProducts"
import Arduino from "@/components/arduinofetchedProducts"
import SoundProducts from "@/components/soundfetchedProducts"
import { useRouter } from "next/navigation"
import ReactCookieBot from 'react-cookiebot'
// Register plugins
gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const router = useRouter()
  const [tabsValue, setTabsValue] = useState("solar")
  const mainRef = useRef(null)
  const heroRef = useRef(null)
  const productsRef = useRef(null)
  const innovationRef = useRef(null)
  const servicesRef = useRef(null)
  const contactRef = useRef<HTMLElement>(null)
  const [activeSection, setActiveSection] = useState("hero")
    useEffect(() => {
    // Only run on client-side
    if (typeof window === "undefined") return

    // Typing animation
    const text = "Powering Innovation Through Technology"
    const heroTitle = document.querySelector('.hero-title')
    if (!heroTitle) return

    // Clear any existing content
    heroTitle.textContent = ''

    // Split text into spans for better performance
    const chars = text.split('')
    chars.forEach(char => {
      const span = document.createElement('span')
      // Add non-breaking space for actual spaces
      span.textContent = char === ' ' ? '\u00A0' : char
      // Add a small margin for spaces
      if (char === ' ') {
        span.style.marginRight = '0.2em'
      }
      span.style.opacity = '0'
      heroTitle.appendChild(span)
    })

    // Animate characters with GSAP
    gsap.to(heroTitle.children, {
      opacity: 1,
      duration: 0.05,
      stagger: 0.05,
      ease: "none"
    })

    // Add cursor
    const cursorSpan = document.createElement('span')
    cursorSpan.textContent = '|'
    cursorSpan.className = 'animate-pulse ml-1'
    heroTitle.appendChild(cursorSpan)

    // Hero section animations
    const heroSubtitle = document.querySelector(".hero-subtitle")
    if (heroSubtitle) {
      gsap.fromTo(
        heroSubtitle,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" }
      )
    }

    const heroCta = document.querySelector(".hero-cta")
    if (heroCta) {
      gsap.fromTo(
        heroCta,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: "power3.out" }
      )
    }

    // Products section animations
    const productCards = document.querySelectorAll(".product-card")
    if (productCards.length > 0) {
      gsap.fromTo(
        productCards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".products-section",
            start: "top 80%",
          },
        }
      )
    }

    // Innovation lab animations
    gsap.fromTo(
      ".innovation-content",
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".innovation-section",
          start: "top 70%",
        },
      }
    )

    gsap.fromTo(
      ".innovation-image",
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: ".innovation-section",
          start: "top 70%",
        },
      }
    )

    // Services animations
    gsap.fromTo(
      ".service-card",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".services-section",
          start: "top 80%",
        },
      }
    )

    // Scroll tracking for navigation
    const sections = [
      { ref: heroRef, id: "hero" },
      { ref: productsRef, id: "products" },
      { ref: innovationRef, id: "innovation" },
      { ref: servicesRef, id: "services" },
      { ref: contactRef, id: "contact" },
    ]

    sections.forEach(({ ref, id }) => {
      if (ref.current) {
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveSection(id),
          onEnterBack: () => setActiveSection(id),
        })
      }
    })

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      if (heroTitle) {
        heroTitle.innerHTML = ''
      }
    }
  }, []) // Empty dependency array means this effect runs once on mount

  return (
    <div ref={mainRef} className="bg-black text-white overflow-hidden">
      <div className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md">
        <Navbar activeSection={activeSection} />
      </div>

      {/* Hero Section */}
      <section 
        id="hero"
        ref={heroRef} 
        className="relative min-h-screen flex flex-col items-center justify-center pt-20"
      >
        <div className="absolute inset-0 z-0">
          <Canvas>
            <HeroScene />
            <Environment preset="city" />
          </Canvas>
        </div>

        <div className="container relative z-10 mx-auto px-4 py-32 text-center">
          <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-6 flex justify-center items-center">
            {/* Content will be added by JavaScript */}
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl max-w-3xl mx-auto mb-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Premium electronics, solar solutions, Arduino innovations, and Sound systems for the future-focused world
          </p>
          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
            >
              Explore Products <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50"
            >
              Contact Sales <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="h-8 w-8 rotate-90 text-purple-500" />
        </div>
      </section>

      {/* Products Section */}
      <section 
        id="products"
        ref={productsRef} 
        className="products-section relative py-20 bg-white dark:bg-black"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Our Premium Product Lines
          </h2>

          <Tabs defaultValue="solar" className="w-full" onValueChange={setTabsValue}>
            <TabsList className="grid w-full grid-cols-4 mb-12 bg-gray-100/50 dark:bg-gray-900/50">
              <TabsTrigger
                value="solar"
                className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700 text-gray-600 dark:data-[state=active]:bg-blue-900/30 dark:data-[state=active]:text-blue-500 dark:text-blue-400"
              >
                <Zap className="mr-2 h-4 w-4" /> Solar Solutions
              </TabsTrigger>
              <TabsTrigger
                value="electronics"
                className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700 text-gray-600 dark:data-[state=active]:bg-blue-900/30 dark:data-[state=active]:text-blue-500 dark:text-blue-400"
              >
                <Cpu className="mr-2 h-4 w-4" /> Electronics
              </TabsTrigger>
              <TabsTrigger
                value="arduino"
                className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700 text-gray-600 dark:data-[state=active]:bg-blue-900/30 dark:data-[state=active]:text-blue-500 dark:text-blue-400"
              >
                <Lightbulb className="mr-2 h-4 w-4" /> Arduino
              </TabsTrigger>
              <TabsTrigger
                value="sound"
                className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700 text-gray-600 dark:data-[state=active]:bg-blue-900/30 dark:data-[state=active]:text-blue-500 dark:text-blue-400"
              >
                <AudioLines className="mr-2 h-4 w-4" /> Sound System
              </TabsTrigger>    
            </TabsList>

            <TabsContent value="solar" className="mt-0">

            </TabsContent>

            <TabsContent value="electronics" className="mt-0">
              <Electronics />
            </TabsContent>

            <TabsContent value="arduino" className="mt-0">
              <Arduino preview={true} />
            </TabsContent>

            <TabsContent value="sound" className="mt-0">
              <SoundProducts />
            </TabsContent>
          </Tabs>

          <div className="text-center mt-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white dark:from-blue-600 dark:to-purple-500 dark:hover:from-blue-700 dark:hover:to-purple-700"
              onClick={() => {
                switch (tabsValue) {
                  case "arduino":
                    router.push("/arduino-products")
                    break;
                  case "solar":
                    router.push("/solar-products")
                    break;
                  case "electronics":
                    router.push("/electronics-products")
                    break;
                  case "sound":
                    router.push("/sound-products")
                    break;
                }
              }}
            >
              View All Products <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Innovation Lab Section */}
      <section 
        id="innovation"
        ref={innovationRef} 
        className="innovation-section relative py-24 bg-white dark:bg-black"
      >
        <div className="absolute inset-0 dark:bg-[radial-gradient(circle_at_center,rgba(67,56,202,0.15),rgba(12,10,9,0))]"></div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="innovation-content">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-black dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500">
                Our Innovation Lab
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                Where ideas transform into groundbreaking solutions. Our state-of-the-art innovation lab is the
                birthplace of next-generation prototypes and Arduino-based products.
              </p>
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg mr-4">
                    <Code className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-300 mb-2">Rapid Prototyping</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Transform concepts into functional prototypes with our advanced fabrication tools and expertise.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg mr-4">
                    <Layers className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-300 mb-2">Custom Solutions</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Tailored Arduino-based systems designed to meet your specific requirements and challenges.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg mr-4">
                    <Lightbulb className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-300 mb-2">Innovation Workshops</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Collaborative sessions where tech enthusiasts and professionals can develop new ideas.
                    </p>
                  </div>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
                Explore the Lab <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="innovation-image relative h-[500px] rounded-xl overflow-hidden">
              <div className="absolute inset-0  dark:from-indigo-900/20 dark:to-purple-900/20 z-10 rounded-xl"></div>
              <div className="h-full w-full">
                <Suspense fallback={null}>
                  <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <PresentationControls
                      global
                      speed={2}
                      zoom={0.1}
                      rotation={[0, -Math.PI / 4, 0]}
                      polar={[-Math.PI / 2, Math.PI / 2]}
                      azimuth={[-Math.PI / 2, Math.PI / 2]}
                      snap={true}
                      enabled={true}
                    >
                      <Model />
                    </PresentationControls>
                    <Environment preset="city" />
                  </Canvas>
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section 
        id="services"
        ref={servicesRef} 
        className="services-section relative py-24 bg-white dark:bg-black"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-foreground dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-blue-400 dark:to-purple-600">
            Expert Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.05}>
              <Card className="service-card bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                <CardContent className="pt-6">
                  <div className="bg-blue-900/30 p-3 rounded-lg w-fit mb-4">
                    <Sun className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Solar Installation</h3>
                  <p className="text-gray-400 mb-4">
                    Professional installation of solar panel systems for residential and commercial properties.
                  </p>
                  <Button variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 p-0">
                    Learn more <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Tilt>

            <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.05}>
              <Card className="service-card bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                <CardContent className="pt-6">
                  <div className="bg-purple-900/30 p-3 rounded-lg w-fit mb-4">
                    <Cpu className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Custom Electronics Design</h3>
                  <p className="text-gray-400 mb-4">
                    Bespoke electronic system design and development for specialized applications.
                  </p>
                  <Button variant="ghost" className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/20 p-0">
                    Learn more <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Tilt>

            <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.05}>
              <Card className="service-card bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-pink-500 to-red-500"></div>
                <CardContent className="pt-6">
                  <div className="bg-pink-900/30 p-3 rounded-lg w-fit mb-4">
                    <Wrench className="h-6 w-6 text-pink-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Maintenance & Repair</h3>
                  <p className="text-gray-400 mb-4">
                    Expert maintenance and repair services for electronic systems and solar installations.
                  </p>
                  <Button variant="ghost" className="text-pink-400 hover:text-pink-300 hover:bg-pink-900/20 p-0">
                    Learn more <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Tilt>
          </div>

          <div className="mt-20 bg-black rounded-xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">Ready to Electrify Your Ideas?</h3>
                <p className="text-gray-300 mb-6">
                  Contact our team of experts to discuss your project needs and discover how our products and services
                  can power your innovation.
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Get in Touch
                </Button>
              </div>
              <div className="relative h-64 md:h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse opacity-70"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer contactRef={contactRef as React.RefObject<HTMLElement>} />
      <ReactCookieBot 
        domainGroupId="b58a7fb8-d07c-4ab0-a582-fb0625ebd864"
        language="en"
      />
    </div>
  )
}

// The ArduinoModel component has been replaced with the new Model component
// The ArduinoModel function has been removed

