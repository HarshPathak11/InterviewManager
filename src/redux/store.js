// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import interviewsReducer from './interviewsSlice';

const store = configureStore({
  reducer: {
    interviews: interviewsReducer,
  },
});

export default store;
