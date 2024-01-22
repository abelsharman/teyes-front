<template>
  <div>
    <p class="text-center text-gray-1 font-bold md:text-[40px] text-3xl md:mb-8 mb-6">
      Наши услуги
    </p>
    <div class="grid md:grid-cols-4 gap-5 w-max mx-auto">
      <div v-for="i in 8" :key="i" class="duration-200 hover:scale-105">
        <div class="bg-gray-2 text-gray-1 rounded-lg pt-6 pl-8 w-[309px] pb-9">
          <p class="mb-6 text-2xl font-bold w-10/12">Установка автомагнитолы</p>
          <p class="mb-8 text-opacity-80 text-base">Цена: от 76 000тг</p>
          <img
            src="../assets/test-magnitol.png"
            class="w-[215px] h-[170px] ml-auto"
            width="215"
            height="170"
            role="presentation"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { _axios } from "@shared/libs";

export default {
  name: "Services",
  data() {
    return {
      isLoading: true,
      services: [],
    };
  },
  created() {
    this.fetchServices();
  },
  methods: {
    fetchServices() {
      this.isLoading = true;
      _axios("services/", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then(({ data }) => {
          this.services = data;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
}
</script>