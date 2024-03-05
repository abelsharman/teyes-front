<template>
  <div role="button" class="md:pb-11 pb-8 bg-white rounded-lg" @click="navToProduct">
    <img v-if="firstImage" :src="firstImage.image || firstImage.image_url" class="w-full object-cover h-56" alt="" role="presentation" loading="lazy" />
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

import { WIDE, TEYES, RED_POWER } from '../config';

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
    type: {
      type: String, 
      default: WIDE
    }
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
      if(this.type === WIDE) {
        window.location.href = `/product/${this.category.slug}/${this.info.slug}`
      } else if(this.type === TEYES) {
        window.location.href = `/teyes/${this.category.slug}/${this.info.slug}`
      } else if(this.type === RED_POWER) {
        window.location.href = `/redpower/${this.category.slug}/${this.info.slug}`
      }
    },
  },
};
</script>
