import type { DeliveryOption } from '../types/checkout'

export const deliveryOptions: DeliveryOption[] = [
  {
    id: 'standard',
    label: 'Standard Shipping',
    price: 0,
    estimate: '5–7 business days',
  },
  {
    id: 'express',
    label: 'Express Shipping',
    price: 15,
    estimate: '2–3 business days',
  },
  {
    id: 'overnight',
    label: 'Overnight Shipping',
    price: 35,
    estimate: 'Next business day',
  },
]