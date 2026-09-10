import type { Order } from '../types/order'

export interface TopProduct {
  productId: string
  name: string
  image: string
  unitsSold: number
  revenue: number
}

export const deriveTopProducts = (orders: Order[]): TopProduct[] => {
  const map = new Map<string, TopProduct>()

  for (const order of orders) {
    for (const item of order.items) {
      const price = item.product.discount
        ? item.product.price * (1 - item.product.discount / 100)
        : item.product.price
      const existing = map.get(item.product.id)

      if (existing) {
        existing.unitsSold += item.quantity
        existing.revenue += price * item.quantity
      } else {
        map.set(item.product.id, {
          productId: item.product.id,
          name: item.product.name,
          image: item.product.images[0],
          unitsSold: item.quantity,
          revenue: price * item.quantity,
        })
      }
    }
  }

  return Array.from(map.values()).sort((a, b) => b.unitsSold - a.unitsSold)
}

export const deriveAverageOrderValue = (orders: Order[]): number => {
  if (orders.length === 0) return 0
  return orders.reduce((sum, o) => sum + o.total, 0) / orders.length
}

export const deriveRepeatCustomerRate = (orders: Order[]): number => {
  if (orders.length === 0) return 0
  const emailCounts = new Map<string, number>()
  for (const order of orders) {
    const email = order.shippingInfo.email
    emailCounts.set(email, (emailCounts.get(email) ?? 0) + 1)
  }
  const repeatCustomers = Array.from(emailCounts.values()).filter((count) => count > 1).length
  return (repeatCustomers / emailCounts.size) * 100
}