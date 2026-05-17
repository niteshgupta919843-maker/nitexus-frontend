
import api from './api';

export const createOrder = (data) => api.post('/orders', data);
export const getMyOrders = () => api.get('/orders/my');
export const getAllOrders = () => api.get('/orders');
export const updateOrderStatus = (id, status) => api.put(`/orders/${id}/status`, { status });
