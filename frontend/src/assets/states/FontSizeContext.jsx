import React, { createContext, useContext, Component } from 'react';

export const FontSizeContext = createContext();

export class FontSizeProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSize: 16,
    };
  }

  updateFontSize = (size) => {
    this.setState({ fontSize: size });
  };

  render() {
    const { children } = this.props;
    const { fontSize } = this.state;

    const contextValue = {
      fontSize,
      updateFontSize: this.updateFontSize,
    };

    return (
      <FontSizeContext.Provider value={contextValue}>
        {children}
      </FontSizeContext.Provider>
    );
  }
}

export const useFontSize = () => {
  return useContext(FontSizeContext);
};
