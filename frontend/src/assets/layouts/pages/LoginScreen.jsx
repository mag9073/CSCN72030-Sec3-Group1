import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirectToDashboard: false,
      error: null,
      isLoading: false,
      authenticated: false,
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

    this.setState({ isLoading: true, error: null });

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
        this.setState({ error: data.message, isLoading: false });
      } else {
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.error('Invalid response from the server. Please try again.');
          this.setState({
            error: 'Invalid response from the server. Please try again.',
            isLoading: false,
          });
        } else if (data.message === 'Login successful') {
          console.log('Login successful');
          this.setState({ authenticated: true, error: null });
          setTimeout(() => {
            console.log('Redirecting to dashboard after 5 seconds');
            this.setState({ redirectToDashboard: true, isLoading: false });
          }, 5000);
        } else {
          this.setState({ error: data.message, isLoading: false });
        }
      }
    } catch (error) {
      console.error('An error occurred during authentication:', error);
      this.setState({ error: 'An error occurred. Please try again.', isLoading: false });
    } finally {
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 2000);
    }
  };

  render() {
    const { username, password, redirectToDashboard, error, isLoading, authenticated } = this.state;

    if (redirectToDashboard) {
      // Redirect to the "/dashboard" route upon successful login
      return <Navigate to="/dashboard" />;
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '20px' }}>
        <div>
          <Typography variant="h3" fontWeight="bold">
            RiskAlert
          </Typography>
        </div>
        <div>
          <form style={{ width: '100%', textAlign: 'center' }} onSubmit={this.handleLogin}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <label htmlFor="username" style={{ marginRight: '1rem' }}>
                Username
              </label>
              <TextField
                id="username"
                type="text"
                variant="outlined"
                placeholder="e.g: John Doe"
                name="username"
                value={username}
                onChange={this.handleInputChange}
                inputProps={{ maxLength: 10 }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <label htmlFor="password" style={{ marginRight: '1rem' }}>
                Password
              </label>
              <TextField
                id="password"
                type="password"
                variant="outlined"
                placeholder="******************"
                name="password"
                value={password}
                onChange={this.handleInputChange}
                inputProps={{ maxLength: 10 }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <Button
                variant="contained"
                type="submit"
                disabled={isLoading}
                sx={{backgroundColor: '#156548', '&:hover': { backgroundColor: '#156548' } }}
              >
                {isLoading ? (
                  <Box sx={{ display: 'flex' }}>
                    <CircularProgress size={20} />
                  </Box>
                ) : (
                  'Login'
                )}
              </Button>
            </div>
            <div id="login-status">
              {error ? (
                <Typography variant="body1" color="error">
                  {error}
                </Typography>
              ) : isLoading ? (
                <Typography variant="body1">Login...</Typography>
              ) : authenticated ? (
                <Typography variant="body1" color="success" sx={{ color: 'green'}}>
                  Login successful!
                </Typography>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    );
  }
}
