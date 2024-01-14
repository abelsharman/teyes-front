<template>
    <div>
      <div style="box-shadow: 0px 3px 30px 0px rgba(0, 0, 0, 0.03)">
        <VHeader class="desktop-wrapper" />
      </div>
      <main>
      </main>
      <div class="bg-black-1 py-12">
        <VFooter class="desktop-wrapper" />
      </div>
    </div>
  </template>
  
  <script>
  import { _axios } from "@shared/libs";
  
  import { VHeader, VFooter } from "@shared/ui/index.desktop";
  
  export default {
    name: "MainPage",
    components: {
      VHeader,
      VFooter,
    },
  };
  </script>
  
  