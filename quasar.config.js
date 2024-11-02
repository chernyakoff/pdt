/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js

import vueDevTools from 'vite-plugin-vue-devtools';
import { configure } from 'quasar/wrappers';
import path from 'path';
import ini from 'ini';
import fs from 'fs';


const cfg = ini.parse(fs.readFileSync('./config.ini', 'utf-8'))[process.env.STATE]


const aliases = () => {

    const aliases = {}
    for (const alias of ['views', 'store', 'components', 'composables', 'assets', 'layouts', 'libs']) {
        aliases[alias] = path.join(__dirname, `./src/core/${alias}`);
    }
    for (const alias of ['home', 'settings', 'order', 'realization']) {
        aliases[alias] = path.join(__dirname, `./src/modules/${alias}`);
    }
    return aliases
}

const quasarPathResolverPlugin = () => {
    const map = {
        'css/app.css': 'core/app.css',
        'boot': 'core/boot',
    }
    return {
        name: 'quasar-path-resolver',
        enforce: 'pre',
        resolveId (source) {

            for (let [from, to] of Object.entries(map)) {

                if (source.includes(from)) {

                    return source.replace(`/${from}`, `/${to}`)
                }
            }
            return null;
        }

    }
}

const manualChunks = (id) => {


    const getModuleName = (id) => {
        const match = /\/modules\/(\w+)\//.exec(id)
        return match ? match[1] : false
    }
    const getPageName = (id) => {
        const match = /\/([A-z]+)Page.vue/.exec(id)
        return match ? match[1].toLowerCase() : false
    }

    const module = getModuleName(id)
    const page = getPageName(id)
    if (page && module) return `${module}.${page}`
    if (module) return `module.${module}`


    const map = {
        'node_modules': 'vendor',
        'core': 'core',
    }
    for (const [search, replace] of Object.entries(map)) {
        if (id.includes(search)) {
            return typeof (replace) == 'string' ? replace : replace(id)
        }
    }

}

