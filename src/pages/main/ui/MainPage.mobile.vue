<template>
  <div>
    <!-- <VHeader /> -->
    <main>
      <MainPageDescription class="mt-7 mb-10 px-4" />
      <Benefits class="bg-gray-2 pt-6 pb-10" />
      <Services class="mt-6 mb-10 pl-10 pr-7" />
      <Works class="my-8 px-4" />
      <Contacts :block-class="''" />
      <Questions :block-class="''" />
    </main>
    <div class="bg-black-1 pb-12 pt-10 pl-4">
      <VFooter />
    </div>
  </div>
</template>

<script>
import { VHeader, VFooter } from "@shared/ui/index.mobile";

import MainPageDescription from "./components/MainPageDescription.desktop.vue";
import Benefits from "./components/Benefits.vue";
import Services from "./components/Services.vue";
import Questions from "./components/Questions.vue";
import Contacts from "./components/Contacts.vue";
import Works from "./components/Works.vue";
import Products from "./components/Products.desktop.vue";

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
    MainPageDescription
  },
};
</script>
