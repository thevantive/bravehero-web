const menuState = ref(localStorage.getItem("APP_DASHBOARD_MENU_STATE") === "true");
const breadcrumb = ref([]);

export default function useDashboard() {
  const setBreadcrumb = (data) => {
    breadcrumb.value = data;
  };

  const toggleMenu = () => {
    menuState.value = !menuState.value;
    localStorage.setItem("APP_DASHBOARD_MENU_STATE", menuState.value);
  };

  return {
    toggleMenu,
    setBreadcrumb,

    breadcrumb,
    menuState,
  };
}
