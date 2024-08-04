import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  userLogined: false,
  loginedId: null
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.items = action.payload;
    },
    loginUser: (state, action) => {
      state.userLogined = true;
      state.loginedId = action.payload;
    },
    logoutUser: (state) => {
      state.userLogined = false;
      state.loginedId = null;
    },
  }
});

export const { setUsers, loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
