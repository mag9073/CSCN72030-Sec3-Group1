import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../states/DarkModeContext';
import { FontSizeContext } from '../../states/FontSizeContext';
import Layout from '../Layout';
import { Typography, Button, Container, Paper } from '@mui/material';

const ErrorScreen = () => {
  const darkModeContext = useContext(DarkModeContext);
  const fontSizeContext = useContext(FontSizeContext);
  const { isDarkMode } = darkModeContext;
  const { fontSize } = fontSizeContext;

  return (
    <div className={`flex items-center justify-center flex-col h-screen  gap-4 ${isDarkMode ? 'dark' : 'light'}`}>
      <Layout>
        <Container component="main" maxWidth="xs">
          <Paper elevation={3} className={`flex items-center justify-center mx-2 my-2 overflow-hidden`}>
            <div className='px-6 py-4 rounded shadow-lg'>
              <Typography variant="h5" className='mb-2 text-center font-bold' style={{ fontSize: `${fontSize}px` }}>
                404 - Sorry could not find this page 🐈
              </Typography>
              <Link to={'/dashboard'}>
                <Button variant="contained" color="primary" className='text-cyan-500'>
                  Return Home
                </Button>
              </Link>
            </div>
          </Paper>
        </Container>
      </Layout>
    </div>
  );
};

export default ErrorScreen;
