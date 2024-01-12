"use strict";
import axios from "axios";

let config = {
  baseURL: process.env.NODE_ENV === 'production' ? 'https://sale-med.abelsharman.kz/api/' : 'http://localhost:9013/api/'
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
