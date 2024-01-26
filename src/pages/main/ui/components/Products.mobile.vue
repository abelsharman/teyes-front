<template>
  <div v-if="!isError">
    <p class="text-gray-1 text-center text-3xl font-bold mb-6">Товары</p>
    <div class="space-y-7 pl-4">
      <div v-for="category in categories" :key="category.slug">
        <p class="mb-6 text-red-1 text-lg font-bold">{{ category.name }}</p>
        <div
          class="w-full overflow-x-auto overflow-y-hidden invisible-scrollbar flex space-x-5"
        >
          <Product
            v-for="product in category.products"
            :key="product.slug"
            :info="product"
            :category="category"
            class="w-[309px] min-w-[309px]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";

import { _axios, categoriesData } from "@shared/libs";

import Product from "./Product.vue";

const categories = ref([
  {
    name: "Автомагнитолы",
    value: "Автомагнитолы",
  },
  {
    name: "Камеры заднего вида",
    value: "Камеры заднего вида",
  },
  {
    name: "Камеры переднего вида",
    value: "Камеры переднего вида",
  },
  {
    name: "Камеры 360",
    value: "Камеры 360",
  },
  {
    name: "Видеорегистратор",
    value: "Видеорегистратор",
  },
]);
const isError = ref(false);
const isLoading = ref(false);

onBeforeMount(() => {
  fetchCategories();
});

function fetchCategories() {
  isLoading.value = true;
  _axios("categories/")
    .then(({ data }) => {
      categories.value = data;
      isError.value = false;
    })
    .catch(() => {
      isError.value = true;
      // categories.value = categoriesData
    })
    .finally(() => {
      isLoading.value = false;
    });
}
</script>
