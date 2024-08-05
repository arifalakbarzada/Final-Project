import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import usersReducer from './slices/userSlice';
export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    users: usersReducer,
  },
})