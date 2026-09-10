export type UserRole = 'customer' | 'admin'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
}