import { computed, onMounted, onUnmounted, ref } from "vue";

const isMobile = ref(false);

function useSpanAt(span: number) {
  return computed(() => (isMobile.value ? 24 : span));
}

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

  const span8 = useSpanAt(8);
  const span6 = useSpanAt(6);
  const spanFull = computed(() => 24);

  return { isMobile, spanOne: span8, span6, spanFull };
}
