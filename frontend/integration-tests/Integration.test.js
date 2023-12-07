import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import LoginScreen from '../src/assets/layouts/pages/LoginScreen';
import MockInput from './MockInput';
import React from 'react';

test('Integration Test: Login Screen and Input Class', async () => {
  // Arrange
  const inputInstance = new MockInput(); // Use the MockInput class
  const expectedUsername = 'testUser';

  // Act
  // Simulate user input in the React component
  render(<LoginScreen input={inputInstance} />); // Pass the inputInstance as a prop
  const usernameInput = screen.getByLabelText(/Username/i);
  fireEvent.change(usernameInput, { target: { value: expectedUsername } });

  // Wait for asynchronous tasks to complete
  await waitFor(() => {
    // Assert
    // Verify that the username is set correctly in the React component
    expect(usernameInput.value).toBe(expectedUsername);

    // Verify that the Input class received the correct username
    expect(inputInstance.get_username()).toBe(expectedUsername);
  });
});
