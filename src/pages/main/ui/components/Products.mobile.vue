<template>
    <div>
        <p class="text-gray-1 text-center text-3xl font-bold mb-6">Товары</p>
        <div class="space-y-7 pl-4">
            <div v-for="category in categories" :key="category.value">
                <p class="mb-6 text-red-1 text-lg font-bold">{{ category.name }}</p>
                <div class="w-full overflow-x-auto overflow-y-hidden invisible-scrollbar flex space-x-5">
                    <Product v-for="i in 5" :key="i" class="w-[309px] min-w-[309px]" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

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

</script>