// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Brave Hero",
    }
  },
  css: ['~/assets/css/app.css'],
  ssr: false,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@vesp/nuxt-fontawesome'
  ],
  googleFonts: {
    families: {
      "Bitter": [100, 300, 400, 700, 900],
    },
    display: 'swap',
  },
  fontawesome: {
    component: 'fa',
    icons: {
      solid: ['faChartSimple', 'faDoorOpen', 'faInfo', 'faCircleInfo', 'faUserTag', 'faUsersViewfinder', 'faCircleDown', 'faCircleUp', 'faCirclePlus', 'faArrowLeft', 'faArrowRight', 'faPrint', 'faShareNodes', 'faBook', 'faPaperPlane', 'faLandmark', 'faCheckCircle', 'faArrowsTurnRight', 'faPersonDigging', 'faClock', 'faClipboardList', 'faClipboardCheck', 'faHandHoldingDollar', 'faCashRegister', 'faTags', 'faTag', 'faBuildingShield', 'faBuildingColumns', 'faUserGear', 'faPenToSquare', 'faStar', 'faUsersGear', 'faLocationDot', 'faPersonRays', 'faRankingStar', 'faBullhorn', 'faFileInvoice', 'faChartPie', 'faChartSimple', 'faChartSimple', 'faChartGantt', 'faBarsProgress', 'faPowerOff', 'faSpinner', 'faExclamation', 'faCircleExclamation', 'faUsersBetweenLines', 'faUserGroup', 'faSyringe', 'faDownload', 'faKey', 'faEllipsisVertical', 'faEllipsis', 'faArrowUp', 'faArrowDown', 'faCalendar', 'faBox', 'faEye', 'faEyeSlash', 'faGear', 'faGears', 'faWrench', 'faPlus', 'faCircleXmark', 'faXmark', 'faCheck', 'faRotate', 'faRotateLeft', 'faFilter', 'faChevronDown', 'faBars', 'faChevronLeft', 'faChevronRight', 'faPencil', 'faFilePen', 'faUser', 'faUsers', 'faHome', 'faStore', 'faCog', 'faLock', 'faLockOpen', 'faShop', 'faShopLock', 'faUnlock', 'faLocationPinLock', 'faFile', 'faImage', 'faCamera', 'faCloud', 'faThumbsUp', 'faMessage', 'faBell', 'faHeadphones', 'faFaceSmile', 'faComment', 'faEnvelope', 'faMagnifyingGlass', 'faMoneyBillTrendUp', 'faReceipt', 'faMoneyBillTransfer', 'faMoneyBillWave', 'faWallet', 'faCreditCard', 'faTrash', 'faTrashCan', 'faBan', 'faEraser', 'faCoins', 'faBriefcase'],
      regular: ['faUser', 'faFile', 'faImage', 'faThumbsUp', 'faBell', 'faFaceSmile', 'faComment', 'faEnvelope'],
      brands: ['faTwitter', 'faGithub']
    }
  },
  runtimeConfig: {
    public: {
      CORE_BASE_URL: `${process.env.CORE_BASE_URL}`,
      REPORTING_BASE_URL: `${process.env.REPORTING_BASE_URL}`,
      DISCOVERY_BASE_URL: `${process.env.DISCOVERY_BASE_URL}`
    }
  },
})