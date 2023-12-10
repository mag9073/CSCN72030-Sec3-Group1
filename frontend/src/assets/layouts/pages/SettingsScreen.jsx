import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../Layout';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { DarkModeContext } from '../../states/DarkModeContext';
import { FontSizeContext } from '../../states/FontSizeContext';
import { Slider, Switch } from '@mui/material';

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigateTo: null,
    };
  }

  handleNavigate = (path) => {
    this.setState({ navigateTo: path });
  };

  render() {
    const { navigateTo } = this.state;

    if (navigateTo) {
      return <Navigate to={navigateTo} />;
    }

    return (
      <DarkModeContext.Consumer>
        {(darkModeContext) => (
          <FontSizeContext.Consumer>
            {(fontSizeContext) => {
              const { isDarkMode, toggleDarkMode } = darkModeContext;
              const darkModeClass = isDarkMode ? 'dark' : 'light';
              const { fontSize, updateFontSize } = fontSizeContext;

              return (
                <div className={darkModeClass}>
                  <Layout>
                    <main
                      className={`flex gap-20 md:w-10/12 justify-between items-center flex-col mx-auto`}
                      style={{ fontSize: `${fontSize}px` }}
                    >
                      <div className='flex '>
                        <h2 className='font-semibold text-4xl'>Settings</h2>
                      </div>
                      <div className='flex gap-20 md:w-10/12 justify-between items-center flex-col md:flex-row'>
                        <div className='flex flex-col gap-10'>
                          <Button
                            variant="outlined"
                            startIcon={<ArrowBackIosIcon />}
                            onClick={() => this.handleNavigate('/dashboard')}
                          >
                            Patient Search
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center md:w-3/4">
                        <label htmlFor="darkModeToggle" className="mr-2">
                          Dark Mode
                        </label>
                        <Switch
                          id="darkModeToggle"
                          checked={isDarkMode}
                          onChange={toggleDarkMode}
                        />
                      </div>
                      <div className="flex items-center md:w-3/4">
                        <label htmlFor="fontSizeInput" className="mr-2">
                          Font Size
                        </label>
                        <Slider
                          value={fontSize}
                          onChange={(e, value) => updateFontSize(value)}
                          min={12}
                          max={24}
                          step={2}
                          valueLabelDisplay="auto"
                          valueLabelFormat={(value) => `${value}px`}
                          style={{width: '60%'}}
                        />
                        <p>{fontSize}</p>
                      </div>
                    </main>
                  </Layout>
                </div>
              );
            }}
          </FontSizeContext.Consumer>
        )}
      </DarkModeContext.Consumer>
    );
  }
}
