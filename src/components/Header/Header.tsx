'use client'

import Link from 'next/link'
import { Search, ShoppingCart, User, Menu, Store } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/lib/store'

export function Header() {
  const cart = useAppStore((state) => state.cart)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-slate-950">
      {/* 1. Barra de Aviso Superior (Estilo Centauro) */}
      <div className="bg-red-600 py-1.5 text-center text-[10px] font-black text-white uppercase tracking-widest px-4">
        Planeje suas compras com 15% de Giftback no Shopping Planner!
      </div>

      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
        {/* 2. Logo Estilizada */}
        <Link href="/" className="text-xl md:text-2xl font-black italic tracking-tighter text-red-600 shrink-0">
          SHOPPING<span className="text-slate-900 dark:text-white">PLANNER</span>
        </Link>

        {/* 3. Busca Centralizada (Funcional para o Desktop) */}
        <div className="relative hidden lg:flex flex-1 max-w-md mx-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="O que você quer comprar hoje?" 
            className="pl-10 focus-visible:ring-red-500 border-slate-300"
          />
        </div>

        {/* 4. Ações e Navegação */}
        <nav className="flex items-center gap-2 md:gap-6">
          
          {/* Link para a Página de Produtos */}
          <Link 
            href="/products" 
            className="flex items-center gap-1.5 text-sm font-bold uppercase italic hover:text-red-600 transition-colors"
          >
            <Store className="h-5 w-5" />
            <span className="hidden sm:inline">Produtos</span>
          </Link>

          {/* Login (Estilo Loja) */}
          <div className="hidden sm:flex items-center gap-2 cursor-pointer hover:text-red-600 transition-colors border-l pl-6 ml-2">
            <User className="h-6 w-6" />
            <div className="text-[11px] flex flex-col leading-tight">
              <span className="font-bold uppercase italic">Entrar</span>
              <span className="text-muted-foreground">ou cadastrar</span>
            </div>
          </div>

          {/* Botão do Carrinho com Badge do Zustand */}
          <Button variant="ghost" asChild className="relative p-2 hover:bg-transparent">
            <Link href="/cart">
              <ShoppingCart className="h-6 w-6" />
              {cart.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-black text-white ring-2 ring-white">
                  {cart.length}
                </span>
              )}
            </Link>
          </Button>

          {/* Menu Mobile */}
          <Menu className="h-6 w-6 lg:hidden cursor-pointer" />
        </nav>
      </div>
    </header>
  )
}