import { boot } from 'quasar/wrappers'
import onScan from 'onscan.js'

export default boot(async ({ app }) => {
	app.provide('onScan', onScan)
})

export { onScan }
