<template>
  <div>
    <p
      class="text-center text-gray-1 md:text-[40px] text-3xl font-bold md:mb-12 mb-8"
    >
      Наши работы
    </p>
    <div
      v-if="isLoading"
      class="w-full md:h-[558px] h-[246px] animate-pulse bg-gray-100 rounded-xl"
    ></div>
    <Carousel v-else :autoplay="2000" :wrap-around="true">
      <Slide v-for="work in works" :key="work.slug">
        <div class="carousel__item">
          <img class="md:h-[558px] h-[246px]" :src="work.image" alt="" />
        </div>
      </Slide>

      <template #addons>
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Carousel, Pagination, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

import { _axios } from "@shared/libs";

export default defineComponent({
  name: "Works",
  components: {
    Carousel,
    Slide,
    Pagination,
  },
  data() {
    return {
      isLoading: true,
      works: [],
    };
  },
  created() {
    this.fetchWorks();
  },
  methods: {
    fetchWorks() {
      this.isLoading = true;
      _axios("our-works", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then(({ data }) => {
          this.works = data;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
});
</script>

<style>
.carousel__pagination-button::after {
  border-radius: 10px;
  background: rgba(213, 46, 56, 0.74);
  width: 8px;
  height: 8px;
  @apply duration-200;
}
.carousel__pagination-button:hover::after {
  background: #d52e38;
}
.carousel__pagination-button--active::after {
  background: #d52e38;
  width: 21px;
  @apply duration-200;
}
</style>
