<template>
  <div
    v-show="visible"
    class="fixed left-0 top-0 z-[200] bg-white overflow-hidden transition-all duration-500 ease-in-out"
    :class="{
      'w-full h-full opacity-100': opened,
      'w-full h-full opacity-0': !opened,
    }"
    @click.self="close">
    <div class="absolute flex items-center justify-center space-x-2 top-1/2 left-1/2 w-full max-w-[600px] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out">
      <div class="text-md">Memuat Halaman</div>
      <spinner-view class="pt-1 text-xl" />
    </div>
  </div>
</template>

<script setup>
const visible = ref(true);
const opened = ref(true);

const open = () => {
  visible.value = true;
  requestAnimationFrame(() => {
    opened.value = true;
  });
};

const close = () => {
  opened.value = false;
  setTimeout(() => {
    visible.value = false;
  }, 500);
};

defineExpose({
  open,
  close,
});
</script>
