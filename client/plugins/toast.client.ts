import type { PluginOptions } from 'vue-toastification';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

export default defineNuxtPlugin((nuxtApp) => {
  const options: PluginOptions = {
    position: POSITION.BOTTOM_RIGHT,
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: 'button',
    icon: true,
    transition: 'Vue-Toastification__slideBlurred',
    maxToasts: 30,
    newestOnTop: true,
  };

  nuxtApp.vueApp.use(Toast, options);
});
