import { createSlice } from "@reduxjs/toolkit";
import { cartApi } from "../../service/base";

const initialState = {
  items: []
}
const user = localStorage.getItem('user') || sessionStorage.getItem('user')

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    setCartItems: (state, action) => {
      state.items = action.payload
    },
    addCartItem: (state, action) => {
      const cartItem = action.payload
      const item = state.items.find(element => element.colorId === cartItem.colorId)
      if (item) {
        if (item.stock > item.quantity) {
          item.quantity += 1
          cartApi.changeUserCart(JSON.parse(user).id, JSON.parse(user), state.items)
        }


      }

      else {
        if (cartItem.stock > 0) {
          state.items.push({ ...cartItem, quantity: 1 })
          cartApi.changeUserCart(JSON.parse(user).id, JSON.parse(user), state.items)
        }
      }

    },
    removeCartItem: (state, action) => {
      state.items = state.items.filter(item => item.colorId !== action.payload)
      cartApi.changeUserCart(JSON.parse(user).id, JSON.parse(user), state.items)
    },
    increaseQuantity: (state, action) => {
      const index = state.items.findIndex(item => item.colorId === action.payload)
      if (state.items[index].stock > state.items[index].quantity) {
        state.items[index].quantity += 1
        cartApi.changeUserCart(JSON.parse(user).id, JSON.parse(user), state.items)
      }

    },
    decreaseQuantity: (state, action) => {
      const index = state.items.findIndex(item => item.colorId === action.payload);
      
      if (index !== -1 && state.items[index].quantity > 0) {
        state.items[index].quantity -= 1;
        cartApi.changeUserCart(JSON.parse(user).id, JSON.parse(user), state.items);
        
        if (state.items[index].quantity === 0) {
          state.items = state.items.filter(item => item.colorId !== action.payload);
          cartApi.changeUserCart(JSON.parse(user).id, JSON.parse(user), state.items);
        }
      }
    }
    
  }
})

export const calculateTotal = () => {
  return initialState.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
};

export const { setCartItems, addCartItem, removeCartItem, increaseQuantity, decreaseQuantity } = cartSlice.actions
export default cartSlice.reducer