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
                const item = state.items.find(item => item.colorId === action.payload.colorId)
                if (!item) {
                    state.items.push(action.payload)
                    favListApi.changeFavList(JSON.parse(user).id, JSON.parse(user), state.items)
                }
                else {
                    console.log(`This Element is actually in favlist`)
                }
            },
            removeFromFavList: (state, action) => {
                state.items = state.items.filter(item => item.colorId !== action.payload)
                favListApi.changeFavList(JSON.parse(user).id, JSON.parse(user), state.items)
            },
        }
    }
)

export const { addToFavList, setFavList, removeFromFavList } = favListSlice.actions

export default favListSlice.reducer