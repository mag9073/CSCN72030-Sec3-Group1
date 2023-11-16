import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Button } from '@mui/material';


class Searchbar extends React.Component {
  render() {
    return (
      <Autocomplete
        id='search-bar'
        sx={{width: 500}}
        options={patients}
        autoHighlight
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => (
          <Box component='li' sx={{ '& > img': { flexShrink: 0 } }} {...props} className='flex  justify-around items-center bg-slate-300 border border-emerald-500'>
            <div>
              <p>Patient Name: {option.name}</p>
              <p>Patient Id: {option.id}</p>
              <p>DOB: {option.dob}</p>
            </div>
            <div>
              <Button variant='contained' color="success">Patient Profile</Button>
            </div>
          </Box>
        )}

               renderInput={(params) => (
          <TextField
            {...params}
            label="Enter patient name, ID or DOB"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        )
          }
      />
    )
  }

}

export default Searchbar;

const patients = [
  {
    name: 'Kathryn', id: 1, dob: '2003-05-01'
  },
  {
    name: 'Kathryn', id: 1, dob: '2003-05-01'
  },
  {
    name: 'Kathryn', id: 1, dob: '2003-05-01'
  },

]
