export interface ShippingInfo {
  fullName: string
  email: string
  address: string
  city: string
  postalCode: string
  country: string
}

export interface DeliveryOption {
  id: string
  label: string
  price: number
  estimate: string
}

export interface PaymentInfo {
  cardName: string
  cardNumber: string
  expiry: string
  cvc: string
}

export type CheckoutStep = 'shipping' | 'delivery' | 'payment' | 'review'