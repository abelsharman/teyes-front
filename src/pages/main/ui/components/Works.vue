<template>
  <div>
    <p class="text-center text-gray-1 md:text-[40px] text-3xl font-bold md:mb-12 mb-8">
      Наши работы
    </p>
    <Carousel :autoplay="2000" :wrap-around="true">
      <Slide v-for="slide in 10" :key="slide">
        <div class="carousel__item">
            <img src="../assets/test-work.png" alt="">
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
  created() {
    this.fetchWorks();
  },
  methods: {
    fetchWorks() {
      _axios('our-works', { headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Credentials':true

      } }).then(data => {
        console.log(data);
      })
    }
  }
});
</script>


<style>
.carousel__pagination-button::after{
    border-radius: 10px;
    background: rgba(213, 46, 56, 0.74);
    width: 8px;
    height: 8px;
    @apply duration-200;
}
.carousel__pagination-button:hover::after{
    background: #D52E38;
}   
.carousel__pagination-button--active::after {
    background: #D52E38;
    width: 21px;
    @apply duration-200;
}
</style>
