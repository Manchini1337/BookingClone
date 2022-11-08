import { createSlice } from '@reduxjs/toolkit';

const initialDate = new Date();
const initialDateString = initialDate.toISOString();

const initialSearchState = {
  destination: '',
  dates: [
    {
      startDate: initialDateString,
      endDate: initialDateString,
      key: 'selection',
    },
  ],
  guests: {
    adult: 1,
    children: 0,
    room: 1,
  },
};

const searchSlice = createSlice({
  name: 'search',
  initialState: initialSearchState,
  reducers: {
    setSearchData: (state, action) => {
      return { ...action.payload };
    },
    resetSearchData: (state, action) => {
      return { ...initialSearchState };
    },
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice;
