<template>
  <div id="app">
    <VHeader class="fixed top-0 left-0 w-full z-20" @onNavToWhatsapp="onNavToWhatsapp" />
    <main class="mt-[55px]">
      <MainPageDescription id="main" class="mt-7 mb-10 px-4" @onNavToWhatsapp="onNavToWhatsapp" />
      <Benefits id="why-we" class="bg-gray-2 pt-6 pb-10" />
      <Services id="services" class="mt-6 mb-10 pl-10 pr-7" />
      <Products id="products" class="bg-gray-2 pt-6 pb-10" :is-all-products="false" />
      <Products id="products-2" type="teyes" class="bg-gray-2 pt-6 pb-10" :is-all-products="false" />
      <Products id="products-3" type="red-power" class="bg-gray-2 pt-6 pb-10" :is-all-products="false" />
      <Works id="works" class="my-8 px-4" />
      <Contacts id="contacts" :block-class="''" />
      <Questions id="questions" :block-class="''" @onNavToWhatsapp="onNavToWhatsapp" />
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
// import Contacts from "./components/Contacts.vue";
import Works from "./components/Works.vue";

export default {
  name: "MainPage",
  components: {
    VHeader,
    VFooter,
    Questions,
    Contacts: () => import("./components/Contacts.vue"),
    Works,
    Services,
    Benefits,
    MainPageDescription,
    Products
  },
  mounted() {
    const intersectionCallbackRightToLeft = (entries) => {
      for (const entry of entries) { 
        if (entry.isIntersecting) { 
          setTimeout(() => {
            entry.target.classList.add('rightToLeftAnimation'); 
          }, 0);
        }
      }
    }
    const intersectionCallbackLeftToRight = (entries) => {
      for (const entry of entries) { 
        if (entry.isIntersecting) { 
          setTimeout(() => {
            entry.target.classList.add('leftToRightAnimation'); 
          }, 0);
        }
      }
    }
    const intersectionCallbackWhyWeBlock = (entries) => {
      for (const entry of entries) { 
        if (entry.isIntersecting) { 
          setTimeout(() => {
            const rightToLeftAnimationItems = document.querySelectorAll('#why-we .rightToLeftAnimationStart');
            for (const item of rightToLeftAnimationItems) {
              item.classList.add('rightToLeftAnimation')
            }
            const observerLeftToRightItems = document.querySelectorAll('#why-we .leftToRightAnimationStart');
            for (const item of observerLeftToRightItems) {
              item.classList.add('leftToRightAnimation')
            }
          }, );
        }
      }
    }
    const intersectionCallbackTopToBottom = (entries) => {
      for (const entry of entries) { 
        if (entry.isIntersecting) { 
          setTimeout(() => {
            entry.target.classList.add('topToBottomAnimation'); 
          });
        }
      }
    }

    const observerRightToLeft = new IntersectionObserver(intersectionCallbackRightToLeft);
    const observerLeftToRight = new IntersectionObserver(intersectionCallbackLeftToRight);
    const observerWhyWe = new IntersectionObserver(intersectionCallbackWhyWeBlock);
    const observerTopToBottom = new IntersectionObserver(intersectionCallbackTopToBottom);

    document.querySelector('#main .rightToLeftAnimationStart').classList.add('rightToLeftAnimation'); 
    const observerLeftToRightMainItems = document.querySelectorAll('#main .leftToRightAnimationStart');
    for (const item of observerLeftToRightMainItems) {
      item.classList.add('leftToRightAnimation'); 
    }

    observerWhyWe.observe(document.querySelector('#why-we'));
    observerTopToBottom.observe(document.querySelector('#services .services-title'))
    observerTopToBottom.observe(document.querySelector('#products .products-title'))
    observerTopToBottom.observe(document.querySelector('#products-2 .products-title'))
    observerTopToBottom.observe(document.querySelector('#products-3 .products-title'))
    observerTopToBottom.observe(document.querySelector('#works .works-title'))
    observerTopToBottom.observe(document.querySelector('#questions .question-title'))
    observerTopToBottom.observe(document.querySelector('#questions .question-description'))
    observerTopToBottom.observe(document.querySelector('#questions .question-button'))


   setTimeout(() => {
      observerTopToBottom.observe(document.querySelector('#contacts .contact-title'))
      const contactImageBlocks = document.querySelectorAll('#contacts .contact-image');
      for(const item of contactImageBlocks) {
        observerLeftToRight.observe(item);
      }

      const contactTextBlocks = document.querySelectorAll('#contacts .contact-text');
      for(const item of contactTextBlocks) {
        observerRightToLeft.observe(item);
      }
   }, 1000);

    setTimeout(() => {
      const serviceItemsBlocks = document.querySelectorAll('#services .service-item');
        for(const item of serviceItemsBlocks) {
          observerTopToBottom.observe(item);
      }
    }, 2000);

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
