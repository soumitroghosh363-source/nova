export interface ProductVariant {
  id: string
  name: string          // e.g. "Color", "Size"
  value: string         // e.g. "Terracotta", "Large"
  priceModifier?: number // optional price difference from base price
}

export interface ProductReview {
  id: string
  author: string
  rating: number         // 1–5
  comment: string
  date: string           // ISO date string
}

export interface Product {
  id: string
  slug: string
  name: string
  description: string
  category: string
  price: number
  discount?: number       // percentage, e.g. 15 = 15% off
  images: string[]
  rating: number           // average, derived from reviews
  reviewCount: number
  reviews?: ProductReview[]
  stock: number
  sku: string
  variants?: ProductVariant[]
  featured?: boolean
}

export interface Category {
  id: string
  slug: string
  name: string
  description?: string
}