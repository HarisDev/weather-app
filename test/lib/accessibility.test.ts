import { describe, it, expect, beforeEach, vi } from 'vitest'
import { toggleAccessibilityWidget } from '@/lib/accessibility'

describe('toggleAccessibilityWidget', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('should click the widget when it exists', () => {
    const mockClick = vi.fn()
    const widget = document.createElement('a')
    widget.click = mockClick

    const container = document.createElement('div')
    container.className = 'asw-widget'
    container.appendChild(widget)
    document.body.appendChild(container)

    toggleAccessibilityWidget()

    expect(mockClick).toHaveBeenCalledOnce()
  })

  it('should do nothing when widget does not exist', () => {
    toggleAccessibilityWidget()
    // Should not throw error
    expect(document.querySelector('.asw-widget a')).toBeNull()
  })
})
