// restaurant-platform/components/website/Navbar.tsx

"use client"

import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How it works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - No orange box, just the image */}
          <Link href="/" className="flex items-center">
            <div className="relative w-auto h-10">
              <Image
                src="/tillbilling.png"
                alt="Till Billing Logo"
                width={140}
                height={60}
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-9 text-base text-gray-600">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#F68048] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Right Section */}
          <div className="flex items-center gap-4">
            <a
              href="/login"
              className="hidden md:inline-flex text-base font-medium text-gray-700 hover:text-[#F68048] transition-colors"
            >
              Sign in
            </a>
            <a
              href="/signup"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#F68048] text-white text-base font-semibold hover:bg-[#F68048]/90 transition-all shadow-lg shadow-[#F68048]/25 hover:shadow-xl hover:shadow-[#F68048]/30 hover:-translate-y-0.5"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2.5 rounded-lg hover:bg-gray-100"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-gray-100 bg-white px-4 sm:px-6 lg:px-8 py-6 space-y-4"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block text-base text-gray-600 hover:text-[#F68048] transition-colors py-2.5"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-gray-100">
            <a
              href="/login"
              className="block text-base text-gray-600 hover:text-[#F68048] transition-colors py-2.5"
              onClick={() => setIsOpen(false)}
            >
              Sign in
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}