// components/menu/RestaurantCard.tsx
'use client'

import { useState } from 'react'
import { FiPlus, FiImage } from 'react-icons/fi'
import { useCart } from '@/context/CartContext'

interface Product {
  id: number
  name: string
  price: number
  imageUrl: string | null
  categoryId: number
}

interface RestaurantCardProps {
  product: Product
  primaryColor?: string
  secondaryColor?: string
}

export default function RestaurantCard({ 
  product,
  primaryColor = '#FF6B6B',
  secondaryColor = '#4ECDC4'
}: RestaurantCardProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const { addToCart } = useCart()

  const formatPrice = (price: number) => {
    return `Rs ${price.toLocaleString('en-IN', {
      maximumFractionDigits: 0
    })}`
  }

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsAdding(true)
    
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.imageUrl || '',
    })
    
    setTimeout(() => setIsAdding(false), 500)
  }

  // Determine if we should show placeholder
  const showPlaceholder = imageError || !product.imageUrl

  return (
    <div 
      className="bg-white rounded-xl md:rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
        {showPlaceholder ? (
          // Placeholder when no image or error loading
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <FiImage size={40} className="text-gray-400 mb-2" />
            <span className="text-xs text-gray-500 font-medium px-2 text-center">
              {product.name.substring(0, 20)}
            </span>
          </div>
        ) : (
          // Actual image
          <>
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-[#2c9ba3] rounded-full animate-spin"></div>
              </div>
            )}
            <img
              src={product.imageUrl || ''}
              alt={product.name}
              className={`w-full h-full object-cover transition-all duration-500 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              } ${isHovered ? 'scale-110' : 'scale-100'}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
            />
          </>
        )}

        {/* Quick Add Button */}
        <div className={`absolute bottom-2 right-2 transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${
              isAdding ? 'bg-green-500 scale-110' : ''
            }`}
            style={{ 
              backgroundColor: isAdding ? '#10b981' : primaryColor,
            }}
            onMouseEnter={(e) => {
              if (!isAdding) {
                e.currentTarget.style.backgroundColor = secondaryColor
              }
            }}
            onMouseLeave={(e) => {
              if (!isAdding) {
                e.currentTarget.style.backgroundColor = primaryColor
              }
            }}
          >
            {isAdding ? (
              <span className="text-white text-sm">✓</span>
            ) : (
              <FiPlus className="text-white" size={16} />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-2 md:p-3">
        <h3 className="font-medium text-gray-900 text-sm md:text-base line-clamp-1 mb-1">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between">
          <span className="font-bold text-base md:text-lg" style={{ color: primaryColor }}>
            {formatPrice(product.price)}
          </span>
          
          {/* Mobile-friendly add button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="md:hidden w-8 h-8 rounded-full flex items-center justify-center shadow-sm"
            style={{ backgroundColor: primaryColor }}
          >
            {isAdding ? (
              <span className="text-white text-xs">✓</span>
            ) : (
              <FiPlus className="text-white" size={14} />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}