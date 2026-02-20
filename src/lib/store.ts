// src/lib/store.ts
import { create } from 'zustand'

export interface Product {
  id: number
  title: string
  price: number
  image: string
  // description?: string  ← adicione se quiser usar depois
}

export interface CartItem extends Product {
  quantity: number
}

interface AppState {
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
}

export const useAppStore = create<AppState>((set) => ({
  cart: [],

  addToCart: (product) =>
    set((state) => {
      const existingIndex = state.cart.findIndex((item) => item.id === product.id)
      if (existingIndex !== -1) {
        // aumenta quantidade se já existe
        const newCart = [...state.cart]
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: newCart[existingIndex].quantity + 1,
        }
        return { cart: newCart }
      }
      // adiciona novo com quantity 1
      return { cart: [...state.cart, { ...product, quantity: 1 }] }
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),

  updateQuantity: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      ),
    })),

  clearCart: () => set({ cart: [] }),
}))