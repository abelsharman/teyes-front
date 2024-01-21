<template>
  <div>
    <div style="box-shadow: 0px 3px 30px 0px rgba(0, 0, 0, 0.03)">
      <VHeader class="desktop-wrapper" />
    </div>
    <main>
      <MainPageDescription id="main" class="desktop-wrapper mt-12 mb-24" />
      <div id="why-we" class="bg-gray-2 pt-8 pb-24">
        <Benefits class="desktop-wrapper" />
      </div>
      <Services id="services" class="mb-11 mt-8" />
      <div id="products" class="bg-gray-2 pt-8 pb-20">
        <Products class="desktop-wrapper" />
      </div>
      <Works id="works" class="my-14 desktop-wrapper" />
      <Contacts id="contacts" class="w-full" />
      <Questions />
    </main>
    <div class="bg-black-1 py-12">
      <VFooter class="desktop-wrapper" />
    </div>
  </div>
</template>

<script>
import { _axios } from "@shared/libs";

import { VHeader, VFooter } from "@shared/ui/index.desktop";
import MainPageDescription from "./components/MainPageDescription.desktop.vue";
import Benefits from "./components/Benefits.vue";
import Services from "./components/Services.vue";
import Questions from "./components/Questions.vue";
import Contacts from './components/Contacts.vue';
import Works from './components/Works.vue';
import Products from './components/Products.desktop.vue'

export default {
  name: "MainPage",
  components: {
    VHeader,
    VFooter,
    MainPageDescription,
    Benefits,
    Services,
    Questions,
    Contacts,
    Works,
    Products
  },
};
</script>
