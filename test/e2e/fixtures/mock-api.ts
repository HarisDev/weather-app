import type { Page } from "@playwright/test";
import { mockGeoIpResponse, mockCurrentConditions, mockDailyForecast, mockReverseGeocodeResponse, mockParisCurrentConditions, mockParisForecast } from "./mock-data";
import type { PlacePrediction } from "@/types/api/google-places";

/**
 * Setup API mocking for Playwright tests
 * Set USE_REAL_API=true environment variable to disable mocking
 */
export async function setupApiMocks(page: Page) {
  // Skip mocking if USE_REAL_API is set
  if (process.env.USE_REAL_API === "true") {
    console.log("Using real APIs for testing");
    return;
  }

  // Mock Geo IP API
  await page.route("**/ip-api.com/json**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockGeoIpResponse),
    });
  });

  // Mock Google Weather API - Current Conditions
  await page.route("**/weather.googleapis.com/v1/currentConditions:lookup**", async (route) => {
    const url = new URL(route.request().url());
    const latitude = url.searchParams.get("location.latitude");

    // Return different data based on location (for testing different cities)
    let response = mockCurrentConditions;
    if (latitude === "48.8566" || (parseFloat(latitude || "0") > 48 && parseFloat(latitude || "0") < 49)) {
      response = mockParisCurrentConditions;
    }

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(response),
    });
  });

  // Mock Google Weather API - Daily Forecast
  await page.route("**/weather.googleapis.com/v1/forecast/days:lookup**", async (route) => {
    const url = new URL(route.request().url());
    const latitude = url.searchParams.get("location.latitude");

    // Return different data based on location
    let response = mockDailyForecast;
    if (latitude === "48.8566" || (parseFloat(latitude || "0") > 48 && parseFloat(latitude || "0") < 49)) {
      response = mockParisForecast;
    }

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(response),
    });
  });

  // Mock Google Geocoding API - Reverse Geocode
  await page.route("**/maps.googleapis.com/maps/api/geocode/json**", async (route) => {
    const url = new URL(route.request().url());
    const latlng = url.searchParams.get("latlng");

    let response = mockReverseGeocodeResponse;

    // Handle Paris coordinates
    if (latlng?.includes("48.8566") || latlng?.includes("48.85")) {
      response = {
        status: "OK",
        results: [
          {
            address_components: [
              {
                long_name: "Paris",
                short_name: "Paris",
                types: ["locality", "political"],
              },
            ],
            formatted_address: "Paris, France",
          },
        ],
        plus_code: {
          compound_code: "VR5M+27 Paris, France",
        },
      };
    }

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(response),
    });
  });

  // Mock Google Places API - Autocomplete (for search)
  await page.route("**/places.googleapis.com/v1/**", async (route) => {
    const url = route.request().url();

    // Handle place details requests first (more specific match)
    if (url.includes("places.googleapis.com/v1/places/") && !url.includes("autocomplete")) {
      const placeId = url.split("/places/")[1]?.split("?")[0];

      let place = {
        id: placeId || "ChIJOwg_06VPwokRYv534QaPC8g",
        location: { latitude: 40.7128, longitude: -74.006 },
        displayName: "New York",
        formattedAddress: "New York, NY, USA",
      };

      if (placeId === "ChIJD7fiBh9u5kcRYJSMaMOCCwQ") {
        place = {
          id: placeId,
          location: { latitude: 48.8566, longitude: 2.3522 },
          displayName: "Paris",
          formattedAddress: "Paris, France",
        };
      } else if (placeId === "ChIJdd4hrwug2EcRmSrV3Vo6llI") {
        place = {
          id: placeId,
          location: { latitude: 51.5074, longitude: -0.1278 },
          displayName: "London",
          formattedAddress: "London, UK",
        };
      }

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(place),
      });
      return;
    }

    // Handle autocomplete requests
    if (url.includes("autocomplete")) {
      const body = route.request().postDataJSON();
      const input = body?.input?.toLowerCase() || "";

      let suggestions: { placePrediction: PlacePrediction }[] = [];

      if (input.includes("new york")) {
        suggestions = [
          {
            placePrediction: {
              place: "places/ChIJOwg_06VPwokRYv534QaPC8g",
              placeId: "ChIJOwg_06VPwokRYv534QaPC8g",
              structuredFormat: {
                mainText: {
                  text: "New York",
                  matches: [{ endOffset: 8 }],
                },
                secondaryText: { text: "NY, USA" },
              },
            },
          },
        ];
      } else if (input.includes("paris")) {
        suggestions = [
          {
            placePrediction: {
              place: "places/ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
              placeId: "ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
              structuredFormat: {
                mainText: {
                  text: "Paris",
                  matches: [{ endOffset: 5 }],
                },
                secondaryText: { text: "France" },
              },
            },
          },
        ];
      } else if (input.includes("london")) {
        suggestions = [
          {
            placePrediction: {
              place: "places/ChIJdd4hrwug2EcRmSrV3Vo6llI",
              placeId: "ChIJdd4hrwug2EcRmSrV3Vo6llI",
              structuredFormat: {
                mainText: {
                  text: "London",
                  matches: [{ endOffset: 6 }],
                },
                secondaryText: { text: "UK" },
              },
            },
          },
        ];
      }

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ suggestions }),
      });
      return;
    }

    // If no route matched, continue with the request
    await route.continue();
  });
}
