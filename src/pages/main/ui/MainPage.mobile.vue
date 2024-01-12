<template>
  <main>
  </main>
</template>

<script>
import { _axios } from '@shared/libs';
import { AppModal } from '@/shared/ui';
import { injectModal } from '@/shared/modal'

export default {
  name: "MainPage",
  components: {
  },
  setup() {
    const modal = injectModal();
    return {
      modal
    }
  },
  data() {
    return {
    }
  },
};
</script>
