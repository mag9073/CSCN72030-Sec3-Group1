import React, { Component } from 'react';
import Chart from "react-apexcharts";
import Papa from 'papaparse';
import Layout from '../Layout';
import { Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PatientProfileScreen from './PatientProfileScreen';

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
              total: {
                enabled: true,
                offsetX: 0,
                style: {
                  fontSize: '13px',
                  fontWeight: 900
                }
              }
            }
          },
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        title: {
          text: 'Patient Blood Results'
        },
        xaxis: {
          categories: ['Blood Glucose', 'SP02', 'Blood Pressure', 'Temperature', 'Cholesterol', 'Respiratory Rate'],
          labels: {
            formatter: function (val) {
              return val;
            }
          }
        },
        yaxis: {
          title: {
            text: undefined
          },
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + "K";
            }
          }
        },
        fill: {
          opacity: 1
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          offsetX: 40
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
        // Assuming your CSV has columns like "Age," "Sex," "ChestPainType," etc.
        // Modify the mapping according to your specific data structure

        const series = result.data.map((item) => ({
          name: item.Age + '-' + item.Sex, // Using a combination of Age and Sex as the name
          data: [
            item.RestingBP,
            item.Cholesterol,
            item.FastingBS,
            item.MaxHR,
            item.Oldpeak,
            // Add more data points as needed
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
      <div id="chart">
        <Chart options={this.state.options} series={this.state.series} type="bar" height={300} />
      </div>
    );
  }
}

class RadialBarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: props.series,
      options: {
        chart: {
          height: 350,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: '70%',
            },
          },
          dataLabels: {
            style: {
              colors: ['#F44336', '#E91E63', '#9C27B0']
            }
          }
        },
        labels: props.labels,
      },
    };
  }

  // Function to set custom colors based on the percentage
  setCustomColors(series) {
    return series.map((value) => {
      // Customize the color based on the value or percentage
      // You can implement your logic to set different colors
      if (value > 75) {
        return '#ff0000';
      } else if (value > 50 && value <= 75) {
        return '#FFBF00';
      } else {
        return '#00FF00';
      }
    });
  }
  

  render() {
    return (
      <div id="radial-chart">
        <Chart options={this.state.options} series={this.state.series} type="radialBar" height={200} />
      </div>
    );
  }
}

export default class DataViewScreen extends PatientProfileScreen {

  constructor() {
    super();
    this.state = {
      navigateTo: null,
      actualResults: '',
      series: []
    };
  }

//   componentDidMount() {
//     // Use fetch inside componentDidMount
//     fetch('http://localhost:5000/diabetes-prediction')
//       .then((res) => res.json())
//       .then((data) => {
//         // Update currentTime in state
//         this.setState({ actualResults: JSON.stringify(data) });
//        // Fetch CSV file and parse data
//        const jsonObject = JSON.parse(jsonString);

//         // Extract the value of "result_file_path"
//         const resultFilePath = jsonObject.result_file_path;

//         console.log(resultFilePath);
//        Papa.parse(resultFilePath, {
//         download: true,
//         header: true,
//         dynamicTyping: true,
//         complete: (result) => {
//           // Assuming your CSV has columns like "Age," "Sex," "ChestPainType," etc.
//           // Modify the mapping according to your specific data structure

//           const series = result.data.map((item) => ({
//             item
//           }));

//           this.setState({
//             series: series,
//           });
//         },
//       });
//     });
// }

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

    const {actualResults} = this.state;

    
    const chart1Props = {
      series: [80],
      height: 400,
      hollowSize: '90%',
      labels: ['Diabetes Mellitus'],
    };

    const chart2Props = {
      series: [60],
      height: 400,
      hollowSize: '75%',
      labels: ['Hypertension'],
    };

    const chart3Props = {
      series: [60],
      height: 400,
      hollowSize: '62%',
      labels: ['Heart Disease'],
    };

    const chart4Props = {
      series: [30],
      height: 400,
      hollowSize: '30%',
      labels: ['Stroke'],
    };

    const chart5Props = {
      series: [30],
      height: 400,
      hollowSize: '30%',
      labels: ['Kidney Disease'],
    };

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
              <div className='md:flex md:justify-center'>
                <RadialBarChart {...chart1Props} />
                <RadialBarChart {...chart2Props} />
                <RadialBarChart {...chart3Props} />
                <RadialBarChart {...chart4Props} />
                <RadialBarChart {...chart5Props} />
              </div>

              <p>Prediction Results: {(this.state.actualResults)}</p>
            </div>
          </main>
        </Layout>
      </div>
    );
  }
}
