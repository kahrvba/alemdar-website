"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, Zap, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface NavbarProps {
  activeSection: string
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    // Only run on client-side
    if (typeof window === "undefined") return

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)

    // Call it once to set initial state
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
    <div className={cn("py-4 px-4 md:px-6 transition-all duration-300", isScrolled ? "py-2" : "py-4")}>
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
          </div>
          <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            ALEMDAE TEKNIK
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                activeSection === link.id ? "text-blue-400" : "text-gray-400 hover:text-white",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Contact Us
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-gray-950 border-gray-800">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between py-4">
                <Link href="/" className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    ALEMDAR TEKNIK
                  </span>
                </Link>
              </div>

              <nav className="flex flex-col space-y-6 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    className={cn(
                      "text-lg font-medium transition-colors flex items-center",
                      activeSection === link.id ? "text-blue-400" : "text-gray-400 hover:text-white",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto pb-8">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
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

