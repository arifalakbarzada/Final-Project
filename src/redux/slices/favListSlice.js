import { createSlice } from "@reduxjs/toolkit";
import { favListApi } from "../../service/base";

const initialState = {
    items: []
};

const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));

const favListSlice = createSlice({
    name: 'favList',
    initialState,
    reducers: {
        setFavList: (state, action) => {
            state.items = action.payload;
        },
        addToFavList: (state, action) => {
            const { favItem, cart } = action.payload;
            const item = state.items.find(item => item.colorId === favItem.colorId);
            if (!item) {
                state.items.push(favItem);
                favListApi.changeFavList(user.id, user, state.items, cart);
            }
        },
        removeFromFavList: (state, action) => {
            const { colorId, cart } = action.payload;
            state.items = state.items.filter(item => item.colorId !== colorId);
            favListApi.changeFavList(user.id, user, state.items, cart);
        }
    }
});

export const { addToFavList, setFavList, removeFromFavList } = favListSlice.actions;
export default favListSlice.reducer;
