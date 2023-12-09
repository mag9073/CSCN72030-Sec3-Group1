import React, { useState } from 'react';
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
import RecommendationsScreen from './assets/layouts/pages/RecommendationsScreen';
import PatientContextProvider from './assets/states/PatientContext';

class UIModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false,
      selectedPatient: null,
    };
  }

  handleProfileClick = (patient) => {
    this.setState({ selectedPatient: patient });
  };

  render() {
    const { isDarkMode, selectedPatient } = this.state;
    const darkModeClass = isDarkMode ? 'dark' : 'light';

    const diabetesRecommendations = "diabetes";
    const heartFailureRecommendations = "heart failure";
    const strokeRecommendations = "stroke";

    return (
      <FontSizeProvider>
        <DarkModeProvider>
          <PatientContextProvider>
            <div className={darkModeClass}>
              <Router>
                <Routes>
                  <Route path="/" element={<LoginScreen />} />
                  <Route
                    path="/dashboard"
                    element={<DashboardScreen />}
                  />
                  <Route
                    path="/profile"
                    element={
                      <PatientProfileScreen
                        location={this.props.location}
                        navigate={this.props.navigate}
                        selectedPatient={selectedPatient}
                        onProfileClick={this.handleProfileClick}
                      />
                    }
                  />
                  <Route path="/profile/dataview" element={<DataViewScreen />} />
                  <Route path='profile/trendsview' element={<TrendsViewScreen />} />
                  <Route path='/profile/dataview/diabetes-recommendations' element={<RecommendationsScreen recommendations={diabetesRecommendations} />} />
                  <Route path='/profile/dataview/heartfailure-recommendations' element={<RecommendationsScreen recommendations={heartFailureRecommendations} />} />
                  <Route path='/profile/dataview/stroke-recommendations' element={<RecommendationsScreen recommendations={strokeRecommendations} />} />
                  <Route path='*' element={<ErrorScreen />} />
                </Routes>
              </Router>
            </div>
          </PatientContextProvider>
        </DarkModeProvider>
      </FontSizeProvider>
    );
  }
}

export default UIModule;
