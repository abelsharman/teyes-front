<template>
  <div v-if="!isError">
    <div class="flex px-4 items-center justify-between">
      <p class="text-gray-1 products-title text-center text-3xl font-bold">
        {{ type === WIDE ? 'WIDE' : type === TEYES ? 'TEYES' : 'RED POWER' }}
      </p>
      <button
        v-if="!isAllProducts"
        type="button"
        class="text-white bg-gray-500 text-sm rounded-lg hover:bg-gray-600 duration-200 py-1 px-3"
        @click="navigateToProductsPage"
      >
        Показать все
      </button>
    </div>
    <div
      v-if="isAllProducts"
      class="w-full pl-4 sticky mt-3 top-10 bg-white z-10 pt-2"
    >
      <input
        v-model="searchProduct"
        class="w-full py-4 text-base mb-3 px-5 bg-gray-200 rounded-lg outline-none"
        placeholder="Поиск по продуктам"
        @input="handleInput"
      />
    </div>
    <div class="space-y-7 mt-6 pl-4">
      <div v-for="category in slicedFilteredCategories" :key="category.slug">
        <template v-if="category.isVisible">
          <p v-if="isAllProducts" class="mb-6 text-red-1 text-lg font-bold">{{ category.name }}</p>
          <div
            class="w-full overflow-x-auto overflow-y-hidden invisible-scrollbar flex space-x-5"
          >
            <Product
              v-for="product in category[postfixInfo]"
              :key="product.slug"
              :info="product"
              :category="category"
              :type="type"
              class="w-[309px] product-item min-w-[309px]"
            />
            <InfiniteScroll :is-fetching="isFetching" @onIntersect="onIntersect(category)" />
            </div
        ></template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, computed } from "vue";

import { _axios, categoriesData, simpleCategoriesData, productsData } from "@shared/libs";
import { InfiniteScroll } from "@shared/ui/index.desktop.ts";

import { WIDE, TEYES, RED_POWER } from '../config';
import Product from "./Product.vue";

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

const searchProduct = ref(null);
const categories = ref([]);
const isError = ref(false);
const isLoading = ref(false);
const isFetching = ref(false);

const filteredCategories = computed(() => {
  if (props.isAllProducts) {
    return categories.value.map((c) => {
      return {
        ...c,
        isVisible: c[postfixInfo.value]?.length > 0,
      };
    });
  }
  return categories.value.map(c => {
    return {
      ...c, isVisible: true
    }
  });
});

const slicedFilteredCategories = computed(() => props.isAllProducts ? filteredCategories.value : filteredCategories.value.slice(0,1))
const prefixUrl = computed(() => props.type === WIDE ? '' : props.type === TEYES ? 'teyes/' : 'redpower/')
const postfixInfo = computed(() => props.type === WIDE ? 'products' : props.type === TEYES ? 'teyes' : 'redpower')

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
    });
}

function fetchSimpleCategories(searchText) {
  isLoading.value = true;
  _axios(`${prefixUrl.value}simple-categories/`)
    .then(({ data }) => {
      const fetchPromises = data.map(category => fetchProductsByCategorySlug(category, searchText));

      return Promise.all(fetchPromises)
        .then(categoryProductPairs => {
          categories.value = categoryProductPairs.map(pair => ({
            ...pair.category,
            cursor: pair.cursor,
            [postfixInfo.value]: pair[postfixInfo.value],
            isLastPage: pair.isLastPage
          }));
          isError.value = false;
        });
    })
    .catch(() => {
      isError.value = true;
    })
    .finally(() => {
      isLoading.value = false;
    });
}

function fetchProductsByCategorySlug(category, searchText) {
  const params = {
    search: searchText,
    page_size: 12,
  }
  if (category.cursor) {
    params.cursor = category.cursor;
  }
  if(category[postfixInfo.value] && category.isLastPage) {
    return;
  }
  isFetching.value = true;
  return _axios(`${prefixUrl.value}products/${category.slug}`, {
    params
  })
    .then(({ data }) => {
      isFetching.value = false;
      const products = category[postfixInfo.value] ? [ ...category[postfixInfo.value], ...data.results ] : data.results;
      const url = data.next ? new URL(data.next) : {};
      const cursor = url?.searchParams?.get("cursor");
      if(category[postfixInfo.value]) {
        category[postfixInfo.value] = products;
        category.cursor = url?.searchParams?.get("cursor");
        category.isLastPage = cursor ? false : true;
      }
      return { category, [postfixInfo.value]: products, cursor: url?.searchParams?.get("cursor"), isLastPage: cursor ? false : true };
    })
    .catch(error => {
      console.error(`Error fetching products for category ${category.name}: ${error.message}`);
      return { category, [postfixInfo.value]: [], cursor: null, isLastPage: true };
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

const debouncedFetch = debounce((search) => {
  fetchSimpleCategories(search);
}); 

function handleInput() {
  categories.value = categories.value.map(c => {
    return {
      ...c, 
      cursor: null, 
      products: []
    }
  })

  debouncedFetch(searchProduct.value);
}

function onIntersect(category) {
  fetchProductsByCategorySlug(category, searchProduct.value)
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
