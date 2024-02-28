import { axios } from '@/plugins';

export function postProblem(payload) {
  return axios.post('feedback/', payload);
}

export function postSubscribe(payload) {
  return axios.post('subscribe/', payload);
}

export function fetchArticles() {
  return axios.get('articles/');
}
