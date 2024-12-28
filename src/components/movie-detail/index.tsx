'use client';

import { ReactElement, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import { Grid, CircularProgress, Typography, Button } from '@mui/material';
import MovieCard from '@/components/movie-card';
import { MovieDetail as MovieDetailType } from '@/types';

const MovieDetail = (): ReactElement => {
  const pathname = usePathname();
  const router = useRouter();
  const id = pathname.split('/').pop();
  const [movie, setMovie] = useState<MovieDetailType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://www.omdbapi.com/`, {
          params: {
            i: id,
            apikey: process.env.NEXT_PUBLIC_OMDB_API_KEY,
            plot: 'full',
          },
        });
        if (response.data.Response === 'True') {
          setMovie(response.data as MovieDetailType);
        } else {
          setError(response.data.Error);
        }
      } catch {
        setError('Failed to fetch movie details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading)
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '80vh' }}>
        <CircularProgress />
        <Typography variant="subtitle1" marginTop={2}>
          Fetching movie details...
        </Typography>
      </Grid>
    );

  if (error || !movie)
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '80vh' }}>
        <Typography color="error" variant="h6" align="center">
          {error || 'Sorry, we could not find the movie you were looking for.'}
        </Typography>
      </Grid>
    );

  return (
    <Grid container spacing={2} padding={4}>
      <Grid item xs={12}>
        <Button variant="outlined" onClick={() => router.push('/')} color="primary" sx={{ marginBottom: 2 }}>
          Back to Movie List
        </Button>
      </Grid>
      <Grid item xs={12}>
        <MovieCard
          title={movie.Title}
          year={movie.Year}
          poster={movie.Poster}
          imdbRating={movie.imdbRating}
          genre={movie.Genre}
          director={movie.Director}
          actors={movie.Actors}
          runtime={movie.Runtime}
          plot={movie.Plot}
          ratings={movie.Ratings}
          imdbID={movie.imdbID}
        />
      </Grid>
    </Grid>
  );
};

export default MovieDetail;
