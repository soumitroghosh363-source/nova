import type { CartItem } from './cart'
import type { ShippingInfo } from './checkout'

export interface Order {
  orderNumber: string
  items: CartItem[]
  shippingInfo: ShippingInfo
  deliveryLabel: string
  subtotal: number
  deliveryPrice: number
  total: number
  placedAt: string // ISO date string
}