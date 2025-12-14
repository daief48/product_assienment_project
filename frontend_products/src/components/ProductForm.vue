<template>
  <div>
    <h2 class="text-xl font-bold mb-4">{{ isEdit ? 'Edit' : 'Create' }} Product</h2>
    <form @submit.prevent="submitForm" class="space-y-2">
      <input v-model="form.name" placeholder="Name" class="border p-2 w-full rounded"/>
      <input v-model="form.sku" placeholder="SKU" class="border p-2 w-full rounded"/>
      <input v-model="form.price" placeholder="Price" type="number" class="border p-2 w-full rounded"/>
      <input v-model="form.stock" placeholder="Stock" type="number" class="border p-2 w-full rounded"/>
      <input type="file" @change="handleFile" class="border p-2 w-full rounded"/>
      <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        {{ isEdit ? 'Update' : 'Create' }}
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    product: Object
  },
  data() {
    return {
      form: {
        name: '',
        sku: '',
        price: '',
        stock: '',
        image: null,
        id: null,
      },
      isEdit: false,
    };
  },
  watch: {
    product: {
      immediate: true,
      handler(val) {
        if (val) {
          this.form = { ...val, image: null };
          this.isEdit = true;
        } else {
          this.form = { name: '', sku: '', price: '', stock: '', image: null, id: null };
          this.isEdit = false;
        }
      },
    },
  },
  methods: {
    ...mapActions(['createProduct', 'updateProduct']),
    handleFile(event) {
      this.form.image = event.target.files[0] || null;
    },
    async submitForm() {
      const data = new FormData();
      for (const key in this.form) {
        if (this.form[key] !== null && this.form[key] !== undefined) {
          data.append(key, this.form[key]);
        }
      }

      try {
        if (this.isEdit) {
          await this.updateProduct({ id: this.form.id, productData: data });
        } else {
          await this.createProduct(data);
        }
        this.$emit('saved'); // emit a more descriptive event
        this.resetForm();
      } catch (error) {
        console.error('Failed to save product:', error);
      }
    },
    resetForm() {
      this.form = { name: '', sku: '', price: '', stock: '', image: null, id: null };
      this.isEdit = false;
    },
  },
};
</script>
