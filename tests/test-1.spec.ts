import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://brave-hill-0cffb3403.6.azurestaticapps.net/');
  await page.getByRole('link', { name: 'edit' }).first().click();
  await expect(page.getByRole('button', { name: 'Update Post' })).toBeVisible();
  await page.getByRole('button', { name: 'Update Post' }).click();
  await expect(page.getByText('"Perfect is the enemy of good"')).toBeVisible();

  // Click the get started link.
  await page.getByRole('link', { name: 'Create' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('button', { name: 'Add Post' })).toBeVisible();
});
