import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import { renderWithProviders } from '../test/test-utils';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Header Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the header with Quiz App title', () => {
    renderWithProviders(<Header />);

    expect(screen.getByText('QUIZ APP')).toBeInTheDocument();
  });

  it('should render the Leaderboard button', () => {
    renderWithProviders(<Header />);

    expect(screen.getByRole('button', { name: /leaderboard/i })).toBeInTheDocument();
  });

  it('should navigate to dashboard when clicking on QUIZ APP title', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);

    const titleButton = screen.getByText('QUIZ APP');
    await user.click(titleButton);

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('should navigate to leaderboard when clicking on Leaderboard button', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);

    const leaderboardButton = screen.getByRole('button', { name: /leaderboard/i });
    await user.click(leaderboardButton);

    expect(mockNavigate).toHaveBeenCalledWith('/leader-board');
  });

  it('should have proper AppBar structure', () => {
    const { container } = renderWithProviders(<Header />);

    const appBar = container.querySelector('header');
    expect(appBar).toBeInTheDocument();
  });
});
