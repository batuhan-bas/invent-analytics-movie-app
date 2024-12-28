import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.omdbapi.com/',
});

interface FetchMoviesParams {
  s: string; // Search Term
  y?: string; // Year
  type?: string; // Type: movie, series, episode
  page?: number; // Page number for pagination
}

export const fetchMoviesAPI = (params: FetchMoviesParams) => {
  return api.get('', {
    params: { ...params, apikey: process.env.NEXT_PUBLIC_OMDB_API_KEY },
  });
};

export default api;
