<template>
  <div>
    <p class="text-gray-1 text-center text-[40px] font-bold mb-10">Товары</p>
    <div class="flex items-center justify-between mb-10">
      <button
        type="button"
        v-for="category in categories"
        :key="category.value"
        class="pb-1.5 border-b-2 text-lg duration-200"
        :class="
          selectedCategory === category.value
            ? 'text-red-1 border-red-1 font-bold'
            : 'text-gray-1 border-transparent font-medium'
        "
        @click="selectCategory(category.value)"
      >
        {{ category.name }}
      </button>
    </div>

    <Carousel ref="productsCarousel" v-bind="settings" :wrap-around="true">
      <Slide v-for="slide in 30" :key="slide">
        <div class="carousel__item">
          <Product
            class="w-11/12 mx-auto first:mx-0 hover:scale-105 duration-200"
          />
        </div>
      </Slide>
    </Carousel>
    <div class="flex justify-end space-x-4 mt-12">
      <button type="button" @click="prevSlide">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <g clip-path="url(#clip0_18_169)">
            <path
              d="M20 0C31.0284 0 40 8.97164 40 20C40 31.0284 31.0284 40 20 40C8.97164 40 0 31.0284 0 20C0 8.97164 8.97164 0 20 0ZM13.8216 21.1784L22.155 29.5116C22.48 29.8366 22.9066 30 23.3334 30C23.76 30 24.1867 29.8366 24.5117 29.5116C25.1634 28.86 25.1634 27.8066 24.5117 27.155L17.3566 20L24.5116 12.845C25.1633 12.1934 25.1633 11.14 24.5116 10.4884C23.86 9.83672 22.8066 9.83672 22.155 10.4884L13.8216 18.8217C13.17 19.4734 13.17 20.5266 13.8216 21.1784Z"
              fill="#505C73"
            />
          </g>
          <defs>
            <clipPath id="clip0_18_169">
              <rect
                width="40"
                height="40"
                fill="white"
                transform="matrix(-1 0 0 1 40 0)"
              />
            </clipPath>
          </defs>
        </svg>
      </button>
      <button @click="nextSlide">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <g clip-path="url(#clip0_18_150)">
            <path
              d="M20 0C8.97164 0 0 8.97164 0 20C0 31.0284 8.97164 40 20 40C31.0284 40 40 31.0284 40 20C40 8.97164 31.0284 0 20 0ZM26.1784 21.1784L17.845 29.5116C17.52 29.8366 17.0934 30 16.6666 30C16.24 30 15.8133 29.8366 15.4883 29.5116C14.8366 28.86 14.8366 27.8066 15.4883 27.155L22.6434 20L15.4884 12.845C14.8367 12.1934 14.8367 11.14 15.4884 10.4884C16.14 9.83672 17.1934 9.83672 17.845 10.4884L26.1784 18.8217C26.83 19.4734 26.83 20.5266 26.1784 21.1784Z"
              fill="#505C73"
            />
          </g>
          <defs>
            <clipPath id="clip0_18_150">
              <rect width="40" height="40" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref  } from 'vue';
import { Carousel, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

import Product from "./Product.vue";

const settings = ref({
  itemsToShow: 4,
  snapAlign: "start",
});
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
const selectedCategory = ref("");
const productsCarousel = ref(null)

const selectCategory = (category) => {
  selectedCategory.value = category;
};

const nextSlide = () => {
    productsCarousel.value.next()
}

const prevSlide = () => {
    productsCarousel.value.prev()
}
</script>
