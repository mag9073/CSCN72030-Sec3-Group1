import React, { Component } from 'react';
import Layout from '../Layout';
import Searchbar from '../../components/Searchbar';
import UIModule from '../UIModule';
import { DarkModeContext } from '../../states/DarkModeContext';
import { PatientContext } from '../../states/PatientContext';

class DashboardScreen extends UIModule {
  constructor(props) {
    super(props);

    this.state = {
      patientData: null,
    }
  }

  static contextType = PatientContext;

  componentDidMount() {
    this.handlePatientProfile();
  }

  handlePatientProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/search", {
        method: 'GET',
      });
  
      if (res.ok) {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await res.json();
          this.setState({ patientData: data });

          // Update patient data in the context
          const { updatePatientData } = this.context;
          updatePatientData(data);
        } else {
          console.error('Received non-JSON response:', contentType);
        }
      } else {
        console.error('Failed to fetch patient profile:', res.status, res.statusText);
      }
    } catch (error) {
      console.error('Error fetching patient profile:', error);
    }
  }
  

  renderContent = (isDarkMode) => {
    const { patientData } = this.state;
  
    return (
      <div className={`flex items-center justify-center flex-col gap-4 ${isDarkMode ? 'dark' : 'light'}`}>
        <Layout>
          <main className='flex items-center justify-center flex-col gap-4'>
            <h2 className='font-semibold text-4xl'>Search for patient profile</h2>
            <Searchbar patientData={patientData} />
          </main>
        </Layout>
      </div>
    );
  };
  
  
  render() {
    return (
      <DarkModeContext.Consumer>
        {(context) => {
          const { isDarkMode } = context;
          return this.renderContent(isDarkMode);
        }}
      </DarkModeContext.Consumer>
    );
  }

}

export default DashboardScreen;
