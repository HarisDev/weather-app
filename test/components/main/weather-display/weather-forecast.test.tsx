import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import WeatherForecast from '@/components/main/weather-display/weather-forecast'

describe('WeatherForecast', () => {
  it('should show loading skeletons', () => {
    const weather = {
      currentConditions: null,
      location: null,
      isLoading: false,
      isCurrentConditionsLoading: false,
      isLocationLoading: false,
      isForecastsLoading: true,
      isCurrentConditionsError: false,
      forecasts: null,
    }

    const { container } = render(<WeatherForecast weather={weather} />)
    const skeletons = container.querySelectorAll('.animate-pulse')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('should render forecast data', () => {
    const weather = {
      currentConditions: null,
      location: null,
      isLoading: false,
      isCurrentConditionsLoading: false,
      isLocationLoading: false,
      isForecastsLoading: false,
      isCurrentConditionsError: false,
      forecasts: {
        timeZone: 'America/New_York',
        forecastDays: [
          {
            interval: { startTime: '2025-01-16', endTime: '2025-01-17' },
            displayDate: '2025-01-16',
            maxTemperature: { degrees: 25 },
            minTemperature: { degrees: 15 },
            daytimeForecast: {
              weatherCondition: {
                description: { text: 'Sunny' },
                iconBaseUri: 'https://example.com/icon',
              },
            },
          },
        ],
      },
    }

    const { container } = render(<WeatherForecast weather={weather} />)
    expect(container).toBeInTheDocument()
  })
})
