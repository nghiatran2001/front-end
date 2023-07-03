import { createSlice } from '@reduxjs/toolkit';

const clientSlice = createSlice({
   name: 'client',
   initialState: {

   },
   reducers: {
      startLoading: (state) => {
         state.loading = true;
         return state;
      },
   },
});

export default clientSlice;