
import React from 'react';
import './App.css'
import LoginScreen from './assets/layouts/pages/LoginScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardScreen from './assets/layouts/pages/DashboardScreen';
import PatientProfileScreen from './assets/layouts/pages/PatientProfileScreen';
import DataViewScreen from './assets/layouts/pages/DataViewScreen';
import SettingsScreen from './assets/layouts/pages/SettingsScreen';

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
            <Route
              path="/profile"
              element={<PatientProfileScreen
                location={this.props.location}
                navigate={this.props.navigate}
                isDarkMode={isDarkMode}
                handleDarkModeToggle={this.handleDarkModeToggle}
              />}
            />
            <Route path="/profile/dataview" element={<DataViewScreen isDarkMode={isDarkMode} />} />
            <Route path="/settings" element={<SettingsScreen isDarkMode={isDarkMode} />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
