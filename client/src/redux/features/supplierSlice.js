import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  suppliers: null
}
export const suppliersSlice = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {
    getSuppliers: (state, action) => {
      state.suppliers = action.payload
    }
  }
})

export const { getSuppliers } = suppliersSlice.actions

export default suppliersSlice.reducer
