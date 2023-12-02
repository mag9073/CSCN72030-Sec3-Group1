import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Button } from '@mui/material';
import { DarkModeContext } from '../states/DarkModeContext';
import { PatientContext } from '../states/PatientContext';

const Searchbar = () => {
  const [navigateTo, setNavigateTo] = useState(null);

  const handleNavigate = (path) => {
    setNavigateTo(path);
  };

  const handleProfileClick = (patientId, setSelectedPatientId) => {
    setSelectedPatientId(patientId);
    setNavigateTo(`/profile`);
    console.log(patientId);
  };

  const patientContext = useContext(PatientContext);
  const darkModeContext = useContext(DarkModeContext);

  const { patientData, setSelectedPatientId, selectedPatientId } = patientContext;
  const { isDarkMode } = darkModeContext;

  if (!patientData) {
    return <div>No patient data available.</div>;
  }

  const darkModeClass = isDarkMode ? 'dark' : 'light';
  const textColor = isDarkMode ? 'white' : 'black';

  if (navigateTo) {
    return <Navigate to={navigateTo} />;
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
          onClick={() => handleProfileClick(option.Patient_ID, setSelectedPatientId)}
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
};

export default Searchbar;
