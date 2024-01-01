import { computed, onMounted, onUnmounted, ref } from "vue";

const isMobile = ref(false);

export function useSpan() {
  const adjustColumn = () => {
    isMobile.value = window.innerWidth <= 768;
  };

  onMounted(() => {
    adjustColumn();
    window.addEventListener("resize", adjustColumn);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", adjustColumn);
  });

  const spanOne = computed(() => {
    return isMobile.value ? 24 : 8;
  });

  const spanTwo = computed(() => {
    return isMobile.value ? 24 : 8;
  });

  const spanFull = computed(() => {
    return 24;
  });

  return { isMobile, spanOne, spanTwo, spanFull };
}
