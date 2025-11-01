import { configureStore } from '@reduxjs/toolkit'
import productReducer from './productSlice'
import homeReducer from './HomeSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    Home: homeReducer,
  },
})
