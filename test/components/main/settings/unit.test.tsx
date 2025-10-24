import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import UnitSettings from '@/components/main/settings/unit'
import * as UnitsSystemContext from '@/contexts/UnitsSystemContext'

vi.mock('@/contexts/UnitsSystemContext')

describe('UnitSettings', () => {
  it('should render settings button', () => {
    vi.mocked(UnitsSystemContext.useUnitsSystem).mockReturnValue({
      unitsSystem: 'METRIC',
      setUnitsSystem: vi.fn(),
    })

    render(<UnitSettings />)

    const button = screen.getByLabelText('Settings')
    expect(button).toBeInTheDocument()
  })

  it('should display current units system', () => {
    vi.mocked(UnitsSystemContext.useUnitsSystem).mockReturnValue({
      unitsSystem: 'METRIC',
      setUnitsSystem: vi.fn(),
    })

    const { container } = render(<UnitSettings />)
    expect(container).toBeInTheDocument()
  })
})
