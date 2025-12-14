<template>
  <div class="p-6 space-y-6">
    <ProductForm :product="editingProduct" @created="refreshList" @updated="refreshList" @cancel="editingProduct=null" />
    <ProductList @edit="setEditingProduct" />
  </div>
</template>

<script setup>
import ProductForm from './components/ProductForm.vue'
import ProductList from './components/ProductList.vue'
import { ref } from 'vue'

const editingProduct = ref(null)

const setEditingProduct = (product) => {
  editingProduct.value = product
}

const refreshList = () => {
  editingProduct.value = null
}
</script>
