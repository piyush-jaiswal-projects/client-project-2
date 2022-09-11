import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  products: null
}
export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProducts: (state, action) => {
      state.products = action.payload
    }
  }
})

export const { getProducts } = productsSlice.actions

export default productsSlice.reducer
