import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCurrentConditions } from "@/api/google-weather/hooks";
import React from "react";
import type { CurrentConditionsInput } from "@/types/api/google-weather";

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => React.createElement(QueryClientProvider, { client: queryClient }, children);
};

vi.mock("./client");

describe("useCurrentConditions", () => {
  it("should return query result", () => {
    const input = {
      location: { latitude: 40.7128, longitude: -74.006 },
    };

    const { result } = renderHook(() => useCurrentConditions(input), {
      wrapper: createWrapper(),
    });

    expect(result.current).toBeDefined();
    expect(result.current.data).toBeUndefined();
  });

  it("should not fetch when input is null", () => {
    const { result } = renderHook(() => useCurrentConditions(null), {
      wrapper: createWrapper(),
    });

    expect(result.current.isFetching).toBe(false);
  });

  it("should not fetch when location is missing", () => {
    const { result } = renderHook(() => useCurrentConditions({} as CurrentConditionsInput), {
      wrapper: createWrapper(),
    });

    expect(result.current.isFetching).toBe(false);
  });
});
