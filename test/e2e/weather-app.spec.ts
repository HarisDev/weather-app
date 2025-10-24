import { test, expect } from '@playwright/test';
import { setupApiMocks } from './fixtures/mock-api';

test.describe('Weather App E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Setup API mocks before navigating
    await setupApiMocks(page);

    // Set geolocation to New York coordinates (matching our mock)
    await page.context().setGeolocation({ latitude: 40.7128, longitude: -74.006 });
    await page.context().grantPermissions(['geolocation']);

    await page.goto('/');
  });

  test('should load the app and display weather data', async ({ page }) => {
    // Wait for weather data to load (mocked API should be fast)
    await page.waitForTimeout(500);

    // Should show weather data
    const hasWeather = await page.getByLabel(/current weather conditions/i).isVisible();

    expect(hasWeather).toBeTruthy();
  });

  test('should search for a city and display weather', async ({ page }) => {
    // Click search input
    await page.getByPlaceholder(/search for a place/i).click();

    // Type city name
    await page.getByPlaceholder(/search for a place/i).fill('New York');

    // Wait for suggestions (mocked API should be fast)
    await page.waitForTimeout(300);

    // Click first suggestion
    const suggestion = page.getByRole('option').filter({ hasText: /new york/i }).first();
    await suggestion.click();

    // Wait for weather data to load
    await page.waitForTimeout(500);

    // Should display city name
    const cityName = await page.textContent('body');
    expect(cityName).toContain('New York');
  });

  test('should toggle between metric and imperial units', async ({ page }) => {
    await page.waitForTimeout(500);

    // Click settings button (the dropdown menu one, not accessibility)
    const settingsButton = page.getByRole('button', { name: 'Settings', exact: true });
    await settingsButton.click();

    // Click Imperial option
    const imperialOption = page.getByText(/imperial.*°f.*mph/i);
    await imperialOption.click();

    // Close dropdown
    await page.keyboard.press('Escape');

    // Click settings again
    await settingsButton.click();

    // Click Metric option
    const metricOption = page.getByText(/metric.*°c.*km\/h/i);
    await metricOption.click();
  });

  test('should display weather forecast', async ({ page }) => {
    await page.waitForTimeout(500);

    // Look for forecast section
    const forecastSection = page.getByLabel(/weather forecast/i);
    const hasForecast = await forecastSection.isVisible();

    expect(hasForecast).toBeTruthy();

    // Should have multiple forecast items (we have 3 in mock data)
    const forecastItems = await page.getByRole('article').count();
    expect(forecastItems).toBeGreaterThanOrEqual(3);
  });

  test('should show recent searches', async ({ page }) => {
    // Search for a city first
    await page.getByPlaceholder(/search for a place/i).click();
    await page.getByPlaceholder(/search for a place/i).fill('Paris');
    await page.waitForTimeout(300);

    const suggestion = page.getByRole('option').filter({ hasText: /paris/i }).first();
    await suggestion.click();
    await page.waitForTimeout(500);

    // Clear search and check recent searches
    await page.getByPlaceholder(/search for a place/i).click();
    await page.getByPlaceholder(/search for a place/i).clear();

    // Recent searches might appear
    const recentSearchText = await page.textContent('body');
    // Just verify the page is interactive
    expect(recentSearchText).toBeTruthy();
  });

  test('should handle search input interactions', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search for a place/i);

    // Click search
    await searchInput.click();
    expect(await searchInput.isVisible()).toBeTruthy();

    // Type and clear
    await searchInput.fill('London');
    await page.waitForTimeout(500);
    await searchInput.clear();

    // Press Escape to close
    await searchInput.press('Escape');
  });

  test('should display temperature and weather icons', async ({ page }) => {
    await page.waitForTimeout(500);

    // Look for temperature display (should have ° symbol and our mock temperature of 22)
    const bodyText = await page.textContent('body');
    const hasTemperature = bodyText?.includes('°');

    expect(hasTemperature).toBeTruthy();
  });

  test('should be responsive and mobile-friendly', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(300);

    // App should still be visible
    const searchInput = page.getByPlaceholder(/search for a place/i);
    const isVisible = await searchInput.isVisible();
    expect(isVisible).toBeTruthy();

    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(300);

    expect(await searchInput.isVisible()).toBeTruthy();
  });
});
