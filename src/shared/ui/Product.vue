<template>
  <div role="button" class="md:pb-11 pb-8 bg-white rounded-lg" @click="navToProduct">
    <img v-if="firstImage" :src="firstImage.image" class="w-full object-cover h-56" alt="" role="presentation" />
    <div class="px-4 pt-8 space-y-4 text-gray-1">
      <p class="font-bold text-[20px] line-clamp-2">{{ info.name }}</p>
      <p class="text-opacity-80 text-lg font-semibold">
        Цена: {{ prettyPrice(info.price, info.currency) }}
      </p>
    </div>
  </div>
</template>

<script>
import { prettyPrice } from "@shared/libs";

export default {
  name: "Product",
  props: {
    info: {
      type: Object,
      required: true,
    },
    category: {
      type: Object,
      required: true,
    },
  },
  computed: {
    firstImage() {
      return this.info.image_list && this.info.image_list.length > 0
        ? this.info.image_list[0]
        : null;
    },
  },
  methods: {
    prettyPrice,
    navToProduct() {
      this.$router.push({
        name: "ProductPage",
        params: {
          product_slug: this.info.slug,
          category_slug: this.category.slug
        },
      });
    },
  },
};
</script>
