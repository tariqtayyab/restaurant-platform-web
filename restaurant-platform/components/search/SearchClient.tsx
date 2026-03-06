// components/search/SearchClient.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Restaurant } from '../types'
import { FiSearch, FiX, FiClock, FiTrendingUp, FiFilter, FiImage } from 'react-icons/fi'
import { useCart } from '@/context/CartContext'

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

interface SearchClientProps {
  restaurant: Restaurant
  subdomain: string
  initialQuery: string
}

export default function SearchClient({ restaurant, subdomain, initialQuery }: SearchClientProps) {
  const router = useRouter()
  const { addToCart } = useCart()
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'relevance' | 'price-low' | 'price-high'>('relevance')
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  const primaryColor = restaurant?.primaryColor || '#FF6B6B'
  const secondaryColor = restaurant?.secondaryColor || '#4ECDC4'

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
          // Flatten all products for search
          const products = result.data.categories.flatMap((cat: Category) => cat.products)
          setAllProducts(products)
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

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches')
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
    inputRef.current?.focus()
  }, [])

  // Perform search when query changes
  useEffect(() => {
    if (!searchQuery.trim() || allProducts.length === 0) {
      setSearchResults([])
      return
    }

    setIsLoading(true)
    
    const timer = setTimeout(() => {
      const query = searchQuery.toLowerCase()
      let results = allProducts.filter(product => 
        product.name.toLowerCase().includes(query)
      )

      // Apply category filter
      if (selectedCategory !== 'all') {
        results = results.filter(product => 
          product.categoryId === parseInt(selectedCategory)
        )
      }

      // Apply sorting
      switch (sortBy) {
        case 'price-low':
          results.sort((a, b) => a.price - b.price)
          break
        case 'price-high':
          results.sort((a, b) => b.price - a.price)
          break
        default:
          // relevance - keep as is
          break
      }

      setSearchResults(results)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery, selectedCategory, sortBy, allProducts])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5)
      setRecentSearches(updated)
      localStorage.setItem('recentSearches', JSON.stringify(updated))
      router.push(`/search?subdomain=${subdomain}&q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
    inputRef.current?.focus()
  }

  const handleRecentSearchClick = (query: string) => {
    setSearchQuery(query)
    router.push(`/search?subdomain=${subdomain}&q=${encodeURIComponent(query)}`)
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem('recentSearches')
  }

  const formatPrice = (price: number) => {
    return `Rs ${price.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
  }

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.imageUrl || '',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-8">
          <div className="h-12 bg-gray-200 rounded-2xl mb-4 animate-pulse"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-3 animate-pulse">
                <div className="w-full aspect-square bg-gray-200 rounded-lg mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pb-20 md:pb-0">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <form onSubmit={handleSearch}>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for dishes..."
                  className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-600 font-medium focus:outline-none transition-all"
                  style={{ 
                    borderColor: searchQuery ? primaryColor : '#D1D5DB',
                    boxShadow: searchQuery ? `0 0 0 2px ${primaryColor}20` : 'none'
                  }}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <FiX size={18} className="text-gray-600" />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden h-[60px] w-[60px] bg-white border-2 border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors flex items-center justify-center flex-shrink-0"
                style={{ 
                  borderColor: showFilters ? primaryColor : '#D1D5DB',
                  color: showFilters ? primaryColor : '#4B5563'
                }}
                aria-label="Toggle filters"
              >
                <FiFilter size={24} />
              </button>
            </div>
          </form>

          {/* Filters Section */}
          <div className={`mt-4 transition-all duration-300 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Category Filters */}
              <div className="flex-1">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all"
                    style={{
                      backgroundColor: selectedCategory === 'all' ? primaryColor : '#F3F4F6',
                      color: selectedCategory === 'all' ? 'white' : '#374151'
                    }}
                  >
                    All Items ({allProducts.length})
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id.toString())}
                      className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all"
                      style={{
                        backgroundColor: selectedCategory === cat.id.toString() ? primaryColor : '#F3F4F6',
                        color: selectedCategory === cat.id.toString() ? 'white' : '#374151'
                      }}
                    >
                      {cat.name} ({cat.products.length})
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:outline-none"
                  style={{ borderColor: '#D1D5DB' }}
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Recent Searches */}
        {!searchQuery && recentSearches.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FiClock style={{ color: primaryColor }} />
                Recent Searches
              </h2>
              <button
                onClick={clearRecentSearches}
                className="text-sm text-gray-500 hover:text-red-500 transition-colors"
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((query, index) => (
                <button
                  key={index}
                  onClick={() => handleRecentSearchClick(query)}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-gray-300 transition-colors flex items-center gap-2 shadow-sm"
                >
                  <FiSearch size={14} className="text-gray-400" />
                  {query}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchQuery && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">
                {isLoading ? 'Searching...' : `${searchResults.length} results found`}
              </h2>
              {searchResults.length > 0 && (
                <span className="text-sm text-gray-600">
                  Showing {searchResults.length} items
                </span>
              )}
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl p-3 animate-pulse">
                    <div className="w-full aspect-square bg-gray-200 rounded-lg mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {searchResults.map((product) => (
                  <SearchResultCard
                    key={product.id}
                    product={product}
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                    onAddToCart={() => handleAddToCart(product)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-4">We couldn't find any items matching "{searchQuery}"</p>
                <button
                  onClick={clearSearch}
                  className="px-6 py-2 text-white rounded-lg font-medium transition-all"
                  style={{ backgroundColor: primaryColor }}
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// Search Result Card Component
function SearchResultCard({ product, primaryColor, secondaryColor, onAddToCart }: any) {
  const [imageError, setImageError] = useState(false)
  
  const formatPrice = (price: number) => `Rs ${price.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`

  const getImageUrl = () => {
    if (imageError || !product.imageUrl) return null
    return product.imageUrl
  }

  const imageUrl = getImageUrl()

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all group">
      <div className="relative w-full aspect-square overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
                  // Placeholder when no image or error loading
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <FiImage size={40} className="text-gray-400 mb-2" />
                    <span className="text-xs text-gray-500 font-medium px-2 text-center">
                      {product.name.substring(0, 20)}
                    </span>
                  </div>
                )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-1">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="font-bold text-base" style={{ color: primaryColor }}>
            {formatPrice(product.price)}
          </span>
          <button
            onClick={onAddToCart}
            className="px-3 py-1.5 text-white rounded-lg text-xs font-medium transition-all"
            style={{ backgroundColor: primaryColor }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = secondaryColor}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = primaryColor}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}