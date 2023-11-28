import React, { Component } from 'react';
import Layout from '../Layout';
import Searchbar from '../../components/Searchbar';
import UIModule from '../UIModule';
import { DarkModeContext } from '../../states/DarkModeContext';

class DashboardScreen extends UIModule {
  constructor(props) {
    super(props);
  }

  settingButtonClicked = () => {
    console.log('Test');
  }

  renderContent = (isDarkMode) => {
    return (
      <div className={`flex items-center justify-center flex-col gap-4 ${isDarkMode ? 'dark' : 'light'}`}>
        <Layout>
          <main className='flex items-center justify-center flex-col gap-4'>
            <h2 className='font-semibold text-4xl'>Search for patient profile</h2>
            <Searchbar />
            {this.settingButtonClicked()}
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
