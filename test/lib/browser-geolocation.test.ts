import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getBrowserGeolocation } from '@/lib/browser-geolocation'

describe('getBrowserGeolocation', () => {
  beforeEach(() => {
    // Mock navigator.geolocation
    const mockGeolocation = {
      watchPosition: vi.fn(),
    }
    Object.defineProperty(global.navigator, 'geolocation', {
      value: mockGeolocation,
      configurable: true,
    })
  })

  it('should call watchPosition with callbacks', () => {
    const onSuccess = vi.fn()
    const onError = vi.fn()

    getBrowserGeolocation(onSuccess, onError)

    expect(navigator.geolocation.watchPosition).toHaveBeenCalledWith(
      onSuccess,
      onError,
      expect.any(Object)
    )
  })

  it('should use default options', () => {
    const onSuccess = vi.fn()

    getBrowserGeolocation(onSuccess)

    expect(navigator.geolocation.watchPosition).toHaveBeenCalledWith(
      onSuccess,
      expect.any(Function),
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    )
  })
})
