import React, { Component } from 'react';
import Chart from "react-apexcharts";
import Papa from 'papaparse';
import Layout from '../Layout';
import { Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PatientProfileScreen from './PatientProfileScreen';

export default class TrendsViewScreen extends PatientProfileScreen {

    constructor() {
      super();
      this.state = {
        navigateTo: null,
      };
    }
  
  
    handleNavigate = (path) => {
      this.setState({ navigateTo: path });
    };
  
    render() {
  
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
                <h2 className='font-semibold text-4xl'>Patient Health Trends</h2>
              </div>
  
              {/* Back Button */}
              <div className='flex gap-20 w-10/12 justify-between items-center flex-col md:flex-row'>
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
            </main>
          </Layout>
        </div>
      );
    }
  }