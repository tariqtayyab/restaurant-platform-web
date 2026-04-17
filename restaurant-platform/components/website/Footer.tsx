"use client"

import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid gap-8 md:grid-cols-5 mb-12">
          
          {/* Brand with Logo */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative w-auto h-10">
                <Image
                  src="/tillbilling.png"
                  alt="Till Billing Logo"
                  width={100}
                  height={40}
                  className="object-contain brightness-0 invert" // Makes logo white for dark footer
                  priority
                />
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              The all-in-one restaurant management platform for Pakistan. POS, inventory, and a free website — from one dashboard.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-bold mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How it works</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><a href="#about" className="hover:text-white transition-colors">About us</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-bold mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms-and-conditions" className="hover:text-white transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Get Started */}
          <div>
            <h4 className="text-sm font-bold mb-4">Get Started</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><a href="/signup" className="hover:text-white transition-colors">Start free trial</a></li>
              <li><a href="/login" className="hover:text-white transition-colors">Sign in</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Eats Desk. All rights reserved.</p>
          <p>Made with ❤️ for restaurants in Pakistan.</p>
        </div>

      </div>
    </footer>
  )
}