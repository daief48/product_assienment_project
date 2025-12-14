<template>
  <div>
    <h2 class="text-xl font-bold mb-4">Product List</h2>

    <!-- Search -->
    <input
      v-model="search"
      @input="onSearch"
      placeholder="Search products..."
      class="border p-2 mb-4 w-full rounded shadow"
    />

    <!-- Table -->
    <table class="min-w-full border rounded-lg overflow-hidden shadow">
      <thead class="bg-gray-100">
        <tr>
          <th class="border px-4 py-2 text-left">Name</th>
          <th class="border px-4 py-2 text-left">SKU</th>
          <th class="border px-4 py-2 text-left">Price</th>
          <th class="border px-4 py-2 text-left">Stock</th>
          <th class="border px-4 py-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50">
          <td class="border px-4 py-2">{{ product.name }}</td>
          <td class="border px-4 py-2">{{ product.sku }}</td>
          <td class="border px-4 py-2">{{ product.price }}</td>
          <td class="border px-4 py-2">{{ product.stock }}</td>
          <td class="border px-4 py-2">
            <button @click="editProduct(product)" class="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600">Edit</button>
            <button @click="deleteProduct(product.id)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="flex justify-center mt-4 space-x-2">
      <button
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
      >
        Prev
      </button>

      <button
        v-for="page in pages"
        :key="page"
        @click="changePage(page)"
        :class="['px-3 py-1 border rounded hover:bg-gray-200', { 'bg-blue-500 text-white': page === currentPage }]"
      >
        {{ page }}
      </button>

      <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === lastPage"
        class="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      search: '',
      searchTimeout: null,
    };
  },
  computed: {
    ...mapGetters(['allProducts', 'currentPage', 'lastPage']),
    products() {
      return this.allProducts;
    },
    pages() {
      // Simple array of pages for pagination buttons
      const arr = [];
      for (let i = 1; i <= this.lastPage; i++) arr.push(i);
      return arr;
    },
  },
  methods: {
    ...mapActions(['fetchProducts', 'deleteProduct']),
    editProduct(product) {
      this.$emit('edit', product);
    },
    onSearch() {
      if (this.searchTimeout) clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.fetchProducts({ search: this.search, page: 1 });
      }, 300); // debounce
    },
    changePage(page) {
      if (page < 1 || page > this.lastPage) return;
      this.fetchProducts({ search: this.search, page });
    },
  },
  mounted() {
    this.fetchProducts({ page: 1 });
  },
};
</script>
