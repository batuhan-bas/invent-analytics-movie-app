import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from './index';

describe('Pagination Component', () => {
  const mockOnPageChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the pagination with correct details', () => {
    render(
      <Pagination
        currentPage={1}
        totalResults={25}
        resultsPerPage={10}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText('Showing 1 - 10 of 25 results')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /1/i })).toHaveClass('Mui-selected');
  });

  it('calls onPageChange when a page number is clicked', () => {
    render(
      <Pagination
        currentPage={1}
        totalResults={25}
        resultsPerPage={10}
        onPageChange={mockOnPageChange}
      />
    );

    const page2Button = screen.getByRole('button', { name: /2/i });
    fireEvent.click(page2Button);

    expect(mockOnPageChange).toHaveBeenCalledTimes(1);
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('renders correct total pages when results are divided', () => {
    render(
      <Pagination
        currentPage={3}
        totalResults={55}
        resultsPerPage={20}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText('Showing 41 - 55 of 55 results')).toBeInTheDocument();
  });

  it('renders no results message when there are no total results', () => {
    render(
      <Pagination
        currentPage={1}
        totalResults={0}
        resultsPerPage={10}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });
});
