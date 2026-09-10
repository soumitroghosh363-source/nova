import { configureStore } from '@reduxjs/toolkit'
import wishlistReducer from './wishlistSlice'
import cartReducer from './cartSlice'
import ordersReducer, { STORAGE_KEY } from './ordersSlice'
import productsAdminReducer from './productsAdminSlice'
import authReducer, { STORAGE_KEY as AUTH_STORAGE_KEY } from './authSlice'

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    cart: cartReducer,
    orders: ordersReducer,
    productsAdmin: productsAdminReducer,
    auth: authReducer,
  },
})

// Persist orders to localStorage whenever they change.
store.subscribe(() => {
  const { orders, auth } = store.getState()
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders.items))
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth.user))
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch