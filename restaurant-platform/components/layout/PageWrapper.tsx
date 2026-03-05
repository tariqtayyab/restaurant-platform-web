// components/layout/PageWrapper.tsx
'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import BottomNav from './BottomNav'
import { Restaurant } from '../types'
import { useCart } from '@/context/CartContext'

interface PageWrapperProps {
  children: React.ReactNode
  restaurant: Restaurant
  subdomain: string
}

export default function PageWrapper({ children, restaurant, subdomain }: PageWrapperProps) {
  const pathname = usePathname()
  const { setRestaurant } = useCart()
  
  // Pass restaurant to cart context
  useEffect(() => {
    setRestaurant(restaurant)
    console.log('PageWrapper mounted with subdomain:', subdomain) // Add this for debugging
  }, [restaurant, setRestaurant, subdomain])
  
  return (
    <>
      {children}
      <BottomNav restaurant={restaurant} subdomain={subdomain} />
    </>
  )
}