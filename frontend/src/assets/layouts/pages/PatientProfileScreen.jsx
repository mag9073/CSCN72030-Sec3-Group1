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
      navigateTo: null,
    };
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

    const patientId = location.pathname.split('/').pop();

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
                  const { patientData } = patientContext;

                  console.log(patientData)
                  console.log(patientId)
                  return (
                    <div className={darkModeClass}>
                      <Layout>
                        <main className={`flex items-center flex-col gap-4 md:h-4/6 ${darkModeClass}`} style={{ fontSize: `${fontSize}px` }}>
                          {/* Create Search bar title */}
                          <div className='flex '>
                            <h2 className='font-semibold text-4xl'>Patient Profile</h2>
                          </div>

                          {/* Back Button */}
                          <div className='flex gap-20 md:w-10/12 justify-between items-center flex-col md:flex-row'>
                            <div className='flex flex-col gap-10'>
                              <div>
                                <Button
                                  variant="outlined"
                                  startIcon={<ArrowBackIosIcon />}
                                  onClick={() => this.handleNavigate('/dashboard')}
                                  // style={`border-color: ${darkModeClass}`}
                                >
                                  Patient Search
                                </Button>
                              </div>
                              {/* Patient information */}
                              {console.log(patientData)}
                              {console.log(patientId.slice(1))}
                              {
                              patientData &&
                              patientData
                                .filter((data) => data.Patient_ID === decodeURIComponent(patientId)) // Ignore the first character since it contains %
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
                                ))
                            }
                                </div>

                            {/* Right items - buttons */}
                            <div className='flex flex-col gap-10 pt-10'>
                              <Button
                                variant="outlined"
                                onClick={() => this.handleNavigate(this.constructLink(`/${patientId}/dataview`))}
                                className='w-80 h-20'
                              >
                                View Lab Results & Risk Percentage
                              </Button>
                              <Button
                                variant='outlined'
                                onClick={() => this.handleNavigate(this.constructLink(`/${patientId}/trendsview`))}
                                className='w-80 h-20'
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
