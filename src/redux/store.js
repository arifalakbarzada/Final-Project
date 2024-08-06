import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import usersReducer from './slices/userSlice';
import searchReducer from './slices/searchSlice';
export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    users: usersReducer,
    search : searchReducer
  },
})