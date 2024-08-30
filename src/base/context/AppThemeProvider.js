// context/AppThemeProvider.js

import React, {createContext, useState} from 'react';
import {AppdarkColor, AppdefaultColor} from '../utils/AppColors';
export const AppThemeContext = createContext();

const AppThemeProvider = ({children}) => {
  const darkThemeColor = {
    primary: '#000',
    card: '#000',
    background: '#000',
    text: '#fff',
    border: '#8D8B94',
  };

  const defultThemeColor = {
    primary: '#fff',
    card: '#fff',
    background: '#fff',
    text: '#000',
    border: '#8D8B94',
  };

  const [isDark, setIsDark] = useState(false);
  const colors = isDark ? darkThemeColor : defultThemeColor;
  return (
    <AppThemeContext.Provider value={{colors, setIsDark, isDark}}>
      {children}
    </AppThemeContext.Provider>
  );
};

export default AppThemeProvider;
