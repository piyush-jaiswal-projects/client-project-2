import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  users: null
}
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsers: (state, action) => {
      state.users = action.payload
    }
  }
})

export const { getUsers } = usersSlice.actions

export default usersSlice.reducer
