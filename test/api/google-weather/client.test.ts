import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getCurrentConditions } from '@/api/google-weather/client'

describe('getCurrentConditions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  it('should fetch and return weather conditions', async () => {
    const mockResponse = {
      temperature: { value: 20 },
      humidity: { value: 65 },
      condition: 'Sunny',
    }

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    })

    const input = {
      location: { latitude: 40.7128, longitude: -74.006 },
    }

    const result = await getCurrentConditions(input)

    expect(result).toEqual(mockResponse)
  })

  it('should throw error on failed request', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      statusText: 'Not Found',
    })

    const input = {
      location: { latitude: 40.7128, longitude: -74.006 },
    }

    await expect(getCurrentConditions(input)).rejects.toThrow(
      'Weather API request failed: Not Found'
    )
  })

  it('should include unitsSystem in params if provided', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    })

    const input = {
      location: { latitude: 40.7128, longitude: -74.006 },
      unitsSystem: 'METRIC' as const,
    }

    await getCurrentConditions(input)

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('unitsSystem=METRIC'),
      expect.any(Object)
    )
  })
})
