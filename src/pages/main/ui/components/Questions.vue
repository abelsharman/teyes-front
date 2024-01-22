<template>
  <div class="bg-cover questions px-4 md:px-0 py-24 md:pt-32 md:pb-40 bg-center bg-no-repeat">
    <div class="flex justify-end" :class="blockClass">
      <div class="bg-white text-gray-1 rounded-2xl py-10 md:w-[611px] md:px-16 px-6">
        <p class="md:text-6xl text-3xl font-bold mb-4">Остались вопросы?</p>
        <p class="md:mb-12 mb-4 text-opacity-80 md:text-lg text-base">
          Напишите нам на WhatsApp, и мы предоставим вам необходимую информацию
        </p>
        <button
          type="button"
          class="md:py-4 py-3 w-full rounded-lg text-lg font-semibold text-white bg-red-1 leading-8 hover:bg-red-2 duration-200"
          @click="$emit('onNavToWhatsapp')" 
        >
          Написать в WhatsApp
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Questions',
  props: {
    blockClass: {
      type: String, 
      default: 'desktop-wrapper'
    }
  }
}
</script>

<style>
.questions {
  background-image: url("../assets/questions-background.png");
}
</style>
