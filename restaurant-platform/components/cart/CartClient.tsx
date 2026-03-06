// components/cart/CartClient.tsx
'use client'

import { useCart } from '@/context/CartContext'
import { Restaurant } from '../types'
import { FiArrowLeft, FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiClock } from 'react-icons/fi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface CartClientProps {
  restaurant: Restaurant
  subdomain: string
}

export default function CartClient({ restaurant, subdomain }: CartClientProps) {
  const router = useRouter()
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  
  const primaryColor = restaurant?.primaryColor || '#FF6B6B'
  const secondaryColor = restaurant?.secondaryColor || '#4ECDC4'

  const formatPrice = (price: number) => {
    return `Rs ${price.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
  }

  const subtotal = getCartTotal()
  const deliveryFee = subtotal > 3000 ? 0 : 399
  const total = subtotal + deliveryFee

  const handleCheckout = () => {
    setIsCheckingOut(true)
    setTimeout(() => {
      router.push(`/checkout?subdomain=${subdomain}`)
      setIsCheckingOut(false)
    }, 500)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-4">
        <div className="text-center max-w-md w-full">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              <FiShoppingBag size={40} className="text-gray-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any items yet</p>
          <Link
            href={`/${subdomain}`}
            className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 text-white rounded-xl font-medium transition-all hover:shadow-lg"
            style={{ backgroundColor: primaryColor }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = secondaryColor}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = primaryColor}
          >
            <FiArrowLeft size={18} />
            Browse Menu
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Back Link */}
        <Link
          href={`/`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors text-sm"
        >
          <FiArrowLeft size={16} />
          Continue Shopping
        </Link>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">
            <span style={{ color: primaryColor }}>Shopping Cart</span>
          </h1>
          <span className="text-sm text-gray-500">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {/* Desktop: Grid layout, Mobile: Stack */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">
          {/* Cart Items - Left side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Cart Items List */}
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.id} className="p-4 md:p-6">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || '/images/placeholder-food.jpg'}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-base md:text-lg">
                              {item.name}
                            </h3>
                            {item.description && (
                              <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                                {item.description}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1.5 hover:bg-red-50 rounded-lg transition-colors group"
                            title="Remove item"
                          >
                            <FiTrash2 className="text-gray-400 group-hover:text-red-500" size={18} />
                          </button>
                        </div>

                        {/* Price and Quantity */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
                          <span className="font-bold text-lg md:text-xl" style={{ color: primaryColor }}>
                            {formatPrice(item.price * item.quantity)}
                          </span>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500 mr-2">Qty:</span>
                            <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-lg transition-colors"
                                disabled={item.quantity <= 1}
                              >
                                <FiMinus size={14} />
                              </button>
                              <span className="w-10 text-center font-medium text-gray-700">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-lg transition-colors"
                              >
                                <FiPlus size={14} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Price per item (mobile only) */}
                        <div className="text-xs text-gray-400 mt-2 sm:hidden">
                          {formatPrice(item.price)} each
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Cart Button */}
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <button
                  onClick={clearCart}
                  className="text-sm text-gray-500 hover:text-red-500 transition-colors flex items-center gap-2"
                >
                  <FiTrash2 size={14} />
                  Clear Cart
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary - Right side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4" style={{ color: primaryColor }}>
                Order Summary
              </h2>
              
              {/* Items Preview */}
              <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.name} <span className="text-gray-400">x{item.quantity}</span>
                    </span>
                    <span className="font-medium text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className={`font-medium ${deliveryFee === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                    {deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}
                  </span>
                </div>
                
                {deliveryFee > 0 && (
                  <div className="text-xs p-2 bg-orange-50 text-orange-600 rounded-lg">
                    Add Rs {3000 - subtotal} more for free delivery
                  </div>
                )}

                {/* Total */}
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-bold text-xl" style={{ color: primaryColor }}>
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full mt-6 py-3 px-4 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
                style={{ backgroundColor: primaryColor }}
                onMouseEnter={(e) => !isCheckingOut && (e.currentTarget.style.backgroundColor = secondaryColor)}
                onMouseLeave={(e) => !isCheckingOut && (e.currentTarget.style.backgroundColor = primaryColor)}
              >
                {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
              </button>

              {/* Estimated Delivery */}
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                <FiClock size={16} className="flex-shrink-0" />
                <span>Estimated delivery: 30-45 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}