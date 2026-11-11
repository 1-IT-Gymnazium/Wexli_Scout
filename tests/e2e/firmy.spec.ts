import { expect, test } from "@playwright/test";

test("stránka Firmy se načte", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Firmy" })).toBeVisible();
});
