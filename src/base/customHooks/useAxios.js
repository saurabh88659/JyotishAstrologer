import {useState} from 'react';
import axios from 'axios';

const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const fetchDataInstance = async (method, url, headers, data) => {
    setLoading(true);
    try {
      const response = await axios({
        method,
        url,
        headers,
        data,
      });
      console.log('API STATUS :', response?.status);
      return {data: response.data, success: true};
    } catch (error) {
      console.log('API STATUS------ :', error?.response?.status);
      if (error.response) {
        return {data: error.response.data, success: false};
      } else {
        return {data: error, success: false};
      }
    } finally {
      setLoading(false);
    }
  };
  return {fetchDataInstance, loading};
};

export default useAxios;
