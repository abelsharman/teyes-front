<template>
  <div class="min-h-screen flex flex-col">
    <div style="box-shadow: 0px 3px 30px 0px rgba(0, 0, 0, 0.03)">
      <VHeader class="desktop-wrapper" @onNavToWhatsapp="onNavToWhatsapp" />
    </div>
    <main class="flex-1">
      <div class="flex space-x-28 flex-1 desktop-wrapper mt-14">
        <img
          class="w-[433px] h-[320px] object-cover"
          src="./assets/test-product.png"
          alt=""
        />
        <div class="text-gray-1 space-y-4">
          <h1 class="font-bold text-4xl">Автомагнитола и название длинное</h1>
          <h2 class="text-lg font-semibold text-opacity-80">Автомагнитолы</h2>
          <p class="text-opacity-80 text-lg leading-6">
            Автомагнитола 2din - универсальная для автомобиля, HD экран
            (bluetooth, USB, AUX) + пульт, блютуз, аукс, Android, Андроид, авто,
            машины, автомобильная
          </p>
          <p class="text-lg font-semibold text-opacity-80">Цена: 76 000тг</p>
          <button
            type="button"
            class="py-3 px-4 rounded text-base font-semibold text-white bg-red-1 leading-4 hover:bg-red-2 duration-200"
            @click="onNavToWhatsapp" 
          >
            Написать в WhatsApp
          </button>
        </div>
      </div>
    </main>
    <div class="bg-black-1 py-12">
      <VFooter class="desktop-wrapper" />
    </div>
  </div>
</template>

<script>
import { VHeader, VFooter } from "@shared/ui/index.desktop";

export default {
  name: "MainPage",
  components: {
    VHeader,
    VFooter,
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
