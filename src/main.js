import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

const pinia = createPinia();
pinia.use(({ store }) => {
  // eslint-disable-next-line no-param-reassign
  store.router = markRaw(router);
});

createApp(App).use(pinia).use(router).mount('#app');
