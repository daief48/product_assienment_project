import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true, // required if using session + CSRF
});

export default {
  getProducts(params = {}) {
    return api.get('/products', { params });
  },

  getProduct(id) {
    return api.get(`/products/${id}`);
  },

  createProduct(data) {
    return api.post('/products', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  updateProduct(id, data) {
    if (data instanceof FormData) data.append('_method', 'PUT');
    return api.post(`/products/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  deleteProduct(id) {
    return api.delete(`/products/${id}`);
  },
};
