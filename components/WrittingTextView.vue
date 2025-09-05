<template>
  <div class="flex justify-center">
    <div class="grid gap-1 text-white">
      <div class="typewriter font-bold text-[40px] w-full text-center md:text-left md:text-[80px]">{{ displayText }}<span class="cursor">|</span></div>
      <div class="text-[25px] text-center md:text-left md:text-[50px] font-semibold leading-[25px] md:leading-5">Transparansi. Reformasi. Empati.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const messages = ["Tuntutan Rakyat", "Aspirasi Rakyat", "Dari Rakyat", "Untuk Rakyat"];

const displayText = ref("");
let msgIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 1200;

function typeWriter() {
  const currentMessage = messages[msgIndex];

  if (!isDeleting) {
    // typing
    displayText.value = currentMessage.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentMessage.length) {
      isDeleting = true;
      setTimeout(typeWriter, pauseTime);
      return;
    }
  } else {
    // deleting
    displayText.value = currentMessage.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      msgIndex = (msgIndex + 1) % messages.length;
    }
  }

  setTimeout(typeWriter, isDeleting ? deletingSpeed : typingSpeed);
}

onMounted(() => {
  typeWriter();
});
</script>

<style scoped>
.typewriter {
  display: inline-block;
  white-space: nowrap;
}

.cursor {
  display: inline-block;
  margin-left: 2px;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
