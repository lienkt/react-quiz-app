import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import Dashboard from './Dashboard';
import '@testing-library/jest-dom';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock fetch API
global.fetch = vi.fn();

describe('Dashboard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (global.fetch as any).mockResolvedValue({
      json: async () => ({
        trivia_categories: [
          { id: 9, name: 'General Knowledge' },
          { id: 10, name: 'Entertainment: Books' },
          { id: 11, name: 'Entertainment: Film' },
        ],
      }),
    });
  });

  it('should render Quiz App title and form elements', async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    // Check if the title is rendered
    expect(screen.getByText('Quiz App')).toBeInTheDocument();

    // Check if form elements are rendered
    await waitFor(() => {
      expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    });
    
    expect(screen.getByLabelText(/difficulty/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument();
  });

  it('should fetch and display categories', async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    // Wait for fetch to complete
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://opentdb.com/api_category.php');
    });

    // Open the category select dropdown
    const categorySelect = screen.getByLabelText(/category/i);
    await user.click(categorySelect);

    // Wait for categories to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'General Knowledge' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Entertainment: Books' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Entertainment: Film' })).toBeInTheDocument();
    });
  });

  it('should handle fetch error gracefully', async () => {
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    
    (global.fetch as any).mockRejectedValue(new Error('Network error'));

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    // Wait for error to be handled
    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith('can not fetch categories');
    });

    consoleLogSpy.mockRestore();
  });

  it('should navigate to /question on form submit', async () => {
    const user = userEvent.setup();
    
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /get started/i });
    await user.click(submitButton);
    
    // Check if navigate was called with the correct argument
    expect(mockNavigate).toHaveBeenCalledWith('/question');
  });
});
