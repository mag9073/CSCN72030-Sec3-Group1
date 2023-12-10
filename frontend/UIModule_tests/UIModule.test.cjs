const { Builder, By, Key, until } = require('selenium-webdriver');
const { assert } = require('chai');
const chrome = require('selenium-webdriver/chrome');


class MockUI_Input {
  constructor() {
    this.username = '';
    this.password = '';
  }

  set_username(username) {
    this.username = username;
  }

  set_password(password) {
    this.password = password;
  }

  get_username() {
    return this.username;
  }

  get_password() {
    return this.password;
  }
}


async function runInputModule_TEST_UI_01() {
  const options = new chrome.Options();
  options.addArguments('--ignore-certificate-errors');
  options.addArguments('--ignore-ssl-errors');

  let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  try {
    // Arrange:
    await driver.manage().window().maximize();

    await driver.get('http://localhost:5173/');

    const mockUI_Input = new MockUI_Input();

    // Act:
    const usernameInput = await driver.findElement(By.id('username'));
    await usernameInput.sendKeys('test123456');

    mockUI_Input.set_username('test123456');

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const actualUsername = await mockUI_Input.get_username();

    console.log('Actual Username:', actualUsername);
    console.log('Actual Username Length:', actualUsername.length);

    console.log('Expected Username:', 'test123456');
    console.log('Expected Username Length:', 'test123456'.length);

    // Assert:
    assert.equal(actualUsername, 'test123456');
    assert.equal(actualUsername.length, 10, 'Username should be 10 characters long');

    console.log('Test passed!');
  } catch (error) {
    console.error('Test failed:', error.message);
  } finally {
    console.log("============================================================================");
    await driver.quit();
  }
}

async function runInputModule_TEST_UI_02() {
  const options = new chrome.Options();
  options.addArguments('--ignore-certificate-errors');
  options.addArguments('--ignore-ssl-errors');

  let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  try {
    // Arrange:
    await driver.manage().window().maximize();

    await driver.get('http://localhost:5173/');

    const mockUI_Input = new MockUI_Input();

    // Act:
    const passwordInput = await driver.findElement(By.id('password'));
    await passwordInput.sendKeys('test1234561');

    mockUI_Input.set_password('Fras!s1345');

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const actualPassword = await mockUI_Input.get_password();

    console.log('Actual Password:', actualPassword);
    console.log('Actual Password Length:', actualPassword.length);

    console.log('Expected Password:', 'Fras!s1345');
    console.log('Expected Password Length:', 'Fras!s1345'.length);

    // Assert:
    assert.equal(actualPassword, 'Fras!s1345');
    assert.equal(actualPassword.length, 10, 'Password should be 10 characters long');

    console.log('Test passed!');
  } catch (error) {
    console.error('Test failed:', error.message);
  } finally {
    console.log("============================================================================");
    await driver.quit();
  }
}


async function runInputModule_TEST_UI_11() {
  const options = new chrome.Options();
  options.addArguments('--ignore-certificate-errors');
  options.addArguments('--ignore-ssl-errors');

  let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  try {
    // Arrange:
    await driver.manage().window().maximize();
    await driver.get('http://localhost:5173/');

    // Act:
    const mockUI_Input = new MockUI_Input();

    const usernameInput = await driver.findElement(By.id('username'));
    await usernameInput.sendKeys('test123456');

    const passwordInput = await driver.findElement(By.id('password'));
    await passwordInput.sendKeys('');

    mockUI_Input.set_username('test123456');

    mockUI_Input.set_password('');

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const actualUsername = await mockUI_Input.get_username();

    const actualPassword = await mockUI_Input.get_password();

    console.log('Actual Username:', actualUsername);
    console.log('Actual Username Length:', actualUsername.length);

    const loginButton = await driver.findElement(By.css('button[type="submit"]'));
    await loginButton.click();

    // Wait for 3 seconds
    await new Promise(resolve => setTimeout(resolve, 3000));

    const loginStatus = await driver.wait(
      until.elementLocated(By.id('login-status')),
      10000
    );

    const statusTextElement = await loginStatus.findElement(By.css('p.MuiTypography-root'));
    const actualStatusText = await statusTextElement.getText();

    console.log('Actual Login Status:', actualStatusText);
    console.log('Expected Login Status:', 'Username and password are required');

    console.log('Actual Username Status:', actualUsername);
    console.log('Expected Username Status:', 'test123456');

    console.log('Actual Password Status:', actualPassword);
    console.log('Expected Password Status:', '');

    // Assert:
    assert.equal(actualStatusText, 'Username and password are required');
    assert.equal(actualUsername, "test123456");
    assert.equal(actualPassword, "");

    console.log('Test passed!');
  } catch (error) {
    console.error('Test failed:', error.message);
  } finally {
    console.log('============================================================================');
    await driver.quit();
  }
}

async function runInputModule_TEST_UI_12() {
  const options = new chrome.Options();
  options.addArguments('--ignore-certificate-errors');
  options.addArguments('--ignore-ssl-errors');

  let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  try {
    // Arrange:
    await driver.manage().window().maximize();
    await driver.get('http://localhost:5173/');

    // Act:
    const mockUI_Input = new MockUI_Input();

    const usernameInput = await driver.findElement(By.id('username'));
    await usernameInput.sendKeys('');

    const passwordInput = await driver.findElement(By.id('password'));
    await passwordInput.sendKeys('test123456');

    mockUI_Input.set_username('');

    mockUI_Input.set_password('test123456');

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const actualUsername = await mockUI_Input.get_username();

    const actualPassword = await mockUI_Input.get_password();

    console.log('Actual Username:', actualUsername);
    console.log('Actual Username Length:', actualUsername.length);

    const loginButton = await driver.findElement(By.css('button[type="submit"]'));
    await loginButton.click();

    // Wait for 3 seconds
    await new Promise(resolve => setTimeout(resolve, 3000));

    const loginStatus = await driver.wait(
      until.elementLocated(By.id('login-status')),
      10000
    );

    const statusTextElement = await loginStatus.findElement(By.css('p.MuiTypography-root'));
    const actualStatusText = await statusTextElement.getText();

    console.log('Actual Login Status:', actualStatusText);
    console.log('Expected Login Status:', 'Username and password are required');

    console.log('Actual Username Status:', actualUsername);
    console.log('Expected Username Status:', '');

    console.log('Actual Password Status:', actualPassword);
    console.log('Expected Password Status:', 'test123456');

    // Assert:
    assert.equal(actualStatusText, 'Username and password are required');
    assert.equal(actualUsername, "");
    assert.equal(actualPassword, "test123456");

    console.log('Test passed!');
  } catch (error) {
    console.error('Test failed:', error.message);
  } finally {
    console.log('============================================================================');
    await driver.quit();
  }
}

runInputModule_TEST_UI_01();
runInputModule_TEST_UI_02();
runInputModule_TEST_UI_11();
runInputModule_TEST_UI_12();






