import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Order } from '../types/order'

const STORAGE_KEY = 'nova-orders'

function loadOrdersFromStorage(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Order[]) : []
  } catch {
    return []
  }
}

interface OrdersState {
  items: Order[]
}

const initialState: OrdersState = {
  items: loadOrdersFromStorage(),
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.items.unshift(action.payload) // newest first
    },
  },
})

export const { addOrder } = ordersSlice.actions
export default ordersSlice.reducer
export { STORAGE_KEY }