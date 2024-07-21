import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity += quantity;
      } else {
        state.items.push({ ...action.payload, quantity: quantity });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.items = state.items.filter(item => item.id !== action.payload);
        }
      }
    },
    changeQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id);
        }
      }

    }
  }
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, changeQuantity } = cartSlice.actions;

export const selectCartItems = state => state.cart.items;

export const selectAllProductCount = state => {
  let totalCount = 0
  state.cart.items.forEach(item => { totalCount += item.quantity });
  return totalCount
};


export const selectCartTotalItems = state =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotalPrice = state =>
  state.cart.items.reduce((total, item) => total + (item.quantity * parseFloat(item.price.replace(",", "."))), 0);

export default cartSlice.reducer;
