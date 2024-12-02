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
            const { favItem, reduxUser } = action.payload;
            const item = state.items.find(item => item.colorId === favItem.colorId);
            if (!item) {
                state.items.push(favItem);
                favListApi.changeFavList(user.id, reduxUser, state.items);
            }
        },
        removeFromFavList: (state, action) => {
            const { colorId, reduxUser } = action.payload;
            state.items = state.items.filter(item => item.colorId !== colorId);
            favListApi.changeFavList(user.id, reduxUser, state.items);
        }
    }
});

export const { addToFavList, setFavList, removeFromFavList } = favListSlice.actions;
export default favListSlice.reducer;
