import { describe, it, expect } from 'vitest';
import { formatTimer, formatDate } from './formatTimer';

describe('formatTimer', () => {
  it('should format seconds less than 60', () => {
    expect(formatTimer(30)).toBe('0:30');
  });

  it('should format single digit seconds with leading zero', () => {
    expect(formatTimer(5)).toBe('0:05');
  });

  it('should format exactly 60 seconds as 1:00', () => {
    expect(formatTimer(60)).toBe('1:00');
  });

  it('should format 1 minute and 30 seconds', () => {
    expect(formatTimer(90)).toBe('1:30');
  });

  it('should format 2 minutes exactly', () => {
    expect(formatTimer(120)).toBe('2:00');
  });

  it('should format large times correctly', () => {
    expect(formatTimer(125)).toBe('2:05');
    expect(formatTimer(599)).toBe('9:59');
  });

  it('should format 0 seconds', () => {
    expect(formatTimer(0)).toBe('0:00');
  });

  it('should format 1 second', () => {
    expect(formatTimer(1)).toBe('0:01');
  });

  it('should handle large minute values', () => {
    expect(formatTimer(600)).toBe('10:00');
    expect(formatTimer(1200)).toBe('20:00');
  });
});

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date(2025, 0, 15, 14, 30, 45); // January 15, 2025, 2:30:45 PM
    const result = formatDate(date);

    expect(result).toContain('2025-01-15');
    expect(result).toContain('143045'); // HHMMSS format
  });

  it('should pad single digit dates', () => {
    const date = new Date(2025, 0, 5, 9, 5, 3); // January 5, 2025, 9:05:03 AM
    const result = formatDate(date);

    expect(result).toContain('2025-01-05');
    expect(result).toContain('090503');
  });

  it('should pad months correctly', () => {
    const date = new Date(2025, 11, 25, 12, 0, 0); // December 25, 2025, 12:00:00 PM
    const result = formatDate(date);

    expect(result).toContain('2025-12-25');
  });

  it('should handle leap year date', () => {
    const date = new Date(2024, 1, 29, 0, 0, 0); // February 29, 2024 (leap year)
    const result = formatDate(date);

    expect(result).toContain('2024-02-29');
  });

  it('should have consistent format', () => {
    const date = new Date(2025, 5, 15, 23, 59, 59); // June 15, 2025, 11:59:59 PM
    const result = formatDate(date);

    // Should contain pattern: name_YYYY-MM-DD_HHMMSS
    expect(result).toMatch(/\d{4}-\d{2}-\d{2}_\d{6}/);
  });

  it('should pad all components correctly', () => {
    const date = new Date(2025, 0, 1, 0, 0, 0); // January 1, 2025, 12:00:00 AM
    const result = formatDate(date);

    expect(result).toContain('2025-01-01');
    expect(result).toContain('000000');
  });
});
