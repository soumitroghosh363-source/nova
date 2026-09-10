import { products } from '../data/products'
import type { Product } from '../types/product'

// Simulates real network latency so loading states can actually be tested.
function simulateDelay<T>(data: T, ms = 400): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms))
}

export async function fetchProducts(): Promise<Product[]> {
  return simulateDelay(products)
}

export async function fetchProductBySlug(slug: string): Promise<Product | undefined> {
  const product = products.find((p) => p.slug === slug)
  return simulateDelay(product)
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  const filtered = products.filter((p) => p.category === category)
  return simulateDelay(filtered)
}