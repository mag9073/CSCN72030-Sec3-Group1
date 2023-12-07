const { Builder, By, Key, until } = require('selenium-webdriver');
const { assert } = require('chai');
const chrome = require('selenium-webdriver/chrome');


class MockInput {
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

    const mockInput = new MockInput();

    // Act:
    const usernameInput = await driver.findElement(By.id('username'));
    await usernameInput.sendKeys('test123456');

    mockInput.set_username('test123456');

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const actualUsername = await mockInput.get_username();

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

    const mockInput = new MockInput();

    // Act:
    const passwordInput = await driver.findElement(By.id('password'));
    await passwordInput.sendKeys('test1234561');

    mockInput.set_password('Fras!s1345');

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const actualPassword = await mockInput.get_password();

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

async function runInputModule_TEST_UI_03() {
  const options = new chrome.Options();
  options.addArguments('--ignore-certificate-errors');
  options.addArguments('--ignore-ssl-errors');
  
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  
  try {
    //Arrange:
    await driver.manage().window().maximize();
    
    await driver.get('http://localhost:5173/profile/dataview');
    
    // Act:
    const notAtRiskButton = await driver.findElement(By.xpath("//button[contains(@class, 'series-button') and contains(@style, 'background-color: green;') and contains(text(), 'Not At Risk')]"));
    
    // Assert:
    assert.ok(await notAtRiskButton.isDisplayed(), 'Not At Risk button is not displayed for Diabetes Series');
    
    console.log('Test passed!');
  } catch (error) {
    console.error('Test failed:', error.message);
  } finally {
    console.log("============================================================================");
    await driver.quit();
  }
}

async function runInputModule_TEST_UI_04() {
  const options = new chrome.Options();
  options.addArguments('--ignore-certificate-errors');
  options.addArguments('--ignore-ssl-errors');
  
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  
  try {
    // Arrange:
    await driver.manage().window().maximize();

    await driver.get('http://localhost:5173/profile/dataview');
    
    // Act:
    const notAtRiskButton = await driver.findElement(By.xpath("//button[contains(@class, 'series-button') and contains(@style, 'background-color: red;') and contains(text(), 'At Risk')]"));

    // Assert:
    assert.ok(await notAtRiskButton.isDisplayed(), 'At Risk button is not displayed for Diabetes Series');
    
    console.log('Test passed!');
  } catch (error) {
    console.error('Test failed:', error.message);
  } finally {
    console.log("============================================================================");
    await driver.quit();
  }
}

async function runInputModule_TEST_UI_05() {
  const options = new chrome.Options();
  options.addArguments('--ignore-certificate-errors');
  options.addArguments('--ignore-ssl-errors');
  
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  
  try {
    // Arrange:
    await driver.manage().window().maximize();
    
    await driver.get('http://localhost:5173/profile/dataview');
    
    // Act:
    const notAtRiskButton = await driver.findElement(By.xpath("//button[contains(@class, 'series-button') and contains(@style, 'background-color: red;') and contains(text(), 'At Risk')]"));

    // Assert:
    assert.ok(await notAtRiskButton.isDisplayed(), 'At Risk button is not displayed for Diabetes Series');
    
    console.log('Test passed!');
  } catch (error) {
    console.error('Test failed:', error.message);
  } finally {
    console.log("============================================================================");
    await driver.quit();
  }
}


async function runInputModule_TEST_UI_06() {
  let driver;

  try {
    // Arrange:
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();

    await driver.get('http://localhost:5173/profile');

    // Act:
    const viewTrendsButton = await driver.findElement(By.xpath("//button[contains(text(), 'View Trend')]"));
    await viewTrendsButton.click();

    await driver.wait(until.urlIs('http://localhost:5173/profile/trendsview'), 10000);
    
    // Assert:
    const currentUrl = await driver.getCurrentUrl();
    const expectedUrl = 'http://localhost:5173/profile/trendsview';

    assert.equal(currentUrl, expectedUrl, 'Navigation to TrendsView page failed');

    console.log('Successfully navigated to TrendsView page.');
  } catch (error) {
    console.error('Error navigating to TrendsView page:', error.message);
  } finally {
    console.log("============================================================================");
    await driver.quit();
  }
}


runInputModule_TEST_UI_01();
runInputModule_TEST_UI_02();
runInputModule_TEST_UI_03();
runInputModule_TEST_UI_04();
runInputModule_TEST_UI_05();
runInputModule_TEST_UI_06();



