import { AppDispatch } from '../index';
import { fetchMoviesStart, fetchMoviesSuccess, fetchMoviesFailure, setCurrentPage } from '../reducers/moviesReducer';
import { fetchMoviesAPI } from '../../utils/api';
import { Movie } from '@/types';

interface FetchMoviesParams {
  s: string; // Search Term
  y?: string; // Year
  type?: string; // Type: movie, series, episode
  page?: number; // Page number for pagination
}

export const fetchMovies = ({
  s,
  year,
  type,
  page = 1,
}: {
  s: string;
  year?: string;
  type?: string;
  page?: number;
}) => async (dispatch: AppDispatch) => {
  dispatch(fetchMoviesStart());
  dispatch(setCurrentPage(page));
  try {
    const params: FetchMoviesParams = {
      s,
      y: year,
      type,
      page,
    };

    const response = await fetchMoviesAPI(params);
    if (response.data.Response === 'True') {
      dispatch(
        fetchMoviesSuccess({
          movies: response.data.Search as Movie[],
          total: parseInt(response.data.totalResults, 10),
        })
      );
    } else {
      dispatch(fetchMoviesFailure(response.data.Error));
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred while fetching movies.';
    dispatch(fetchMoviesFailure(errorMessage));
  }
};

export { setCurrentPage };
