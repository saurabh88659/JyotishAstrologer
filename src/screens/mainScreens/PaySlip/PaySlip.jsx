import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppContainer from '../../../libComponents/AppContainer';
import AppHeader from '../../../libComponents/AppHeader';

const PaySlip = () => {
  return (
    <AppContainer>
      <AppHeader isDrawer={false} screen={'Pay Slip'} />
    </AppContainer>
  );
};

export default PaySlip;
const styles = StyleSheet.create({});
