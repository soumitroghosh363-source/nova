import type { Order } from '../types/order'

export interface DerivedCustomer {
  email: string
  fullName: string
  orderCount: number
  totalSpent: number
  lastOrderDate: string
}

export function deriveCustomers(orders: Order[]): DerivedCustomer[] {
  const map = new Map<string, DerivedCustomer>()

  for (const order of orders) {
    const email = order.shippingInfo.email
    const existing = map.get(email)

    if (existing) {
      existing.orderCount += 1
      existing.totalSpent += order.total
      if (order.placedAt > existing.lastOrderDate) {
        existing.lastOrderDate = order.placedAt
      }
    } else {
      map.set(email, {
        email,
        fullName: order.shippingInfo.fullName,
        orderCount: 1,
        totalSpent: order.total,
        lastOrderDate: order.placedAt,
      })
    }
  }

  return Array.from(map.values()).sort((a, b) => b.totalSpent - a.totalSpent)
}