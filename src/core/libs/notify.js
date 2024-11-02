import { Notify } from 'quasar'

const types = {
    'notfound': {
        position: 'top',
        type: 'negative',
        message: 'Товар с таким кодом не найден'
    },
    'notinlist': {
        position: 'top',
        type: 'warning',
        message: 'Товара с таким кодом нет в новых продажах'
    },
    'error': {
        position: 'top',
        type: 'negative',
        message: 'Ошибка'
    },
    'success': {
        position: 'top',
        type: 'positive',
        message: 'Товар подобран'
    }
}

const notify = (type, message = null) => {
    const params = types[type]
    if (!params) {
        console.log(type)
        throw new Error(`unknown notify type: ${type}`);
    }
    if (message) {
        params.message = message
    }
    Notify.create(params)
}

export default notify;
