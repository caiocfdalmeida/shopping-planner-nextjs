'use client'

import { Header } from '@/components/Header/Header' 
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'

export default function Home() {
  const { cart, addToCart } = useAppStore()

  const mockProduct = {
    id: 1,
    title: 'Produto de Teste',
    price: 99.90,
    image: 'https://via.placeholder.com/150',
  }

  return (
    // Adicione uma div pai ou fragmento para segurar os dois componentes
    <div className="min-h-screen flex flex-col">
      {/* 1. VOCÊ PRECISA ADICIONAR ESTA LINHA AQUI! */}
      <Header /> 

      <main className="flex flex-1 flex-col items-center justify-center p-24">
        <h1 className="text-5xl font-bold">Shopping Planner 🛒</h1>
        
        <div className="mt-8 p-6 border rounded-xl bg-slate-50 dark:bg-slate-900 text-center">
          <p className="text-xl font-semibold">
            Itens no carrinho: <span className="text-blue-600">{cart.length}</span>
          </p>
          
          <Button 
            onClick={() => addToCart(mockProduct)} 
            className="mt-4"
          >
            Adicionar Produto ao Carrinho
          </Button>
        </div>

        <p className="mt-6 text-gray-500 italic">
          O estado agora é gerenciado pelo Zustand!
        </p>
      </main>
    </div>
  )
}