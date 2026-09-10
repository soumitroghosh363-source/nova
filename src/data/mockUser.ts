import type { UserProfile, Address } from '../types/user'

export const mockUser: UserProfile = {
  name: 'Alex Rivera',
  email: 'alex.rivera@example.com',
  memberSince: '2025-03-14',
}

export const mockAddresses: Address[] = [
  {
    id: 'a1',
    label: 'Home',
    fullName: 'Alex Rivera',
    street: '482 Maple Grove Ave',
    city: 'Austin',
    postalCode: '78701',
    country: 'United States',
    isDefault: true,
  },
]