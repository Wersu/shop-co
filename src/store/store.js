import { configureStore } from '@reduxjs/toolkit'
import productReducer from './productSlice'
import cartReducer from './cartSlice'
// import homeReducer from './HomeSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    // Home: homeReducer,
  },
})
