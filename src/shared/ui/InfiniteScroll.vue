<template>
    <div ref="intersect" class="mx-auto mt-12 w-max">
      <img
        v-if="isFetching"
        src="../assets/spinner.svg"
        class="animate-spin"
        width="20"
        height="20"
        alt="загрузка"
      />
    </div>
  </template>
  
  <script setup lang="ts">
    import { ref, onMounted, onUnmounted } from 'vue';
  
    const props = defineProps({
      options: {
        type: Object,
        default: () => {
          return {};
        },
      },
      isFetching: {
        type: Boolean,
      },
    });
  
    const emit = defineEmits<{
      (e: 'onIntersect'): void;
    }>();
  
    const intersect = ref<Element | null>(null);
    const observer = ref<IntersectionObserver | null>(null);
  
    onMounted(() => {
      if (intersect.value) {
        observer.value = new IntersectionObserver(([entry]) => {
          if (entry && entry.isIntersecting && !props.isFetching) {
            emit('onIntersect');
          }
        }, props.options);
  
        observer.value.observe(intersect.value);
      }
    });
  
    onUnmounted(() => {
      observer.value?.disconnect();
    });
  </script>
  