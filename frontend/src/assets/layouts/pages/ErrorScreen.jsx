import React, { Component } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { DarkModeContext } from '../../states/DarkModeContext';
import { FontSizeContext } from '../../states/FontSizeContext';
import UIModule from '../UIModule';
import Layout from '../Layout';

export class ErrorScreen extends UIModule {
    constructor(props) {
        super(props);
      }

  render() {
    return (
        <DarkModeContext.Consumer>
        {(darkModeContext) => (
          <FontSizeContext.Consumer>
            {(fontSizeContext) => {
              const { isDarkMode } = darkModeContext;
              const { fontSize } = fontSizeContext;

              return(
                <div className={`flex items-center justify-center flex-col h-screen  gap-4 ${isDarkMode ? 'dark' : 'light'}`}>
                <Layout>
                <div className={`flex items-center justify-center mx-2 my-2 overflow-hidden`} >
                    <div className='px-6 py-4 rounded shadow-lg'>
                        <div className='mb-2 text-xl font-bold text-center ' style={{ fontSize: `${fontSize}px` }}>                 
                        <h3>404 - Sorry could not find this page 🐈</h3>
                            <Link to={'/dashboard'}>
                                <a className='underline text-cyan-500'>Return Home</a>
                            </Link>
                        </div>
                        </div>
                </div>
                </Layout>
              </div>
            )}}
              </FontSizeContext.Consumer>
        )}
      </DarkModeContext.Consumer>
    );
  }

  }


export default ErrorScreen