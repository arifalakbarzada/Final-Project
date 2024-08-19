import { createSlice } from "@reduxjs/toolkit";
import { cartApi } from "../../service/base";

const initialState = {
  items: []
}
const user = localStorage.getItem('user')

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    setCartItems: (state, action) => {
      state.items = action.payload
    },
    addCartItem: (state, action) => {
      const cartItem  = action.payload
      const item = state.items.find(element => element.colorId === cartItem.colorId)
      if (item) {
        item.quantity += 1
        cartApi.changeUserCart(JSON.parse(user).id , JSON.parse(user) , state.items)

      }

      else {
        state.items.push({ ...cartItem, quantity: 1 })
        cartApi.changeUserCart(JSON.parse(user).id , JSON.parse(user) , state.items)
        console.log(cartItem)
      }

    },
    removeCartItem: (state, action) => {
      state.items = state.items.filter(item => item.colorId !== action.payload)
      cartApi.changeUserCart(JSON.parse(user).id , JSON.parse(user) , state.items)
    },
    updateCartItem: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.colorId)
      state.items[index] = action.payload
      cartApi.changeUserCart(JSON.parse(user).id , JSON.parse(user) , state.items)
    }
  }
})

export const { setCartItems, addCartItem, removeCartItem, updateCartItem } = cartSlice.actions
export default cartSlice.reducer