import axios from 'axios';
import qs from 'qs';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  paramsSerializer: (params) => qs.stringify(params, { encode: false }),
  headers: { 'Content-Type': 'application/json' },
});

const requestNewTokens = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) throw new Error('No refresh token');

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  if (!res.data?.isSuccess) {
    throw new Error('Refresh failed');
  }

  const { accessToken, refreshToken: newRefresh } = res.data.result;

  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', newRefresh);

  return accessToken;
};

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await requestNewTokens();

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
