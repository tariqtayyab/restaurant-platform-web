// context/CartContext.tsx
'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { CartItem, CartContextType } from '@/components/types/cart'
import { Restaurant } from '@/components/types'

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'restaurant-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isInitialized, setIsInitialized] = useState(false)
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)
        setItems(parsedCart)
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error)
    } finally {
      setIsInitialized(true)
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: items }))
    }
  }, [items, isInitialized])

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(i => i.id === item.id)
      
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        }
        return updatedItems
      } else {
        return [...prevItems, { ...item, quantity }]
      }
    })
  }

  const removeFromCart = (itemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(itemId)
      return
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getCartTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getItemCount,
        restaurant,
        setRestaurant
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}