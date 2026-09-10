export interface Address {
  id: string
  label: string // e.g. "Home", "Work"
  fullName: string
  street: string
  city: string
  postalCode: string
  country: string
  isDefault: boolean
}

export interface UserProfile {
  name: string
  email: string
  memberSince: string // ISO date string
}