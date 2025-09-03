<template>
  <div>
    <input class="hidden" :type="type" :id="randomId" @click="doAction" />
    <label :for="randomId" class="relative block py-1 px-3 rounded-xl select-none cursor-pointer transition duration-500 hover:scale-105 overflow-hidden" :class="actionStyle">
      <div class="flex space-x-3">
        <div class="font-bold text-[#f784c5]">{{ label }}</div>
      </div>
      <div v-if="isLoading" class="absolute top-0 left-0 flex items-center justify-center h-full w-full bg-white/40">
        <div><SpinnerView /></div>
      </div>
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "button",
  },
  label: {
    type: String,
    default: "ButtonActionView",
  },
  action: {
    type: Function,
  },
  color: {
    type: String,
    default: "green",
  },
});

const randomId = ref(`btn-${Math.random().toString(36).slice(2, 10)}`);

// state untuk status loading
const isLoading = ref(false);

// untuk kebutuhan styling warna pada button nya
const actionStyle = computed(() => {
  if (props.color == "transparent") return `bg-transparent`;
  if (props.color == "blue") return `bg-blue-600 text-blue-100`;
  if (props.color == "gray") return `bg-gray-600 text-gray-100`;
  if (props.color == "red") return `bg-red-600 text-red-100`;
  return `bg-[#1b602f] text-green-100`;
});

const doAction = async () => {
  // langsung berhenti apabila memang sedang ada proses lain
  if (isLoading.value) return;

  // memeriksa props action memastikan berupa callable
  if (props.action && typeof props.action == "function") {
    isLoading.value = true;
    await props.action();
    isLoading.value = false;
  }
};
</script>
