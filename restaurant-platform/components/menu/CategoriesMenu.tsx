// components/menu/CategoriesMenu.tsx
'use client'

import { useState, useEffect } from 'react'
import RestaurantCard from './RestaurantCard'
import { FiFilter, FiChevronRight } from 'react-icons/fi'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  price: number
  imageUrl: string | null
  categoryId: number
}

interface Category {
  id: number
  name: string
  products: Product[]
}

interface CategoriesMenuProps {
  restaurantName?: string
  primaryColor?: string
  secondaryColor?: string
  subdomain: string
}

export default function CategoriesMenu({ 
  restaurantName = 'Our Menu',
  primaryColor = '#FF6B6B',
  secondaryColor = '#4ECDC4',
  subdomain
}: CategoriesMenuProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<number | 'all'>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [visibleRows, setVisibleRows] = useState(4) // Show 4 rows initially

  // Fetch menu data from API
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true)
        const API_BASE_URL = 'http://34.235.60.49'
        const response = await fetch(`${API_BASE_URL}/api/public/website/${subdomain}/menu`, {
          headers: { 'accept': '*/*' }
        })
        
        if (!response.ok) throw new Error('Failed to fetch menu')
        
        const result = await response.json()
        if (result.responseCode === '00' && result.data) {
          setCategories(result.data.categories || [])
        }
      } catch (error) {
        console.error('Error fetching menu:', error)
      } finally {
        setLoading(false)
      }
    }

    if (subdomain) {
      fetchMenu()
    }
  }, [subdomain])

  // Get all products for "All Items" view
  const allProducts = categories.flatMap(cat => cat.products)

  // Filter products based on active category
  const getFilteredProducts = () => {
    if (activeCategory === 'all') {
      return allProducts
    }
    return categories.find(cat => cat.id === activeCategory)?.products || []
  }

  const filteredProducts = getFilteredProducts()
  
  // Calculate items per row based on screen size
  const getItemsPerRow = () => {
    if (typeof window === 'undefined') return 4 // Default for SSR
    if (window.innerWidth >= 1024) return 4 // Desktop: 4 items per row
    if (window.innerWidth >= 640) return 3  // Tablet: 3 items per row
    return 2 // Mobile: 2 items per row
  }

  const [itemsPerRow, setItemsPerRow] = useState(4)

  useEffect(() => {
    const handleResize = () => {
      setItemsPerRow(getItemsPerRow())
    }
    
    handleResize() // Set initial value
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Calculate visible items based on rows
  const visibleItems = visibleRows * itemsPerRow
  const hasMore = filteredProducts.length > visibleItems
  const totalRows = Math.ceil(filteredProducts.length / itemsPerRow)

  // Loading state
  if (loading) {
    return (
      <section className="py-8 md:py-12 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-3 animate-pulse">
                <div className="w-full aspect-square bg-gray-200 rounded-lg mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-2">
            <span style={{ color: primaryColor }}>
              {restaurantName}
            </span>
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Discover our delicious selection
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => {
              setActiveCategory('all')
              setVisibleRows(4) // Reset rows when changing category
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
              activeCategory === 'all' 
                ? 'text-white shadow-md' 
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
            style={{ 
              backgroundColor: activeCategory === 'all' ? primaryColor : undefined,
            }}
          >
            All Items ({allProducts.length})
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id)
                setVisibleRows(4) // Reset rows when changing category
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                activeCategory === category.id 
                  ? 'text-white shadow-md' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
              style={{ 
                backgroundColor: activeCategory === category.id ? primaryColor : undefined,
              }}
            >
              {category.name} ({category.products.length})
            </button>
          ))}

          {/* Filter Toggle for Mobile */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden p-2 bg-white border border-gray-200 rounded-full shadow-md flex items-center gap-1 flex-shrink-0"
          >
            <FiFilter size={16} className="text-gray-600" />
            <span className="text-xs">Filter</span>
          </button>
        </div>

        {/* Filter Bar */}
        {showFilters && (
          <div className="lg:hidden bg-white rounded-xl p-4 mb-6 shadow-md border border-gray-200">
            <p className="text-sm text-gray-600 text-center">Additional filters coming soon...</p>
          </div>
        )}

        {/* Menu Grid */}
        {filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
              {filteredProducts.slice(0, visibleItems).map((product) => (
                <RestaurantCard 
                  key={product.id} 
                  product={product}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                />
              ))}
            </div>

            {/* View More Button - Appears after every 4 rows */}
            {hasMore && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setVisibleRows(prev => prev + 4)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 rounded-full text-sm font-medium transition-all hover:shadow-md"
                  style={{ 
                    borderColor: primaryColor,
                    color: primaryColor
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = primaryColor
                    e.currentTarget.style.color = 'white'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white'
                    e.currentTarget.style.color = primaryColor
                  }}
                >
                  View More Items
                  <FiChevronRight size={18} />
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Showing {Math.min(visibleItems, filteredProducts.length)} of {filteredProducts.length} items
                </p>
              </div>
            )}

            {/* Show less button when more than 4 rows are visible */}
            {visibleRows > 4 && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => setVisibleRows(4)}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Show less
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No items found in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}