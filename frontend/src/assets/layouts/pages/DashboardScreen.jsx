import React from 'react';
import Layout from '../Layout';
import Searchbar from '../../components/Searchbar';

import { DarkModeContext } from '../../states/DarkModeContext';
import { PatientContext } from '../../states/PatientContext';

class DashboardScreen extends React.Component {
  static contextType = PatientContext;

  componentDidMount() {
    const { updatePatientData } = this.context;
    updatePatientData(); // Trigger the fetch in the context
  }

  renderContent = (isDarkMode) => {
    const { patientData, isLoading } = this.context;

    return (
      <div className={`flex items-center justify-center flex-col gap-4 ${isDarkMode ? 'dark' : 'light'}`}>
        <Layout>
          <main className='flex items-center justify-center flex-col gap-4'>
            <h2 className='font-semibold text-4xl'>Search for patient profile</h2>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <Searchbar patientData={patientData} />
            )}
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
