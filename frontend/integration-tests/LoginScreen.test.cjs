const { Builder, By, Key, until } = require('selenium-webdriver');
const { assert } = require('chai');
const chrome = require('selenium-webdriver/chrome');

async function runTest() {
  const options = new chrome.Options();
  options.addArguments('--ignore-certificate-errors');
  options.addArguments("--ignore-ssl-errors")

  let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    
  try {
    await driver.manage().window().maximize();  // Maximize the browser window

    await driver.get('http://localhost:5173/');  

    // Wait for 5 seconds before continue
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Wait for the username element to be present
    const usernameInput = await driver.wait(
      until.elementLocated(By.id('username')),
      5000,
      'Username input not found'
    );

    // Assuming there's a login form in your React UI
    await usernameInput.sendKeys('test123');

    // Find the password input by id
    const passwordInput = await driver.findElement(By.id('password'));
    await passwordInput.sendKeys('test_password', Key.RETURN);

    // Wait for an additional 3 seconds
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Wait for the response from the Flask backend
    const loginStatusElement = await driver.wait(
      until.elementLocated(By.id('login-status')),
      5000,
      'Login status not found'
    );

    const loginStatus = await loginStatusElement.getText();
    console.log('Login Status:', loginStatus); // Log the actual login status

    // Perform assertions based on the UI response
    assert.equal(loginStatus, 'The entered username does not exist');
    console.log('Test passed!');
  } catch (error) {
    // If an error occurred (e.g., assertion failed), log the error and mark the test as failed
    console.error('Test failed:', error.message);
  } finally {
    await driver.quit();
  }
}

runTest();



