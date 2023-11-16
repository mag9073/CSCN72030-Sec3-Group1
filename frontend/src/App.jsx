
import React from 'react';
import './App.css'
import LoginScreen from './assets/layouts/pages/LoginScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardScreen from './assets/layouts/pages/DashboardScreen';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false,
    };
  }

  handleDarkModeToggle = () => {
    this.setState((prevState) => ({
      isDarkMode: !prevState.isDarkMode,
    }));
  };

  render() {

    const { isDarkMode } = this.state;

    return (
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<LoginScreen/>} />
            <Route
              path="/dashboard"
              element={<DashboardScreen isDarkMode={isDarkMode} handleDarkModeToggle={this.handleDarkModeToggle} />}
            />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
