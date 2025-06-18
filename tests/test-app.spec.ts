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
const baseURL = process.env.BASE_URL;
const email = process.env.EMAIL;
const password = process.env.PASSWORD;
test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await arrangeBeforeTest(page);
  });
  test('test edit link', async ({ page }) => {
    await createAndCheckDefaultPost(page);
    await page.getByRole('link', { name: 'Redigera inlägg' }).first().click();
    await expect(
      page.getByRole('button', { name: 'Uppdatera inlägg' })
    ).toBeVisible();
    await page.getByRole('button', { name: 'Uppdatera inlägg' }).click();
    await removeAndCheckDefaultPost(page);
  });

  test('test create link', async ({ page }) => {
    // Click the create link.
    await page.getByRole('link', { name: 'Skapa inlägg' }).first().click();

    // Expects page to have a heading with the name of Installation.
    await expect(
      page.getByRole('button', { name: 'Skapa inlägg' })
    ).toBeVisible();
    await expect(page).toHaveURL(baseURL + 'create');
  });

  test('test gallery link', async ({ page }) => {
    // Click the create link.
    await page.getByRole('link', { name: 'Galleri' }).click();

    // Expects page to have a testId Gallery
    await expect(page.getByTestId('gallery')).toBeVisible();
    await expect(page).toHaveURL(baseURL + 'gallery');
  });

  test('test details link', async ({ page }) => {
    await createAndCheckDefaultPost(page);

    await page.getByRole('link', { name: 'Läs mer' }).first().click();
    await page.waitForSelector('.details');

    // Expects page to have a testId details
    await expect(page.getByTestId('details')).toBeVisible();

    await expect(page.getByRole('button', { name: 'ta bort' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'redigera' })).toBeVisible();
    await removeAndCheckDefaultPost(page);
  });
});

test.describe('Inloggning och utloggning', () => {
  test('Logga in och ut', async ({ page }) => {
    await page.goto(baseURL);
    if (await page.getByRole('button', { name: 'Logga ut' }).isVisible()) {
      await page.getByRole('button', { name: 'Logga ut' }).click();
    }
    // Click the login link.
    await page.getByRole('link', { name: 'Logga in' }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(
      page.getByRole('heading', { name: 'Admin inloggning' })
    ).toBeVisible();
    await expect(page).toHaveURL(baseURL + 'login');

    // Fill in the login form.
    await page.getByRole('textbox', { name: 'E-mejl' }).fill(email);
    await page.getByRole('textbox', { name: 'Lösenord' }).fill(password);
    await page.getByRole('button', { name: 'Logga in' }).click();

    // Expects to be logged in and redirected to home.
    await expect(page.getByTestId('home')).toBeVisible();
    await expect(page).toHaveURL(baseURL);

    // Click the logout button.
    await page.getByRole('button', { name: 'Logga ut' }).click();

    // Expects to be logged out and redirected to home.
    await expect(page.getByTestId('admin-login')).toBeVisible();
    await expect(page).toHaveURL(baseURL + 'login');
  });
});

test.describe('Formulärinmatning och validering', () => {
  test.beforeEach(async ({ page }) => {
    await arrangeBeforeTest(page);
  });

  test('Skapa och ta bort ett inlägg', async ({ page }) => {
    await createAndCheckDefaultPost(page);
    await expect(page.getByTestId('posts')).toBeVisible();
    await expect(page.getByText(post.title).first()).toBeVisible();

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
  await page.getByRole('link', { name: 'Skapa inlägg' }).first().click();
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
  await page.waitForSelector('[data-testid="posts"]');
}

async function removeAndCheckDefaultPost(page: Page) {
  await page.getByTestId('remove-post-button').click();
  await page.getByTestId('modal-remove').click();
}

async function cleanTestPost(page: Page) {
  if (await page.getByText('Testinlägg').first().isVisible()) {
    await page.getByTestId('remove-post-button').first().click();
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

async function arrangeBeforeTest(page: Page) {
  await page.goto(baseURL);
  if (await page.getByRole('button', { name: 'Logga ut' }).isVisible()) {
    await page.goto(baseURL + 'posts');
  } else {
    await page.getByRole('link', { name: 'Logga in' }).click();
    await page.getByRole('textbox', { name: 'E-mejl' }).click();
    await page.getByRole('textbox', { name: 'E-mejl' }).fill(email);
    await page.getByRole('textbox', { name: 'Lösenord' }).click();
    await page.getByRole('textbox', { name: 'Lösenord' }).fill(password);
    await page.getByRole('button', { name: 'Logga in' }).click();
    await page.waitForSelector('[data-testid="home"]');
    await page.goto(baseURL + 'posts');
  }
  await page.waitForSelector('[data-testid="posts"]');
  await cleanTestPost(page);
}
