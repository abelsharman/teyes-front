<template>
  <transition name="fade">
    <div
      v-if="modal.isVisible(name)"
      class="fixed z-modal flex justify-center duration-300"
      :class="[
        positionClass,
        {
          'items-center': align === 'center',
          'items-end': align === 'end',
          'items-start': align === 'start',
        },
      ]"
      :data-disable-scroll-name="name"
    >
      <div
        class="blackout fixed inset-0 bg-black opacity-50"
        :class="positionClass"
        @click="closeModal"
      ></div>
      <div
        class="body-scroll-lock-ignore absolute max-h-full overflow-auto rounded-lg bg-white duration-300 md:w-min w-11/12"
        :class="contentClass"
      >
        <div>
          <div v-if="isClosable && isCloseButtonVisible" class="relative">
            <button
              type="button"
              class="close-modal-button absolute right-0 top-0 md:mr-12 md:mt-10 mt-5 mr-2.5"
              @click="closeModal"
            >
              <img
                width="24"
                height="24"
                src="./close.svg"
                alt="закрыть"
              />
            </button>
          </div>
          <slot name="header"></slot>
        </div>
        <slot v-bind="{ closeModal }"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
import { injectModal } from '@/shared/modal/index';

export default {
  name: "AppModal",
  props: {
    name: {
      type: String,
      required: true,
    },
    isClosable: {
      type: Boolean,
      default: true,
    },
    isCloseButtonVisible: {
      type: Boolean,
      default: true,
    },
    contentClass: {
      type: String,
      default: "",
    },
    positionClass: {
      type: String,
      default: "inset-0",
    },
    align: {
      type: String,
      default: "center",
      validator: (v) => ["start", "center", "end"].includes(v),
    },
  },
  setup() {
    const modal = injectModal();
    
    return {
      modal
    }
  },
  beforeDestroy() {
    if (this.modal.isVisible(this.name)) {
      this.modal.hide(this.name);
    }
  },
  methods: {
    closeModal() {
      if (this.isClosable) {
        this.modal.hide(this.name);
      }
    },
  },
};
</script>
