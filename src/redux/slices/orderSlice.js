import { createSlice } from "@reduxjs/toolkit";
import { ordersApi } from "../../service/base";

const initialState = {
    items: [],
    allOrders: []
}
const user = localStorage.getItem('user') || sessionStorage.getItem('user')

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
            },
            addOrder(state, action) { 
                state.items.push(action.payload.order)
                ordersApi.changeOrder(JSON.parse(user).id , action.payload.user , state.items)
            },
            removeOrder(state, action) {
                state.items = state.items.filter(item => item.id !== action.payload)
                ordersApi.changeOrder(JSON.parse(user).id , action.payload.user , state.items)
            }
        }
    }
)
export const { setOrders, addOrder, removeOrder, setAllOrders } = orderSlice.actions
export default orderSlice.reducer;