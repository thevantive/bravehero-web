export default function useAuth() {
  let userPromise;

  const getUser = async (refresh = false, skipFetching = false) => {
    const api = useApi();

    // memastikan token tersedia
    if (!getToken()) return null;

    // mengambil data dari local storage
    const user = localStorage.getItem("APP_USER_DATA");

    // apabila data tersedia dan refresh tidak diperlukan
    // maka data yang di return berupa data dari localStorage
    if (user && !refresh) return JSON.parse(user);

    // apabila userPromise ada maka menunggu proses yang ada
    // untuk mencegah concurrent request yang berlebihan
    if (!skipFetching && userPromise) return await userPromise;

    // memastikan apabila fetching tidak di skip
    // biasanya pada kondisi dimana hanya ingin
    // memeriksa data pada local saja
    if (!skipFetching) {
      userPromise = (async () => {
        try {
          // mengirim request ke server
          const response = await api.get("v1/users/current");

          // memastikan response dan status aman
          if (response && response.meta?.status) {
            // melakukan flattening object
            const userData = response.data;
            setUser(userData);
            return userData;
          }
          return null;
        } finally {
          userPromise = null;
        }
      })();

      // kemudian promisenya direturn sebagai fallback
      return userPromise;
    }

    return null;
  };

  // dipergunakan paling utama pada dashboard
  // untuk kebutuhan menampilkan navigasi sidebar
  const isAdmin = async () => {
    const role = await getUser();
    return adminRoles.includes(role);
  };

  const setUser = (data) => {
    localStorage.setItem("APP_USER_DATA", JSON.stringify(data));
  };

  const setToken = (token) => {
    localStorage.setItem("APP_TOKEN", token);
  };

  const generateDeviceId = () => {
    const newId = crypto.randomUUID();
    localStorage.setItem("APP_DEVICE_ID", newId);
    return newId;
  };

  const logout = () => {
    localStorage.removeItem("APP_USER_DATA");
    localStorage.removeItem("APP_TOKEN");
    window.location.href = "/login";
  };

  const getToken = () => {
    return localStorage.getItem("APP_TOKEN");
  };

  const getDeviceId = () => {
    return localStorage.getItem("APP_DEVICE_ID") || generateDeviceId();
  };

  const resetUser = () => {
    localStorage.removeItem("APP_USER_DATA");
    localStorage.removeItem("APP_TOKEN");
  };

  return {
    getToken,
    getDeviceId,
    getUser,
    isAdmin,
    setUser,
    setToken,
    resetUser,
    logout,
  };
}
