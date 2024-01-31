<template>
  <div>
    <VHeader class="fixed top-0 left-0 w-full z-20" @onNavToWhatsapp="onNavToWhatsapp" />
    <main class="mt-[55px]">
      <MainPageDescription id="main" class="mt-7 mb-10 px-4" @onNavToWhatsapp="onNavToWhatsapp" />
      <Benefits id="why-we" class="bg-gray-2 pt-6 pb-10" />
      <Services id="services" class="mt-6 mb-10 pl-10 pr-7" />
      <Products id="products" class="bg-gray-2 pt-6 pb-10" :is-all-products="false" />
      <Works id="works" class="my-8 px-4" />
      <Contacts id="contacts" :block-class="''" />
      <Questions :block-class="''" @onNavToWhatsapp="onNavToWhatsapp" />
    </main>
    <div class="bg-black-1 pb-12 pt-10 pl-4">
      <VFooter />
    </div>
  </div>
</template>

<script>
import { VHeader, VFooter, Products } from "@shared/ui/index.mobile";

import MainPageDescription from "./components/MainPageDescription.desktop.vue";
import Benefits from "./components/Benefits.vue";
import Services from "./components/Services.vue";
import Questions from "./components/Questions.vue";
import Contacts from "./components/Contacts.vue";
import Works from "./components/Works.vue";

export default {
  name: "MainPage",
  components: {
    VHeader,
    VFooter,
    Questions,
    Contacts,
    Works,
    Services,
    Benefits,
    MainPageDescription,
    Products
  },
  methods: {
    onNavToWhatsapp() {
      window.open(
        "https://api.whatsapp.com/send/?phone=77756189915&text=%D0%9F%D1%80%D0%B8%D0%B2%D0%B5%D1%82%21+%EF%BF%BD+%D0%9C%D0%B5%D0%BD%D1%8F+%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%B5%D1%81%D1%83%D0%B5%D1%82+&type=phone_number&app_absent=0",
        "_blank"
      );
    },
  },
};
</script>
