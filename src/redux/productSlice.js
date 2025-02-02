import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload];
    }
  },
});

export const { addToCart } = productSlice.actions;

export default productSlice.reducer;

