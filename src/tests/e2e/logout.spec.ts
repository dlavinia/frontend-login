import { test, expect } from "@playwright/test";

test("successful logout should redirect to login page", async ({ page }) => {

  await page.goto("http://localhost:5173");

  await page.fill('input[name="email"]', "cliente@youdrive.com");
  await page.fill('input[name="password"]', "password");
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL("http://localhost:5173/profile");
  await page.waitForSelector('[data-testid="btn-logout"]')
  await page.click('[data-testid="btn-logout"]');

  await expect(page).toHaveURL("http://localhost:5173/login");

});





