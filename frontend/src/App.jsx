
import React from 'react';
import './App.css'
import LoginScreen from './assets/layouts/pages/LoginScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<LoginScreen/>} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
