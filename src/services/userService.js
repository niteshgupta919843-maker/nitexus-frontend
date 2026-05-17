
import api from './api';

export const registerUser = (data) => api.post('/users/register', data);
export const loginUser = (data) => api.post('/users/login', data);
export const getUserProfile = () => api.get('/users/profile');
export const getAllUsers = () => api.get('/users');
