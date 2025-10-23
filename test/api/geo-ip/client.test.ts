import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getGeoIpLocation } from '@/api/geo-ip/client'
import * as cacheGeolocation from '@/lib/cache-geolocation'

vi.mock('@/lib/cache-geolocation')

describe('getGeoIpLocation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  it('should fetch and return location data', async () => {
    vi.mocked(cacheGeolocation.getCachedLocation).mockReturnValue(null)

    const mockResponse = {
      latitude: 40.7128,
      longitude: -74.0060,
      country_name: 'US',
      country_region: 'New York',
      city: 'New York',
    }

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    })

    const onError = vi.fn()
    const result = await getGeoIpLocation(onError)

    expect(result).toEqual({
      latitude: 40.7128,
      longitude: -74.0060,
      country: 'US',
      regionName: 'New York',
      city: 'New York',
    })
  })

  it('should call onError and return null on fetch failure', async () => {
    const error = new Error('Fetch failed')
    global.fetch = vi.fn().mockRejectedValue(error)

    const onError = vi.fn()
    const result = await getGeoIpLocation(onError)

    expect(onError).toHaveBeenCalledWith(error)
    expect(result).toBeNull()
  })
})
