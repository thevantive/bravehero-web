import axios from "axios";

export default function useApi(profile = "core") {
  const auth = useAuth();
  const config = useRuntimeConfig();
  const notification = useNotification();
  const router = useRouter();

  const pendingRequests = new Map();

  // menggunakan base api dari nuxt config
  const profilesBaseUrl = {
    core: config.public.CORE_BASE_URL,
    reporting: config.public.REPORTING_BASE_URL,
    discovery: config.public.DISCOVERY_BASE_URL,
  };
  const baseUrl = profilesBaseUrl[profile] ?? config.public.CORE_BASE_URL;

  // default konfigurasi header yang akan digunakan
  const defaultHeaders = {
    "Content-Type": "application/json",
    "Accept-Language": "id-ID",
    "X-Device-Id": auth.getDeviceId(),
  };

  // mengirim request ke server
  const send = async (url, method = "GET", userHeaders = {}, body = null, redirect = true, type = "json") => {
    // untuk kebutuhan idempotent request
    const key = JSON.stringify({
      url,
      method,
      headers: userHeaders,
      body: body instanceof FormData ? "FormData" : body,
      redirect,
      type,
    });

    if (pendingRequests.has(key)) {
      return pendingRequests.get(key);
    }

    const headers = {
      ...defaultHeaders,
      ...userHeaders,
    };

    if (body instanceof FormData) {
      delete headers["Content-Type"]; // biar axios auto set multipart
    }

    const token = auth.getToken();
    if (token) headers.Authorization = `Bearer ${token}`;

    const promise = (async () => {
      try {
        const response = await axios({
          url: `${baseUrl}/${url}`,
          method,
          headers,
          data: body,
          responseType: type,
        });

        return response.data;
      } catch (err) {
        if (err.response) {
          const { status, data } = err.response;

          if (status === 401 && redirect) {
            notification.warning("Mohon tunggu, sedang dialihkan", "Nampaknya anda masuk pada perangkat lain");
            setTimeout(() => {
              auth.logout();
              router.push("/login");
            }, 400);
            return;
          }

          if (status === 403) {
            notification.warning("Maaf anda tidak diijinkan", "Mohon akses data atau menu lainnya");
            return;
          }

          return { status, ...data };
        }

        notification.error("Gagal menghubungi server", "Mohon coba kembali nanti");
        console.log(err);
        return;
      } finally {
        pendingRequests.delete(key);
      }
    })();

    pendingRequests.set(key, promise);
    return promise;
  };

  // untuk kebutuhan get request
  const get = async (url, headers, redirect = true) => {
    return await send(url, "GET", headers, null, redirect);
  };

  // untuk kebutuhan get request
  const post = async (url, body = null, headers = {}, redirect = true, type = "json") => {
    return await send(url, "POST", headers, body, redirect, type);
  };

  // untuk kebutuhan get request
  const del = async (url, headers, redirect = true, body = {}) => {
    return await send(url, "DELETE", headers, body, redirect);
  };

  // untuk kebutuhan get request
  const put = async (url, headers, redirect = true, body = {}) => {
    return await send(url, "PUT", headers, body, redirect);
  };

  // untuk kebutuhan get request
  const patch = async (url, headers, redirect = true, body = {}) => {
    return await send(url, "PATCH", headers, body, redirect);
  };

  return { baseUrl, send, get, post, del, put, patch };
}
