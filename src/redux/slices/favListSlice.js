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
                try {
                    favListApi.changeFavList(user.id, user, state.items, cart);
                    console.log("FavList updated in the API");
                } catch (err) {
                    console.error("Error updating favList in the API", err);
                }
            } else {
                console.log("This item is already in the favList");
            }
        },
        removeFromFavList: (state, action) => {
            const { colorId, cart } = action.payload;
            state.items = state.items.filter(item => item.colorId !== colorId);
            try {
                favListApi.changeFavList(user.id, user, state.items, cart);
                console.log("FavList updated in the API");
            } catch (err) {
                console.error("Error updating favList in the API", err);
            }
        }
    }
});

export const { addToFavList, setFavList, removeFromFavList } = favListSlice.actions;
export default favListSlice.reducer;
