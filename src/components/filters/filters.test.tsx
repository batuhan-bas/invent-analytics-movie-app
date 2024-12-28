import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Filters from './index';

describe('Filters Component', () => {
  it('renders year and type inputs', () => {
    render(<Filters onFilterChange={() => {}} />);

    const yearInput = screen.getByLabelText(/Year/i);
    const typeSelect = screen.getByLabelText(/Type/i);

    expect(yearInput).toBeInTheDocument();
    expect(typeSelect).toBeInTheDocument();
  });

  it('calls onFilterChange with the correct year value', async () => {
    const mockOnFilterChange = jest.fn();
    render(<Filters onFilterChange={mockOnFilterChange} />);

    const yearInput = screen.getByLabelText(/Year/i);

    await userEvent.type(yearInput, '2021');
    expect(mockOnFilterChange).toHaveBeenCalledWith({ year: '2021', type: '' });
  });

  it('calls onFilterChange with the correct type value', async () => {
    const mockOnFilterChange = jest.fn();
    render(<Filters onFilterChange={mockOnFilterChange} />);

    const typeSelect = screen.getByLabelText(/Type/i);

    await userEvent.click(typeSelect);
    const movieOption = screen.getByRole('option', { name: /Movie/i });
    await userEvent.click(movieOption);

    expect(mockOnFilterChange).toHaveBeenCalledWith({ year: '', type: 'movie' });
  });

  it('updates both year and type and calls onFilterChange correctly', async () => {
    const mockOnFilterChange = jest.fn();
    render(<Filters onFilterChange={mockOnFilterChange} />);

    const yearInput = screen.getByLabelText(/Year/i);
    const typeSelect = screen.getByLabelText(/Type/i);

    await userEvent.type(yearInput, '2021');
    await userEvent.click(typeSelect);
    const seriesOption = screen.getByRole('option', { name: /TV Series/i });
    await userEvent.click(seriesOption);

    expect(mockOnFilterChange).toHaveBeenCalledWith({ year: '2021', type: '' });
    expect(mockOnFilterChange).toHaveBeenCalledWith({ year: '2021', type: 'series' });
  });
});
