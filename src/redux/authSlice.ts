import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthUser } from '../types/auth'

const STORAGE_KEY = 'nova-auth'

const loadUserFromStorage = (): AuthUser | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

interface AuthState {
  user: AuthUser | null
}

const initialState: AuthState = {
  user: loadUserFromStorage(),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
export { STORAGE_KEY }