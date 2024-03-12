<template>
  <div id="app" class="min-h-screen flex flex-col">
    <VHeader
      class="fixed top-0 left-0 w-full z-20"
      @onNavToWhatsapp="onNavToWhatsapp"
    />
    <main class="mt-[55px] flex-1 mb-8 px-4">
      <template v-if="!isError">
        <img
          v-if="firstImage"
          class="w-full topToBottomAnimation h-[250px] object-cover"
          :src="firstImage.image || firstImage.image_url"
          alt=""
          loading="lazy"
        />
        <div class="text-gray-1 topToBottomAnimation mt-7 space-y-4">
          <h1 class="font-bold text-3xl">{{ info.name }}</h1>
          <!-- <h2 class="text-base font-semibold text-opacity-80">Автомагнитолы</h2> -->
          <p
            class="text-opacity-80 text-base leading-6"
            v-html="info.description"
          ></p>
          <p class="text-base font-semibold text-opacity-80">
            Цена: {{ prettyPrice(info.price, info.currency) }}
          </p>
          <button
            type="button"
            class="h-[52px] w-full rounded-lg text-lg font-semibold text-white bg-red-1 leading-4 hover:bg-red-2 duration-200"
            @click="onNavToWhatsapp"
          >
            Написать в WhatsApp
          </button>
        </div>
      </template>
      <p v-else class="text-lg text-red-500 text-center py-10">
        Что-то пошло не так
      </p>
    </main>
    <div class="bg-black-1 pb-12 pt-10 pl-4">
      <VFooter />
    </div>
  </div>
</template>

<script>
import { VHeader, VFooter } from "@shared/ui/index.mobile";
import { _axios, productData, prettyPrice } from "@shared/libs";

export default {
  name: "MainPage",
  props: {
    category_slug: {
      type: String, required: true,
    },
    product_slug: {
      type: String, required: true,
    },
    info: {
      type: Object, required: true,
    },
    isError: {
      type: Boolean, required: true,
    },
  },  
  components: {
    VHeader,
    VFooter,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    firstImage() {
      return this.info.image_list && this.info.image_list.length > 0
        ? this.info.image_list[0]
        : null;
    },
  },
  methods: {
    prettyPrice,
    onNavToWhatsapp() {
      window.open(
        "https://api.whatsapp.com/send/?phone=77756189915&text=%D0%9F%D1%80%D0%B8%D0%B2%D0%B5%D1%82%21+%EF%BF%BD+%D0%9C%D0%B5%D0%BD%D1%8F+%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%B5%D1%81%D1%83%D0%B5%D1%82+&type=phone_number&app_absent=0",
        "_blank"
      );
    },
  },
};
</script>
