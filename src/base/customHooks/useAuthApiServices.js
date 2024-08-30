import {
  BASE_URL,
  getAuthHeaders,
  multipartAuthHeaders,
} from '../commonServices';
import useAxios from './useAxios';

const useAuthApiServices = () => {
  const {fetchDataInstance} = useAxios();
  const getAuthOtp = async data => {
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
    console.log('authHeaders', authHeaders);
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

export default useAuthApiServices;
