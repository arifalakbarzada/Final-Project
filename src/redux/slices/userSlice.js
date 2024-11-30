import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  user: null,
  responsivity : false
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.items = action.payload;
    },
    loginUser: (state, action) => {
      const { user, rememberMe } = action.payload;
      state.user = user;
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(user));
        sessionStorage.removeItem('user');
      } else {
        sessionStorage.setItem('user', JSON.stringify(user));
        localStorage.removeItem('user');
      }
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
    },
    setUserFromLocalStorage: (state, action) => {
      state.user = action.payload;
    },
    setUserFromSessionStorage: (state, action) => {
      state.user = action.payload;
    },
    changeUserStatus: (state, action) => {
      const { userData, status } = action.payload
      const founded = state.items.findIndex((user) => user.id === userData.id)
      if (founded !== -1) {
        state.items[founded].status = status
      }
    },
    changeResponsivity: (state, action) => {
      state.responsivity = action.payload
      }
  },
});

export const { setUsers, loginUser, logoutUser, setUserFromLocalStorage, setUserFromSessionStorage, changeUserStatus , changeResponsivity } = userSlice.actions;

export default userSlice.reducer;
