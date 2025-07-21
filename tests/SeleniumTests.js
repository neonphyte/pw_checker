import { Builder, By, until } from 'selenium-webdriver';
import assert from 'assert';

const environment = process.argv[2] || 'local';

const seleniumUrl = environment === 'github'
  ? 'http://selenium:4444/wd/hub'
  : 'http://localhost:4444/wd/hub';

const serverUrl = environment === 'github'
  ? 'http://testserver:3000'
  : 'http://host.docker.internal:3000'; // for Docker + host network

console.log(`Running tests in '${environment}' environment`);
console.log(`Selenium URL: ${seleniumUrl}`);
console.log(`Server URL: ${serverUrl}`);

async function runPasswordTest(driver, testPassword, shouldRedirect) {
  await driver.get(serverUrl);

  const passwordInput = await driver.wait(until.elementLocated(By.id('password')), 5000);
  await passwordInput.clear(); // ensure empty
  await passwordInput.sendKeys(testPassword);

  const submitButton = await driver.findElement(By.css('button[type="submit"]'));
  await submitButton.click();

  if (shouldRedirect) {
    // Wait for redirect to /valid
    await driver.wait(until.urlContains('/valid'), 5000);
    const body = await driver.findElement(By.tagName('body'));
    const bodyText = await body.getText();
    console.log(`Redirected page content:\n${bodyText}`);
    assert.ok(bodyText.includes(testPassword), 'Password not shown on /valid page');
    console.log(`Passed: ${testPassword} redirected and displayed.`);
  } else {
    // Stay on same page and check for error message
    await driver.wait(until.elementLocated(By.id('message')), 5000);
    const errorMsg = await driver.findElement(By.id('message')).getText();
    console.log(`Error message: ${errorMsg}`);
    assert.ok(errorMsg.includes('too common'), 'Expected "too common" error not shown');
    console.log(`Passed: ${testPassword} was rejected as too common.`);
  }
}

(async function testPasswordChecker() {
  const driver = await new Builder()
    .forBrowser('chrome')
    .usingServer(seleniumUrl)
    .build();

  try {
    console.log('Running valid password test...');
    await runPasswordTest(driver, 'Un1qu3P@ssw0rd!', true);

    console.log('Running common password test...');
    await runPasswordTest(driver, '123456', false);

  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    await driver.quit();
  }
})();
