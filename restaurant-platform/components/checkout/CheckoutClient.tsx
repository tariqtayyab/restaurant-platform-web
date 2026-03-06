// components/checkout/CheckoutClient.tsx
'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { Restaurant } from '../types'
import { FiArrowLeft, FiMapPin, FiPhone, FiUser, FiClock, FiEdit3 } from 'react-icons/fi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface CheckoutClientProps {
  restaurant: Restaurant
  subdomain: string
}

interface FormData {
  fullName: string
  phone: string
  address: string
  deliveryInstructions: string
}

export default function CheckoutClient({ restaurant, subdomain }: CheckoutClientProps) {
  const router = useRouter()
  const { items, getCartTotal, clearCart } = useCart()
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    address: '',
    deliveryInstructions: ''
  })

  const primaryColor = restaurant?.primaryColor || '#FF6B6B'
  const secondaryColor = restaurant?.secondaryColor || '#4ECDC4'

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push(`/${subdomain}`)
    }
  }, [items, router, subdomain])

  const formatPrice = (price: number) => {
    return `Rs ${price.toLocaleString('en-IN', {
      maximumFractionDigits: 0
    })}`
  }

  const subtotal = getCartTotal()
  const deliveryFee = subtotal > 3000 ? 0 : 399
  const total = subtotal + deliveryFee

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true)
    
    // Simulate order placement
    setTimeout(() => {
      alert('Order placed successfully! 🎉')
      clearCart()
      router.push(`/${subdomain}`)
      setIsPlacingOrder(false)
    }, 2000)
  }

  const isFormValid = () => {
    return formData.fullName && formData.phone && formData.address
  }

  if (items.length === 0) {
    return null // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href={`/`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            style={{ color: '#4B5563' }}
          >
            <FiArrowLeft /> Back to Menu
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">
            <span style={{ color: primaryColor }}>Complete Your Order</span>
          </h1>
          <p className="text-gray-600 mt-2">Please fill in your delivery details</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-700 mb-2">
                <FiUser style={{ color: primaryColor }} />
                Delivery Information
              </h2>
              
              <div className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none transition-all text-gray-800 placeholder-gray-600"
                      style={{ 
                        borderColor: formData.fullName ? primaryColor : '#D1D5DB',
                        boxShadow: formData.fullName ? `0 0 0 1px ${primaryColor}20` : 'none'
                      }}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none transition-all text-gray-800 placeholder-gray-600"
                      style={{ 
                        borderColor: formData.phone ? primaryColor : '#D1D5DB',
                        boxShadow: formData.phone ? `0 0 0 1px ${primaryColor}20` : 'none'
                      }}
                      placeholder="+92 300 1234567"
                      required
                    />
                  </div>
                </div>

                {/* Delivery Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiMapPin className="absolute left-3 top-3 text-gray-500" size={18} />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none transition-all text-gray-800 placeholder-gray-600"
                      style={{ 
                        borderColor: formData.address ? primaryColor : '#D1D5DB',
                        boxShadow: formData.address ? `0 0 0 1px ${primaryColor}20` : 'none'
                      }}
                      rows={3}
                      placeholder="House #123, Main Street, Gulberg, Lahore"
                      required
                    />
                  </div>
                </div>

                {/* Delivery Instructions (Optional) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Instructions <span className="text-gray-500">(Optional)</span>
                  </label>
                  <div className="relative">
                    <FiEdit3 className="absolute left-3 top-3 text-gray-500" size={18} />
                    <textarea
                      name="deliveryInstructions"
                      value={formData.deliveryInstructions}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none transition-all text-gray-800 placeholder-gray-600"
                      style={{ 
                        borderColor: '#D1D5DB'
                      }}
                      rows={2}
                      placeholder="Gate code: 1234, Near the park, etc."
                    />
                  </div>
                </div>

                {/* Payment Method - COD Only */}
                <div className="mt-8 p-5 bg-gray-100 rounded-xl border-2 border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center"
                         style={{ backgroundColor: primaryColor }}>
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Cash on Delivery</span>
                      <p className="text-sm text-gray-700">Pay when you receive your order</p>
                    </div>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={!isFormValid() || isPlacingOrder}
                  className="w-full py-4 text-white rounded-xl font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                  style={{ 
                    backgroundColor: primaryColor,
                    boxShadow: `0 10px 20px -5px ${primaryColor}60`
                  }}
                  onMouseEnter={(e) => {
                    if (!isPlacingOrder && isFormValid()) {
                      e.currentTarget.style.backgroundColor = secondaryColor
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isPlacingOrder && isFormValid()) {
                      e.currentTarget.style.backgroundColor = primaryColor
                      e.currentTarget.style.transform = 'translateY(0)'
                    }
                  }}
                >
                  {isPlacingOrder ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Placing Order...
                    </span>
                  ) : 'Place Order'}
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 border border-gray-100">
              <h2 className="text-xl font-semibold mb-4" style={{ color: primaryColor }}>Your Order</h2>
              
              {/* Items List */}
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 p-2 bg-gray-100 rounded-xl">
                    <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 border-gray-300">
                      <img
                        src={item.image || '/images/placeholder-food.jpg'}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-800">{item.name}</div>
                      <div className="text-xs text-gray-600">Qty: {item.quantity}</div>
                    </div>
                    <div className="font-medium text-sm" style={{ color: primaryColor }}>
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-800">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-semibold" style={{ color: deliveryFee === 0 ? '#10b981' : '#374151' }}>
                    {deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}
                  </span>
                </div>
                
                {/* Free delivery message */}
                {deliveryFee > 0 && (
                  <div className="text-xs p-2 rounded-lg font-medium" style={{ backgroundColor: `${secondaryColor}20`, color: secondaryColor }}>
                    Add Rs {3000 - subtotal} more for free delivery
                  </div>
                )}

                {/* Total */}
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-base text-gray-800">Total</span>
                    <span className="font-bold text-xl" style={{ color: primaryColor }}>
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Estimated Delivery */}
              <div className="mt-4 p-4 rounded-xl flex items-center gap-3"
                   style={{ backgroundColor: `${secondaryColor}15` }}>
                <FiClock className="text-gray-600" size={20} />
                <div>
                  <div className="font-medium text-sm text-gray-800">Estimated Delivery</div>
                  <div className="text-sm font-medium" style={{ color: secondaryColor }}>30 - 45 minutes</div>
                </div>
              </div>

              {/* Restaurant Info */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-600">{restaurant.heroTitle}</p>
                <p className="text-xs text-gray-500">{restaurant.contactPhone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}