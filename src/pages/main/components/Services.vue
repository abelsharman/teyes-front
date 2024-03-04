<template>
  <div v-if="!isError">
    <p
      class="text-center text-gray-1 font-bold md:text-[40px] text-3xl md:mb-8 mb-6"
    >
      Наши услуги
    </p>
    <div class="grid md:grid-cols-4 gap-5 w-max mx-auto">
      <div
        role="button"
        v-for="service in services"
        :key="service.slug"
        class="duration-200 hover:scale-105"
        @click="onNavigateToServicePage(service)"
      >
        <div class="bg-gray-2 text-gray-1 rounded-lg pt-6 pl-8 w-[309px] pb-9">
          <p class="mb-6 text-2xl font-bold w-10/12">{{ service.name }}</p>
          <p class="mb-8 text-opacity-80 text-base">
            Цена: от {{ prettyPrice(service.price, service.currency) }}
          </p>
          <img
            :src="service.image"
            class="w-[215px] h-[170px] ml-auto object-contain"
            width="215"
            height="170"
            role="presentation"
            alt=""
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { _axios, prettyPrice } from "@shared/libs";

export default {
  name: "Services",
  data() {
    return {
      isLoading: true,
      services: [],
      isError: false,
    };
  },
  created() {
    this.fetchServices();
  },
  methods: {
    prettyPrice,
    fetchServices() {
      this.isLoading = true;

      _axios.get("services/")
        .then(({ data }) => {
          this.services = data;
          this.isError = false;
        })
        .catch(() => {
          this.isError = true;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    onNavigateToServicePage(service) {
      window.location.href = `/service/${service.slug}`
    }
  },
};
</script>
