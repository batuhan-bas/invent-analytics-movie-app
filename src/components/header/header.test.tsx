import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeContext } from '../../context/ThemeContext';
import Header from './index';

describe('Header Component', () => {
  const mockToggleTheme = jest.fn();

  const renderHeader = (mode: 'light' | 'dark') => {
    render(
      <ThemeContext.Provider value={{ mode, toggleTheme: mockToggleTheme }}>
        <Header />
      </ThemeContext.Provider>
    );
  };

  it('renders the header with the correct title', () => {
    renderHeader('light');

    const title = screen.getByText(/Invent Analytics Movie App/i);
    expect(title).toBeInTheDocument();
    expect(title).toHaveAttribute('href', '/');
  });

  it('renders the correct theme toggle button for light mode', () => {
    renderHeader('light');

    const toggleButton = screen.getByRole('button', { name: /Switch to dark mode/i });
    expect(toggleButton).toBeInTheDocument();
    expect(screen.getByTestId('Brightness4Icon')).toBeInTheDocument();
  });

  it('renders the correct theme toggle button for dark mode', () => {
    renderHeader('dark');

    const toggleButton = screen.getByRole('button', { name: /Switch to light mode/i });
    expect(toggleButton).toBeInTheDocument();
    expect(screen.getByTestId('Brightness7Icon')).toBeInTheDocument();
  });

  it('calls toggleTheme when the theme button is clicked', () => {
    renderHeader('light');

    const toggleButton = screen.getByRole('button', { name: /Switch to dark mode/i });
    fireEvent.click(toggleButton);

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});
