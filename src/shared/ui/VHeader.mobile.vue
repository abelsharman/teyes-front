<template>
  <div class="bg-gray-2">
    <div class="py-2 pl-4">
      <button type="button" @click="setIsHeaderVisible">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M3 8H21C21.2652 8 21.5196 7.89464 21.7071 7.70711C21.8946 7.51957 22 7.26522 22 7C22 6.73478 21.8946 6.48043 21.7071 6.29289C21.5196 6.10536 21.2652 6 21 6H3C2.73478 6 2.48043 6.10536 2.29289 6.29289C2.10536 6.48043 2 6.73478 2 7C2 7.26522 2.10536 7.51957 2.29289 7.70711C2.48043 7.89464 2.73478 8 3 8ZM21 16H3C2.73478 16 2.48043 16.1054 2.29289 16.2929C2.10536 16.4804 2 16.7348 2 17C2 17.2652 2.10536 17.5196 2.29289 17.7071C2.48043 17.8946 2.73478 18 3 18H21C21.2652 18 21.5196 17.8946 21.7071 17.7071C21.8946 17.5196 22 17.2652 22 17C22 16.7348 21.8946 16.4804 21.7071 16.2929C21.5196 16.1054 21.2652 16 21 16ZM21 11H3C2.73478 11 2.48043 11.1054 2.29289 11.2929C2.10536 11.4804 2 11.7348 2 12C2 12.2652 2.10536 12.5196 2.29289 12.7071C2.48043 12.8946 2.73478 13 3 13H21C21.2652 13 21.5196 12.8946 21.7071 12.7071C21.8946 12.5196 22 12.2652 22 12C22 11.7348 21.8946 11.4804 21.7071 11.2929C21.5196 11.1054 21.2652 11 21 11Z"
            fill="#020202"
          />
        </svg>
      </button>
    </div>
    <div
      class="h-[calc(100vh-46px)] pt-6 bg-gray-2 w-full fixed top-[46px] duration-46 px-4"
      :class="isHeaderVisible ? 'left-0 opacity-100' : '-left-full opacity-0'"
    >
      <div class="space-y-6 flex flex-col text-gray-1 text-[20px] font-medium">
        <router-link
          to="/"
          v-scroll-to="{ el: '#main', offset: -46 }"
          @click="setIsHeaderVisible"
          >Главная</router-link
        >
        <router-link
          to="/"
          v-scroll-to="{ el: '#why-we', offset: -46 }"
          @click="setIsHeaderVisible"
          >Почему мы?</router-link
        >
        <router-link
          to="/"
          v-scroll-to="{ el: '#services', offset: -46 }"
          @click="setIsHeaderVisible"
          >Наши услуги</router-link
        >
        <router-link
          to="/"
          v-scroll-to="{ el: '#products', offset: -46 }"
          @click="setIsHeaderVisible"
          >Товары</router-link
        >
        <router-link
          to="/"
          v-scroll-to="{ el: '#works', offset: -46 }"
          @click="setIsHeaderVisible"
          >Наши работы</router-link
        >
        <router-link
          to="/"
          v-scroll-to="{ el: '#contacts', offset: -46 }"
          @click="setIsHeaderVisible"
          >Контакты</router-link
        >
      </div>
      <div class="space-y-7 mt-7 text-sm text-gray-1 text-opacity-70">
        <div class="flex space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M4.99984 16.6667H14.9998C15.4582 16.6667 15.8332 17.0417 15.8332 17.5001C15.8332 17.9584 15.4582 18.3334 14.9998 18.3334H4.99984C4.5415 18.3334 4.1665 17.9584 4.1665 17.5001C4.1665 17.0417 4.5415 16.6667 4.99984 16.6667ZM9.99984 5.83341C9.08317 5.83341 8.33317 6.58341 8.33317 7.50008C8.33317 8.41675 9.08317 9.16675 9.99984 9.16675C10.9165 9.16675 11.6665 8.41675 11.6665 7.50008C11.6665 6.58341 10.9165 5.83341 9.99984 5.83341ZM9.99984 1.66675C12.7248 1.66675 15.8332 3.71675 15.8332 7.62508C15.8332 10.1084 14.0582 12.7251 10.5082 15.4501C10.2082 15.6834 9.7915 15.6834 9.4915 15.4501C5.9415 12.7167 4.1665 10.1084 4.1665 7.62508C4.1665 3.71675 7.27484 1.66675 9.99984 1.66675Z"
              fill="#333333"
              fill-opacity="0.7"
            />
          </svg>
          <div>
            <p>Наш адрес:</p>
            <p class="text-medium mt-1">г. Алматы, ул. Тургут озала 260/1</p>
          </div>
        </div>
        <div class="flex space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M10 1.25C5.16797 1.25 1.25 5.16797 1.25 10C1.25 14.832 5.16797 18.75 10 18.75C14.832 18.75 18.75 14.832 18.75 10C18.75 5.16797 14.832 1.25 10 1.25ZM13.4473 12.6895L12.8887 13.4512C12.8765 13.4678 12.8612 13.4818 12.8436 13.4924C12.826 13.5031 12.8065 13.5102 12.7862 13.5132C12.7659 13.5163 12.7451 13.5154 12.7252 13.5104C12.7052 13.5055 12.6864 13.4966 12.6699 13.4844L9.43945 11.1289C9.41933 11.1145 9.40297 11.0954 9.39175 11.0733C9.38054 11.0512 9.37479 11.0267 9.375 11.002V5.625C9.375 5.53906 9.44531 5.46875 9.53125 5.46875H10.4707C10.5566 5.46875 10.627 5.53906 10.627 5.625V10.459L13.4121 12.4727C13.4824 12.5215 13.498 12.6191 13.4473 12.6895Z"
              fill="#333333"
              fill-opacity="0.7"
            />
          </svg>
          <div>
            <p>График работы:</p>
            <p class="text-medium mt-1">понедельник - суббота, с 10:00-20:00</p>
          </div>
        </div>
        <div class="flex space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <g clip-path="url(#clip0_9_82)">
              <path
                d="M8.45563 11.4668C9.61535 12.6432 11.0186 13.5515 12.5667 14.1279L14.6612 12.4612C14.7233 12.4184 14.7969 12.3956 14.8723 12.3956C14.9477 12.3956 15.0213 12.4184 15.0834 12.4612L18.9723 14.9668C19.1199 15.0555 19.2449 15.1774 19.3374 15.3228C19.4298 15.4681 19.4872 15.633 19.505 15.8043C19.5227 15.9757 19.5004 16.1488 19.4398 16.3101C19.3792 16.4713 19.2819 16.6162 19.1556 16.7334L17.3334 18.5334C17.0725 18.7913 16.7517 18.9805 16.3998 19.0842C16.0479 19.188 15.6758 19.203 15.3167 19.1279C11.7346 18.3881 8.43293 16.6554 5.78897 14.1279C3.20368 11.5752 1.41467 8.32724 0.638967 4.77788C0.562337 4.42434 0.578331 4.05701 0.685398 3.71147C0.792466 3.36594 0.986976 3.05392 1.25008 2.80566L3.13897 0.983433C3.25586 0.863315 3.3984 0.771196 3.55594 0.713976C3.71347 0.656755 3.88191 0.635915 4.04864 0.653015C4.21537 0.670116 4.37607 0.724714 4.51871 0.812722C4.66135 0.900729 4.78223 1.01987 4.8723 1.16121L7.46119 5.0001C7.50584 5.06038 7.52995 5.13341 7.52995 5.20843C7.52995 5.28345 7.50584 5.35649 7.46119 5.41677L5.75563 7.46677C6.34762 8.98396 7.26993 10.3503 8.45563 11.4668Z"
                fill="#333333"
                fill-opacity="0.7"
              />
            </g>
            <defs>
              <clipPath id="clip0_9_82">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <div class="font-medium flex flex-col leading-4">
            <a href="tel:+77756189915">+7 (775) 61 89 915</a>
            <a href="tel:+77753401682" class="mt-1">+7 (775) 34 01 682</a>
          </div>
        </div>
      </div>

      <button
        type="button"
        class="py-3 w-full mt-12 rounded-lg text-lg font-semibold text-white bg-red-1 leading-8 hover:bg-red-2 duration-46"
      >
        Написать в WhatsApp
      </button>
    </div>
  </div>
</template>

<script setup>
import VueScrollTo from "vue-scrollto";
import { ref } from "vue";

const isHeaderVisible = ref(false);

const setIsHeaderVisible = () => {
  isHeaderVisible.value = !isHeaderVisible.value;
  if (isHeaderVisible.value) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
};
</script>
