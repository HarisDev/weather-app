import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { usePlacesAutocomplete, usePlaceDetails } from '@/api/google-places/hooks'
import React from 'react'

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children)
}

vi.mock('./client')

describe('google-places hooks', () => {
  describe('usePlacesAutocomplete', () => {
    it('should return query result', () => {
      const { result } = renderHook(() => usePlacesAutocomplete('test'), {
        wrapper: createWrapper(),
      })

      expect(result.current).toBeDefined()
      expect(result.current.data).toBeUndefined()
    })

    it('should not fetch when input is empty', () => {
      const { result } = renderHook(() => usePlacesAutocomplete(''), {
        wrapper: createWrapper(),
      })

      expect(result.current.isFetching).toBe(false)
    })
  })

  describe('usePlaceDetails', () => {
    it('should return query result', () => {
      const { result } = renderHook(() => usePlaceDetails('123'), {
        wrapper: createWrapper(),
      })

      expect(result.current).toBeDefined()
    })

    it('should not fetch when placeId is null', () => {
      const { result } = renderHook(() => usePlaceDetails(null), {
        wrapper: createWrapper(),
      })

      expect(result.current.isFetching).toBe(false)
    })
  })
})
