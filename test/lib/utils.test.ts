import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn', () => {
  it('should merge class names', () => {
    const result = cn('class1', 'class2')
    expect(result).toBe('class1 class2')
  })

  it('should handle conditional classes', () => {
    const result = cn('class1', false && 'class2', 'class3')
    expect(result).toBe('class1 class3')
  })

  it('should merge tailwind classes correctly', () => {
    const result = cn('px-2', 'px-4')
    expect(result).toBe('px-4')
  })
})
