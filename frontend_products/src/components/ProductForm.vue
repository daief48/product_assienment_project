<template>
  <div>
    <h2 class="text-xl font-bold mb-4">{{ isEdit ? 'Edit' : 'Create' }} Product</h2>
    <form @submit.prevent="submitForm">
      <input v-model="form.name" placeholder="Name" class="border p-2 mb-2 w-full"/>
      <input v-model="form.sku" placeholder="SKU" class="border p-2 mb-2 w-full"/>
      <input v-model="form.price" placeholder="Price" type="number" class="border p-2 mb-2 w-full"/>
      <input v-model="form.stock" placeholder="Stock" type="number" class="border p-2 mb-2 w-full"/>
      <input type="file" @change="handleFile" class="border p-2 mb-2 w-full"/>
      <button class="bg-green-500 text-white px-4 py-2" type="submit">{{ isEdit ? 'Update' : 'Create' }}</button>
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
    handleFile(e) {
      this.form.image = e.target.files[0];
    },
    submitForm() {
      const data = new FormData();
      for (const key in this.form) {
        if (this.form[key] !== null) data.append(key, this.form[key]);
      }

      if (this.isEdit) {
        this.updateProduct({ id: this.form.id, productData: data });
      } else {
        this.createProduct(data);
      }

      // Emit event to parent
      this.$emit('created');
    },
  },
};
</script>
