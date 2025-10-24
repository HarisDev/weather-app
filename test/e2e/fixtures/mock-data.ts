/**
 * Mock API responses for E2E testing
 */

export const mockGeoIpResponse = {
  latitude: 40.7128,
  longitude: -74.006,
  city: "New York",
  country_name: "United States",
  country_region: "New York",
};

export const mockCurrentConditions = {
  currentTime: "2025-10-24T07:34:25.150681931Z",
  timeZone: {
    id: "Europe/Sarajevo",
  },
  isDaytime: true,
  weatherCondition: {
    iconBaseUri: "https://maps.gstatic.com/weather/v1/partly_cloudy",
    description: {
      text: "Partly cloudy",
      languageCode: "en",
    },
    type: "PARTLY_CLOUDY",
  },
  temperature: {
    degrees: 22,
    unit: "CELSIUS",
  },
  feelsLikeTemperature: {
    degrees: 22,
    unit: "CELSIUS",
  },
};

export const mockDailyForecast = {
  forecastDays: [
    {
      interval: {
        startTime: "2025-10-24T05:00:00Z",
        endTime: "2025-10-25T05:00:00Z",
      },
      displayDate: {
        year: 2025,
        month: 10,
        day: 24,
      },
      daytimeForecast: {
        weatherCondition: {
          iconBaseUri: "https://maps.gstatic.com/weather/v1/partly_cloudy",
          description: {
            text: "Partly sunny",
            languageCode: "en",
          },
          type: "PARTLY_CLOUDY",
        },
      },
      nighttimeForecast: {
        weatherCondition: {
          iconBaseUri: "https://maps.gstatic.com/weather/v1/mostly_cloudy_night",
          description: {
            text: "Mostly cloudy",
            languageCode: "en",
          },
          type: "MOSTLY_CLOUDY",
        },
      },
      maxTemperature: {
        degrees: 14.7,
        unit: "CELSIUS",
      },
      minTemperature: {
        degrees: 6.3,
        unit: "CELSIUS",
      },
    },
    {
      interval: {
        startTime: "2025-10-25T05:00:00Z",
        endTime: "2025-10-26T06:00:00Z",
      },
      displayDate: {
        year: 2025,
        month: 10,
        day: 25,
      },
      daytimeForecast: {
        weatherCondition: {
          iconBaseUri: "https://maps.gstatic.com/weather/v1/drizzle",
          description: {
            text: "Light rain",
            languageCode: "en",
          },
          type: "LIGHT_RAIN",
        },
      },
      nighttimeForecast: {
        weatherCondition: {
          iconBaseUri: "https://maps.gstatic.com/weather/v1/drizzle",
          description: {
            text: "Light rain",
            languageCode: "en",
          },
          type: "LIGHT_RAIN",
        },
      },
      maxTemperature: {
        degrees: 15,
        unit: "CELSIUS",
      },
      minTemperature: {
        degrees: 6.7,
        unit: "CELSIUS",
      },
    },
    {
      interval: {
        startTime: "2025-10-26T06:00:00Z",
        endTime: "2025-10-27T06:00:00Z",
      },
      displayDate: {
        year: 2025,
        month: 10,
        day: 26,
      },
      daytimeForecast: {
        weatherCondition: {
          iconBaseUri: "https://maps.gstatic.com/weather/v1/drizzle",
          description: {
            text: "Light rain",
            languageCode: "en",
          },
          type: "LIGHT_RAIN",
        },
      },
      nighttimeForecast: {
        weatherCondition: {
          iconBaseUri: "https://maps.gstatic.com/weather/v1/drizzle",
          description: {
            text: "Light rain",
            languageCode: "en",
          },
          type: "LIGHT_RAIN",
        },
      },
      maxTemperature: {
        degrees: 14.9,
        unit: "CELSIUS",
      },
      minTemperature: {
        degrees: 7.4,
        unit: "CELSIUS",
      },
    },
  ],
  timeZone: "Europe/Sarajevo",
};

export const mockReverseGeocodeResponse = {
  status: "OK",
  results: [
    {
      address_components: [
        {
          long_name: "New York",
          short_name: "NY",
          types: ["locality", "political"],
        },
        {
          long_name: "United States",
          short_name: "US",
          types: ["country", "political"],
        },
      ],
      formatted_address: "New York, NY, USA",
    },
  ],
  plus_code: {
    compound_code: "P27Q+MC New York, NY, USA",
  },
};

// Mock data for Paris search
export const mockParisGeocode = {
  status: "OK",
  results: [
    {
      address_components: [
        {
          long_name: "Paris",
          short_name: "Paris",
          types: ["locality", "political"],
        },
        {
          long_name: "France",
          short_name: "FR",
          types: ["country", "political"],
        },
      ],
      formatted_address: "Paris, France",
      geometry: {
        location: {
          lat: 48.8566,
          lng: 2.3522,
        },
      },
    },
  ],
};

export const mockParisCurrentConditions = {
  currentTime: "2025-10-24T07:34:25.150681931Z",
  timeZone: {
    id: "Europe/Paris",
  },
  isDaytime: true,
  weatherCondition: {
    iconBaseUri: "https://maps.gstatic.com/weather/v1/cloudy",
    description: {
      text: "Cloudy",
      languageCode: "en",
    },
    type: "CLOUDY",
  },
  temperature: {
    degrees: 18,
    unit: "CELSIUS",
  },
  feelsLikeTemperature: {
    degrees: 18,
    unit: "CELSIUS",
  },
};

export const mockParisForecast = {
  forecastDays: [
    {
      interval: {
        startTime: "2025-10-24T05:00:00Z",
        endTime: "2025-10-25T05:00:00Z",
      },
      displayDate: {
        year: 2025,
        month: 10,
        day: 24,
      },
      daytimeForecast: {
        weatherCondition: {
          iconBaseUri: "https://maps.gstatic.com/weather/v1/cloudy",
          description: {
            text: "Cloudy",
            languageCode: "en",
          },
          type: "CLOUDY",
        },
      },
      nighttimeForecast: {
        weatherCondition: {
          iconBaseUri: "https://maps.gstatic.com/weather/v1/cloudy",
          description: {
            text: "Cloudy",
            languageCode: "en",
          },
          type: "CLOUDY",
        },
      },
      maxTemperature: {
        degrees: 19,
        unit: "CELSIUS",
      },
      minTemperature: {
        degrees: 12,
        unit: "CELSIUS",
      },
    },
    {
      interval: {
        startTime: "2025-10-25T05:00:00Z",
        endTime: "2025-10-26T06:00:00Z",
      },
      displayDate: {
        year: 2025,
        month: 10,
        day: 25,
      },
      daytimeForecast: {
        weatherCondition: {
          iconBaseUri: "https://maps.gstatic.com/weather/v1/rain",
          description: {
            text: "Rainy",
            languageCode: "en",
          },
          type: "RAIN",
        },
      },
      nighttimeForecast: {
        weatherCondition: {
          iconBaseUri: "https://maps.gstatic.com/weather/v1/rain",
          description: {
            text: "Rainy",
            languageCode: "en",
          },
          type: "RAIN",
        },
      },
      maxTemperature: {
        degrees: 17,
        unit: "CELSIUS",
      },
      minTemperature: {
        degrees: 11,
        unit: "CELSIUS",
      },
    },
  ],
  timeZone: "Europe/Paris",
};
