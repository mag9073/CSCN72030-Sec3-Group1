import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../Layout';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

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

    return (
      <div>
        <Layout>
          <main className='flex items-center flex-col gap-4 md:h-4/6'>
            {/* Create Search bar title */}
            <div className='flex '>
              <h2 className='font-semibold text-4xl'>Patient Profile</h2>
            </div>

            {/* Back Button */}
            <div className='flex gap-20 w-10/12 justify-between items-center flex-col md:flex-row'>
              <div className='flex flex-col gap-10'>
                <Button
                  variant="outlined"
                  startIcon={<ArrowBackIosIcon />}
                  onClick={() => this.handleNavigate('/dashboard')}
                >
                  Patient Search
                </Button>
                {/* Patient information */}
                <div>
                  <p>{`Patient Name: Kathryn O'Rilley`}</p>
                  <p>{`DOB: Sept 02, 1960`}</p>
                  <p>{`Patient ID: 3291 9932`}</p>
                  <p>{`Phone: 000-000-1111`}</p>
                  <p>{`Email: rilleykath@gmail.com`}</p>
                  <p>{`Address: 200 King Street, Toronto, ON, Canada`}</p>
                  <p>{`Allegeries: Seafood`}</p>
                </div>
              </div>

              {/* Right items - buttons */}
              <div className='flex flex-col gap-10 pt-10'>
                <Button
                  variant="outlined"
                  onClick={() => this.handleNavigate(this.constructLink('/dataview'))}
                  className='w-80 h-20'
                >
                  View Lab Results & Risk Percentage
                </Button>
                <Button
                  variant='outlined'
                  onClick={() => this.handleNavigate(this.constructLink('/trendsview'))}
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
  }
}

export default PatientProfileScreen;
