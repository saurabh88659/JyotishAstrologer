import {StatusBar} from 'react-native';
import React from 'react';
import {AppColors} from '../utils/constants';

export const StatusBarStyle = {
  dark_content: 'dark-content',
  light_content: 'light-content',
  default: 'default',
};

const AppStatusBar = ({
  backgroundColor = AppColors.lightYellow,
  barStyle = StatusBarStyle.dark_content,
}) => {
  return (
    <>
      <StatusBar backgroundColor={backgroundColor} barStyle={barStyle} />
    </>
  );
};

export default AppStatusBar;
