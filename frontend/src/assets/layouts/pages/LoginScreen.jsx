import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import UIModule from '../UIModule';

export default class LoginScreen extends UIModule {
    // Create Constructor 
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirectToDashboard: false,
          };

        // Binding event handlers
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    // From Abstract class - concrete class
    settingButtonClicked = () => {
        console.log('Test');
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`Changing ${name} to ${value}`);
        this.setState({ [name]: value });
      };
    
      handleLogin = async (e) => {
        e.preventDefault();
      
        const { username, password } = this.state;
      
        try {
          const response = await fetch('http://localhost:5000/authenticate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const contentType = response.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Invalid response from server. Please try again.');
          }
      
          const data = await response.json();
      
          console.log(data.message); // Login successful
          this.setState({ redirectToDashboard: true, error: null });
        } catch (error) {
          console.error('Error during login:', error);
          this.setState({ error: 'An error occurred during login. Please try again.' });
        }
      };

      render() {
        const { username, password, redirectToDashboard, error } = this.state;

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
                    >
                      Login
                    </button>
                  </div>
                  {error && <p className="text-red-500">{error}</p>}
                </div>
              </form>
            </div>
          </div>
        );
      }
}
