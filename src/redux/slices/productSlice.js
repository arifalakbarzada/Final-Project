import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  filteredByCategory : []
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    setFilter: (state , action) =>{
      state.filteredByCategory = action.payload;
    }
    ,
    filterByCategory: (state, action) => {
      state.filteredByCategory = state.items.filter(element=>element.category === action.payload)
    }
  },
});

export const { setProducts , filterByCategory , setFilter} = productsSlice.actions;

export default productsSlice.reducer;
