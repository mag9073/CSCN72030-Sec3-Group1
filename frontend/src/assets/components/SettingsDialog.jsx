import React, { Component } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { DarkModeContext } from '../states/DarkModeContext';
import { FontSizeContext } from '../states/FontSizeContext';
import { Box, Slider, Switch } from '@mui/material';

class SettingsDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      fullWidth: true,
      maxWidth: 'sm',
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleMaxWidthChange = (event) => {
    this.setState({
      maxWidth: event.target.value,
    });
  };

  handleFullWidthChange = (event) => {
    this.setState({
      fullWidth: event.target.checked,
    });
  };

  render() {
    const { open, fullWidth, maxWidth } = this.state;

    return (
      <DarkModeContext.Consumer>
        {(darkModeContext) => (
          <FontSizeContext.Consumer>
            {(fontSizeContext) => {
              const { isDarkMode, toggleDarkMode } = darkModeContext;
              const darkModeClass = isDarkMode ? 'dark' : 'light';
              const { fontSize, updateFontSize } = fontSizeContext;

              return (
                <React.Fragment>
                  <button onClick={this.handleClickOpen}  className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-40'>
                    Settings
                  </button>

                  <div>
                    <Dialog
                      fullWidth={fullWidth}
                      maxWidth={maxWidth}
                      open={open}
                      onClose={this.handleClose}
                    >
                    <Box  className={darkModeClass}>
                      <DialogTitle>Settings</DialogTitle>
                      <DialogContent>
                        <div className={`flex gap-20 md:w-10/12 justify-between items-center flex-col mx-auto`} style={{ fontSize: `${fontSize}px` }}>
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
                              marks={true}
                              valueLabelDisplay="auto"
                              valueLabelFormat={(value) => `${value}px`}
                              style={{ width: '100%', margin: '12px' }}
                            />
                            <p>{fontSize}</p>
                          </div>
                        </div>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleClose}>Close</Button>
                    </DialogActions>
                    </Box>
                    </Dialog>
                  </div>
                </React.Fragment>
              );
            }}
          </FontSizeContext.Consumer>
        )}
      </DarkModeContext.Consumer>
    );
  }
}

export default SettingsDialog;
