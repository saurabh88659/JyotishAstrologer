import AsyncStorage from '@react-native-async-storage/async-storage';
import {CONSTANTS_ASYNC} from '../utils/constants';
import axios from 'axios';
export const BASE_URL = 'https://api.jyotiish.com';
// export const BASE_URL = 'https://mako-pumped-thrush.ngrok-free.app';

export const multipartAuthHeaders = async () => {
  return {
    Authorization: `Bearer ${await getOfflineData(CONSTANTS_ASYNC.TOKEN)}`,
    'Content-Type': 'multipart/form-data',
  };
};

export const getAuthHeaders = async () => {
  return {
    Authorization: `Bearer ${await getOfflineData(CONSTANTS_ASYNC.TOKEN)}`,
  };
};

export const getRefreshToken = async () => {
  return {
    Authorization: `Bearer ${await getOfflineData(
      CONSTANTS_ASYNC.REFRESH_TOKEN,
    )}`,
  };
};

export const setOfflineData = async (key, value) => {
  const resp = await AsyncStorage.setItem(key, JSON.stringify(value));
  return resp;
};

export const getOfflineData = async key => {
  const resp = await AsyncStorage.getItem(key);
  return JSON.parse(resp);
};

export const Instance = async (method, url, headers, data) => {
  try {
    const response = await axios({
      method: method,
      url: url,
      headers: headers,
      data: data,
    });
    console.log('API STATUS------ :', response?.status);
    return {data: response.data, success: true};
  } catch (error) {
    console.log('API STATUS------ :', error?.response?.status);
    // console.log('API ERROR------ :', error?.response);
    if (error.response) {
      return {data: error.response.data, success: false};
    } else {
      return {data: error, success: false};
    }
  }
};
