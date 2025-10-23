/**
 * Sienna Web Accessibility Widget Helper Functions
 * Provides a safe interface to interact with the Sienna accessibility widget
 */

/**
 * Toggle the Sienna accessibility widget visibility
 */
export function toggleAccessibilityWidget(): void {
  const widget = document.querySelector(".asw-widget a");
  if (widget) {
    (widget as HTMLElement).click();
  }
}
