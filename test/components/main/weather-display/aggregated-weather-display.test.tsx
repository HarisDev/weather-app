import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'
import AggregatedWeatherDisplay from '@/components/main/weather-display/aggregated-weather-display'
import * as useWeatherHook from '@/hooks/use-weather'
import { CurrentWeatherProvider } from '@/contexts/CurrentWeatherContext'

vi.mock('@/hooks/use-weather')

const createWrapper = () => {
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(CurrentWeatherProvider, null, children)
}

describe('AggregatedWeatherDisplay', () => {
  it('should render WeatherHero and WeatherForecast', () => {
    vi.mocked(useWeatherHook.default).mockReturnValue({
      currentConditions: null,
      location: null,
      isLoading: false,
      isCurrentConditionsLoading: false,
      isLocationLoading: false,
      isForecastsLoading: false,
      isCurrentConditionsError: false,
      forecasts: null,
    })

    const { container } = render(<AggregatedWeatherDisplay geoLocation={{ latitude: 40.7, longitude: -74.0 }} />, { wrapper: createWrapper() })
    expect(container).toBeInTheDocument()
  })

  it('should handle loading state', () => {
    vi.mocked(useWeatherHook.default).mockReturnValue({
      currentConditions: null,
      location: null,
      isLoading: true,
      isCurrentConditionsLoading: true,
      isLocationLoading: false,
      isForecastsLoading: true,
      isCurrentConditionsError: false,
      forecasts: null,
    })

    const { container } = render(<AggregatedWeatherDisplay geoLocation={{ latitude: 40.7, longitude: -74.0 }} />, { wrapper: createWrapper() })
    expect(container).toBeInTheDocument()
  })
})
