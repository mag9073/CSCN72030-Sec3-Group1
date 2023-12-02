import React, { useState, useContext, useEffect } from 'react';
import Chart from 'react-apexcharts';
import Layout from '../Layout';
import { Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { DarkModeContext } from '../../states/DarkModeContext';
import { FontSizeContext } from '../../states/FontSizeContext';
import { Typography } from '@mui/material';

const TrendsViewScreen = () => {
  const [navigateTo, setNavigateTo] = useState(null);

  const handleNavigate = (path) => {
    setNavigateTo(path);
  };

  const diabetesData = [
    { Name: 'Three Months', Pregnancies: 8, Glucose: 124, BloodPressure: 76, SkinThickness: 24, Insulin: 600, BMI: 28.7, DiabetesPedigree: 0.687, Age: 52, Outcome: 1 },
    { Name: 'Six Months', Pregnancies: 12, Glucose: 151, BloodPressure: 70, SkinThickness: 40, Insulin: 271, BMI: 41.8, DiabetesPedigree: 0.742, Age: 38, Outcome: 1 },
    { Name: 'One Year', Pregnancies: 8, Glucose: 186, BloodPressure: 90, SkinThickness: 35, Insulin: 225, BMI: 34.5, DiabetesPedigree: 0.423, Age: 37, Outcome: 1 },
  ];

  const chartOptions = {
    chart: {
      height: 350,
      type: 'line',
      stacked: false,
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#FF1654', '#247BA0'],
    series: diabetesData.map((item) => ({
      name: item.Name,
      data: [
        item.Glucose,
        item.BloodPressure,
        item.SkinThickness,
        item.Insulin,
        item.BMI,
        item.DiabetesPedigree,
        item.Age,
        item.Outcome,
      ],
    })),
    stroke: {
      width: [4, 4],
    },
    plotOptions: {
      bar: {
        columnWidth: '20%',
      },
    },
    xaxis: {
      categories: [
        'Glucose',
        'BloodPressure',
        'SkinThickness',
        'Insulin',
        'BMI',
        'DiabetesPedigree',
        'Age',
        'Outcome',
      ],
    },
    yaxis: [
      {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#FF1654',
        },
        labels: {
          style: {
            colors: '#FF1654',
          },
        },
        title: {
          text: 'Patient Health Trends',
          style: {
            color: '#FF1654',
          },
        },
      },
      {
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#247BA0',
        },
        labels: {
          style: {
            colors: '#247BA0',
          },
        },
        title: {
          text: 'Outcome',
          style: {
            color: '#247BA0',
          },
        },
      },
    ],
    tooltip: {
      shared: false,
      intersect: true,
      x: {
        show: false,
      },
    },
    legend: {
      horizontalAlign: 'left',
      offsetX: 40,
    },
  };

  if (navigateTo) {
    return <Navigate to={navigateTo} />;
  }

  return (
    <DarkModeContext.Consumer>
      {(darkModeContext) => (
        <FontSizeContext.Consumer>
          {(fontSizeContext) => {
            const { isDarkMode } = darkModeContext;
            const darkModeClass = isDarkMode ? 'dark' : 'light';
            const { fontSize } = fontSizeContext;

            return (
              <div className={darkModeClass}>
                <Layout>
                  <main className='flex items-center flex-col gap-4 md:h-4/6' style={{ fontSize: `${fontSize}px` }}>
                    <div className='flex '>
                      <h2 className='font-semibold text-4xl'>Patient Health Trends</h2>
                    </div>

                    <div className='flex gap-20 w-10/12 justify-between items-center flex-col md:flex-row'>
                      <div className='flex flex-col gap-10'>
                        <Button
                          variant='outlined'
                          startIcon={<ArrowBackIosIcon />}
                          onClick={() => handleNavigate('/profile')}
                        >
                          Patient Search
                        </Button>
                      </div>
                    </div>

                    {/* Render ApexCharts */}
                    <div className='flex gap-4 flex-col'>
                      <div>
                        <Typography>
                          Patient's Diabetes Blood Sample
                        </Typography>
                      </div>
                      <Chart options={chartOptions} series={chartOptions.series} type="line" height={450} width={800} />
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
};

export default TrendsViewScreen;
