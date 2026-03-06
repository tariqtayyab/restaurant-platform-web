// components/layout/BottomNav.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaHome, FaShoppingCart, FaSearch, FaUtensils, FaCreditCard } from 'react-icons/fa'
import { useCart } from '@/context/CartContext'
import { Restaurant } from '../types'

interface BottomNavProps {
  restaurant: Restaurant
  subdomain: string
}

export default function BottomNav({ restaurant, subdomain }: BottomNavProps) {
  const pathname = usePathname()
  const { getItemCount } = useCart()
  
  const primaryColor = restaurant?.primaryColor || '#FF6B6B'
  const secondaryColor = restaurant?.secondaryColor || '#4ECDC4'
  const cartCount = getItemCount()

  // FIXED: Use proper subdomain-based paths
 const navItems = [
  { href: `/${subdomain}`, icon: FaHome, label: 'Home', exact: true },
  { href: `/${subdomain}/search`, icon: FaSearch, label: 'Search' },
  { href: `/${subdomain}/cart`, icon: FaShoppingCart, label: 'Cart', hasBadge: true },
  { href: `/${subdomain}/checkout`, icon: FaCreditCard, label: 'Checkout' },
  { href: `/${subdomain}/menu`, icon: FaUtensils, label: 'Menu' }
]

  const isActive = (href: string, exact?: boolean) => {
    if (exact) {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg flex justify-around items-center py-2 md:hidden z-50 rounded-t-2xl safe-bottom">
      {navItems.map((item) => {
        const active = isActive(item.href, item.exact)
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center justify-center px-2 py-1 relative group flex-1"
            aria-label={item.label}
          >
            <div
              className={`flex flex-col items-center transition-all duration-300 ${
                active ? 'scale-110' : 'group-hover:scale-105'
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-all duration-300 ${
                  active 
                    ? 'text-white shadow-lg' 
                    : 'text-gray-600 group-hover:text-gray-900'
                }`}
                style={{ 
                  backgroundColor: active ? primaryColor : 'transparent',
                  boxShadow: active ? `0 4px 10px ${primaryColor}40` : 'none'
                }}
              >
                <item.icon size={20} />
              </div>

              <span
                className={`text-[10px] font-medium mt-1 transition-colors duration-300 ${
                  active 
                    ? 'text-gray-900' 
                    : 'text-gray-600 group-hover:text-gray-900'
                }`}
                style={{ color: active ? primaryColor : undefined }}
              >
                {item.label}
              </span>
            </div>

            {/* Cart Badge */}
            {item.hasBadge && cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 text-white text-[9px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-1 shadow-lg animate-pulse"
                style={{ backgroundColor: secondaryColor }}
              >
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}

            {/* Active Indicator Dot */}
            {active && (
              <span
                className="absolute -bottom-1 w-1 h-1 rounded-full"
                style={{ backgroundColor: primaryColor }}
              />
            )}
          </Link>
        )
      })}
    </nav>
  )
}         