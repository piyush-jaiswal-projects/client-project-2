import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  user: null,
  loggedIn: false
}
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload
      state.loggedIn = true
    },
    logout: state => {
      state.user = initialState
    }
  }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
