// context/RestaurantContext.tsx
'use client'

import { createContext, useContext, ReactNode } from 'react'

interface Restaurant {
  id: number
  merchantId: number
  subdomain: string
  logoUrl: string | null
  primaryColor: string
  secondaryColor: string
  heroTitle: string
  heroDescription: string
  workingHours: any[]
  contactPhone: string
  contactEmail: string
  contactAddress: string
  isActive: boolean
}

const RestaurantContext = createContext<{ restaurant: Restaurant | null }>({ restaurant: null })

export function RestaurantProvider({ children, restaurant }: { children: ReactNode, restaurant: Restaurant | null }) {
  return (
    <RestaurantContext.Provider value={{ restaurant }}>
      {children}
    </RestaurantContext.Provider>
  )
}

export function useRestaurant() {
  const context = useContext(RestaurantContext)
  if (context === undefined) {
    throw new Error('useRestaurant must be used within a RestaurantProvider')
  }
  return context
}