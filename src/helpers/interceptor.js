import axios from 'axios';
import store from '../store/index';
import router from '../router/index';

export default function setup() {
  axios.interceptors.request.use(
    config => {
      // Set baseURL and withCredentials as default
      config.baseURL = process.env.VUE_APP_API_URL;
      config.withCredentials = true;

      // Add access token to requests
      const token = store.state.accessToken;
      if (token) config.headers.Authorization = `Bearer ${token}`;

      return config;
    },
    err => Promise.reject(err)
  );

  axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      const originalRequest = error.config;

      if (
        error.response.status === 401 &&
        originalRequest.url === `${process.env.VUE_APP_API_URL}/auth/refresh`
      ) {
        router.push('/login');
        return Promise.reject(error);
      }

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        return axios.post('/auth/refresh').then(res => {
          if (res.status === 200) {
            return store
              .dispatch('loginUser', res.data)
              .then(() => axios(originalRequest));
            // axios.defaults.headers.Authorization = `Bearer`
          }
        });
      }

      return Promise.reject(error);
    }
  );
}
