import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('test', async ({ page }) => {
    const baseURL = process.env.BASE_URL;
    await page.goto(baseURL);
    await page.getByRole('link', { name: 'edit' }).first().click();
    await expect(
      page.getByRole('button', { name: 'Update Post' })
    ).toBeVisible();
    await page.getByRole('button', { name: 'Update Post' }).click();
    await expect(
      page.getByText('"Perfect is the enemy of good"')
    ).toBeVisible();

    // Click the get started link.
    await page.getByRole('link', { name: 'Create' }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('button', { name: 'Add Post' })).toBeVisible();
  });
});
