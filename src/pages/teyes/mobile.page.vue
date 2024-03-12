<template>
  <div id="app" class="min-h-screen flex flex-col">
    <VHeader
      class="fixed top-0 left-0 w-full z-20"
      @onNavToWhatsapp="onNavToWhatsapp"
    />
    <main class="mt-[55px] flex-1 mb-8 pr-4">
      <Products id="products" type="teyes" />
    </main>
    <div class="bg-black-1 pb-12 pt-10 pl-4">
      <VFooter />
    </div>
  </div>
</template>

<script>
import { VHeader, VFooter, Products } from "@shared/ui/index.mobile";

export default {
  name: "MainPage",
  components: {
    VHeader,
    VFooter,
    Products,
  },
  mounted() {
    const intersectionCallbackTopToBottom = (entries) => {
      for (const entry of entries) { 
        if (entry.isIntersecting) { 
          setTimeout(() => {
            entry.target.classList.add('topToBottomAnimation'); 
          });
        }
      }
    }
    const observerTopToBottom = new IntersectionObserver(intersectionCallbackTopToBottom);

    setTimeout(() => {
      const serviceItemsBlocks = document.querySelectorAll('#products .product-item');
      for(const item of serviceItemsBlocks) {
        observerTopToBottom.observe(item);
      }
    }, 200);
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
