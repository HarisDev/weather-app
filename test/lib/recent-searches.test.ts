import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getRecentSearches, addRecentSearch } from '@/lib/recent-searches'

describe('recent-searches', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  describe('getRecentSearches', () => {
    it('should return empty array when no searches stored', () => {
      expect(getRecentSearches()).toEqual([])
    })

    it('should return stored searches', () => {
      const searches = [{ name: 'New York', location: { latitude: 40.7, longitude: -74.0 } }]
      localStorage.setItem('recentSearches', JSON.stringify(searches))
      expect(getRecentSearches()).toEqual(searches)
    })
  })

  describe('addRecentSearch', () => {
    it('should add new search', () => {
      const search = { name: 'New York', location: { latitude: 40.7, longitude: -74.0 } }
      addRecentSearch(search)
      expect(getRecentSearches()).toEqual([search])
    })

    it('should limit to 3 most recent searches', () => {
      addRecentSearch({ name: 'City1', location: { latitude: 1, longitude: 1 } })
      addRecentSearch({ name: 'City2', location: { latitude: 2, longitude: 2 } })
      addRecentSearch({ name: 'City3', location: { latitude: 3, longitude: 3 } })
      addRecentSearch({ name: 'City4', location: { latitude: 4, longitude: 4 } })

      const searches = getRecentSearches()
      expect(searches.length).toBe(3)
      expect(searches[0].name).toBe('City4')
    })

    it('should remove duplicate searches by name', () => {
      addRecentSearch({ name: 'New York', location: { latitude: 40.7, longitude: -74.0 } })
      addRecentSearch({ name: 'London', location: { latitude: 51.5, longitude: -0.1 } })
      addRecentSearch({ name: 'New York', location: { latitude: 40.8, longitude: -74.1 } })

      const searches = getRecentSearches()
      expect(searches.length).toBe(2)
      expect(searches[0].name).toBe('New York')
      expect(searches[0].location.latitude).toBe(40.8)
    })
  })
})
