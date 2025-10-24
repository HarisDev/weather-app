import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getCachedLocation, setCachedLocation } from '@/lib/cache-geolocation'

describe('cache-geolocation', () => {
  let originalGetItem: typeof localStorage.getItem

  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    originalGetItem = localStorage.getItem
  })

  afterEach(() => {
    localStorage.getItem = originalGetItem
  })

  describe('getCachedLocation', () => {
    it('should return cached location if not expired', () => {
      const mockData = {
        latitude: 40.7128,
        longitude: -74.0060,
        expiresAt: Date.now() + 10000,
      }

      localStorage.getItem = vi.fn().mockReturnValue(JSON.stringify(mockData))

      const result = getCachedLocation()

      expect(result).toEqual(mockData)
    })

    it('should return null if cache is expired', () => {
      const mockData = {
        latitude: 40.7128,
        longitude: -74.0060,
        expiresAt: Date.now() - 10000,
      }

      localStorage.getItem = vi.fn().mockReturnValue(JSON.stringify(mockData))

      const result = getCachedLocation()

      expect(result).toBeNull()
    })

    it('should return null if no cache exists', () => {
      localStorage.getItem = vi.fn().mockReturnValue('{}')

      const result = getCachedLocation()

      expect(result).toBeNull()
    })
  })

  describe('setCachedLocation', () => {
    it('should cache location with expiration', () => {
      const location = {
        latitude: 40.7128,
        longitude: -74.0060,
        country: 'US',
        regionName: 'New York',
        city: 'New York',
      }

      setCachedLocation(location)

      const stored = localStorage.getItem('geoLocation')
      expect(stored).toBeTruthy()
      expect(stored).toContain('"latitude":40.7128')
      expect(stored).toContain('"longitude":-74.006')
    })
  })
})
