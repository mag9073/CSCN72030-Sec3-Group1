import React, { Component } from 'react'

export default class HelpDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
          open: false,
          fullWidth: true,
          maxWidth: 'sm',
        };
      }
  render() {
    return (
      <div>HelpDialog</div>
    )
  }
}
