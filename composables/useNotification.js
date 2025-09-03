const messages = ref([]);

export default function useNotification() {
  const close = (n) => {
    const message = messages.value[n];

    // apabila sedang closing maka tidak dilanjutkan
    if (message && message.closing) return;

    // membersihkan interval apabila ada
    clearTimeout(message.interval);

    // mengubah state untuk menjalankan animasi
    message.closing = true;

    // setelah animasi selesai pesan dihapus
    message.interval = setTimeout(() => {
      messages.value.splice(n, 1);
    }, 500);
  };

  // pesan unique sekarang tidak akan diulang
  const add = (newMessage) => {
    newMessage = {
      ...newMessage,
      displayed: true,
      closing: false,
    };

    // untuk mencari apabail pesan dengan title, message dan type sama ada
    const index = messages.value.findIndex((msg) => msg.type === newMessage.type && msg.title === newMessage.title && msg.message === newMessage.message);

    // apabila sudah ada maka interval akan di reset
    if (index !== -1) {
      const existingMessage = messages.value[index];
      clearTimeout(existingMessage.interval);

      existingMessage.displayed = true;
      existingMessage.closing = false;

      existingMessage.interval = setTimeout(() => {
        close(index);
      }, 2000);
    } else {
      const n = messages.value.length;
      newMessage.interval = setTimeout(() => {
        close(n);
      }, 2000);
      messages.value.push(newMessage);
    }
  };

  const success = (title, message) => {
    add({ type: "success", title, message });
  };

  const warning = (title, message) => {
    add({ type: "warning", title, message });
  };

  const error = (title, message) => {
    add({ type: "error", title, message });
  };

  const clear = () => {
    messages.value = [];
  };

  return {
    close,
    clear,
    success,
    warning,
    error,

    messages: computed(() => {
      return messages.value;
    }),
  };
}
