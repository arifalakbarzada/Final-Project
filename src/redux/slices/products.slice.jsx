import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  selectedProduct: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    selectProduct: (state, action) => {
      state.selectedProduct = state.items.find(product => product.id === action.payload);
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
});

export const { setProducts, selectProduct, clearSelectedProduct } = productsSlice.actions;

export default productsSlice.reducer;
