import { inject, onMounted, onUnmounted } from "vue";

import { ref } from "vue";


import API from 'libs/api'


const useApi = () => new API()


const useOnscan = (element, handler) => {
    const onScan = inject("onScan");

    onMounted(() => {
        onScan.attachTo(element, {
            minLength: 8,
            prefixKeyCode: [16],
            suffixKeyCodes: [13],
            onScan: async (code) => {
                await handler(code);
            },
        });
    });

    onUnmounted(() => {
        onScan.detachFrom(element);
    });

}

const useInitStore = (handler) => {
    const initialized = ref();
    const loading = ref();
    (async function () {
        loading.value = true;
        await handler();
        initialized.value = true;
        loading.value = false;
    })();
    return { initialized, loading };
}

export {
    useApi, useInitStore, useOnscan
}
