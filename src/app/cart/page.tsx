'use client'

import Link from 'next/link'                  // ← import obrigatório
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Trash2, Plus, Minus } from 'lucide-react'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useAppStore()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (cart.length === 0) {
    return (
      <main className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-4xl font-bold mb-6">Seu Carrinho</h1>
        <p className="text-xl text-gray-600 mb-8">Seu carrinho está vazio. Que tal adicionar alguns produtos?</p>
        <Button asChild size="lg">
          <Link href="/products">Ver Produtos</Link>
        </Button>
      </main>
    )
  }

  return (
    <main className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-10 text-center">Seu Carrinho</h1>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Lista de itens */}
        <div className="md:col-span-2 space-y-6">
          {cart.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-6 flex items-center gap-6">
                <div className="w-24 h-24 flex-shrink-0 bg-white rounded-md overflow-hidden border">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-grow">
                  <h3 className="font-semibold text-lg line-clamp-2">{item.title}</h3>
                  <p className="text-green-600 font-bold mt-1">
                    R$ {item.price.toFixed(2)}
                  </p>

                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </Button>

                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value)
                          if (!isNaN(val) && val > 0) {
                            updateQuantity(item.id, val)
                          }
                        }}
                        className="w-16 text-center border-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus size={16} />
                      </Button>
                    </div>

                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>

                <div className="text-right font-bold text-lg min-w-[100px]">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Resumo */}
        <div className="md:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-lg">
                <span>Itens ({cart.length})</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-4">
                <span>Total</span>
                <span className="text-green-600">R$ {total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg">
                Finalizar Compra
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}