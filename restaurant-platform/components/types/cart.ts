// components/types/cart.ts
import { Restaurant } from './index'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  description?: string
}

export interface CartContextType {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getItemCount: () => number
  restaurant: Restaurant | null
  setRestaurant: (restaurant: Restaurant) => void
}