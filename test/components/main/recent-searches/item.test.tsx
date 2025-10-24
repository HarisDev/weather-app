import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import RecentSearchItem from '@/components/main/recent-searches/item'
import * as googleWeatherHooks from '@/api/google-weather/hooks'
import { CurrentWeatherProvider } from '@/contexts/CurrentWeatherContext'
import { UnitsSystemProvider } from '@/contexts/UnitsSystemContext'

vi.mock('@/api/google-weather/hooks')

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(
      QueryClientProvider,
      { client: queryClient },
      React.createElement(UnitsSystemProvider, null,
        React.createElement(CurrentWeatherProvider, null, children)
      )
    )
}

describe('RecentSearchItem', () => {
  it('should render location name', () => {
    vi.mocked(googleWeatherHooks.useCurrentConditions).mockReturnValue({
      data: undefined,
      isFetching: false,
    } as any)

    render(<RecentSearchItem name="New York" latitude={40.7} longitude={-74.0} />, { wrapper: createWrapper() })

    expect(screen.getByText('New York')).toBeInTheDocument()
  })

  it('should show skeleton when weather is loading', () => {
    vi.mocked(googleWeatherHooks.useCurrentConditions).mockReturnValue({
      data: undefined,
      isFetching: true,
    } as any)

    const { container } = render(<RecentSearchItem name="London" latitude={51.5} longitude={-0.1} />, { wrapper: createWrapper() })

    const skeleton = container.querySelector('.animate-pulse')
    expect(skeleton).toBeInTheDocument()
  })

  it('should display weather data when available', () => {
    vi.mocked(googleWeatherHooks.useCurrentConditions).mockReturnValue({
      data: {
        temperature: { degrees: 22.5 },
        weatherCondition: {
          description: { text: 'Sunny' },
          iconBaseUri: 'https://example.com/icon',
        },
      },
      isFetching: false,
    } as any)

    render(<RecentSearchItem name="Paris" latitude={48.8} longitude={2.3} />, { wrapper: createWrapper() })

    expect(screen.getByText('Sunny, 23°')).toBeInTheDocument()
    expect(screen.getByAltText('Sunny')).toBeInTheDocument()
  })
})
