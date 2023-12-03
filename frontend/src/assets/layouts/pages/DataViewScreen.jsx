import React, { Component } from 'react';
import Chart from "react-apexcharts";
import Papa from 'papaparse';
import Layout from '../Layout';
import { Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { DarkModeContext } from '../../states/DarkModeContext';
import { FontSizeContext } from '../../states/FontSizeContext';

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      t1: [],
      t2: [],
      t3: [],
      diabetesSeries: [],
      heartFailureSeries: [],
      strokeSeries: [],
      options: {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              style: {
                colors: ['#FFF'],
              },
              total: {
                enabled: true,
                // offsetX: 0,
                style: {
                  fontSize: '13px',
                  fontWeight: 900,
                  colors: ['#FFF'], // Set the colors for the total label
                },
              },
            },
          },
        },
        stroke: {
          width: 1,
          colors: ['#fff'],
        },
        title: {
          text: 'Patient Blood Results',
        },
        xaxis: {
          categories: ['Pregnancies', 'Blood Glucose', 'Blood Pressure', 'SkinThickness', 'Insulin', 'BMI', 'DiabetesPredigreeFunction', 'Age'],
          labels: {
            formatter: function (val) {
              return val;
            },
          },
        },
        yaxis: {
          title: {
            text: undefined,
          },
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val;
            },
          },
        },
        fill: {
          opacity: 1,
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          offsetX: 40,
        },
      },
    };
  }
  

  componentDidMount() {
    // Fetch CSV file and parse data for DiabetesResults.csv
    Papa.parse("/src/assets/files/DiabetesResults.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (diabetesResult) => {
        console.log('Diabetes CSV Data:', diabetesResult);
      
        const diabetesSeries = diabetesResult.data
          .filter(item => item.Pregnancies !== null)
          .map(item => ({
            name: 'Diabetes',
            data: [
              item.Pregnancies,
              item.Glucose,
              item.BloodPressure,
              item.SkinThickness,
              item.Insulin,
              item.BMI,
              item.DiabetesPedigreeFunction,
              item.Age,
            ]
          }));
      
        this.setState({
          diabetesSeries: diabetesSeries,
        });
      }
    })      
  
    // Fetch CSV file and parse data for HeartFailureResults.csv
    Papa.parse("/src/assets/files/HeartFailureResults.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (heartFailureResult) => {
        console.log(heartFailureResult);
  
        const heartFailureSeries = heartFailureResult.data
          .filter(item => item.Age !== null)  // Assuming Age is a necessary field for HeartFailureResults
          .map(item => ({
            name: 'Heart Failure',
            data: [
              item.Age,
              item.Sex,  // Add other necessary fields for HeartFailureResults
              item.ChestPainType,
              item.RestingBP,
              item.Cholesterol,
              item.FastingBS,
              item.RestingECG,
              item.MaxHR,
              item.ExerciseAngina,
              item.Oldpeak,
              item.ST_Slope,
              item.HeartDisease,
            ]
          }));
  
        // Set state for HeartFailureResults
        this.setState({
          heartFailureSeries: heartFailureSeries,
        });
      },
    });
  }
  


  render() {

    const { currentSeries, isDarkMode } = this.props;
    let seriesToDisplay;

    let dynamicXAxisCategories;

    if (currentSeries === 'diabetesSeries') {
      seriesToDisplay = this.state.diabetesSeries;
      dynamicXAxisCategories = [
        'Pregnancies', 'Blood Glucose', 'Blood Pressure', 'SkinThickness', 'Insulin', 'BMI', 'DiabetesPredigreeFunction', 'Age'
      ];
    } else if (currentSeries === 'heartfailureSeries') {
      seriesToDisplay = this.state.heartFailureSeries;
      dynamicXAxisCategories = [
        'Age', 'Sex', 'ChestPainType', 'RestingBP', 'Cholesterol', 'FastingBS', 'RestingECG', 'MaxHR', 'ExerciseAngina', 'Oldpeak', 'ST_Slope', 'HeartDisease'
      ];
    } else {
      seriesToDisplay = this.state.strokeSeries;
      dynamicXAxisCategories = null; // Set to null or undefined when not needed
    }

    console.log('Series to Display:', currentSeries);

    return (
      <DarkModeContext.Consumer>
        {(context) => {
          const { isDarkMode } = context;
          const darkModeClass = isDarkMode ? 'dark' : 'light';

          const dataLabelsStyle = {
            colors: isDarkMode ? '#FFF' : '#000',
          };

          const xaxisLabelsStyle = {
            colors: isDarkMode ? '#FFF' : '#000',
          };

          const chartTitleStyle = {
            color: isDarkMode ? '#FFF' : '#000',
          };

          const titleTextStyle = {
            color: isDarkMode ? '#FFF' : '#000',
          };

          const yaxisTitleTextStyle = {
            color: isDarkMode ? '#FFF' : '#000',
          };

          const fillStyle = {
            color: isDarkMode ? '#FFF' : '#000',
          };

          const legendStyle = {
            color: isDarkMode ? '#FFF' : '#000',
          };

          const tooltipStyle = {
            color: isDarkMode ? '#FFF' : '#000',
          };

          const yaxistext = {
            color: isDarkMode ? '#FFF' : '#000',
          }

          const statstext = [isDarkMode ? '#000' : '#FFF'];

          return (
            <div id="chart" className={darkModeClass}>
              <Chart
                options={{
                  ...this.state.options,
                  xaxis: {
                    ...this.state.options.xaxis,
                    categories: dynamicXAxisCategories,
                    labels: {
                      ...this.state.options.xaxis.labels,
                      style: xaxisLabelsStyle,
                    },
                  },
                  title: {
                    ...this.state.options.title,
                    style: chartTitleStyle,
                  },
                  tooltip: {
                    ...this.state.options.tooltip,
                    style: tooltipStyle,
                  },
                  fill: {
                    ...this.state.options.fill,
                    style: fillStyle,
                  },
                  yaxis: {
                    ...this.state.options.yaxis,
                    labels: {
                      show: true,
                      style: {
                        colors: yaxistext.color,
                      },
                    },
                  },
                  legend: {
                    ...this.state.options.legend,
                    labels: {
                      ...this.state.options.legend.labels,
                      colors: legendStyle.color,
                    },
                  },
                }}
                series={seriesToDisplay}
                type="bar"
                height={300}
              />
            </div>
          );
        }}
      </DarkModeContext.Consumer>
    );
  }
}


