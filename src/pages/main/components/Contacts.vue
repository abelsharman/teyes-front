<template>
  <div class="md:grid grid-cols-2">
    <div
      class="md:pt-24 pt-6 px-4 md:px-0 md:pb-36 mb-6 text-gray-1"
      :class="blockClass"
    >
      <p
        class="md:text-5xl contact-title text-3xl font-bold text-center md:text-left md:mb-12 mb-10"
      >
        Контакты
      </p>
      <div class="flex text-lg md:space-x-6 space-x-4 mb-8 md:mb-10">
        <svg
          class="contact-image"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M20 10.999H22C22 5.869 18.127 2 12.99 2V4C17.052 4 20 6.943 20 10.999Z"
            fill="#333333"
          />
          <path
            d="M13 7.99999C15.103 7.99999 16 8.89699 16 11H18C18 7.77499 16.225 5.99999 13 5.99999V7.99999ZM16.422 13.443C16.2299 13.2683 15.9774 13.1752 15.7178 13.1832C15.4583 13.1912 15.212 13.2998 15.031 13.486L12.638 15.947C12.062 15.837 10.904 15.476 9.71204 14.287C8.52004 13.094 8.15904 11.933 8.05204 11.361L10.511 8.96699C10.6975 8.78612 10.8062 8.53982 10.8142 8.2802C10.8222 8.02059 10.7289 7.76804 10.554 7.57599L6.85904 3.51299C6.68408 3.32035 6.44092 3.2035 6.18119 3.18725C5.92146 3.17101 5.66564 3.25665 5.46804 3.42599L3.29804 5.28699C3.12515 5.46051 3.02196 5.69145 3.00804 5.93599C2.99304 6.18599 2.70704 12.108 7.29904 16.702C11.305 20.707 16.323 21 17.705 21C17.907 21 18.031 20.994 18.064 20.992C18.3086 20.9783 18.5394 20.8747 18.712 20.701L20.572 18.53C20.7415 18.3325 20.8273 18.0768 20.8113 17.817C20.7952 17.5573 20.6785 17.3141 20.486 17.139L16.422 13.443Z"
            fill="#333333"
          />
        </svg>
        <div class="flex flex-col leading-5 contact-text">
          <a href="tel:+77756189915">+7 (775) 618 99 15</a>
          <a href="tel:+77753401682" class="mt-1">+7 (775) 340 16 82</a>
        </div>
      </div>
      <div class="flex md:space-x-6 space-x-4 mb-8 md:mb-12 text-lg">
        <svg
          class="contact-image"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 1.5C9.81276 1.50258 7.71584 2.3726 6.16923 3.91922C4.62261 5.46584 3.75259 7.56276 3.75001 9.75C3.74739 11.5374 4.33124 13.2763 5.41201 14.7C5.41201 14.7 5.63701 14.9963 5.67376 15.039L12 22.5L18.3293 15.0353C18.3623 14.9955 18.588 14.7 18.588 14.7L18.5888 14.6978C19.669 13.2747 20.2526 11.5366 20.25 9.75C20.2474 7.56276 19.3774 5.46584 17.8308 3.91922C16.2842 2.3726 14.1873 1.50258 12 1.5ZM12 12.75C11.4067 12.75 10.8266 12.5741 10.3333 12.2444C9.83995 11.9148 9.45543 11.4462 9.22837 10.8981C9.00131 10.3499 8.9419 9.74667 9.05765 9.16473C9.17341 8.58279 9.45913 8.04824 9.87869 7.62868C10.2982 7.20912 10.8328 6.9234 11.4147 6.80764C11.9967 6.69189 12.5999 6.7513 13.1481 6.97836C13.6962 7.20542 14.1648 7.58994 14.4944 8.08329C14.8241 8.57664 15 9.15666 15 9.75C14.999 10.5453 14.6826 11.3078 14.1202 11.8702C13.5578 12.4326 12.7954 12.749 12 12.75Z"
            fill="#333333"
          />
        </svg>
        <p class="contact-text">г. Алматы, ул. Тургут озала 260/1</p>
      </div>
      <div class="flex md:space-x-6 space-x-4 text-lg">
        <svg
          class="w-6 h-6 min-w-6 contact-image"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 1.5C6.20156 1.5 1.5 6.20156 1.5 12C1.5 17.7984 6.20156 22.5 12 22.5C17.7984 22.5 22.5 17.7984 22.5 12C22.5 6.20156 17.7984 1.5 12 1.5ZM16.1367 15.2273L15.4664 16.1414C15.4518 16.1613 15.4335 16.1781 15.4124 16.1909C15.3913 16.2037 15.3678 16.2122 15.3434 16.2159C15.319 16.2196 15.2942 16.2184 15.2702 16.2125C15.2463 16.2065 15.2237 16.1959 15.2039 16.1813L11.3273 13.3547C11.3032 13.3373 11.2836 13.3145 11.2701 13.2879C11.2566 13.2614 11.2497 13.2321 11.25 13.2023V6.75C11.25 6.64687 11.3344 6.5625 11.4375 6.5625H12.5648C12.668 6.5625 12.7523 6.64687 12.7523 6.75V12.5508L16.0945 14.9672C16.1789 15.0258 16.1977 15.143 16.1367 15.2273Z"
            fill="#333333"
          />
        </svg>
        <p class="contact-text">График работы: понедельник-суббота, с 10:00-20:00</p>
      </div>
    </div>
    <ClientOnly>
    <yandexMap
      :settings="settings"
      :zoom="14"
      :controls="['geolocationControl', 'rulerControl', 'zoomControl']"
      :coordinates="coords"
    >
      <yandexMarker :coordinates="coords" :marker-id="1123"></yandexMarker>
    </yandexMap>
  </ClientOnly>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, markRaw } from 'vue'
// const { YandexMap, YandexMarker } = await import("vue-yandex-maps");

import { ClientOnly } from '@shared/ui';

defineProps({
  blockClass: {
      type: String,
      default: "contacts-info",
    },
})

const yandexMap = ref(null);
    const yandexMarker = ref(null);

    onMounted(async () => {
      const { YandexMap, YandexMarker } = await import("vue-yandex-maps");
      yandexMap.value = YandexMap;
      yandexMarker.value = YandexMarker;
    });

    

const settings = ref({
  lang: "ru_RU",
        apiKey: "27b79224-286c-4acb-bf2d-74bf8f264d64",
        debug: false,
        version: "2.1",
})
const coords  = ref([43.233183, 76.883275])
  // components: { YandexMap: () => import('vue-yandex-maps'), YandexMarker: () => import('vue-yandex-maps'), ClientOnly },
  // components: { YandexMap, YandexMarker, ClientOnly },
</script>

<style>
.contacts-info {
  padding-left: calc((100vw - 1200px) / 2) !important;
}
.yandex-container {
  @apply md:h-auto h-[400px];
}
</style>
