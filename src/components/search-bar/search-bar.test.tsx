import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './index';

describe('SearchBar Component', () => {
  it('renders input and button', () => {
    render(<SearchBar onSearch={() => {}} />);

    const input = screen.getByLabelText(/Search Movies/i);
    const button = screen.getByRole('button', { name: /Search/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('calls onSearch with the correct value', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByLabelText(/Search Movies/i);
    const button = screen.getByRole('button', { name: /Search/i });

    fireEvent.change(input, { target: { value: 'Pokemon' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('Pokemon');
  });
});
