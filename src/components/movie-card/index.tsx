'use client';

import { ReactElement } from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box, Chip } from '@mui/material';

interface MovieCardProps {
  title: string;
  year: string;
  poster: string;
  imdbRating?: string;
  genre?: string;
  director?: string;
  actors?: string;
  runtime?: string;
  plot?: string;
  ratings?: { Source: string; Value: string }[];
  imdbID?: string;
}

const MovieCard = ({
  title,
  year,
  poster,
  imdbRating,
  genre,
  director,
  actors,
  runtime,
  plot,
  ratings,
  imdbID,
}: MovieCardProps): ReactElement => {
  return (
    <Card sx={{ maxWidth: 300, margin: 'auto', borderRadius: 2, boxShadow: 3 }}>
      {/* Poster */}
      <CardMedia
        component="img"
        height="450"
        image={poster !== 'N/A' ? poster : '/placeholder.png'}
        alt={title}
        sx={{
          borderRadius: '4px',
          objectFit: 'cover',
        }}
      />

      {/* İçerik */}
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {title} ({year})
        </Typography>
        {genre && (
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <strong>Genre:</strong> {genre}
          </Typography>
        )}
        {director && (
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <strong>Director:</strong> {director}
          </Typography>
        )}
        {actors && (
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <strong>Cast:</strong> {actors}
          </Typography>
        )}
        {runtime && (
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <strong>Runtime:</strong> {runtime}
          </Typography>
        )}
        {imdbRating && (
          <Typography
            variant="body2"
            color="text.secondary"
            gutterBottom
            data-testid="imdb-rating"
          >
            <strong>IMDb Rating:</strong> {imdbRating}
          </Typography>
        )}
        {plot && (
          <Typography variant="body1" paragraph>
            {plot}
          </Typography>
        )}
        {ratings && (
          <Box mt={2}>
            {ratings.map((rating) => (
              <Chip
                key={rating.Source}
                label={`${rating.Source}: ${rating.Value}`}
                sx={{ marginRight: 1, marginBottom: 1 }}
              />
            ))}
          </Box>
        )}
      </CardContent>

      {/* IMDb Bağlantısı */}
      {imdbID && (
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            href={`https://www.imdb.com/title/${imdbID}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on IMDb
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default MovieCard;
