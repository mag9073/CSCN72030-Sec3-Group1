import React, { createContext, Component } from 'react';

const DarkModeContext = createContext();

class DarkModeProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDarkMode: false,
    };
  }

  toggleDarkMode = () => {
    this.setState((prevState) => ({
      isDarkMode: !prevState.isDarkMode,
    }));
  };

  render() {
    const { isDarkMode } = this.state;

    return (
      <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode: this.toggleDarkMode }}>
        {this.props.children}
      </DarkModeContext.Provider>
    );
  }
}

export { DarkModeProvider, DarkModeContext };
