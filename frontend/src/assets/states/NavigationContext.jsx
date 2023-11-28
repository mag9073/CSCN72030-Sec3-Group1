// NavigationContext.js
import React, { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [historyStack, setHistoryStack] = useState([]);

  const pushToHistory = (path) => {
    setHistoryStack((prevStack) => [...prevStack, path]);
  };

  const popFromHistory = () => {
    setHistoryStack((prevStack) => {
      const newStack = [...prevStack];
      newStack.pop();
      return newStack;
    });
  };

  return (
    <NavigationContext.Provider value={{ historyStack, pushToHistory, popFromHistory }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
