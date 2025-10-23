import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import Search from "@/components/main/search/search";
import * as googlePlacesHooks from "@/api/google-places/hooks";

vi.mock("@/api/google-places/hooks");

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe("Search component", () => {
  it("should render search input", () => {
    vi.mocked(googlePlacesHooks.usePlacesAutocomplete).mockReturnValue({
      data: undefined,
      isFetching: false,
    } as any);

    render(<Search />, { wrapper: createWrapper() });

    expect(screen.getByPlaceholderText("Search for a place...")).toBeInTheDocument();
  });

  it("should update input value on change", () => {
    vi.mocked(googlePlacesHooks.usePlacesAutocomplete).mockReturnValue({
      data: undefined,
      isFetching: false,
    } as any);

    render(<Search />, { wrapper: createWrapper() });

    const input = screen.getByPlaceholderText("Search for a place...") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "New York" } });

    expect(input.value).toBe("New York");
  });

  it("should show spinner when fetching", () => {
    vi.mocked(googlePlacesHooks.usePlacesAutocomplete).mockReturnValue({
      data: undefined,
      isFetching: true,
    } as any);

    const { container } = render(<Search />, { wrapper: createWrapper() });

    const spinner = container.querySelector('[role="status"]');
    expect(spinner).toBeInTheDocument();
  });

  it("should open popover on focus", () => {
    vi.mocked(googlePlacesHooks.usePlacesAutocomplete).mockReturnValue({
      data: undefined,
      isFetching: false,
    } as any);

    render(<Search />, { wrapper: createWrapper() });

    const input = screen.getByPlaceholderText("Search for a place...");
    fireEvent.focus(input);

    expect(screen.getByText("Start typing to search for a place.")).toBeInTheDocument();
  });
});
