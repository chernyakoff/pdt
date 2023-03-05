import { boot } from 'quasar/wrappers'
import { copyToClipboard } from "quasar";
import { Notify } from 'quasar'
import VueEasyLightbox from 'vue-easy-lightbox';

export default boot(async ({ app }) => {
  app.config.devtools = true;
  app.use(VueEasyLightbox)
  app.provide('toClipboard', (value) => {
    copyToClipboard(value).then(() => {
      Notify.create("Текст скопирован в буффер обмена");
    });
  })
})
