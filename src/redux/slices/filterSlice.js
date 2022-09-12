import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  categoriesId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoriesId: (state, action) => {
      state.categoriesId = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload
    },
    setSortType: (state, action) => {
      state.sort = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.categoriesId = Number(action.payload.categoriesId);
    }
  },
});

// Action creators are generated for each case reducer function
export const { setCategoriesId, setSortType, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
