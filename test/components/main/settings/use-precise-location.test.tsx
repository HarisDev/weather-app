import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import UsePreciseLocation from '@/components/main/settings/use-precise-location'
import * as browserGeo from '@/lib/browser-geolocation'
import { GeoLocationStatus } from '@/types/geolocation'

vi.mock('@/lib/browser-geolocation')

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

describe('UsePreciseLocation', () => {
  const mockDeviceGeoLocation = {
    latitude: 0,
    longitude: 0,
    status: GeoLocationStatus.Loading,
    setGeoLocation: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(browserGeo.getBrowserGeolocation).mockImplementation(() => {})
  })

  it('should render component', () => {
    const { container } = render(<UsePreciseLocation deviceGeoLocation={mockDeviceGeoLocation} />)
    expect(container).toBeInTheDocument()
  })

  it('should display "Use Precise Location" text', () => {
    render(<UsePreciseLocation deviceGeoLocation={mockDeviceGeoLocation} />)
    const elements = screen.getAllByText('Use Precise Location')
    expect(elements.length).toBeGreaterThan(0)
  })

  it('should render button with aria-label', () => {
    render(<UsePreciseLocation deviceGeoLocation={mockDeviceGeoLocation} />)
    const button = screen.getByLabelText('Toggle accessibility settings')
    expect(button).toBeInTheDocument()
  })
})
