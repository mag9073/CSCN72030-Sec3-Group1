
import React from 'react';
import './App.css'
import LoginScreen from './assets/layouts/pages/LoginScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardScreen from './assets/layouts/pages/DashboardScreen';
import PatientProfileScreen from './assets/layouts/pages/PatientProfileScreen';
import DataViewScreen from './assets/layouts/pages/DataViewScreen';
import SettingsScreen from './assets/layouts/pages/SettingsScreen';
import TrendsViewScreen from './assets/layouts/pages/TrendsViewScreen';
import { DarkModeProvider } from './assets/states/DarkModeContext';
import { FontSizeProvider } from './assets/states/FontSizeContext';
import ErrorScreen from './assets/layouts/pages/ErrorScreen';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false,
    };
  }

  // handleDarkModeToggle = () => {
  //   this.setState((prevState) => ({
  //     isDarkMode: !prevState.isDarkMode,
  //   }));
  // };

  render() {
    const { isDarkMode } = this.state;
    const darkModeClass = isDarkMode ? 'dark' : 'light';

    return (
      <FontSizeProvider>
      <DarkModeProvider>
        <div className={darkModeClass}>
          <Router>
            <Routes>
              <Route path="/" element={<LoginScreen />} />
              <Route
                path="/dashboard"
                element={
                  <DashboardScreen/>
                }
              />
              <Route
                path="/profile"
                element={
                  <PatientProfileScreen
                    location={this.props.location}
                    navigate={this.props.navigate}
                  />
                }
              />
              <Route path="/profile/dataview" element={<DataViewScreen/>} />
              {/* <Route path="/profile/trendsview" element={<TrendsViewScreen />} /> */}
              <Route path="/settings" element={<SettingsScreen />} />
              <Route path='*' element={<ErrorScreen/>}/>
            </Routes>
          </Router>
        </div>
      </DarkModeProvider>
      </FontSizeProvider>
    );
  }
}

export default App;