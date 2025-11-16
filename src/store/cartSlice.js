import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    deliveryPrice: 15,
    discount: 20,
    subtotal: 0,
    total: 0,
    count: 0,
  },
  reducers: {
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

      state.subtotal = state.cart.reduce(
        (sum, item) => sum + item.actualPrice * item.quantity,
        0
      )
      state.total =
        Math.round((state.subtotal * (100 - state.discount)) / 100) +
        state.deliveryPrice

      state.count = state.cart.length
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

      state.subtotal = state.cart.reduce(
        (sum, item) => sum + item.actualPrice * item.quantity,
        0
      )
      state.total =
        Math.round((state.subtotal * (100 - state.discount)) / 100) +
        state.deliveryPrice

      state.count = state.cart.length
    },
    removeAllFromCart: (state, action) => {
      const { id, selectedColor, selectedSize } = action.payload

      const existingItem = state.cart.find(
        (item) =>
          item.id === id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      )

      if (existingItem) {
        state.cart = state.cart.filter(
          (item) =>
            !(
              item.id === id &&
              item.selectedColor === selectedColor &&
              item.selectedSize === selectedSize
            )
        )
      }

      state.subtotal = state.cart.reduce(
        (sum, item) => sum + item.actualPrice * item.quantity,
        0
      )
      state.total =
        Math.round((state.subtotal * (100 - state.discount)) / 100) +
        state.deliveryPrice

      state.count = state.cart.length
    },
    clearCart: (state) => {
      state.cart = []
      state.subtotal = 0
      state.total = 0
      state.count = 0
    },
    updateCartTotals: (state) => {
      state.subtotal = state.cart.reduce(
        (sum, item) => sum + item.actualPrice * item.quantity,
        0
      )
      state.total =
        Math.round((state.subtotal * (100 - state.discount)) / 100) +
        state.deliveryPrice

      state.count = state.cart.length
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  removeAllFromCart,
  clearCart,
  updateCartTotals,
} = cartSlice.actions

export default cartSlice.reducer