export default class DataView extends Component {

  constructor() {
    super();
    this.state = {
      navigateTo: null,
      diabetesReturnMessage: '',
      heartfailureReturnMessage: '',
      strokeReturnMessage: '',
      currentSeries: 'diabetesSeries',
      diabetesSeries: [], // Add this line
      heartFailureSeries: [], // Add this line
    };
  }


  componentDidMount() {
    // Use fetch inside componentDidMount
    fetch('http://localhost:5000/diabetes-prediction')
      .then((res) => res.json())
      .then((data) => {
        this.setState({ diabetesReturnMessage: JSON.stringify(data) });
        console.log(this.state.diabetesReturnMessage);
      });
  
    fetch('http://localhost:5000/heartfailure-prediction')
      .then((res) => res.json())
      .then((data) => {
        this.setState({ heartfailureReturnMessage: JSON.stringify(data) });
        console.log(this.state.heartfailureReturnMessage);
      });
  
    fetch('http://localhost:5000/stroke-prediction')
      .then((res) => res.json())
      .then((data) => {
        this.setState({ strokeReturnMessage: JSON.stringify(data) });
        console.log(this.state.strokeReturnMessage);
      });

      
  }
  

  handleNavigate = (path) => {
    this.setState({ navigateTo: path });
  };


  handleNext = () => {
    // Define the available series options
    const seriesOptions = ['diabetesSeries', 'heartfailureSeries', 'strokeSeries'];

    // Get the index of the current series
    const currentIndex = seriesOptions.indexOf(this.state.currentSeries);

    // Calculate the index of the next series
    const nextIndex = (currentIndex + 1) % seriesOptions.length;

    // Update the current series based on the next index
    this.setState({ currentSeries: seriesOptions[nextIndex] });
  };

  handleSeriesChange = (selectedSeries) => {
    this.setState({ currentSeries: selectedSeries });
  };

  render() {
    const { navigateTo, currentSeries, diabetesSeries, heartFailureSeries, strokeSeries } = this.state;

    if (navigateTo) {
      return <Navigate to={navigateTo} />;
    }

    const seriesToDisplay = currentSeries === 'diabetesSeries' ? this.state.diabetesSeries :
                           currentSeries === 'heartFailureSeries' ? this.state.heartFailureSeries :
                           this.state.strokeSeries;

    
    

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
                    <main className={`flex items-center flex-col gap-4 md:h-4/6 ${darkModeClass}`} style={{ fontSize: `${fontSize}px` }}>
                      <div className='flex gap-20 md:w-10/12 justify-between items-center flex-col md:flex-row'>
                        <div className='flex flex-col gap-10'>
                          <Button
                            variant="outlined"
                            startIcon={<ArrowBackIosIcon />}
                            onClick={() => this.handleNavigate('/profile')}
                          >
                            Patient Search
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleNext}
                            style={{ backgroundColor: '#156548' }}
                          >
                            Next
                          </Button>
                        </div>
                      </div>
                      <div className=' md:w-9/12'>
                        <ApexChart currentSeries={currentSeries} isDarkMode={isDarkMode} />
                        {/* Diabetes Prediction Results */}
                        <div className='flex flex-col gap-8'>
                          <div>
                            <p>{`${currentSeries === 'diabetesSeries' ? 'Diabetes' : 'Heart Failure'} Prediction Results:`}</p>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => this.handleNavigate(`/profile/dataview/${currentSeries === 'diabetesSeries' ? 'diabetes' : 'heartfailure'}-recommendations`)}
                              style={{ backgroundColor: '#156548' }}
                            >
                              View Recommendations
                            </Button>
                          </div>
                          {/* Stroke Prediction Results */}
                          <div>
                            <p>Stroke Prediction Results: {(this.state.actualResults)}</p>
                            <Button variant="contained" color="primary"
                              onClick={() => this.handleNavigate('/profile/dataview/stroke-recommendations')}
                              style={{ backgroundColor: '#156548' }}>
                              View Recommendations
                            </Button>
                          </div>
                        </div>
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
  }
}