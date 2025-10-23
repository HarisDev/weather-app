import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import Suggestion from "@/components/main/search/suggestion";
import * as googlePlacesHooks from "@/api/google-places/hooks";
import * as googleWeatherHooks from "@/api/google-weather/hooks";
import { CurrentWeatherProvider } from "@/contexts/CurrentWeatherContext";

vi.mock("@/api/google-places/hooks");
vi.mock("@/api/google-weather/hooks");

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(
      QueryClientProvider,
      { client: queryClient },
      React.createElement(CurrentWeatherProvider, null, children)
    );
};

const mockSuggestion = {
  placePrediction: {
    place: "places/123",
    placeId: "123",
    structuredFormat: {
      mainText: { text: "New York" },
      secondaryText: { text: "NY, USA" },
    },
  },
};

describe("Suggestion component", () => {
  it("should render place name", () => {
    vi.mocked(googlePlacesHooks.usePlaceDetails).mockReturnValue({
      data: undefined,
    } as any);

    vi.mocked(googleWeatherHooks.useCurrentConditions).mockReturnValue({
      data: undefined,
      isFetching: false,
    } as any);

    render(<Suggestion suggestion={mockSuggestion} handleClose={() => {}} />, { wrapper: createWrapper() });

    expect(screen.getByText("New York")).toBeInTheDocument();
    expect(screen.getByText("NY, USA")).toBeInTheDocument();
  });

  it("should show skeleton when weather is loading", () => {
    vi.mocked(googlePlacesHooks.usePlaceDetails).mockReturnValue({
      data: { location: { latitude: 40.7128, longitude: -74.006 } },
    } as any);

    vi.mocked(googleWeatherHooks.useCurrentConditions).mockReturnValue({
      data: undefined,
      isFetching: true,
    } as any);

    const { container } = render(<Suggestion suggestion={mockSuggestion} handleClose={() => {}} />, { wrapper: createWrapper() });

    const skeleton = container.querySelector(".animate-pulse");
    expect(skeleton).toBeInTheDocument();
  });

  it("should display weather data when available", () => {
    vi.mocked(googlePlacesHooks.usePlaceDetails).mockReturnValue({
      data: { location: { latitude: 40.7128, longitude: -74.006 } },
    } as any);

    vi.mocked(googleWeatherHooks.useCurrentConditions).mockReturnValue({
      data: {
        temperature: { degrees: 22.5 },
        weatherCondition: {
          description: { text: "Sunny" },
          iconBaseUri: "https://example.com/icon",
        },
      },
      isFetching: false,
    } as any);

    render(<Suggestion suggestion={mockSuggestion} handleClose={() => {}} />, { wrapper: createWrapper() });

    expect(screen.getByText("23°")).toBeInTheDocument();
    expect(screen.getByAltText("Sunny")).toBeInTheDocument();
  });

  it("should render map pin icon", () => {
    vi.mocked(googlePlacesHooks.usePlaceDetails).mockReturnValue({
      data: undefined,
    } as any);

    vi.mocked(googleWeatherHooks.useCurrentConditions).mockReturnValue({
      data: undefined,
      isFetching: false,
    } as any);

    const { container } = render(<Suggestion suggestion={mockSuggestion} handleClose={() => {}} />, { wrapper: createWrapper() });

    const mapPinIcon = container.querySelector("svg");
    expect(mapPinIcon).toBeInTheDocument();
  });
});
