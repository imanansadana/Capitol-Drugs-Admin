/* eslint-disable no-unused-expressions */
import axois from 'axios';
import { backendUrl } from './credentials';

const isPublicRoute = url => {
  const publicRoutes = ['auth/login', 'auth/forgot-password', 'auth/verify-token'];
  return publicRoutes.includes(url);
};

export const apiCall = async (url, data) => {
  const authToken = localStorage.getItem('authToken');
  return await axois
    .post(`${backendUrl}/${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        operation: isPublicRoute(url) ? 'public' : 'private',
        Authorization: `Bearer ${authToken || ''}`,
      },
    })
    .then(res => {
      if (res && res.data && res.data.status === 401) {
        localStorage.clear();
        localStorage.setItem('isLoggedIn', false);
      }
      return res;
    });
};
