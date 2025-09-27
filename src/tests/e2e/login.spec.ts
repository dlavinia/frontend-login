import { test, expect } from "@playwright/test";

test("successful login should redirect to profile page", async ({ page }) => {

  await page.goto("http://localhost:5173");

  await page.fill('input[name="email"]', "cliente@youdrive.com");
  await page.fill('input[name="password"]', "password");
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL("http://localhost:5173/profile");
  await page.waitForSelector('[data-testid="name-user"]')

  await expect(page.getByTestId("name-user")).toContainText("Cliente");
  await expect(page.getByTestId("email-user")).toContainText("cliente@youdrive.com");

});

test("fail login should display error message", async ({ page }) => {

  await page.goto("http://localhost:5173");

  await page.fill('input[name="email"]', "cliente@youdrive.com");
  await page.fill('input[name="password"]', "password-wrong");
  await page.click('button[type="submit"]');

  await expect(page.locator("#form-error")).toContainText("Invalid email or password!");

});



