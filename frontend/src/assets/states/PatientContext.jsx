import React, { createContext, Component } from 'react';

export const PatientContext = createContext();

class PatientContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      patientData: [],
      isLoading: true,
      error: null,
      selectedPatientId: null, // New state for selected patient ID
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/search', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch patient profile: ${response.status} ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        this.setState({ patientData: data, error: null });
      } else {
        throw new Error(`Received non-JSON response: ${contentType}`);
      }
    } catch (error) {
      console.error('Error fetching patient profile:', error);
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  updatePatientData = async () => {
    this.setState({ isLoading: true, error: null });
    await this.fetchData();
    this.setState({ isLoading: false });
  };

  // New method to update selected patient ID
  setSelectedPatientId = (patientId) => {
    this.setState({ selectedPatientId: patientId });
  };

  render() {
    const { patientData, isLoading, error, selectedPatientId } = this.state;
    const { children } = this.props;

    return (
      <PatientContext.Provider
        value={{
          patientData,
          isLoading,
          error,
          selectedPatientId,
          updatePatientData: this.updatePatientData,
          setSelectedPatientId: this.setSelectedPatientId,
        }}
      >
        {children}
      </PatientContext.Provider>
    );
  }
}

export default PatientContextProvider;
