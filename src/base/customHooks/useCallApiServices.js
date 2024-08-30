import {useDispatch} from 'react-redux';
import {
  BASE_URL,
  getAuthHeaders,
  multipartAuthHeaders,
} from '../commonServices';
import useAxios from './useAxios';
import {useNavigation} from '@react-navigation/native';

const useCallApiServices = () => {
  const {fetchDataInstance} = useAxios();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const getAuthOtp = async data => {
    console.log('data==', data);
    try {
      const result = await fetchDataInstance(
        'POST',
        BASE_URL + '/account/register/',
        null,
        data,
      );
      return result;
    } catch (error) {
      return error;
    }
  };

  const verifyAuthOtp = async data => {
    try {
      const result = await fetchDataInstance(
        'POST',
        BASE_URL + '/account/verify-otp/',
        null,
        data,
      );
      return result;
    } catch (error) {
      return error;
    }
  };

  const resendAuthOtp = async data => {
    try {
      const result = await fetchDataInstance(
        'POST',
        BASE_URL + '/account/resend-otp/',
        null,
        data,
      );
      return result;
    } catch (error) {
      return error;
    }
  };

  const createProfile = async data => {
    const authHeaders = await multipartAuthHeaders();
    console.log(authHeaders);
    try {
      const result = await fetchDataInstance(
        'POST',
        BASE_URL + '/astrologer/astrologer-profile/',
        authHeaders,
        data,
      );
      return result;
    } catch (error) {
      return error;
    }
  };
  const getProfile = async data => {
    const authHeaders = await getAuthHeaders();
    try {
      const result = await fetchDataInstance(
        'GET',
        BASE_URL + '/astrologer/astrologer-particular/',
        authHeaders,
        data,
      );
      return result;
    } catch (error) {
      return error;
    }
  };
  return {getAuthOtp, verifyAuthOtp, resendAuthOtp, getProfile, createProfile};
};

export default useCallApiServices;
