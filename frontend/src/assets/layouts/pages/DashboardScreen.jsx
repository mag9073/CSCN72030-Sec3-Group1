import React, { Component } from 'react'
import Layout from '../Layout'
import Searchbar from '../../components/Searchbar'
import UIModule from '../UIModule'

export default class DashboardScreen extends UIModule {
    // Create Constructor 
    constructor(props) {
        super(props);
    }

    // Abstract class - concrete class
    settingButtonClicked = () => {
        console.log('Test');
    }

  render() {
    return (
      <div>
        <Layout>
            <main className='flex items-center justify-center flex-col gap-4'>
                {/* Create Search bar title */}
                <h2 className=' font-semibold text-4xl'>Search for patient profile</h2>

                {/* Create Search Bar */}
                <Searchbar/>

                {/* Create Search Results with Scroll bar */}
                {this.settingButtonClicked()}
            </main>

        </Layout>
      </div>
    )
  }
}
