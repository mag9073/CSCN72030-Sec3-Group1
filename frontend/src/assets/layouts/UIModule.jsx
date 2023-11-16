import React, { Component } from 'react'

export default class UIModule extends React.Component {

    // Abstract method
    settingButtonClicked = () => {
        throw new Error('Subclasses must implement settingButtonClicked method');
    }

  render() {
    return (
      <div>UIModule</div>
    )
  }
}
