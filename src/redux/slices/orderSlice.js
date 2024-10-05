import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    allOrders: []
}

const orderSlice = createSlice(
    {
        name: 'orders',
        initialState,
        reducers: {
            setOrders(state, action) {
                state.items = action.payload
            },
            setAllOrders(state, action) {
                state.allOrders = action.payload
            }
            ,
            addOrder(state, action) {
                state.items.push(action.payload)
            },
            removeOrder(state, action) {
                state.items = state.items.filter(item => item.id !== action.payload)
            }


        }
    }
)
export const { setOrders, addOrder, removeOrder, setAllOrders } = orderSlice.actions
export default orderSlice.reducer;