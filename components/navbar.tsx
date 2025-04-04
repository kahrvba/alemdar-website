
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import ThemeSwitch from "@/components/ThemeSwitch"

interface NavbarProps {
  activeSection: string
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#hero", label: "Home", id: "hero" },
    { href: "#products", label: "Products", id: "products" },
    { href: "#innovation", label: "Innovation Lab", id: "innovation" },
    { href: "#services", label: "Services", id: "services" },
    { href: "#contact", label: "Contact", id: "contact" },
  ]

  return (
    <div className={cn(
      "fixed w-full top-0 z-50 transition-all duration-300 border-b border-gray-200 dark:border-border",
      isScrolled 
        ? "py-2 bg-gray-50/80 dark:bg-background/80 backdrop-blur-sm" 
        : "py-4 bg-gray-50 dark:bg-background"
    )}>
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-primary/20 flex items-center justify-center">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
          </div>
          <span className="font-bold text-xl text-gray-900 dark:text-white">
            ALEMDAR TEKNIK
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                activeSection === link.id 
                  ? "text-blue-500 dark:text-blue-500" 
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-transparent"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <Button 
            variant="default"
            className="hidden md:flex bg-gray-900 text-white hover:bg-gray-800 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
          >
            Contact Us
          </Button>
          <div className="text-gray-900 dark:text-gray-300">
            <ThemeSwitch />
          </div>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-gray-900 dark:text-white bg-gray-100 dark:bg-transparent"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className="bg-gray-50 dark:bg-background border-gray-200 dark:border-border"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-primary/20 flex items-center justify-center">
                  <Image src="/logo.png" alt="Logo" width={40} height={40} />
                </div>
                <span className="font-bold text-xl text-gray-900 dark:text-white">
                  ALEMDAR TEKNIK
                </span>
              </div>

              <nav className="flex flex-col space-y-6 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    className={cn(
                      "text-lg font-medium transition-colors flex items-center",
                      activeSection === link.id 
                        ? "text-blue-500 dark:text-blue-500" 
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto pb-8">
                <Button className="w-full bg-gray-900 text-white hover:bg-gray-800 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90">
                  Contact Us
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

