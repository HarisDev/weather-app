import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import WeatherHero from '@/components/main/weather-display/weather-hero'

describe('WeatherHero', () => {
  it('should show loading state', () => {
    const weather = {
      currentConditions: null,
      location: null,
      isLoading: true,
      isCurrentConditionsLoading: true,
      isLocationLoading: false,
      isForecastsLoading: false,
      isCurrentConditionsError: false,
      forecasts: null,
    }

    render(<WeatherHero weather={weather} />)
    expect(screen.getByLabelText('Loading weather data')).toBeInTheDocument()
  })

  it('should show error state', () => {
    const weather = {
      currentConditions: null,
      location: null,
      isLoading: false,
      isCurrentConditionsLoading: false,
      isLocationLoading: false,
      isForecastsLoading: false,
      isCurrentConditionsError: true,
      forecasts: null,
    }

    render(<WeatherHero weather={weather} />)
    expect(screen.getByText('Error fetching weather data')).toBeInTheDocument()
  })

  it('should display weather data', () => {
    const weather = {
      currentConditions: {
        temperature: { degrees: 22 },
        feelsLikeTemperature: { degrees: 20 },
        weatherCondition: {
          description: { text: 'Sunny' },
          iconBaseUri: 'https://example.com/icon',
          type: 'clear'
        },
      },
      location: { city: 'New York' },
      isLoading: false,
      isCurrentConditionsLoading: false,
      isLocationLoading: false,
      isForecastsLoading: false,
      isCurrentConditionsError: false,
      forecasts: null,
    }

    render(<WeatherHero weather={weather} />)
    expect(screen.getByText('New York')).toBeInTheDocument()
    expect(screen.getByText('22°')).toBeInTheDocument()
  })
})
