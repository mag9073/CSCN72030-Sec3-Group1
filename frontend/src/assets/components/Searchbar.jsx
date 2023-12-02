import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Button } from '@mui/material';
import { DarkModeContext } from '../states/DarkModeContext';
import { withPatientContext } from '../states/PatientContext'; 
import { PatientContext } from '../states/PatientContext';

class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigateTo: null,
    };

    this.handleNavigate = this.handleNavigate.bind(this);
  }

  handleNavigate = (path) => {
    this.setState({ navigateTo: path });
  };

  handleProfileClick = (patientId) => {
    console.log('Patient ID:', patientId);
    const { navigate } = this.props;
    this.handleNavigate(`/profile/${patientId}`);
  };
  static contextType = PatientContext;

  render() {
    const { navigateTo } = this.state;
    const { patientData } = this.props;

    if (navigateTo) {
      return <Navigate to={navigateTo} />;
    }

    if (!patientData) {
      return <div>No patient data available.</div>;
    }

    return (
      <DarkModeContext.Consumer>
        {(context) => {
          const { isDarkMode } = context;
          const darkModeClass = isDarkMode ? 'dark' : 'light';
          const textColor = isDarkMode ? 'white' : 'black';

          // Add a check for patientData being defined
          if (!patientData) {
            return <div>No patient data available.</div>;
          }

          return (
            <Autocomplete
              id='search-bar'
              sx={{ width: 500 }}
              options={patientData}
              autoHighlight
              getOptionLabel={(option) => `${option.Address} - ${option.Allergies}`}
              renderOption={(props, option) => (
                <Box
                  key={option.Patient_ID}
                  component='li'
                  sx={{ '& > img': { flexShrink: 0 } }}
                  {...props}
                  className={`flex justify-around items-center bg-slate-300 border border-emerald-500 ${darkModeClass}`}
                  onClick={() => this.handleProfileClick(option.Patient_ID)}
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
                    style: { color: textColor }, 
                  }}
                  InputLabelProps={{
                    style: { color: textColor }, 
                  }}
                />
              )}
            />
          );
        }}
      </DarkModeContext.Consumer>
    );
  }
}

export default withPatientContext(Searchbar);

