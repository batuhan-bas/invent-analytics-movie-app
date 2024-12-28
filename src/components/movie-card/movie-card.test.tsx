import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieCard from './index';

describe('MovieCard Component', () => {
  it('renders movie details correctly', () => {
    render(
      <MovieCard
        title="Inception"
        year="2010"
        poster="https://example.com/inception.jpg"
        imdbRating="8.8"
        genre="Sci-Fi"
        director="Christopher Nolan"
        actors="Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page"
        runtime="148 min"
        plot="A thief who steals corporate secrets through the use of dream-sharing technology."
        ratings={[{ Source: 'Internet Movie Database', Value: '8.8/10' }]}
        imdbID="tt1375666"
      />
    );

    expect(screen.getByText(/Inception \(2010\)/)).toBeInTheDocument();
    expect(screen.getByText(/Genre:/i)).toBeInTheDocument();
    expect(screen.getByText(/Sci-Fi/i)).toBeInTheDocument();
    expect(screen.getByText(/Director:/i)).toBeInTheDocument();
    expect(screen.getByText(/Christopher Nolan/i)).toBeInTheDocument();
    expect(screen.getByText(/Cast:/i)).toBeInTheDocument();
    expect(screen.getByText(/Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page/i)).toBeInTheDocument();
    expect(screen.getByText(/Runtime:/i)).toBeInTheDocument();
    expect(screen.getByText(/148 min/i)).toBeInTheDocument();

    const imdbRatingText = screen.getByText((_, element) => 
        !!(
          element?.tagName === 'P' &&
          /IMDb Rating: 8.8/i.test(element.textContent || '')
        )
      );   
    expect(imdbRatingText).toBeInTheDocument();

    const imdbButton = screen.getByRole('link', { name: /View on IMDb/i });
    expect(imdbButton).toBeInTheDocument();
    expect(imdbButton).toHaveAttribute('href', 'https://www.imdb.com/title/tt1375666');
  });

  it('renders placeholder image when poster is N/A', () => {
    render(
      <MovieCard
        title="Inception"
        year="2010"
        poster="N/A"
        imdbRating="8.8"
        imdbID="tt1375666"
      />
    );

    const placeholderImage = screen.getByAltText('Inception');
    expect(placeholderImage).toBeInTheDocument();
    expect(placeholderImage).toHaveAttribute('src', '/placeholder.png');
  });
});
