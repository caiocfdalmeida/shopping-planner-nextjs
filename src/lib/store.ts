import { create } from 'zustand'

// Definição do que é um Produto
interface Product {
  id: number
  title: string
  price: number
  image: string
}

// O que a store vai guardar
interface AppState {
  cart: Product[]
  addToCart: (product: Product) => void
  clearCart: () => void
}

export const useAppStore = create<AppState>((set) => ({
  cart: [], // Começa vazio
  addToCart: (product) => 
    set((state) => ({ cart: [...state.cart, product] })),
  clearCart: () => set({ cart: [] }),
}))