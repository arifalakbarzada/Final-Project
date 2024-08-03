import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  selectedProduct: null,
  selectedColor : null
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    }
  },
});

export const { setProducts, selectProduct, clearSelectedProduct } = productsSlice.actions;

export default productsSlice.reducer;
