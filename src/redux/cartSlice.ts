import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CartItem } from '../types/cart'
import type { Product } from '../types/product'

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

interface AddToCartPayload {
  product: Product
  quantity?: number
  variant?: string
}

function findItemIndex(items: CartItem[], productId: string, variant?: string) {
  return items.findIndex(
    (item) => item.product.id === productId && item.variant === variant
  )
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { product, quantity = 1, variant } = action.payload
      const existingIndex = findItemIndex(state.items, product.id, variant)

      if (existingIndex !== -1) {
        state.items[existingIndex].quantity += quantity
      } else {
        state.items.push({ product, quantity, variant })
      }
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ productId: string; variant?: string }>
    ) => {
      state.items = state.items.filter(
        (item) =>
          !(item.product.id === action.payload.productId && item.variant === action.payload.variant)
      )
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; variant?: string; quantity: number }>
    ) => {
      const index = findItemIndex(state.items, action.payload.productId, action.payload.variant)
      if (index !== -1) {
        if (action.payload.quantity <= 0) {
          state.items.splice(index, 1)
        } else {
          state.items[index].quantity = action.payload.quantity
        }
      }
    },
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer