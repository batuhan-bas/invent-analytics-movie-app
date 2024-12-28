'use client';

import { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Link from 'next/link';
import Pagination from '../pagination';
import { fetchMovies, setCurrentPage } from '../../store/actions/movieActions';
import { RootState, useAppDispatch } from '@/store';
import { Movie } from '@/types';

interface MovieListProps {
  searchTerm?: string;
  filters: { year: string; type: string };
}

const MovieList = ({ searchTerm = 'Pokemon', filters }: MovieListProps): ReactElement => {
  const dispatch = useAppDispatch();
  const { list, totalResults, loading, error, currentPage } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies({ s: searchTerm, ...filters, page: currentPage }));
  }, [dispatch, searchTerm, filters, currentPage]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    dispatch(fetchMovies({ s: searchTerm, ...filters, page }));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {loading ? (
          <Typography variant="h6" align="center">
            Fetching movies...
          </Typography>
        ) : error ? (
          <Typography variant="h6" color="error" align="center">
            {error || 'Something went wrong. Please try again.'}
          </Typography>
        ) : list.length === 0 ? (
          <Typography variant="h6" align="center">
            {/* eslint-disable react/no-unescaped-entities */}
            No results found for "{searchTerm}".
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table aria-label="movie table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Release Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>IMDb ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((movie: Movie) => (
                  <TableRow key={movie.imdbID}>
                    <TableCell>
                      <Link href={`/movie/${movie.imdbID}`} passHref>
                        <Button variant="text" color="primary">
                          {movie.Title}
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell>{movie.Year}</TableCell>
                    <TableCell>{movie.Type}</TableCell>
                    <TableCell>{movie.imdbID}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>

      {totalResults > 0 && (
        <Grid item xs={12} marginTop={2}>
          <Pagination
            currentPage={currentPage}
            totalResults={totalResults}
            resultsPerPage={10}
            onPageChange={handlePageChange}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default MovieList;
