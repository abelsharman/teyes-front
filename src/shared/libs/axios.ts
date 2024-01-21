"use strict";
import axios from "axios";

let config = {
  baseURL: 'http://89.46.33.69/api/',
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config: any) {
    return config;
  },
  function(error: any) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response: any) {
    return response;
  },
  function(error: any) {
    return Promise.reject(error);
  }
);


export { _axios };
