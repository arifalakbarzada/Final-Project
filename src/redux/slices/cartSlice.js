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
      const { cartItem, reduxUser } = action.payload
      const item = state.items.find(element => element.colorId === cartItem.colorId)
      if (item) {
        if (item.stock > item.quantity) {
          item.quantity += 1
          cartApi.changeUserCart(JSON.parse(user).id, reduxUser, state.items)
        }
      }

      else {
        if (cartItem.stock > 0) {
          state.items.push({ ...cartItem, quantity: 1 })
          cartApi.changeUserCart(JSON.parse(user).id, reduxUser, state.items)
        }
      }

    },
    removeCartItem: (state, action) => {
      const { colorId, reduxUser } = action.payload
      state.items = state.items.filter(item => item.colorId !== colorId)
      cartApi.changeUserCart(JSON.parse(user).id, reduxUser, state.items)
    },
    increaseQuantity: (state, action) => {
      const { colorId, reduxUser } = action.payload
      const index = state.items.findIndex(item => item.colorId === colorId)
      if (state.items[index].stock > state.items[index].quantity) {
        state.items[index].quantity += 1
        cartApi.changeUserCart(JSON.parse(user).id, reduxUser, state.items)
      }

    },
    decreaseQuantity: (state, action) => {
      const { colorId, reduxUser } = action.payload
      const index = state.items.findIndex(item => item.colorId === colorId);
      if (index !== -1) {
        if (state.items[index].quantity > 1) {
          state.items[index].quantity -= 1;
          cartApi.changeUserCart(JSON.parse(user).id, reduxUser, state.items);
        } else {
          state.items = state.items.filter(item => item.colorId !== colorId);
          cartApi.changeUserCart(JSON.parse(user).id, reduxUser, state.items);
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