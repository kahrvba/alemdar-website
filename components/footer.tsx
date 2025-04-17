import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function Footer({ contactRef }: { contactRef?: React.RefObject<HTMLElement> }) {
  return (
    <footer
      ref={contactRef}
      id="contact"
      className="bg-white dark:bg-black border-t border-black/20 dark:border-border"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                ALEMDAR TEKNIK
              </span>
            </Link>
            <p className="text-black dark:text-white mb-6">
              More than just a shop—we are a powerhouse of electronics and solar solutions, supplying premium components
              and expert services.
            </p>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/share/157A81DV44/" className="text-black dark:text-white hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-black dark:text-white hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://www.instagram.com/alemdarteknik?igsh=bW5lY2lla3c0dDhz" className="text-black dark:text-white hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-black dark:text-white hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-black dark:text-white">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#contact" className="text-black dark:text-white hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products/categories" className="text-black dark:text-white hover:text-blue-400 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="#innovation" className="text-black dark:text-white hover:text-blue-400 transition-colors">
                  Innovation Lab
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-black dark:text-white hover:text-blue-400 transition-colors">
                  Services
                </Link>
              </li>
              
            </ul>
          </div>

          <div className="">
            <h3 className="font-bold text-lg mb-6 text-black dark:text-white">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                <span className="text-black dark:text-white">Polis Sokak No:4 Lefkoş</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-blue-400 mr-3" />
                <a className="text-black dark:text-white hover:text-blue-400" href="tel:+90 (542) 8772005">+90 (542) 8772005</a>
              </li>
              <li className="flex items-center gap-3 w-full">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <span className="text-black dark:text-white break-normal">Alemdar-elektronik@Live.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-black dark:text-white">Newsletter</h3>
            <p className="text-black dark:text-white mb-4">
              Subscribe to our newsletter for the latest updates on products and innovations.
            </p>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-gray-900 border-gray-700 focus:border-blue-500"
              />
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm cursor-pointer hover:text-blue-400 transition-colors" onClick={() => window.open('https://github.com/kahrvba', '_blank')}>&copy; {new Date().getFullYear()} Kahrba. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-500 hover:text-black dark:text-white text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-500 hover:text-black dark:text-white text-sm">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-500 hover:text-black dark:text-white text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

