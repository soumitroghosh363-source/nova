import type { AuthUser } from '../types/auth'

interface MockAccount extends AuthUser {
  password: string
}

// Demo-only credentials. A real system would never store or compare
// plaintext passwords client-side — this exists purely to simulate
// login/role-gating without a backend.
export const mockAccounts: MockAccount[] = [
  {
    id: 'u1',
    name: 'Alex Rivera',
    email: 'alex@nova.com',
    role: 'customer',
    password: 'customer123',
  },
  {
    id: 'u2',
    name: 'Nova Admin',
    email: 'admin@nova.com',
    role: 'admin',
    password: 'admin123',
  },
]