import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import SettingsDialog from '../components/SettingsDialog';
import HelpDialog from '../components/HelpDialog';

export default class Layout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          navigateTo: null,
        };
      }

      handleNavigate = (path) => {
        this.setState({ navigateTo: path });
      };

  render() {

    const { navigateTo } = this.state;

    if (navigateTo) {
      return <Navigate to={navigateTo} />;
    }
    
    return (
      <div className='w-full h-screen p-4'>
        <div className='flex justify-between'>
            {/* Left items */}
            <div className=''>
                {/* Create Title */}
                <h1 className=' font-semibold text-4xl'>RiskAlert</h1>
                {/* Create Greeting Message */}
                <p className=' text-2xl'>{`Welcome Back! Allision Brown, MD`}</p>
            </div>
            
            {/* Right items */}
            <div className='flex flex-col gap-4'>
            {/* Create Settings and Help buttons */}
                <SettingsDialog/>
                {/* <button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-40'>
                    Help
                </button> */}
                <HelpDialog/>
            </div>

        </div>

        {this.props.children}
        

      </div>
    )
  }
}
