<template>
  <main>
    <div style="box-shadow: 0px 3px 30px 0px rgba(0, 0, 0, 0.03);" >
      <VHeader class="desktop-wrapper" />
    </div>
    <div class="bg-black-1 py-12">
      <VFooter class="desktop-wrapper" />
    </div>
  </main>
</template>

<script>
import { _axios } from '@shared/libs';
import { AppModal } from '@/shared/ui';
import { injectModal } from '@/shared/modal'

import VHeader from './components/VHeader.desktop.vue';
import VFooter from './components/VFooter.desktop.vue'

export default {
  name: "MainPage",
  components: {
    VHeader,
    VFooter
  },
  setup() {
    const modal = injectModal();
    return {
      modal
    }
  },
};
</script>

<style>
.desktop-wrapper {
  @apply mx-auto;
  width: 1200px;
}
</style>
