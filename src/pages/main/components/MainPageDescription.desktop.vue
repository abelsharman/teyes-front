<template>
  <div class="md:flex justify-between">
    <div class="md:w-5/12">
      <h1 class="text-gray-1 leftToRightAnimationStart text-3xl md:text-6xl font-bold mb-4">
        АВТОМАГНИТОЛЫ В<span class="text-red-1"> КАЗАХСТАНЕ</span>
      </h1>
      <p class="text-lg leftToRightAnimationStart text-gray-1 text-opacity-80 mb-8">
        Интернет-магазин "Auto-Dom" с 2010 года предлагает более 5 000
        автомагнитол от мировых брендов, включая Teyes, Redpower, Ownice,
        Parafar, Radiola, Carmedia и Farcar, с подтвержденным временем качеством
        и официальной гарантией от производителя.
      </p>
      <button
        type="button"
        class="p-3 rounded-lg text-lg md:w-auto w-full font-semibold text-white bg-red-1 leading-8 hover:bg-red-2 duration-200"
        @click="$emit('onNavToWhatsapp')"
      >
        Написать в WhatsApp
      </button>
    </div>
    <picture class="rightToLeftAnimationStart" loading="lazy">
      <source srcset="../assets/magnitols.webp" type="image/webp" />
      <img
        src="../assets/magnitols.png"
        class="md:w-[500px] md:mt-0 mt-6 md:h-[400px] w-full"
        width="500"
        height="400"
        alt=""
        role="presentation"
        loading="lazy"
      />
    </picture>
  </div>
</template>
