import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  orders: null
}
export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    getOrders: (state, action) => {
      state.orders = action.payload
    }
  }
})

export const { getOrders } = ordersSlice.actions

export default ordersSlice.reducer
