import { test, expect, Page } from '@playwright/test';

const post = {
  title: 'Testinlägg',
  body: 'Detta är ett test',
  quote: 'genväg är ofta senväg',
  author: 'unknown',
  tag: 'test',
} as const;

const updatePost = {
  title: 'Uppdaterat Testinlägg',
  body: 'Detta är ett uppdaterat test',
  quote: 'genväg är inte längre senvägar',
  author: 'unknown',
  tag: 'test',
} as const;

test.describe('Navigation', () => {
  const baseURL = process.env.BASE_URL;
  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;

  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
    if (await page.getByRole('button', { name: 'Logga ut' }).isVisible()) {
      await page.goto(baseURL + 'posts');
    } else {
      await page.getByRole('link', { name: 'Logga in' }).click();
      await page.getByRole('textbox', { name: 'Email' }).click();
      await page.getByRole('textbox', { name: 'Email' }).fill(email);
      await page.getByRole('textbox', { name: 'Password' }).click();
      await page.getByRole('textbox', { name: 'Password' }).fill(password);
      await page.getByRole('button', { name: 'Login' }).click();
      await page.waitForSelector('[data-testid="home"]');
      await page.goto(baseURL + 'posts');
    }
    await page.waitForSelector('.post');
  });
  test('test edit link', async ({ page }) => {
    await page.waitForSelector('.post');
    await page.getByRole('link', { name: 'Redigera inlägg' }).first().click();
    await expect(
      page.getByRole('button', { name: 'Uppdatera inlägg' })
    ).toBeVisible();
    await page.getByRole('button', { name: 'Uppdatera inlägg' }).click();
  });

  test('test create link', async ({ page }) => {
    await page.goto(baseURL);
    // Click the create link.
    await page.getByRole('link', { name: 'Skapa inlägg' }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(
      page.getByRole('button', { name: 'Skapa inlägg' })
    ).toBeVisible();
    await expect(page).toHaveURL(baseURL + 'create');
  });

  test('test gallery link', async ({ page }) => {
    await page.goto(baseURL);
    // Click the create link.
    await page.getByRole('link', { name: 'Galleri' }).click();

    // Expects page to have a testId Gallery
    await expect(page.getByTestId('gallery')).toBeVisible();
    await expect(page).toHaveURL(baseURL + 'gallery');
  });

  test('test details link', async ({ page }) => {
    await page.goto(baseURL + 'posts');
    await page.waitForSelector('.post');
    await page.getByRole('link', { name: 'Läs mer' }).first().click();
    await page.waitForSelector('.details');

    // Expects page to have a testId details
    await expect(page.getByTestId('details')).toBeVisible();

    await expect(page.getByRole('button', { name: 'ta bort' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'redigera' })).toBeVisible();
  });
});

test.describe('Formulärinmatning och validering', () => {
  const baseURL = process.env.BASE_URL;
  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
    if (await page.getByRole('button', { name: 'Logga ut' }).isVisible()) {
      await page.goto(baseURL + 'posts');
    } else {
      await page.getByRole('link', { name: 'Logga in' }).click();
      await page.getByRole('textbox', { name: 'Email' }).click();
      await page.getByRole('textbox', { name: 'Email' }).fill(email);
      await page.getByRole('textbox', { name: 'Password' }).click();
      await page.getByRole('textbox', { name: 'Password' }).fill(password);
      await page.getByRole('button', { name: 'Login' }).click();
      await page.waitForSelector('[data-testid="home"]');
      await page.goto(baseURL + 'posts');
    }
    await page.waitForSelector('.post');
    await cleanTestPost(page);
  });

  test('Skapa och ta bort ett inlägg', async ({ page }) => {
    await createAndCheckDefaultPost(page);
    await expect(page.getByTestId('posts')).toBeVisible();
    await expect(page.getByText(post.title)).toBeVisible();

    await removeAndCheckDefaultPost(page);
    await expect(page.getByText(post.title)).not.toBeVisible();
  });
  test('Skapa, uppdatera och ta bort inlägg', async ({ page }) => {
    await createAndCheckDefaultPost(page);
    await expect(page.getByTestId('posts')).toBeVisible();
    await expect(page.getByText(post.title)).toBeVisible();

    await updateAndCheckDefaultPost(page);
    await expect(page.getByTestId('posts')).toBeVisible();
    await expect(page.getByText(updatePost.title)).toBeVisible();
    await expect(page.getByText(updatePost.body)).toBeVisible();

    await removeAndCheckDefaultPost(page);
    await expect(page.getByText(post.title)).not.toBeVisible();
  });
});

async function createAndCheckDefaultPost(page: Page) {
  await page.getByRole('link', { name: 'Skapa inlägg' }).click();
  await page.locator('input[type="text"]').first().click();
  await page.locator('input[type="text"]').first().fill(post.title);
  await page.locator('input[type="text"]').nth(2).click();
  await page.locator('input[type="text"]').nth(2).fill(post.quote);
  await page.locator('input[type="text"]').nth(3).click();
  await page.locator('input[type="text"]').nth(3).fill(post.author);
  await page.locator('textarea').click();
  await page.locator('textarea').fill(post.body);
  await page.locator('input[type="text"]').nth(4).click();
  await page.locator('input[type="text"]').nth(4).fill(post.tag);
  await page.locator('input[type="text"]').nth(4).press('Enter');
  await page.getByRole('button', { name: 'Skapa inlägg' }).click();
  await page.waitForSelector('.post');
}

async function removeAndCheckDefaultPost(page: Page) {
  await page.getByText('delete').first().click();
  await page.getByTestId('modal-remove').click();
}

async function cleanTestPost(page: Page) {
  if (
    (await page.getByText('Testinlägg').first().isVisible()) ||
    (await page.getByText('Uppdaterat Testinlägg').first().isVisible())
  ) {
    await page.getByText('delete').first().click();
    await page.getByTestId('modal-remove').click();
  }
}
async function updateAndCheckDefaultPost(page: Page) {
  await page.getByRole('link', { name: 'redigera' }).first().click();
  await page.locator('input[type="text"]').first().click();
  await page.locator('input[type="text"]').first().fill(updatePost.title);
  await page.locator('input[type="text"]').nth(2).click();
  await page.locator('input[type="text"]').nth(2).fill(updatePost.quote);
  await page.locator('textarea').click();

  await page.locator('textarea').fill(updatePost.body);
  await page.getByRole('button', { name: 'Uppdatera inlägg' }).click();
}
