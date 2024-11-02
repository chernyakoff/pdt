import { boot } from 'quasar/wrappers'
import { copyToClipboard } from "quasar";
import { Notify } from 'quasar'
import VueEasyLightbox from 'vue-easy-lightbox';
import { Dialog } from 'quasar'
import onScan from 'onscan.js'
import castWithSchema from 'cast-with-schema'


export default boot(async ({ app }) => {


    app.config.devtools = true;
    app.use(VueEasyLightbox)

    app.provide('onScan', onScan)
    app.provide('castWithSchema', castWithSchema)

    app.provide('confirmDialog', (callback, title = 'Вы уверены?', message = '') => {
        Dialog.create({
            title,
            message,
            cancel: {
                label: 'Отмена'
            },
            ok: {
                label: 'Да'
            },
            persistent: true
        }).onOk(() => {
            callback()
        })

    })

    app.provide('template', (template, data) => {
        return template.replace(
            /{{(\w*)}}/g, // or /{(\w*)}/g for "{this} instead of %this%"
            function (m, key) {
                return data.hasOwnProperty(key) ? data[key] : "";
            }
        )
    })


    app.provide('toClipboard', (value) => {
        copyToClipboard(value).then(() => {
            Notify.create({
                timeout: 2,
                message: "Текст скопирован в буффер обмена"
            });
        });
    })


})
