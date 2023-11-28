// Import necessary dependencies
import React from 'react';
import { Navigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Button } from '@mui/material';
import { DarkModeContext } from '../states/DarkModeContext';

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

  render() {
    const { navigateTo } = this.state;

    if (navigateTo) {
      return <Navigate to={navigateTo} />;
    }

    return (
      <DarkModeContext.Consumer>
        {(context) => {
          const { isDarkMode } = context;
          const darkModeClass = isDarkMode ? 'dark' : 'light';
          const textColor = isDarkMode ? 'white' : 'black'; // Set the text color based on dark mode

          return (
            <Autocomplete
              id='search-bar'
              sx={{ width: 500}}
              options={patients}
              autoHighlight
              getOptionLabel={(option) => option.name}
              renderOption={(props, option) => (
                <Box
                  key={option.id}
                  component='li'
                  sx={{ '& > img': { flexShrink: 0 } }}
                  {...props}
                  className={`flex justify-around items-center bg-slate-300 border border-emerald-500 ${darkModeClass}`}
                  onClick={() => this.handleProfileClick(option.id)}
                >
                  <div>
                    <p>Patient Name: {option.name}</p>
                    <p>Patient Id: {option.id}</p>
                    <p>DOB: {option.dob}</p>
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
                    autoComplete: 'new-password', // disable autocomplete and autofill
                    style: { color: textColor }, // Set the text color for the input
                  }}
                  InputLabelProps={{
                    style: { color: textColor }, // Set the text color for the label
                  }}
                />
              )}
            />
          );
        }}
      </DarkModeContext.Consumer>
    );
  }

  handleProfileClick = (patientId) => {
    // this.handleNavigate(`/patient/${patientId}`)
    this.handleNavigate(`/profile`);
  };
}

export default Searchbar;

const patients = [
  {
    name: 'Kathryns',
    id: 1,
    dob: '2003-05-01',
  },
  {
    name: 'Kathryna',
    id: 2,
    dob: '2003-05-01',
  },
  {
    name: 'Kathryn2',
    id: 3,
    dob: '2003-05-01',
  },
];
