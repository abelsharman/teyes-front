<template>
  <div v-if="!isError">
    <div class="flex px-4 items-center justify-between">
      <p class="text-gray-1 text-center text-3xl font-bold">Товары</p>
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
      />
    </div>
    <div class="space-y-7 mt-6 pl-4">
      <div v-for="category in filteredCategories" :key="category.slug">
        <template v-if="category.isVisible">
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
            /></div
        ></template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, computed } from "vue";
import { useRouter } from "vue-router";

import { _axios, categoriesData, simpleCategoriesData, productsData } from "@shared/libs";

import Product from "./Product.vue";

const props = defineProps({
  isAllProducts: {
    type: Boolean,
    default: true,
  },
});

const router = useRouter();
const searchProduct = ref(null);
const categories = ref([]);
const allCategories = ref([]);
const filteredCategories = computed(() => {
  if (props.isAllProducts) {
    return allCategories.value.map((c) => {
      const allProducts =
        categories.value.find((category) => category.slug === c.slug)
          ?.products || [];
      const products = searchProduct.value
        ? allProducts.filter((p) =>
            p.name.toLowerCase().includes(searchProduct.value.toLowerCase())
          )
        : allProducts;
      return {
        ...c,
        isVisible: products.length > 0,
        products,
      };
    });
  }
  return allCategories.value.map(c => {
    return {
      ...c, isVisible: true
    }
  });
});
const isError = ref(false);
const isLoading = ref(false);

onBeforeMount(() => {
  if (props.isAllProducts) {
    fetchSimpleCategories();
  } else {
    fetchCategories();
  }
});

function fetchCategories() {
  isLoading.value = true;
  _axios("categories/")
    .then(({ data }) => {
      categories.value = data;
      allCategories.value = data;
      isError.value = false;
    })
    .catch(() => {
      isError.value = true;
      // categories.value = categoriesData;
      // allCategories.value = categoriesData;
    })
    .finally(() => {
      isLoading.value = false;
    });
}

function fetchSimpleCategories(searchText) {
  isLoading.value = true;
  _axios("simple-categories/")
    .then(({ data }) => {
      const fetchPromises = data.map(category => fetchProductsByCategorySlug(category, searchText));

      return Promise.all(fetchPromises)
        .then(categoryProductPairs => {
          categories.value = categoryProductPairs.map(pair => ({
            ...pair.category,
            products: pair.products
          }));
          allCategories.value = categories.value;
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
  return _axios(`products/${category.slug}`, {
    params: {
      search: searchText
    }
  })
    .then(({ data }) => {
      return { category, products: data.results };
    })
    .catch(error => {
      console.error(`Error fetching products for category ${category.name}: ${error.message}`);
      return { category, products: [] };
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
  fetchProductsByCategorySlug(search);
}); 

function handleInput() {
  debouncedFetch(searchProduct.value);
}

function navigateToProductsPage() {
  router.push({
    name: "ProductsPage",
  });
}
</script>
