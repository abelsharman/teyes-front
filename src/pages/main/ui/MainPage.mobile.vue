<template>
  <div>
    <!-- <VHeader /> -->
    <main></main>
    <div class="bg-black-1 pb-12 pt-10 pl-4">
      <VFooter />
    </div>
  </div>
</template>

<script>
import { VHeader, VFooter } from "@shared/ui/index.mobile";

export default {
  name: "MainPage",
  components: {
    VHeader,
    VFooter,
  },
};
</script>
