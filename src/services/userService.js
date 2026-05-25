import api from './api';

export const registerUser = (data) => api.post('/api/users/register', data);
export const loginUser = (data) => api.post('/api/users/login', data);
export const getUserProfile = () => api.get('/api/users/profile');
export const getAllUsers = () => api.get('/api/users');
