import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginScreen from '../src/assets/layouts/pages/LoginScreen';

test('login process', async () => {
    const {getByLabelText, getByText} = render(<LoginScreen/>);

    // Simulate user input
    fireEvent.change(getByLabelText('Username'), {target: {value: 'Serb'}});

    // Simulate form submission
    fireEvent.click(getByText('Login'));

    // Initialize Input Module

    // Invoke Input getter username method

    // store in a variable

    

    // Wait for asynchronous operations (Authentication)
    // await waitFor(() => {
    //     expect().toBe();
    // })
})