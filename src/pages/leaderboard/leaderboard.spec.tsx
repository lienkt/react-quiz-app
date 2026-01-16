import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Leaderboard from './Leaderboard';
import { renderWithProviders } from '../../test/test-utils';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Leaderboard Component', () => {
  const initialState = {
    questions: {
      categories: [],
      current_category: 0,
      current_difficulty: 'easy' as const,
      current_type: 'multiple' as const,
      current_amount: 5,
      current_question_index: 0,
    },
    score: {
      score: 0,
      leaderboards: [
        {
          id: '1',
          first_name: 'John',
          last_name: 'Doe',
          email: 'john@example.com',
          score: 9,
          created_date: '2025-01-15',
        },
        {
          id: '2',
          first_name: 'Jane',
          last_name: 'Smith',
          email: 'jane@example.com',
          score: 8,
          created_date: '2025-01-15',
        },
      ],
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render leaderboard title', () => {
    renderWithProviders(<Leaderboard />, { preloadedState: initialState });

    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
  });

  it('should display all leaderboard entries', () => {
    renderWithProviders(<Leaderboard />, { preloadedState: initialState });

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();

    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getByText('Smith')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
  });

  it('should render table headers', () => {
    renderWithProviders(<Leaderboard />, { preloadedState: initialState });

    expect(screen.getByText(/first name/i)).toBeInTheDocument();
    expect(screen.getByText(/last name/i)).toBeInTheDocument();
    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/score/i)).toBeInTheDocument();
  });

  it('should render CSV download button', () => {
    renderWithProviders(<Leaderboard />, { preloadedState: initialState });

    const csvButton = screen.getByRole('link');
    expect(csvButton).toBeInTheDocument();
  });

  it('should handle empty leaderboard', () => {
    const emptyState = {
      ...initialState,
      score: {
        score: 0,
        leaderboards: [],
      },
    };

    renderWithProviders(<Leaderboard />, { preloadedState: emptyState });

    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
    // The table should still render but with no rows
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('should render back to quiz button', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Leaderboard />, { preloadedState: initialState });

    const homeButton = screen.getByRole('button', { name: /go home/i });
    expect(homeButton).toBeInTheDocument();

    await user.click(homeButton);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
