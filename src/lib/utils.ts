import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//export async function getProducts() {
//  const res = await fetch('https://fakestoreapi.com/products');
// if (!res.ok) throw new Error('Falha ao carregar produtos');
// return res.json();
//}

//export async function getProduct(id: number) {
//  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
//  if (!res.ok) throw new Error('Produto não encontrado');
//  return res.json();
//}