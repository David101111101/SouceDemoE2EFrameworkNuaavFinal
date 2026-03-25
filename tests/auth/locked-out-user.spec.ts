import { test, expect } from '../../fixtures/base.fixture.ts';

test.use({ storageState: { cookies: [], origins: [] } });

test('locked out user sees error message', async ({ loginPage }) => {

  await loginPage.goto();

  await loginPage.login('locked_out_user', 'secret_sauce');

  const error = await loginPage.getErrorMessage();

  await expect(error).toContain('Sorry, this user has been locked out');
});