import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
  _id: JSON.parse(localStorage.getItem('user'))?._id || null,
  username: JSON.parse(localStorage.getItem('user'))?.username || '',
  email: JSON.parse(localStorage.getItem('user'))?.email || '',
  country: JSON.parse(localStorage.getItem('user'))?.country || '',
  city: JSON.parse(localStorage.getItem('user'))?.city || '',
  img: JSON.parse(localStorage.getItem('user'))?.img || '',
  phone: JSON.parse(localStorage.getItem('user'))?.phone || '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUserData: (state, action) => {
      return { ...action.payload };
    },
    resetUserData: (state, action) => {
      return {
        _id: null,
        username: '',
        email: '',
        country: '',
        city: '',
        img: '',
        phone: '',
      };
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
