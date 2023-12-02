// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react';
// import LoginScreen from '../src/assets/layouts/pages/LoginScreen';

// describe('LoginScreen Integration Test', () => {
//     it('should update the username in the UI when input module getter is called', () => {
//       // Arrange
//       const { getByPlaceholderText } = render(<LoginScreen />);
  
//       // Act
//       const usernameInput = getByPlaceholderText('e.g: John Doe');
//       fireEvent.change(usernameInput, { target: { value: 'testUsername' } });
  
//       // Assert
//       expect(usernameInput.value).toBe('testUsername');
//     });
//   });


const { Builder, By, Key, until } = require('selenium-webdriver');
const { assert } = require('chai');
const chrome = require('selenium-webdriver/chrome');

async function runTest() {
  const options = new chrome.Options();
  options.addArguments('--ignore-certificate-errors');
  options.addArguments("--ignore-ssl-errors")

  // options.addArguments('--headless');

  let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    

  try {
    await driver.manage().window().maximize();  // Maximize the browser window

    await driver.get('http://localhost:5173/');  

    // Wait for 5 seconds before proceeding
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Wait for the username element to be present
    const usernameInput = await driver.wait(
      until.elementLocated(By.id('inline-full-name')),
      5000,
      'Username input not found'
    );

    // Assuming there's a login form in your React UI
    await usernameInput.sendKeys('test_user');

    const passwordInput = await driver.findElement(By.id('inline-password'));
    await passwordInput.sendKeys('test_password', Key.RETURN);

    // Wait for an additional 3 seconds
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Wait for the response from the Flask backend
    const loginStatusElement = await driver.wait(
      until.elementLocated(By.id('login-status')),
      5000,
      'Login status not found'
    );

    // Log information about the elements
    // console.log('Username Input:', usernameInput);
    // console.log('Password Input:', passwordInput);
    // console.log('Login Status Element:', loginStatusElement);

    const loginStatus = await loginStatusElement.getText();
    console.log('Login Status:', loginStatus); // Log the actual login status

    // Perform assertions based on the UI response
    assert.equal(loginStatus, 'Username not found');
    console.log('Test passed!');
  } catch (error) {
    // If an error occurred (e.g., assertion failed), log the error and mark the test as failed
    console.error('Test failed:', error.message);
  } finally {
    await driver.quit();
  }
}

runTest();



