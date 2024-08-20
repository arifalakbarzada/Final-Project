import { createSlice } from "@reduxjs/toolkit";
import { favListApi } from "../../service/base";

const initialState = {
    items: []
}
const user = localStorage.getItem('user') || sessionStorage.getItem('user')

const favListSlice = createSlice(
    {
        name: 'favList',
        initialState,
        reducers: {
            setFavList: (state, action) => {
                state.items = action.payload
            }
            ,
            addToFavList: (state, action) => {
                state.items.push(action.payload)
                favListApi.changeFavList(JSON.parse(user).id, JSON.parse(user), state.items)
            },
            removeFromFavList: (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload.id)
                favListApi.changeFavList(JSON.parse(user).id, JSON.parse(user), state.items)
            },
        }
    }
)

export const { addToFavList , setFavList , removeFromFavList } = favListSlice.actions

export default favListSlice.reducer