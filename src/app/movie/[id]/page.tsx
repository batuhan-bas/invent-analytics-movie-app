"use client";

import { ReactElement } from 'react';
import MovieDetail from '../../../components/movie-detail';
import { Container } from '@mui/material';

const MoviePage = (): ReactElement => {
  return (
    <Container maxWidth="md">
      <MovieDetail />
    </Container>
  );
};

export default MoviePage;
