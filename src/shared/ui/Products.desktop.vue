<template>
  <div v-if="!isError">
    <div class="flex items-center justify-between">
      <p class="text-gray-1 text-center text-[40px] font-bold">
        {{ type === WIDE ? 'WIDE' : type === TEYES ? 'TEYES' : 'RED POWER' }}
      </p>
      <button
        v-if="!isAllProducts"
        type="button"
        class="text-white bg-gray-500 text-lg rounded-xl hover:bg-gray-600 duration-200 py-2.5 px-5"
        @click="navigateToProductsPage"
      >
        Показать все
      </button>
    </div>
    <div
      v-if="isAllProducts"
      class="w-full bg-gray-2 sticky mt-3 top-0 z-20 pt-2"
    >
      <input
        v-model="searchProduct"
        class="w-1/2 py-4 text-lg mb-3 px-5 bg-gray-200 rounded-lg outline-none"
        placeholder="Поиск по продуктам"
        @input="handleInput"
      />
    </div>

    <div
      class="flex items-start pb-4 overflow-x-auto space-x-5 mt-10 justify-between mb-10"
    >
      <button
        type="button"
        v-for="category in categories"
        :key="category.slug"
        class="py-1 px-2.5 border min-w-max rounded-xl text-lg border-red-1 duration-200 font-bold"
        :class="
          selectedCategory.slug === category.slug
            ? 'bg-red-1 text-white'
            : 'bg-white text-red-1'
        "
        @click="selectCategory(category)"
      >
        {{ category.name }}
      </button>
    </div>
    <Carousel
      v-if="!isAllProducts"
      ref="productsCarousel"
      v-bind="settings"
      :wrap-around="true"
    >
      <Slide v-for="product in products" :key="product.slug">
        <div class="carousel__item">
          <Product
            class="w-11/12 mx-auto first:mx-0 hover:scale-105 duration-200"
            :info="product"
            :category="selectedCategory"
            :type="type"
          />
        </div>
      </Slide>
    </Carousel>
    <div v-if="!isAllProducts" class="flex justify-end space-x-4 mt-12">
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

    <template v-if="isAllProducts && products.length > 0">
      <div class="grid grid-cols-4 gap-y-4">
        <Product
          v-for="product in products"
          :key="product.slug"
          class="w-11/12 mx-auto hover:scale-105 duration-200"
          :class="{
            'first:mx-0': !isAllProducts,
          }"
          :info="product"
          :category="selectedCategory"
          :type="type"
        />
      </div>
      <InfiniteScroll :is-fetching="isFetching" @onIntersect="onIntersect" />
    </template>
    <p v-else-if="isAllProducts" class="text-center text-lg font-semibold py-4">
      Ничего не найдено 
    </p>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, computed } from "vue";
import { Carousel, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

import {
  _axios,
  categoriesData,
  simpleCategoriesData,
  productsData,
} from "@shared/libs";

import { InfiniteScroll } from "@shared/ui/index.desktop.ts";

import { WIDE, TEYES, RED_POWER } from '../config';
import Product from './Product.vue';

const props = defineProps({
  isAllProducts: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
    default: WIDE
  }
});
const settings = ref({
  itemsToShow: 4,
  snapAlign: "start",
});
const searchProduct = ref(null);
const categories = ref([]);
const selectedCategory = ref({});
const productsCarousel = ref(null);
const isError = ref(false);
const isLoading = ref(false);
const isFetching = ref(false);

const products = computed(
  () =>
    {
      const category = categories.value.find((c) => c.slug === selectedCategory.value?.slug);
      if(props.type === WIDE) {
        return category?.products || []
      } else if(props.type === TEYES) {
        return category?.teyes || []
      }
      return category?.redpower || []
    }
);

const prefixUrl = computed(() => props.type === WIDE ? '' : props.type === TEYES ? 'teyes/' : 'redpower/')
const postfixInfo = computed(() => props.type === WIDE ? 'products' : props.type === TEYES ? 'teyes' : 'redpower')

