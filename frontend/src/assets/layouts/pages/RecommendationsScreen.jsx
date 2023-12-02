import React, { Component } from 'react';
import Layout from '../Layout';
import { Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DarkModeContext } from '../../states/DarkModeContext';
import { FontSizeContext } from '../../states/FontSizeContext';

export default class RecommendationsScreen extends Component {
  constructor() {
    super();
    this.state = {
      navigateTo: null,
      actualResults: '',
      series: [],
    };
  }

  componentDidMount() {
    // Use fetch inside componentDidMount
    fetch('http://localhost:5000/diabetes-prediction')
      .then((res) => res.json())
      .then((data) => {
        this.setState({ actualResults: JSON.stringify(data) });
        console.log(this.state.actualResults);
      });
  }

  handleNavigate = (path) => {
    this.setState({ navigateTo: path });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const message = e.target.elements.message.value;
    confirm(message);
  };

  render() {
    return (
      <DarkModeContext.Consumer>
        {(darkModeContext) => (
          <FontSizeContext.Consumer>
            {(fontSizeContext) => {
              const { isDarkMode } = darkModeContext;
              const darkModeClass = isDarkMode ? 'dark' : 'light';
              const { fontSize } = fontSizeContext;

              const { navigateTo } = this.state;

              if (navigateTo) {
                return <Navigate to={navigateTo} />;
              }

              return (
                <div className={darkModeClass}>
                  <Layout>
                    <main className={`flex items-center flex-col gap-4 md:h-4/6 ${darkModeClass}`} style={{ fontSize: `${fontSize}px` }}>
                      <div className='flex gap-20 md:w-10/12 justify-between items-center flex-col md:flex-row'>
                        <div className='flex flex-col gap-10'>
                          <Button
                            variant="outlined"
                            startIcon={<ArrowBackIosIcon />}
                            onClick={() => this.handleNavigate('/profile/dataview')}
                          >
                            Patient Search
                          </Button>
                        </div>
                      </div>
                      <div className='w-full h-full flex justify-center'>
                        <Box component='form' onSubmit={this.handleSubmit} className='w-5/6'>
                          <TextField
                            fullWidth
                            label='Enter your recommendations'
                            variant='outlined'
                            name='message'
                            multiline
                            rows={4}
                          />
                          <div className='flex justify-end mt-10'>
                            <Button type='submit' variant='contained' color='primary' className='ml-2'>
                              Send to Patient
                            </Button>
                          </div>
                        </Box>
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
