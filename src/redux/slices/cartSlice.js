import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items : []
}

const cartSlice = createSlice({
name : 'cart' ,
initialState,
reducers : {
getAllCartItems : (state , action) => {
  state.items = action.payload
}

}
})

export const {getAllCartItems} = cartSlice.actions
export default cartSlice.reducer