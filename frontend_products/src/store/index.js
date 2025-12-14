import { createStore } from 'vuex';
import productApi from '../api/product';

export default createStore({
  state: {
    products: [],
    total: 0,
    currentProduct: null,
    loading: false,
  },
  mutations: {
    SET_PRODUCTS(state, payload) {
      state.products = payload.data;
      state.total = payload.total;
    },
    SET_CURRENT_PRODUCT(state, product) {
      state.currentProduct = product;
    },
    ADD_PRODUCT(state, product) {
      state.products.unshift(product);
    },
    UPDATE_PRODUCT(state, product) {
      const index = state.products.findIndex(p => p.id === product.id);
      if (index !== -1) state.products[index] = product;
    },
    DELETE_PRODUCT(state, id) {
      state.products = state.products.filter(p => p.id !== id);
    },
  },
  actions: {
    async fetchProducts({ commit }, params = {}) {
      const response = await productApi.getProducts(params);
      commit('SET_PRODUCTS', response.data);
    },
    async fetchProduct({ commit }, id) {
      const response = await productApi.getProduct(id);
      commit('SET_CURRENT_PRODUCT', response.data);
    },
    async createProduct({ commit }, productData) {
      const response = await productApi.createProduct(productData);
      commit('ADD_PRODUCT', response.data);
    },
    async updateProduct({ commit }, { id, productData }) {
      const response = await productApi.updateProduct(id, productData);
      commit('UPDATE_PRODUCT', response.data);
    },
    async deleteProduct({ commit }, id) {
      await productApi.deleteProduct(id);
      commit('DELETE_PRODUCT', id);
    },
  },
  getters: {
    allProducts: state => state.products,
    currentProduct: state => state.currentProduct,
    totalProducts: state => state.total,
  },
});
