import { describe, it, expect, beforeEach, vi } from 'vitest'
import { formatDate } from '@/lib/format-date'

describe('formatDate', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-01-15'))
  })

  it('should return "Today" for current date', () => {
    const result = formatDate('2025-01-15')
    expect(result).toBe('Today')
  })

  it('should format date with ordinal suffix', () => {
    const result = formatDate('2025-02-21')
    expect(result).toBe('February 21st')
  })

  it('should handle different ordinal suffixes correctly', () => {
    expect(formatDate('2025-03-01')).toBe('March 1st')
    expect(formatDate('2025-03-02')).toBe('March 2nd')
    expect(formatDate('2025-03-03')).toBe('March 3rd')
    expect(formatDate('2025-03-04')).toBe('March 4th')
  })
})
