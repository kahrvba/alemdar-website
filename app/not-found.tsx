'use client'

import Link from "next/link"
import { useRef } from "react"
import { Provider } from "@/components/provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function NotFound() {
  const contactRef = useRef<HTMLElement>(null)

  return (
    <Provider>
      <div className="bg-black text-white overflow-hidden">
        <div className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md">
          <Navbar activeSection="404" />
        </div>
        
        <section className="error-page-404">
          <div className="container">
            <div className="row">	
              <div className="col-sm-12">
                <div className="col-sm-10 col-sm-offset-1 text-center">
                  <div className="four_zero_four_bg">
                    <h1>404</h1>
                  </div>
                  
                  <div className="contant_box_404">
                    <h3>
                      Look like you&apos;re lost
                    </h3>
                    
                    <p>the page you are looking for is not available!</p>
                    
                    <Link 
                      href="/" 
                      className="inline-flex px-6 py-3 text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-md transition-all duration-200"
                    >
                      Go to Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer contactRef={contactRef as React.RefObject<HTMLElement>} />
      </div>
    </Provider>
  )
}
