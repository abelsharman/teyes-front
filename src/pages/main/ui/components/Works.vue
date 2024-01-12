<template>
  <div>
    <p class="text-center text-gray-1 text-[40px] font-bold mb-12">
      Наши работы
    </p>
    <Carousel :autoplay="2000" :wrap-around="true">
      <Slide v-for="slide in 30" :key="slide">
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

export default defineComponent({
  name: "Works",
  components: {
    Carousel,
    Slide,
    Pagination,
  },
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
