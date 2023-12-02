import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import Layout from '../Layout';
import { Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { DarkModeContext } from '../../states/DarkModeContext';
import { FontSizeContext } from '../../states/FontSizeContext';
import { Typography } from '@mui/material';

class TrendsViewScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navigateTo: null,
      t1: '',
      t2: '',
      t3: '',
      series: [],
      diabetesData: [],
      heartfailureData: [],
      strokeData: [],
      currentPage: 1, 
    };
  }

  componentDidMount() {
    this.handleTrendsViewFiles();
  }

  handleNavigate = (path) => {
    this.setState({ navigateTo: path });
  };

  handleNextPage = () => {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  handlePrevPage = () => {
    this.setState((prevState) => ({
      currentPage: Math.max(1, prevState.currentPage - 1),
    }));
  };

  handleTrendsViewFiles = async () => {
    try {
      const res = await fetch("http://localhost:5000/trendsview", {
        method: 'GET',
      });
  
      if (res.ok) {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await res.json();
  
          const { t1, t2, t3 } = data;
  
          console.log('T1:', t1);
          console.log('T2:', t2);
          console.log('T3:', t3);

          const convertToDiabetesData = (t, name) => {
            console.log("t", t)
            return t.map((item) => ({
              Name: name,
              Pregnancies: item.Pregnancies, 
              Glucose: item.Glucose,
              BloodPressure: item.BloodPressure,
              SkinThickness: item.SkinThickness,
              Insulin: item.Insulin,
              BMI: item.BMI,
              DiabetesPedigree: item.DiabetesPedigreeFunction, 
              Age: item.Age,
              Outcome: item.Outcome,
              Year: item.Year, 
            }));
          };
          
  
          const diabetesData = [
            ...convertToDiabetesData(t1, 'Diabetes'),
          ];
  
          
          const covertToHeartFailureData = (t, name) => {
            return t.map((item) => ({
              Name: name,
              Age: item.Age,
              ChestPainType: item.ChestPainType,
              ExerciseAngina: item.ExerciseAngina,
              FastingBS: item.FastingBS,
              HeartDisease: item.HeartDisease,
              MaxHR: item.MaxHR,
              Oldpeak: item.Oldpeak,
              RestingBP: item.RestingBP,
              RestingECG: item.RestingECG,
              ST_Slope: item.ST_Slope,
              Sex: item.Sex,
              Year: item.Year,
            }))
          }
          
          const heartfailureData = [
            ...covertToHeartFailureData(t2, 'Heart Failure')
          ]
          
          const convertToStrokeData = (t, name) => {
            return t.map((item) => ({
              Name: name,
              Residence_type: item.Residence_type,
              Year: item.Year,
              age: item.age,
              avg_glucose_level: item.avg_glucose_level,
              bmi: item.bmi,
              ever_married: item.ever_married,
              heart_disease: item.heart_disease,
              hypertension: item.hypertension,
              sex: item.sex,
              smoking_status: item.smoking_status,
              stroke: item.stroke,
              work_type: item.work_type,
            }))
          }
          
          const strokeData = [
            ...convertToStrokeData(t3, 'Stroke')
          ]
          console.log('Diabetes Data:', diabetesData);
          console.log('HeartFailure Data:', heartfailureData);
          console.log('Stroke Data:', strokeData);
          
          // Update state with the formatted data
          this.setState({
            diabetesData: diabetesData
          }, () => {
            console.log('Updated Diabetes Data:', this.state.diabetesData);
          });


          this.setState({
            heartfailureData: heartfailureData
          }), () => {
            console.log('Updated HeartFailure Data:', this.state.heartfailureData);
          }

          this.setState({
            strokeData: strokeData
          }), () => {
            console.log('Update Stroke Data:', this.state.strokeData);
          }
          
  
        } else {
          console.error('Received non-JSON response:', contentType);
        }
      } else {
        console.error('Failed to fetch trendsview data. Status:', res.status);
      }
    } catch (error) {
      console.error('Error fetching trendsview data:', error);
    }
  };

  render() {
    const { navigateTo } = this.state;
  
    const chartOptions_one = {
      chart: {
        height: 350,
        type: 'line',
        stacked: false,
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#FF1654', '#247BA0'],

      series: this.state.diabetesData.map((item) => ({
        name: item.Year,
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

    const chartOptions_two = {
      chart: {
        height: 350,
        type: 'line',
        stacked: false,
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#FF1654', '#247BA0'],

      series: this.state.heartfailureData.map((item) => ({
        name: item.Year,
      data: [
        item.Age,
        item.ExerciseAngina,
        item.FastingBS,
        item.HeartDisease,
        item.MaxHR,
        item.Oldpeak,
        item.RestingBP,
        item.Sex,
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
          'Age',

          'Angina',
          'Fasting',
          'Heart Disease',
          'MaxHR',
          'Oldpeak',
          'R.BP',
          'Sex',
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



    const chartOptions_three = {
      chart: {
        height: 350,
        type: 'line',
        stacked: false,
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#FF1654', '#247BA0'],

      series: this.state.strokeData.map((item) => ({
        name: item.Year,
      data: [
        item.Residence_type,
        item.age,
        item.avg_glucose_level,
        item.bmi,
        item.ever_married,
        item.heart_disease,
        item.hypertension,
        item.sex,
        item.smoking_status,
        item.stroke,
        item.work_type,
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
          'ResidenceType',

          'Age',
          'Avg Glucose Level',
          'BMI',
          'Married',
          'Heart Disease',
          'Hypertension',
          'Sex',
          'Smoking Status',
          'Stroke',
          'Work Type'
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


    const charts = [
      <Chart key={1} options={chartOptions_one} series={chartOptions_one.series} type="line" height={450} width={800} />,
      <Chart key={2} options={chartOptions_two} series={chartOptions_two.series} type="line" height={450} width={800} />,
      <Chart key={3} options={chartOptions_three} series={chartOptions_three.series} type="line" height={450} width={800} />,
    ];

    const currentChart = charts[this.state.currentPage - 1];

    let pageTitle = '';
    switch (this.state.currentPage) {
      case 1:
        pageTitle = "Patient's Diabetes Blood Sample";
        break;
      case 2:
        pageTitle = "Patient's Heart Failure Blood Sample";
        break;
      case 3:
        pageTitle = "Patient's Stroke Blood Sample";
        break;
      default:
        pageTitle = '';
    }


    if (navigateTo) {
      return <Navigate to={navigateTo} />;
    }

    console.log(this.state.diabetesData)

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
                            onClick={() => this.handleNavigate('/profile')}
                          >
                            Patient Profile
                          </Button>
                        </div>
                      </div>

                      {/* Render ApexCharts */}
                      <div className='flex gap-4 flex-col'>
                        <div>
                          <Typography>
                            {pageTitle}
                          </Typography>
                        </div>
                        {currentChart}
                        <div className='flex gap-4'>
                          <Button variant='outlined' onClick={this.handlePrevPage} disabled={this.state.currentPage === 1}>
                            Previous Chart
                          </Button>
                          <Button variant='outlined' onClick={this.handleNextPage} disabled={this.state.currentPage === charts.length}>
                            Next Chart
                          </Button>
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

export default TrendsViewScreen;
