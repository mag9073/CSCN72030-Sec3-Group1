import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../Layout';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { DarkModeContext } from '../../states/DarkModeContext';
import { FontSizeContext } from '../../states/FontSizeContext';
import { PatientContext } from '../../states/PatientContext';

class PatientProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patientData: null,
      navigateTo: null,
    };
  }

  componentDidMount() {
    // Retrieve patient data from localStorage when the component mounts
    const savedPatientData = localStorage.getItem('patientData');
    if (savedPatientData) {
      this.setState({ patientData: JSON.parse(savedPatientData) });
    }
  }

  componentDidUpdate() {
    // Save patient data to localStorage whenever it changes
    const { patientData } = this.state;
    localStorage.setItem('patientData', JSON.stringify(patientData));
  }

  constructLink = (path) => {
    const { location } = this.props;
    const pathname = location && location.pathname;
    const newPath = pathname && pathname.endsWith("/profile") ? `${pathname}${path}` : `/profile${path}`;
    return newPath;
  };

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
            {(fontSizeContext) => (
              <PatientContext.Consumer>
                {(patientContext) => {
                  const { isDarkMode } = darkModeContext;
                  const darkModeClass = isDarkMode ? 'dark' : 'light';
                  const { fontSize } = fontSizeContext;
                  const { selectedPatientId, patientData } = patientContext;
                  

                  return (
                    <div className={darkModeClass}>
                      <Layout>
                        <main className={`flex items-center flex-col gap-4 md:h-4/6 ${darkModeClass}`} style={{ fontSize: `${fontSize}px` }}>
                          <div className='flex '>
                            <h2 className='font-semibold text-4xl'>Patient Profile</h2>
                          </div>

                          <div className='flex gap-20 md:w-10/12 justify-between items-center flex-col md:flex-row'>
                            <div className='flex flex-col gap-10'>
                              <div>
                                <Button
                                  variant="outlined"
                                  startIcon={<ArrowBackIosIcon />}
                                  onClick={() => this.handleNavigate('/dashboard')}
                                >
                                  Patient Search
                                </Button>
                              </div>
                              {selectedPatientId && patientData && (
                                <div key={selectedPatientId}>
                                  {patientData
                                    .filter((data) => data.Patient_ID === selectedPatientId)
                                    .map((filteredData) => (
                                      <div key={filteredData.Patient_ID}>
                                        <p>{`Patient Name: ${filteredData.Patient_Name}`}</p>
                                        <p>{`DOB: ${filteredData.DOB}`}</p>
                                        <p>{`Patient ID: ${filteredData.Patient_ID}`}</p>
                                        <p>{`Phone: ${filteredData.Phone}`}</p>
                                        <p>{`Email: ${filteredData.Email}`}</p>
                                        <p>{`Address: ${filteredData.Address}`}</p>
                                        <p>{`Allergies: ${filteredData.Allergies}`}</p>
                                      </div>
                                    ))}
                                </div>
                              )}
                            </div>

                            <div className='flex flex-col gap-10 pt-10'>
                              <Button
                                variant="contained"
                                onClick={() => this.handleNavigate(this.constructLink(`/dataview`))}
                                className='w-80 h-20'
                                style={{backgroundColor: '#156548'}}
                              
                              >
                                View Lab Results & Risk 
                              </Button>
                              <Button
                                variant="contained"
                                onClick={() => this.handleNavigate(this.constructLink(`/trendsview`))}
                                className='w-80 h-20'
                                style={{backgroundColor: '#156548'}}
                              >
                                View Trend
                              </Button>
                            </div>
                          </div>
                        </main>
                      </Layout>
                    </div>
                  );
                }}
              </PatientContext.Consumer>
            )}
          </FontSizeContext.Consumer>
        )}
      </DarkModeContext.Consumer>
    );
  }
}

export default PatientProfileScreen;
