<template>
  <div class="fixed top-0 left-0 w-full h-full bg-cover" style="background-image: url('images/background.jpg')">
    <div class="fixed grid gap-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="grid gap-3 md:flex items-center justify-center">
        <div>
          <label for="imageUploader" class="relative block w-[300px] h-[300px] bg-white/80 rounded-xl shadow-md overflow-hidden cursor-pointer">
            <img v-if="choosedImageURL" :src="choosedImageURL" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div class="grid gap-3 text-2xl font-bold text-left text-[40px]" :class="choosedImageURL ? 'text-white' : 'text-gray-500'">
                <div>HAK &</div>
                <div>TUNTUTAN</div>
                <div v-if="!choosedImageURL" class="flex">
                  <div class="text-sm bg-gray-500 text-white rounded-full px-3 py-1">Klik Untuk Upload Gambar</div>
                </div>
              </div>
            </div>
          </label>
          <input id="imageUploader" class="hidden" type="file" @change="onFileUpdated" accept=".png, .jpg, .jpeg, image/png, image/jpeg" />
        </div>
        <div v-if="inputs.file" class="flex gap-2 md:grid justify-center items-center">
          <div class="flex justify-center">
            <ButtonActionView label="Filter" :action="doFilter" />
          </div>
        </div>
        <div class="relative block w-[300px] h-[300px] rounded-xl shadow-md bg-white/80 overflow-hidden">
          <img v-if="resultURL" :src="resultURL" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div class="text-[80px] font-bold" :class="resultURL ? ' text-white' : 'text-gray-500'">18+7</div>
          </div>
          <div v-if="resultURL" class="flex justify-center items-center absolute bottom-5 left-1/2 -translate-x-1/2">
            <ButtonActionView label="Download" :action="doDownload" />
          </div>
        </div>
      </div>
      <div v-if="isError" class="flex justify-center">
        <div class="bg-red-800 px-3 py-1 rounded-xl text-sm text-white">
          <div class="whitespace-nowrap font-semibold">Waduh Error</div>
          <div class="text-xs text-white/80">Boleh ulangi dengan gambar yang berbeda ya, klik kembali gambar untuk memilih gambar lainnya.</div>
        </div>
      </div>
      <div class="grid gap-3 md:gap-5 mt-2 text-center text-white whitespace-nowrap">
        <div class="font-semibold text-[20px] md:text-[40px]">{{ countdown }}</div>
        <div class="font-bold text-[30px] md:text-[60px] leading-5">5 September 2025</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const api = useApi();

const inputs = ref({});

const isError = ref(false);
const countdown = ref(null);
const choosedImageURL = ref(null);
const resultURL = ref(null);

const onFileUpdated = (e) => {
  isError.value = false;
  const file = e.target.files[0];
  if (file) {
    inputs.value.file = file;
    choosedImageURL.value = URL.createObjectURL(inputs.value.file);
  } else {
    inputs.value.file = null;
    choosedImageURL.value = null;
  }
};

const doFilter = async () => {
  try {
    isError.value = false;
    const requestBody = new FormData();
    requestBody.append("image", inputs.value.file);

    // melakukan hit ke endpoint brave hero
    // sementara nebeng ke endpoint paytive
    const response = await api.post("v1/bravehero/filter", requestBody, null, false, "blob");

    // mengubah response ke blob
    resultURL.value = URL.createObjectURL(response);
  } catch (err) {
    isError.value = true;
    console.log(err);
  }
};

const doDownload = () => {
  if (!resultURL.value) return;
  window.open(resultURL.value, "_blank");
  // const link = document.createElement("a");
  // link.href = resultURL.value;
  // link.download = "18+7.png"; // file name
  // document.body.appendChild(link);
  // link.click();
  // document.body.removeChild(link);
};

function updateCountdown() {
  const now = new Date();
  const year = now.getFullYear();
  const target = new Date(`${year}-09-05T00:00:00`);

  const diff = target - now;

  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / 1000 / 60) % 60;
  const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
  const days = Math.floor(diff / 1000 / 60 / 60 / 24);

  let parts = [];
  if (days > 0) parts.push(`${days} Hari`);
  if (hours > 0) parts.push(`${hours} Jam`);
  if (minutes > 0) parts.push(`${minutes} Menit`);
  if (seconds > 0) parts.push(`${seconds} Detik`);

  countdown.value = parts.join(" ") + " Lagi";
}

onMounted(() => {
  setInterval(() => {
    updateCountdown();
  }, 1000);
});
</script>
