import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import UIModule from '../UIModule';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


export default class LoginScreen extends UIModule {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirectToDashboard: false,
      error: null,
      isLoading: false, 
    };

    // Binding event handlers
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  // From Abstract class - concrete class
  settingButtonClicked() {
    console.log('Test');
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`);
    this.setState({ [name]: value });
  }

  handleLogin = async (e) => {
    e.preventDefault();

    const { username, password } = this.state;

    this.setState({ isLoading: true }); // Set isLoading to true during authentication

    try {
      const response = await fetch('http://localhost:5000/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        this.setState({ error: data.message, isLoading: true }); // Show loading for 2 seconds even in case of an error
      } else {
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.error('Invalid response from the server. Please try again.');
          this.setState({ error: data.message, isLoading: true }); // Show loading for 2 seconds even in case of an error
        } else if (data.message === 'Login successful') {
          // Delay the redirect for 5 seconds
          setTimeout(() => {
            // Update state or perform any action before redirecting
            console.log('Redirecting to dashboard after 5 seconds');

            // Set redirectToDashboard to true for successful login
            this.setState({ redirectToDashboard: true, error: null, isLoading: false });
          }, 5000);
        } else {
          // Set the error message in case of unsuccessful login
          this.setState({ error: data.message, isLoading: true }); // Show loading for 2 seconds even in case of an error
        }
      }
    } catch (error) {
      console.error('An error occurred during authentication:', error);
      this.setState({ error: 'An error occurred. Please try again.', isLoading: true }); // Show loading for 2 seconds even in case of an error
    } finally {
      // Reset isLoading to false after 2 seconds
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 2000);
    }
  };
  
  

  render() {
    const { username, password, redirectToDashboard, error, isLoading } = this.state;

    if (redirectToDashboard) {
      // Redirect to the "/dashboard" route upon successful login
      return <Navigate to="/dashboard" />;
    }
    
        return (
          <div className='flex flex-col items-center justify-center h-screen w-screen gap-20'>
            <div>
              <h1 className=' font-semibold text-6xl'>RiskAlert</h1>
            </div>
            <div>
              <form className="w-full max-w-sm" onSubmit={this.handleLogin}>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="inline-full-name"
                      id='Username'
                    >
                      Username
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#156548]"
                      id="inline-full-name"
                      type="text"
                      placeholder="e.g: John Doe"
                      name="username"
                      value={username}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="inline-password"
                      id='Password'
                    >
                      Password
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#156548]"
                      id="inline-password"
                      type="password"
                      placeholder="******************"
                      name="password"
                      value={password}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3"></div>
                </div>
                <div className="md:flex md:items-center">
                  <div className="md:w-1/3"></div>
                  <div className="md:w-2/3">
                    <button
                      className="shadow bg-[#156548] hover:bg-[#156548] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                      <Box sx={{ display: 'flex' }}>
                        <CircularProgress size={20} />
                      </Box>
                    ) : (
                      'Login'
                    )}
                    </button>
                    {isLoading && (
                      <p>Login...</p>
                    )}
                  </div>
                  {error && <p className="text-red-500">{error}</p>}
                </div>
              </form>
            </div>
          </div>
        );
      }
}
