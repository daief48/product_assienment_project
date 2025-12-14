<template>
  <div class="p-6">
    <ProductList @edit="setEditingProduct" />
  </div>
</template>

<script>
import ProductList from './components/ProductList.vue';

export default {
  components: { ProductList },
  data() {
    return { editingProduct: null };
  },
  methods: {
    setEditingProduct(product) {
      this.editingProduct = product;
    },
    refresh() {
      this.editingProduct = null;
    },
  },
};
</script>
