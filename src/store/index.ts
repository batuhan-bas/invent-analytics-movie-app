import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import moviesReducer from './reducers/moviesReducer';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
