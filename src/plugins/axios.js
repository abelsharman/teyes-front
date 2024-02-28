import axios from 'axios';

export const createAxiosInstance = () => {
  axios.defaults.baseURL = 'https://garagepro.kz/api/';

  return axios;
};

const newAxios = createAxiosInstance();

export { newAxios };