const selectCategory = (category) => {
  const selectedCategoryIndex =
    categories.value.findIndex((cat) => cat.slug === category.slug) || 0;

  categories.value[selectedCategoryIndex].cursor = null;
  delete categories.value[selectedCategoryIndex][postfixInfo.value];
  selectedCategory.value = category;
  searchProduct.value = undefined;
  fetchProductsByCategorySlug(category);
};

const nextSlide = () => {
  productsCarousel.value.next();
};

const prevSlide = () => {
  productsCarousel.value.prev();
};

onBeforeMount(() => {
  if (props.isAllProducts) {
    fetchSimpleCategories();
  } else {
    fetchCategories();
  }
});

function fetchCategories() {
  isLoading.value = true;
  _axios(`${prefixUrl.value}categories/`)
    .then(({ data }) => {
      categories.value = data;
      isError.value = false;
    })
    .catch(() => {
      isError.value = true;
      // categories.value = categoriesData;
    })
    .finally(() => {
      isLoading.value = false;
      if (categories.value && categories.value.length > 0) {
        selectedCategory.value = categories.value[0];
      }
    });
}

function fetchSimpleCategories() {
  isLoading.value = true;
  _axios(`${prefixUrl.value}simple-categories/`)
    .then(({ data }) => {
      categories.value = data;
      isError.value = false;
    })
    .catch(() => {
      isError.value = true;
      // categories.value = simpleCategoriesData;
    })
    .finally(() => {
      isLoading.value = false;
      if (categories.value && categories.value.length > 0) {
        selectedCategory.value = categories.value[0];
        fetchProductsByCategorySlug(categories.value[0]);
      }
    });
}


function onIntersect() {
  fetchProductsByCategorySlug(selectedCategory.value, searchProduct.value);
}

function fetchProductsByCategorySlug(category, searchText) {
  const selectedCategoryIndex =
    categories.value.findIndex((cat) => cat.slug === category.slug) || 0;
  const params = {
    search: searchText,
    page_size: 12,
  };
  if (categories.value[selectedCategoryIndex].cursor) {
    params.cursor = categories.value[selectedCategoryIndex].cursor;
  }
  if(categories.value[selectedCategoryIndex][postfixInfo.value] && categories.value[selectedCategoryIndex].isLastPage) {
    return;
  }
  isFetching.value = true;
  _axios(`${prefixUrl.value}products/${category.slug}/`, {
    params,
  })
    .then(({ data }) => {
      if (categories.value[selectedCategoryIndex][postfixInfo.value]) {
        categories.value[selectedCategoryIndex][postfixInfo.value] = [
          ...categories.value[selectedCategoryIndex][postfixInfo.value],
          ...data.results,
        ];
      } else {
        categories.value[selectedCategoryIndex][postfixInfo.value] = data.results;
      }
      const url =data.next ? new URL(data.next) : {};
      const cursor = url?.searchParams?.get("cursor");
      categories.value[selectedCategoryIndex].cursor = cursor;
      categories.value[selectedCategoryIndex].isLastPage = cursor ? false : true;
      isError.value = false;
      isFetching.value = false;
    })
    .catch(() => {
      // isError.value = true;
      // categories.value[selectedCategoryIndex].products = productsData;
    });
}

function debounce(func, delay = 500) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const debouncedFetch = debounce((category, search) => {
  fetchProductsByCategorySlug(category, search);
});

// Функция-обработчик
function handleInput() {
  const selectedCategoryIndex =
    categories.value.findIndex(
      (cat) => cat.slug === selectedCategory.value.slug
    ) || 0;
  categories.value[selectedCategoryIndex].cursor = null;
  delete categories.value[selectedCategoryIndex][postfixInfo.value];

  debouncedFetch(selectedCategory.value, searchProduct.value);
}

function navigateToProductsPage() {
  if(props.type === WIDE) {
    window.location.href = `/products`
  } else if(props.type === TEYES) {
    window.location.href = `/teyes`
  } else if(props.type === RED_POWER) {
    window.location.href = `/redpower`
  }
}
</script>

<style>
.carousel__track {
  align-items: flex-start;
}
</style>
