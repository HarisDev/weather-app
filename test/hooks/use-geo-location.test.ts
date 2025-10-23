import { describe, it, expect, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import useGeoLocation from '@/hooks/use-geo-location'
import { GeoLocationStatus } from '@/types/geolocation'
import * as geoIpClient from '@/api/geo-ip/client'
import * as browserGeo from '@/lib/browser-geolocation'
import * as timezoneGeo from '@/lib/timezone-geolocation'

vi.mock('@/lib/browser-geolocation')
vi.mock('@/api/geo-ip/client')
vi.mock('@/lib/timezone-geolocation')

describe('useGeoLocation', () => {
  it('should return default values initially', () => {
    vi.mocked(geoIpClient.getGeoIpLocation).mockResolvedValue(null)
    vi.mocked(browserGeo.getBrowserGeolocation).mockReturnValue()
    vi.mocked(timezoneGeo.getTimezoneBasedLocation).mockReturnValue({
      latitude: 51.5074,
      longitude: -0.1278,
    })

    const { result } = renderHook(() => useGeoLocation())

    expect(result.current.latitude).toBe(0)
    expect(result.current.longitude).toBe(0)
    expect(result.current.status).toBe(GeoLocationStatus.Loading)
  })

  it('should have correct status type', async () => {
    vi.mocked(geoIpClient.getGeoIpLocation).mockResolvedValue(null)
    vi.mocked(browserGeo.getBrowserGeolocation).mockReturnValue()
    vi.mocked(timezoneGeo.getTimezoneBasedLocation).mockReturnValue({
      latitude: 51.5074,
      longitude: -0.1278,
    })

    const { result } = renderHook(() => useGeoLocation())

    await waitFor(() => {
      expect([GeoLocationStatus.Loading, GeoLocationStatus.Success]).toContain(
        result.current.status
      )
    })
  })
})
