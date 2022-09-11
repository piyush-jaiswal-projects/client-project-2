import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  selectedProducts: [],
  totalQuantity: 0,
  totalPrice: 0
}
export const selectedProductSlice = createSlice({
  name: 'selectedProducts',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const tempProduct = { ...action.payload, quantity: 1 }
      state.selectedProducts.push(tempProduct)
    },
    removeProduct: (state, action) => {
      state.selectedProducts = state.selectedProducts.filter(product => product.id != action.payload)
    },
    updateQuantity: (state, action) => {
      state.selectedProducts.forEach(item => {
        if (item.id == action.payload.id) {
          item.quantity = action.payload.data
        }
      })
    },
    setTotalQuantity: (state, action) => {
      state.totalQuantity = action.payload.reduce((total, item) => parseInt(item.quantity) + total, 0)
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload.reduce((sum, i) => {
        return sum + i.price * i.quantity
      }, 0)
    },
    resetData: state => {
      state.selectedProducts = []
      state.totalQuantity = 0
      state.totalPrice = 0
    }
  }
})

export const { addProduct, removeProduct, updateQuantity, setTotalQuantity, setTotalPrice, resetData } =
  selectedProductSlice.actions

export default selectedProductSlice.reducer
