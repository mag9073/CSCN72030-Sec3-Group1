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
      series: [],
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
                offsetX: 0,
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
          categories: ['Blood Glucose', 'SP02', 'Blood Pressure', 'Temperature', 'Cholesterol', 'Respiratory Rate'],
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
              return val + 'K';
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
    // Fetch CSV file and parse data
    Papa.parse("/src/assets/files/PatientData.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (result) => {

        const series = result.data.map((item) => ({
          name: item.Age + '-' + item.Sex, // Using a combination of Age and Sex as the name
          data: [
            item.RestingBP,
            item.Cholesterol,
            item.FastingBS,
            item.MaxHR,
            item.Oldpeak,
          ],
        }));

        this.setState({
          series: series,
        });
      },
    });
  }

  render() {
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
                        colors: yaxistext.color
                      }}
                  },
                  legend: {
                    ...this.state.options.legend,
                    labels: {
                      ...this.state.options.legend.labels,
                      colors: legendStyle.color,
                    },
                  },
                }}
                series={this.state.series}
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
      actualResults: '',
      series: []
    };
  }


  componentDidMount() {
    // Use fetch inside componentDidMount
    fetch('http://localhost:5000/diabetes-prediction')
      .then((res) => res.json())
      .then((data) => {
      this.setState({ actualResults: JSON.stringify(data) });
      console.log(this.state.actualResults)
      })}

  handleNavigate = (path) => {
    this.setState({ navigateTo: path });
  };

  render() {
    return (
      <DarkModeContext.Consumer>
        {(darkModeContext) => (
          <FontSizeContext.Consumer>
            {(fontSizeContext) => {
              const { isDarkMode } = darkModeContext;
              const darkModeClass = isDarkMode ? 'dark' : 'light';
              const { fontSize } = fontSizeContext;

    const { navigateTo } = this.state;

    if (navigateTo) {
      return <Navigate to={navigateTo} />;
    }

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
                  </div>
                </div>
            <div className=' md:w-9/12'>
              <ApexChart />
              {/* <div className='md:flex md:justify-center'>
                <RadialBarChart {...chart1Props} />
                {/* ... (similar modifications for other RadialBarCharts) 
              </div> */}
              <p>Prediction Results: {(this.state.actualResults)}</p>
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
