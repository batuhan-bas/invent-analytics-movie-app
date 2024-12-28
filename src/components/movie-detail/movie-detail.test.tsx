import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieDetail from './index';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('MovieDetail Component', () => {
  const mockPush = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  (usePathname as jest.Mock).mockReturnValue('/movie/tt1234567');

  const mockMovie = {
    Title: 'Inception',
    Year: '2010',
    Poster: 'https://example.com/inception.jpg',
    imdbRating: '8.8',
    Genre: 'Sci-Fi',
    Director: 'Christopher Nolan',
    Actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page',
    Runtime: '148 min',
    Plot: 'A thief who steals corporate secrets through dream-sharing technology.',
    Ratings: [{ Source: 'Internet Movie Database', Value: '8.8/10' }],
    imdbID: 'tt1234567',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading state initially', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      new Promise(() => {
      })
    );

    render(<MovieDetail />);

    expect(screen.getByText(/Fetching movie details.../i)).toBeInTheDocument();
  });

  it('renders movie details correctly', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { Response: 'True', ...mockMovie } });

    await act(async () => {
      render(<MovieDetail />);
    });

    expect(await screen.findByText(/Inception/i)).toBeInTheDocument();
    expect(screen.getByText(/2010/i)).toBeInTheDocument();
    expect(screen.getByText(/Sci-Fi/i)).toBeInTheDocument();
    expect(screen.getByText(/Christopher Nolan/i)).toBeInTheDocument();
    expect(screen.getByText(/Leonardo DiCaprio/i)).toBeInTheDocument();
    expect(screen.getByText(/148 min/i)).toBeInTheDocument();
    expect(screen.getByText(/A thief who steals corporate secrets/i)).toBeInTheDocument();
    expect(screen.getByText(/Internet Movie Database: 8.8\/10/i)).toBeInTheDocument();
  });

  it('handles API error gracefully', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { Response: 'False', Error: 'Movie not found!' } });

    await act(async () => {
      render(<MovieDetail />);
    });

    expect(await screen.findByText(/Movie not found!/i)).toBeInTheDocument();
  });

  it('navigates back to the movie list when the back button is clicked', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { Response: 'True', ...mockMovie } });

    await act(async () => {
      render(<MovieDetail />);
    });

    const backButton = await screen.findByRole('button', { name: /Back to Movie List/i });
    fireEvent.click(backButton);

    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
