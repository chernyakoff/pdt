import { boot } from 'quasar/wrappers'
import { copyToClipboard } from "quasar";
import { Notify } from 'quasar'

export default boot(async ({ app }) => {
  app.provide('toClipboard', (value) => {
    copyToClipboard(value).then(() => {
      Notify.create("Текст скопирован в буффер обмена");
    });
  })
})
