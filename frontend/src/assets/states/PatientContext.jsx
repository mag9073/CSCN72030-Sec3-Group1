import React, { createContext, useContext, useState } from 'react';

export const PatientContext = createContext();

export class PatientProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      patientData: null,
    };
  }

  updatePatientData = (data) => {
    this.setState({ patientData: data });
  };

  render() {
    return (
      <PatientContext.Provider
        value={{ patientData: this.state.patientData, updatePatientData: this.updatePatientData }}
      >
        {this.props.children}
      </PatientContext.Provider>
    );
  }
}

export const usePatientContext = () => {
  return useContext(PatientContext);
};

export const withPatientContext = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      return (
        <PatientContext.Consumer>
          {(patientContext) => <WrappedComponent {...this.props} patientContext={patientContext} />}
        </PatientContext.Consumer>
      );
    }
  };
};
