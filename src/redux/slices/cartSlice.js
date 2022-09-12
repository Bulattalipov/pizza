import { createSlice } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';

const {items, totalPrice} = getCartFromLS();

const initialState = {
  totalPrice,
  items,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItems: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItems: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count--;
      }
    },
    removeItems: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItems, removeItems, clearItems, minusItems } = cartSlice.actions;

export default cartSlice.reducer;
