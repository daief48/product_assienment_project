import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/products',
});

export default {
  getProducts(params) {
    return api.get('/', { params });
  },
  getProduct(id) {
    return api.get(`/${id}`);
  },
  createProduct(data) {
    return api.post('/', data, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  updateProduct(id, data) {
    return api.put(`/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  deleteProduct(id) {
    return api.delete(`/${id}`);
  },
};
