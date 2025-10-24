import { describe, it, expect } from 'vitest'
import { formatTemperature, formatWeatherConditionImage } from '@/lib/format-weather'
import type { WeatherCondition } from '@/types/api/google-weather'

describe('formatTemperature', () => {
  it('should format temperature with degree symbol', () => {
    expect(formatTemperature(72.5)).toBe('73°')
  })

  it('should return empty string for undefined temperature', () => {
    expect(formatTemperature(undefined)).toBe('')
  })

  it('should round temperature to nearest integer', () => {
    expect(formatTemperature(72.4)).toBe('72°')
    expect(formatTemperature(72.6)).toBe('73°')
  })
})

describe('formatWeatherConditionImage', () => {
  it('should format weather condition image URL', () => {
    const condition: WeatherCondition = {
      iconBaseUri: 'https://example.com/icon'
    } as WeatherCondition

    expect(formatWeatherConditionImage(condition)).toBe('https://example.com/icon.svg')
  })

  it('should return empty string for undefined condition', () => {
    expect(formatWeatherConditionImage(undefined)).toBe('')
  })
})
