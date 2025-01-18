// src/redux/interviewsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  interviews: JSON.parse(localStorage.getItem('interviews')) || [],
};

const interviewsSlice = createSlice({
  name: 'interviews',
  initialState,
  reducers: {
    addInterview: (state, action) => {
      state.interviews.push(action.payload);
      localStorage.setItem('interviews', JSON.stringify(state.interviews));
    },
    updateInterview: (state, action) => {
      const index = state.interviews.findIndex(i => i.id === action.payload.id);
      if (index !== -1) {
        state.interviews[index] = action.payload;
        localStorage.setItem('interviews', JSON.stringify(state.interviews));
      }
    },
    deleteInterview: (state, action) => {
      state.interviews = state.interviews.filter(i => i.id !== action.payload);
      localStorage.setItem('interviews', JSON.stringify(state.interviews));
    },
  },
});

export const { addInterview, updateInterview, deleteInterview } = interviewsSlice.actions;
export default interviewsSlice.reducer;
