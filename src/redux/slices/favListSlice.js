import { createSlice } from "@reduxjs/toolkit";
import { favListApi } from "../../service/base";

const initialState = {
    items: []
};

const user = localStorage.getItem('user') || sessionStorage.getItem('user');

const favListSlice = createSlice({
    name: 'favList',
    initialState,
    reducers: {
        setFavList: (state, action) => {
            state.items = action.payload;
        },
        addToFavList: async (state, action) => {
            const item = state.items.find(item => item.colorId === action.payload.colorId);
            if (!item) {
                state.items.push(action.payload);

                try {
                    await favListApi.changeFavList(JSON.parse(user).id, JSON.parse(user), state.items);
                    console.log("FavList updated in the API");
                } catch (err) {
                    console.error("Error updating favList in the API", err);
                }
            } else {
                console.log("This item is already in the favList");
            }
        },
        removeFromFavList: async (state, action) => {
            state.items = state.items.filter(item => item.colorId !== action.payload);

            try {
                await favListApi.changeFavList(JSON.parse(user).id, JSON.parse(user), state.items);
                console.log("FavList updated in the API");
            } catch (err) {
                console.error("Error updating favList in the API", err);
            }
        }
    }
});

export const { addToFavList, setFavList, removeFromFavList } = favListSlice.actions;
export default favListSlice.reducer;