import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '@/types';

interface MoviesState {
  list: Movie[];
  totalResults: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  list: [],
  totalResults: 0,
  currentPage: 1,
  loading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    fetchMoviesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchMoviesSuccess(state, action: PayloadAction<{ movies: Movie[]; total: number }>) {
      state.loading = false;
      state.list = action.payload.movies;
      state.totalResults = action.payload.total;
    },
    fetchMoviesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    clearMovies(state) {
      state.list = [];
      state.totalResults = 0;
      state.currentPage = 1;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  fetchMoviesStart,
  fetchMoviesSuccess,
  fetchMoviesFailure,
  setCurrentPage,
  clearMovies,
} = moviesSlice.actions;
export default moviesSlice.reducer;
