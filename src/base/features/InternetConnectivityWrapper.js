import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import NoInternetScreen from '../../screens/authScreens/NoInternetScreen';
import {useDispatch} from 'react-redux';
import {setInternetSpeed} from '../../redux/auth.reducer';

const InternetConnectivityWrapper = ({children}) => {
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState(true);
  const [lastCheckTime, setLastCheckTime] = useState(Date.now());
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      checkInternetSpeed();
    });

    const intervalId = setInterval(() => {
      if (isConnected) {
        checkInternetSpeed();
      }
    }, 10000);

    return () => {
      unsubscribe();
      clearInterval(intervalId);
    };
  }, [isConnected]);

  const checkInternetSpeed = async () => {
    try {
      const startTime = Date.now();
      const response = await fetch('https://www.google.com', {method: 'HEAD'});
      const endTime = Date.now();
      const duration = endTime - startTime;
      const speed = (1 / duration) * 1000;
      classifySpeed(speed);
      setLastCheckTime(Date.now());
    } catch (error) {
      setInternetSpeed('No Internet');
    }
  };

  const classifySpeed = speed => {
    if (speed > 1) {
      dispatch(setInternetSpeed('good'));
    } else if (speed > 0.5) {
      dispatch(setInternetSpeed('average'));
    } else {
      dispatch(setInternetSpeed('bad'));
    }
  };

  return !isConnected ? <NoInternetScreen /> : <>{children}</>;
};

export default InternetConnectivityWrapper;
