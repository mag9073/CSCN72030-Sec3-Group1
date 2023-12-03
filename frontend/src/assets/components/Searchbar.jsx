import React from 'react';
import { Navigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Button } from '@mui/material';
import { DarkModeContext } from '../states/DarkModeContext';
import { PatientContext } from '../states/PatientContext';

class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigateTo: null,
      searchText: '',
    };

    this.handleNavigate = this.handleNavigate.bind(this);
  }

  handleNavigate = (path) => {
    this.setState({ navigateTo: path });
  };

  handleProfileClick = (patientId, setSelectedPatientId) => {
    setSelectedPatientId(patientId);
    this.setState({ navigateTo: `/profile` });
    console.log(patientId)
  };

  handleSearchTextChange = (event, value) => {
    this.setState({ searchText: value });
  };

  render() {
    const { navigateTo } = this.state;

    if (navigateTo) {
      return <Navigate to={navigateTo} />;
    }

    return (
      <PatientContext.Consumer>
        {(context) => {
          const { patientData, setSelectedPatientId, selectedPatientId } = context;

          if (!patientData) {
            return <div>No patient data available.</div>;
          }

          const mappedPatientData = patientData.map((option) => ({
            Patient_ID: option.Patient_ID,
            Patient_Name: option.Patient_Name,
            DOB: option.DOB
          }));

          const filteredPatientData = mappedPatientData.filter((option) =>
            option.Patient_Name.toLowerCase()
          );

          console.log(filteredPatientData)


          return (
            <DarkModeContext.Consumer>
              {(darkModeContext) => {
                const { isDarkMode } = darkModeContext;
                const darkModeClass = isDarkMode ? 'dark' : 'light';

                return (
                  <Autocomplete
                    id='search-bar'
                    sx={{ width: 500 }}
                    options={filteredPatientData}
                    autoHighlight
                    getOptionLabel={(option) =>
                      `${option.Patient_Name} - ${option.Patient_ID} - ${option.DOB}`
                    }
                    onInputChange={this.handleSearchTextChange}
                    renderOption={(props, option) => (
                      <Box
                        key={option.Patient_ID}
                        component='li'
                        sx={{ '& > img': { flexShrink: 0 } }}
                        {...props}
                        className={`flex justify-around items-center bg-slate-300 border border-emerald-500 ${darkModeClass}`}
                        onClick={() => this.handleProfileClick(option.Patient_ID, setSelectedPatientId)}
                      >
                        <div className={darkModeClass}>
                          <p>Patient Name: {option.Patient_Name}</p>
                          <p>Patient Id: {option.Patient_ID}</p>
                          <p>DOB: {option.DOB}</p>
                        </div>
                        <div>
                          <Button variant='contained' color='success'>
                            Patient Profile
                          </Button>
                        </div>
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Enter patient name, ID, or DOB'
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password',
                        }}
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
                    )}
                  />
                );
              }}
            </DarkModeContext.Consumer>
          );
        }}
      </PatientContext.Consumer>
    );
  }
}

export default Searchbar;