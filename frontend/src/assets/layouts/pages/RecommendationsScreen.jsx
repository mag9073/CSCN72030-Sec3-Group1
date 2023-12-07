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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


export default class RecommendationsScreen extends Component {
  constructor() {
    super();
    this.state = {
      navigateTo: null,
      diabetesRecommendationsLinks: [],
      heartfailureRecommendationsLinks: [],
      strokeRecommendationsLinks: [],
      series: [],
      isConfirmationOpen: false,
      messageToConfirm: '',
      isSentSuccessAlertOpen: false,
      isFormSubmitted: false,
    };
  }

  componentDidMount() {
    // Use fetch inside componentDidMount
    fetch('http://localhost:5000/diabetes-recommendations')
      .then((res) => res.json())
      .then((data) => {
        const linksArray = data.split(','); // Assuming data is a comma-separated string
        this.setState({ diabetesRecommendationsLinks: linksArray });
        console.log(linksArray);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

      fetch('http://localhost:5000/heartfailure-recommendations')
      .then((res) => res.json())
      .then((data) => {
        const linksArray = data.split(','); // Assuming data is a comma-separated string
        this.setState({ heartfailureRecommendationsLinks: linksArray });
        console.log(linksArray);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

      fetch('http://localhost:5000/stroke-recommendations')
      .then((res) => res.json())
      .then((data) => {
        const linksArray = data.split(','); // Assuming data is a comma-separated string
        this.setState({ strokeRecommendationsLinks: linksArray });
        console.log(linksArray);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
  

  handleNavigate = (path) => {
    this.setState({ navigateTo: path });
  };

  handleConfirmationOpen = () => {
    this.setState({ isConfirmationOpen: true });
  };

  handleConfirmationClose = () => {
    // Close the confirmation dialog
    this.setState({ isConfirmationOpen: false });
  };

  handleConfirm = () => {
    // Handle the confirmation action
    console.log('Confirmed action');
    console.log('Message to send:', this.state.messageToConfirm);
  
    // Set the state to indicate that the message has been successfully sent
    this.setState({ isMessageSentSuccess: true });
  
    // Close the confirmation dialog
    this.setState({ isConfirmationOpen: false });
  
    // Show the success alert
    this.setState({ isSentSuccessAlertOpen: true });
  
    // Automatically close the success alert after 5 seconds
    setTimeout(() => {
      this.setState({ isSentSuccessAlertOpen: false });
    }, 5000);
  };

  handleSubmit = (e) => {
    e.preventDefault();
  
    const message = e.target.elements.message.value;
  
    // Check if the message is empty before attempting to submit
    if (message.trim() === '') {
      // Set the state to indicate the form submission attempt
      this.setState({ isFormSubmitted: true });
      return; // Do not proceed with the submission
    }
  
    // Open the confirmation dialog
    this.setState({ isConfirmationOpen: true, messageToConfirm: message });
  };
  
  

  render() {

    const { recommendations } = this.props;

    let currentRecommendations;
    if (recommendations === 'diabetes') {
      currentRecommendations = this.state.diabetesRecommendationsLinks;
    } else if (recommendations === 'heart failure') {
      currentRecommendations = this.state.heartfailureRecommendationsLinks;
    } else if (recommendations === 'stroke') {
      currentRecommendations = this.state.strokeRecommendationsLinks;
    }

    return (
      <DarkModeContext.Consumer>
        {(darkModeContext) => (
          <FontSizeContext.Consumer>
            {(fontSizeContext) => {
              const { isDarkMode } = darkModeContext;
              const darkModeClass = isDarkMode ? 'dark' : 'light';
              const { fontSize } = fontSizeContext;

              const { navigateTo, messageToConfirm, isSentSuccessAlertOpen } = this.state;

              if (navigateTo) {
                return <Navigate to={navigateTo} />;
              }

              console.log(recommendations)

              return (
                <div className={darkModeClass}>
                  <Layout>
                    <main className={`flex items-center flex-col gap-4 md:h-4/6 ${darkModeClass}`} style={{ fontSize: `${fontSize}px` }}>
                      <div className='flex '>
                            <h2 className='font-semibold text-4xl'>View Recommendations</h2>
                          </div>
                      <div className='flex gap-20 md:w-10/12 justify-between items-center flex-col md:flex-row'>
                        <div className='flex flex-col gap-10'>
                          <Button
                            variant="outlined"
                            startIcon={<ArrowBackIosIcon />}
                            onClick={() => this.handleNavigate('/profile/dataview')}
                          >
                            Go Back
                          </Button>
                        </div>
                      </div>
                      <div className={`w-full h-full flex justify-center flex-col items-center`}>
                        <Box component='form' onSubmit={this.handleSubmit} className='w-5/6'>
                        <TextField
                            fullWidth
                            label='Enter your recommendations'
                            variant='outlined'
                            name='message'
                            multiline
                            rows={4}
                            onChange={(e) => this.setState({ messageToConfirm: e.target.value })}
                            error={this.state.isFormSubmitted && this.state.messageToConfirm.trim() === ''}
                            helperText={
                              this.state.isFormSubmitted && this.state.messageToConfirm.trim() === ''
                                ? 'Message cannot be empty'
                                : ''
                            }
                            sx={{
                              '& label': {
                                color: isDarkMode ? '#ffffff' : '#000000', // Label color
                              },
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: isDarkMode ? '#ffffff' : '#000000', // Border color
                                },
                                '&:hover fieldset': {
                                  borderColor: isDarkMode ? '#ffffff' : '#000000', // Border color on hover
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: isDarkMode ? '#bb86fc' : '#1976D2', // Border color when focused
                                },
                              },
                              '& .MuiInputBase-input': {
                                color: isDarkMode ? '#ffffff' : '#000000', // Text color
                              },
                            }}
                          />

                          <div className='flex justify-end mt-10'>
                            <Button type='submit' variant='contained' color='primary' className='ml-2'
                            style={{backgroundColor: '#156548'}}>
                              Send to Patient
                            </Button>
                          </div>
                        </Box>
                        
                        <div className={`w-5/6 ${darkModeClass}`}>
                        {currentRecommendations && (
                          <Card
                          className={`mt-4 `}
                          style={{
                            backgroundColor: isDarkMode ? '#333' : '#ffffff',
                            borderColor: isDarkMode ? '#ffffff' : '#000000',
                          }}>
                            <CardContent>
                              <Typography
                                variant='h5'
                                gutterBottom
                                style={{
                                  color: isDarkMode ? '#ffffff' : '#000000',
                                  fontSize: `${fontSize}px`,
                                  fontWeight: 'bold',
                                }}
                              >
                                Recommendations
                              </Typography>
                              <ul>
                                {currentRecommendations.map((link, index) => (
                                  <li key={index}>
                                    <Typography
                                      component='a'
                                      href={link}
                                      target='_blank'
                                      rel='noopener noreferrer'
                                      style={{
                                        color: isDarkMode ? '#bb86fc' : '#1976D2', // Adjust link color as needed
                                        textDecoration: 'underline',
                                        fontSize: `${fontSize}px`,
                                        display: 'inline-block',
                                      }}
                                    >
                                      {link}
                                    </Typography>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                               <Dialog open={this.state.isConfirmationOpen} onClose={this.handleConfirmationClose}>
                                <DialogTitle>Confirm Action</DialogTitle>
                                <DialogContent>
                                  <DialogContentText>
                                    Are you sure you want to perform this action?
                                    {`\n${this.state.messageToConfirm}`}
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={this.handleConfirmationClose} color="primary">
                                    Cancel
                                  </Button>
                                  <Button onClick={this.handleConfirm} color="primary">
                                    Confirm
                                  </Button>
                                </DialogActions>
                            </Dialog>

                            {/* Success Alert */}
                            <Snackbar
                                open={isSentSuccessAlertOpen}
                                autoHideDuration={5000} // 5 seconds
                                onClose={() => this.setState({ isSentSuccessAlertOpen: false })}
                              >
                                <Alert onClose={() => this.setState({ isSentSuccessAlertOpen: false })} severity="success">
                                  Message sent successfully!
                                </Alert>
                              </Snackbar>
                          </Card>
                          
                        )}
                      </div>
                        

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
