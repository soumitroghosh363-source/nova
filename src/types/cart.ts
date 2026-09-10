import type { Product } from './product'

export interface CartItem {
  product: Product
  quantity: number
  variant?: string // e.g. "Color: Terracotta" — selected variant label, if any
}