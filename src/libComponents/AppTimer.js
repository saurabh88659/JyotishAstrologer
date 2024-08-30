import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppColors} from '../utils/constants';

const AppTimer = ({time = 0}) => {
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    setRemainingTime(time);
    const timer = setInterval(() => {
      setRemainingTime(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes} min ${seconds < 10 ? '0' : ''}${seconds} sec`;
  };

  return (
    <Text
      style={{
        // right: 30,
        // position: 'absolute',
        color: AppColors.black,
        // paddingHorizontal: 40,
        fontSize: 17,
      }}>
      {formatTime(remainingTime)}
    </Text>
  );
};

export default AppTimer;

const styles = StyleSheet.create({});
