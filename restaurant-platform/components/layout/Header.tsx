// components/layout/Header.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Restaurant } from '../types'
import Container from '../ui/Container'
import { FiMenu, FiX, FiPhone, FiMail, FiMapPin, FiSearch, FiShoppingCart } from 'react-icons/fi'
import { useCart } from '@/context/CartContext'

interface HeaderProps {
  restaurant: Restaurant
}

export default function Header({ restaurant }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { getItemCount } = useCart() // Removed setIsCartOpen
  const menuRef = useRef<HTMLDivElement>(null)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Navigation items
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Menu', href: '/menu' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  const cartCount = getItemCount()

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-lg py-2' : 'py-4'
      }`}
      style={{ backgroundColor: restaurant.primaryColor }}
    >
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo only */}
          <Link href="/" className="flex items-center">
            {restaurant.logoUrl ? (
              <div className="relative flex items-center">
                <img 
                  src={restaurant.logoUrl} 
                  alt={restaurant.heroTitle}
                  style={{ 
                    maxHeight: '60px', 
                    width: 'auto',
                    objectFit: 'contain'
                  }}
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
            ) : (
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <span className="text-white text-2xl">🍽️</span>
              </div>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-white font-medium hover:text-white hover:opacity-80 transition-all relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Right side - Icons */}
          <div className="flex items-center space-x-2">
            {/* Search Icon */}
            <Link 
              href={`/search`}
              className="p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all text-white"
              aria-label="Search"
            >
              <FiSearch size={22} />
            </Link>

            {/* Cart Icon - NOW LINKS TO CART PAGE */}
            <Link
              href={`/cart`}
              className="p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all text-white relative"
              aria-label="Cart"
            >
              <FiShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all text-white"
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div 
            ref={menuRef}
            className="md:hidden mt-4 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          >
            <div className="p-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-all font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-100 p-4 space-y-3">
              <a 
                href={`tel:${restaurant.contactPhone}`}
                className="flex items-center space-x-3 text-gray-700 hover:text-[#2c9ba3] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <FiPhone className="text-[#2c9ba3]" />
                <span>{restaurant.contactPhone}</span>
              </a>
              <a 
                href={`mailto:${restaurant.contactEmail}`}
                className="flex items-center space-x-3 text-gray-700 hover:text-[#2c9ba3] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <FiMail className="text-[#2c9ba3]" />
                <span>{restaurant.contactEmail}</span>
              </a>
              <div className="flex items-center space-x-3 text-gray-700">
                <FiMapPin className="text-[#2c9ba3]" />
                <span className="text-sm">{restaurant.contactAddress}</span>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}