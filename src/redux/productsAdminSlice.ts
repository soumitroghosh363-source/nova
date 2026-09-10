import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { products as initialProducts } from '../data/products'
import type { Product } from '../types/product'

interface ProductsAdminState {
  items: Product[]
}

const initialState: ProductsAdminState = {
  items: initialProducts,
}

const productsAdminSlice = createSlice({
  name: 'productsAdmin',
  initialState,
  reducers: {
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((p) => p.id !== action.payload)
    },
    upsertProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex((p) => p.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      } else {
        state.items.push(action.payload)
      }
    },
  },
})

export const { deleteProduct, upsertProduct } = productsAdminSlice.actions
export default productsAdminSlice.reducer