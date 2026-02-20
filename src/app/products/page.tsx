'use client'

import { useEffect, useState } from 'react'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface Product {
  id: number
  title: string
  price: number
  image: string
  description?: string // opcional da API
}

export default function ProductsPage() {
  const { addToCart } = useAppStore()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('https://fakestoreapi.com/products?limit=12')
        if (!res.ok) throw new Error('Falha ao carregar produtos')
        const data = await res.json()
        setProducts(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl">Carregando produtos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl text-red-600">Erro: {error}</p>
      </div>
    )
  }

  return (
    <main className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-10 text-center">Produtos Disponíveis</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden flex flex-col">
            <div className="aspect-square relative bg-white p-4">
              <img
                src={product.image}
                alt={product.title}
                className="object-contain w-full h-full"
              />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="line-clamp-2 text-lg">{product.title}</CardTitle>
              <CardDescription className="text-xl font-bold text-green-600 mt-2">
                R$ {product.price.toFixed(2)}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-600 line-clamp-3">
                {product.description || 'Sem descrição disponível'}
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => addToCart(product)}
                className="w-full"
              >
                Adicionar ao Carrinho
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}