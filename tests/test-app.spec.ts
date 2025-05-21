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
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL + 'posts');
  });
  test('test edit link', async ({ page }) => {
    await page.getByRole('link', { name: 'edit' }).first().click();
    await expect(
      page.getByRole('button', { name: 'Update Post' })
    ).toBeVisible();
    await page.getByRole('button', { name: 'Update Post' }).click();
  });

  test('test create link', async ({ page }) => {
    // Click the create link.
    await page.getByRole('link', { name: 'Create' }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('button', { name: 'Add Post' })).toBeVisible();
    await expect(page).toHaveURL(baseURL + 'create');
  });

  test('test gallery link', async ({ page }) => {
    // Click the create link.
    await page.getByRole('link', { name: 'Gallery' }).click();

    // Expects page to have a testId Gallery
    await expect(page.getByTestId('gallery')).toBeVisible();
    await expect(page).toHaveURL(baseURL + 'gallery');
  });

  test('test details link', async ({ page }) => {
    await page.getByRole('link', { name: 'Läs mer' }).first().click();

    // Expects page to have a testId details
    await expect(page.getByTestId('details')).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Delete post' })
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Edit post' })).toBeVisible();
  });
});

test.describe('Formulärinmatning och validering', () => {
  const baseURL = process.env.BASE_URL;
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL + 'posts');
    // await resetEnvironmentForTests(page);
  });

  test('Skapa och ta bort ett inlägg', async ({ page }) => {
    await createAndCheckDefaultPost(page);
    await expect(page.getByTestId('posts')).toBeVisible();
    await expect(page.getByText(post.title)).toBeVisible();

    await removeAndCheckDefaultPost(page, post);
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

    await removeAndCheckDefaultPost(page, updatePost);
    await expect(page.getByText(post.title)).not.toBeVisible();
  });
});

async function createAndCheckDefaultPost(page: Page) {
  await page.getByRole('link', { name: 'Create Post' }).click();
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
  await page.getByRole('button', { name: 'Add Post' }).click();
}

// async function resetEnvironmentForTests(page: Page) {
//   if (page.getByText(post.title).isVisible()) {
//     debugger;
//     await page.getByText('delete').first().click();
//     await page.getByRole('button', { name: 'Ta bort' }).click();
//     await expect(page.getByText(post.title)).not.toBeVisible();
//   }
// }

async function removeAndCheckDefaultPost(page: Page, post) {
  await page.getByText('delete').first().click();
  await page.getByRole('button', { name: 'Ta bort' }).click();
}

async function updateAndCheckDefaultPost(page: Page) {
  await page.getByRole('link', { name: 'edit' }).first().click();
  await page.locator('input[type="text"]').first().click();
  await page.locator('input[type="text"]').first().fill(updatePost.title);
  await page.locator('input[type="text"]').nth(2).click();
  await page.locator('input[type="text"]').nth(2).fill(updatePost.quote);
  await page.locator('textarea').click();

  await page.locator('textarea').fill(updatePost.body);
  await page.getByRole('button', { name: 'Update Post' }).click();
}
