<template>
    <div class="p-6 bg-gray-50 min-h-screen">
        <h2 class="text-2xl font-bold mb-6 text-gray-800">Product Inventory</h2>

        <div class="mb-4 flex items-center">
            <input v-model="search" placeholder="Search by Name or SKU..."
                class="flex-1 border rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div class="overflow-x-auto bg-white rounded-lg shadow">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="px-6 py-3 text-left text-gray-600 uppercase text-sm font-medium">Name</th>
                        <th class="px-6 py-3 text-left text-gray-600 uppercase text-sm font-medium">SKU</th>
                        <th class="px-6 py-3 text-left text-gray-600 uppercase text-sm font-medium">Price</th>
                        <th class="px-6 py-3 text-left text-gray-600 uppercase text-sm font-medium">Stock</th>
                        <th class="px-6 py-3 text-left text-gray-600 uppercase text-sm font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <tr v-for="product in filteredProducts" :key="product.id"
                        class="hover:bg-gray-50 transition duration-150">
                        <td class="px-6 py-4 text-gray-700">{{ product.name }}</td>
                        <td class="px-6 py-4 text-gray-500">{{ product.sku }}</td>
                        <td class="px-6 py-4 text-gray-700 font-semibold">${{ product.price }}</td>
                        <td class="px-6 py-4 text-gray-700">{{ product.stock }}</td>
                        <td class="px-6 py-4 flex space-x-2">
                            <button @click="editProduct(product)"
                                class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition">
                                Edit
                            </button>
                            <button @click="deleteProduct(product.id)"
                                class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition">
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="mt-6 flex justify-center items-center space-x-2">
            <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
                class="px-4 py-2 rounded-md border bg-white hover:bg-gray-100 disabled:opacity-50">
                Previous
            </button>

            <span class="px-4 py-2 text-gray-600 font-medium">
                Page {{ currentPage }} of {{ lastPage }}
            </span>

            <button @click="goToPage(currentPage + 1)" :disabled="currentPage === lastPage"
                class="px-4 py-2 rounded-md border bg-white hover:bg-gray-100 disabled:opacity-50">
                Next
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const search = ref('')
const products = ref([])
const currentPage = ref(1)
const lastPage = ref(1)

const fetchProducts = async (page = 1) => {
    const res = await fetch(`http://localhost:8000/api/products?page=${page}`)
    const json = await res.json()

    products.value = json.data
    currentPage.value = json.current_page
    lastPage.value = json.last_page
}

const filteredProducts = computed(() => {
    return products.value.filter(
        p =>
            p.name.toLowerCase().includes(search.value.toLowerCase()) ||
            p.sku.toLowerCase().includes(search.value.toLowerCase())
    )
})

const goToPage = (page) => {
    if (page >= 1 && page <= lastPage.value) fetchProducts(page)
}

const editProduct = (product) => {
    console.log('Edit', product)
}

const deleteProduct = (id) => {
    console.log('Delete', id)
}

onMounted(() => fetchProducts())
</script>
