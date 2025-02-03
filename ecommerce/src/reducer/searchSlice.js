import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  results: [], 
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.query = action.payload;
    },
    setSearchResults(state, action) {
      state.results = action.payload;
    },
  },
});

export const { setSearchQuery, setSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
