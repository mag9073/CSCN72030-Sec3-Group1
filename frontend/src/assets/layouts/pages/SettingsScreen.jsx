import React, { Component } from 'react';
import classNames from 'classnames';
import { Navigate } from 'react-router-dom';
import Layout from '../Layout';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import UIModule from '../UIModule';

export default class SettingsScreen extends UIModule {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false,
      navigateTo: null,
    };
  }

  handleDarkModeToggle = () => {
    this.setState((prevState) => ({
      isDarkMode: !prevState.isDarkMode,
    }));
  };

  handleNavigate = (path) => {
    this.setState({ navigateTo: path });
  };

  render() {
    const { isDarkMode } = this.state;

    const settingsClasses = classNames({
      'bg-white': !isDarkMode,
      'bg-gray-800 text-white': isDarkMode,
    });

    const { navigateTo } = this.state;

    if (navigateTo) {
      return <Navigate to={navigateTo} />;
    }

    return (
      <div className={settingsClasses}>
        <Layout>
            <div className='flex '>
              <h2 className='font-semibold text-4xl'>Settings</h2>
            </div>
            <div className='flex flex-col gap-10'>
                <Button
                  variant="outlined"
                  startIcon={<ArrowBackIosIcon />}
                  onClick={() => this.handleNavigate('/dashboard')}
                >
                  Patient Search
                </Button>
            </div>
            <div className="flex items-center">
                <label htmlFor="darkModeToggle" className="mr-2">
                    Dark Mode
                </label>
                <input
                    type="checkbox"
                    id="darkModeToggle"
                    checked={isDarkMode}
                    onChange={this.handleDarkModeToggle}
                    className="form-checkbox h-5 w-5 text-blue-500"
                />
            </div>
        </Layout>
      </div>
    );
  }
}
