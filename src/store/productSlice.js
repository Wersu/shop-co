import { createSlice } from '@reduxjs/toolkit'
import { q } from 'framer-motion/m'

const initialState = {
  selectedColor: '#4F4631',
  selectedSize: null,
  cart: [],
  product: {
    id: 1,
    title: 'One Life Graphic T-shirt',
    price: 300,
    sale: 40,
    rating: 4.5,
    description:
      'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: ['#4F4631', '#314F4A', '#31344F'],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
  },
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setColor: (state, action) => {
      state.selectedColor = action.payload
    },
    setSize: (state, action) => {
      state.selectedSize = action.payload
    },
    addToCart: (state, action) => {
      const { id, selectedColor, selectedSize, quantity } = action.payload

      const existingItem = state.cart.find(
        (item) =>
          item.id === id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      )

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.cart.push({ ...action.payload, quantity })
      }
    },
    removeFromCart: (state, action) => {
      const { id, selectedColor, selectedSize } = action.payload

      const existingItem = state.cart.find(
        (item) =>
          item.id === id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      )

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1
        } else {
          state.cart = state.cart.filter(
            (item) =>
              !(
                item.id === id &&
                item.selectedColor === selectedColor &&
                item.selectedSize === selectedSize
              )
          )
        }
      }
    },
    clearCart: (state) => {
      state.cart = []
    },
  },
})

export const { setColor, setSize, addToCart, removeFromCart } =
  productSlice.actions
export default productSlice.reducer