module.exports = configure(function (/* ctx */) {

    return {
        eslint: {
            // fix: true,
            // include = [],
            // exclude = [],
            // rawOptions = {},
            warnings: true,
            errors: true
        },

        // https://v2.quasar.dev/quasar-cli/prefetch-feature
        // preFetch: true,

        // app boot file (/src/boot)
        // --> boot files are part of "main.js"
        // https://v2.quasar.dev/quasar-cli/boot-files
        boot: [
            'provide.js',
        ],

        // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#css
        css: [
            'app.css'
        ],

        // https://github.com/quasarframework/quasar/tree/dev/extras
        extras: [
            // 'ionicons-v4',
            // 'mdi-v5',
            // 'fontawesome-v6',
            // 'eva-icons',
            // 'themify',
            // 'line-awesome',
            // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

            'roboto-font', // optional, you are not bound to it
            'material-icons', // optional, you are not bound to it
        ],

        // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#build
        build: {
            target: {
                browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
                node: 'node16'
            },

            vueRouterMode: 'history', // available values: 'hash', 'history'
            vueRouterBase: cfg.vueRouterBase,
            vueDevtools: true,
            // vueOptionsAPI: false,

            // rebuildCache: true, // rebuilds Vite/linter/etc cache on startup

            publicPath: cfg.publicPath,
            // analyze: true,
            env: {
                API_URL: cfg.apiUrl,// ? 'http://idelivery-admin' : 'https://webadmin.yacurier.ru',
                IMG_URL: cfg.imgUrl,// ? 'http://idelivery-client' : 'https://webclient.yacurier.ru',
            },
            // rawDefine: {}
            // ignorePublicFolder: true,
            // minify: false,
            // polyfillModulePreload: true,
            distDir: cfg.distDir,// ? '/home/mike/Work/Php/idelivery/admin/modules/pdt/spa' : './dist/spa',

            extendViteConf (viteConf) {

                viteConf.build.rollupOptions = {
                    output: {
                        manualChunks,
                        entryFileNames: `assets/[name].js`,
                        chunkFileNames: `assets/[name].js`,
                        assetFileNames: `assets/[name].[ext]`
                    }
                }

                return viteConf;
                // console.log(viteConf)
            },

            //viteVuePluginOptions: {},
            alias: aliases(),

            vitePlugins: [
                [quasarPathResolverPlugin, vueDevTools()],

                //   [ 'package-name', { ..options.. } ]
            ],


        },

        // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#devServer
        devServer: {
            // https: true
            open: true // opens browser window automatically
        },

        // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#framework
        framework: {
            config: {

            },

            // iconSet: 'material-icons', // Quasar icon set
            lang: 'ru', // Quasar language pack

            // For special cases outside of where the auto-import strategy can have an impact
            // (like functional components as one of the examples),
            // you can manually specify Quasar components/directives to be available everywhere:
            //
            // components: [],
            // directives: [],

            // Quasar plugins
            plugins: [
                'Meta',
                'Notify',
                'LocalStorage',
                'SessionStorage',
                'Dialog',
            ]
        },

        // animations: 'all', // --- includes all animations
        // https://v2.quasar.dev/options/animations
        animations: [],

        // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#property-sourcefiles
        sourceFiles: {
            rootComponent: 'src/core/App.vue',
            router: 'src/core/router.js',
            store: 'src/core/store.js',
            //   registerServiceWorker: 'src-pwa/register-service-worker',
            //   serviceWorker: 'src-pwa/custom-service-worker',
            //   pwaManifestFile: 'src-pwa/manifest.json',
            //   electronMain: 'src-electron/electron-main',
            //   electronPreload: 'src-electron/electron-preload'
        },

        // https://v2.quasar.dev/quasar-cli/developing-ssr/configuring-ssr
        ssr: {
            // ssrPwaHtmlFilename: 'offline.html', // do NOT use index.html as name!
            // will mess up SSR

            // extendSSRWebserverConf (esbuildConf) {},
            // extendPackageJson (json) {},

            pwa: false,

            // manualStoreHydration: true,
            // manualPostHydrationTrigger: true,

            prodPort: 3000, // The default port that the production server should use
            // (gets superseded if process.env.PORT is specified at runtime)

            middlewares: [
                'render' // keep this as last one
            ]
        },

        // https://v2.quasar.dev/quasar-cli/developing-pwa/configuring-pwa
        pwa: {
            workboxMode: 'generateSW', // or 'injectManifest'
            injectPwaMetaTags: true,
            swFilename: 'sw.js',
            manifestFilename: 'manifest.json',
            useCredentialsForManifestTag: false,
            // useFilenameHashes: true,
            // extendGenerateSWOptions (cfg) {}
            // extendInjectManifestOptions (cfg) {},
            // extendManifestJson (json) {}
            // extendPWACustomSWConf (esbuildConf) {}
        },

        // Full list of options: https://v2.quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
        cordova: {
            // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
        },

        // Full list of options: https://v2.quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
        capacitor: {
            hideSplashscreen: true
        },

        // Full list of options: https://v2.quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
        electron: {
            // extendElectronMainConf (esbuildConf)
            // extendElectronPreloadConf (esbuildConf)

            inspectPort: 5858,

            bundler: 'packager', // 'packager' or 'builder'

            packager: {
                // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

                // OS X / Mac App Store
                // appBundleId: '',
                // appCategoryType: '',
                // osxSign: '',
                // protocol: 'myapp://path',

                // Windows only
                // win32metadata: { ... }
            },

            builder: {
                // https://www.electron.build/configuration/configuration

                appId: 'pdt'
            }
        },

        // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-browser-extensions/configuring-bex
        bex: {
            contentScripts: [
                'my-content-script'
            ],

            // extendBexScriptsConf (esbuildConf) {}
            // extendBexManifestJson (json) {}
        }
    }
});
