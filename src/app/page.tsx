'use client';

import { ReactElement, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import SearchBar from '../components/search-bar';
import Filters from '../components/filters';
import MovieList from '../components/movie-list';

const MoviePage = (): ReactElement => {
  const [filters, setFilters] = useState({ year: '', type: '' });
  const [searchTerm, setSearchTerm] = useState('Pokemon');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters: { year: string; type: string }) => {
    setFilters(newFilters);
  };

  return (
    <Box padding={4}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            Movie List
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <SearchBar onSearch={handleSearch} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Filters onFilterChange={handleFilterChange} />
        </Grid>

        <Grid item xs={12}>
          <MovieList searchTerm={searchTerm} filters={filters} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MoviePage;
