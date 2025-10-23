import { describe, it, expect, vi, beforeEach } from 'vitest'
import { autocompletePlaces, getPlaceDetails } from '@/api/google-places/client'

describe('google-places client', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  describe('autocompletePlaces', () => {
    it('should return autocomplete results', async () => {
      const mockResponse = {
        suggestions: [{ placePrediction: { text: 'New York' } }],
      }

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      const result = await autocompletePlaces({ input: 'New' })

      expect(result).toEqual(mockResponse)
    })

    it('should throw error on failed request', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        statusText: 'Bad Request',
      })

      await expect(autocompletePlaces({ input: 'Test' })).rejects.toThrow(
        'API request failed: Bad Request'
      )
    })
  })

  describe('getPlaceDetails', () => {
    it('should return place details', async () => {
      const mockPlace = {
        id: '123',
        displayName: { text: 'New York' },
        location: { latitude: 40.7128, longitude: -74.006 },
      }

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockPlace),
      })

      const result = await getPlaceDetails('123')

      expect(result).toEqual(mockPlace)
    })

    it('should return null on error', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

      const result = await getPlaceDetails('123')

      expect(result).toBeNull()
    })
  })
})
