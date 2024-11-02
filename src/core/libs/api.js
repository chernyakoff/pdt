import axios from 'axios'

class BaseApi {
    params = {}

    constructor() {

        this.http = axios.create({
            baseURL: process.env.API_URL,
            withCredentials: true,
        });
    }

    trim (str, ch) {
        let start = 0,
            end = str.length;
        while (start < end && str[start] === ch)
            ++start;
        while (end > start && str[end - 1] === ch)
            --end; return (start > 0 || end < str.length) ? str.substring(start, end) : str;
    }

    async get (path, params) {
        const { data } = await this.http.get('/' + this.trim(path), { params });
        return data;
    }

    async post (path, params) {
        const { data } = await this.http.post('/' + this.trim(path), params);
        return data;
    }
}

class Common extends BaseApi {

    constructor() { super() }

    async stocks () {
        return await this.get('stocks');
    }

    async cells (stock) {
        return await this.get('cells', { stock });
    }
}

class Order extends BaseApi {
    constructor() {
        super()
    }

    async index (stock) {
        console.log(stock)
        return await this.get('order', { stock });
    }

    async pick (params) {
        return await this.get('order-pick', params);
    }

    async resolve (code) {
        return await this.get('order-resolve', { code });
    }

}


class Realization extends BaseApi {

    constructor() { super() }

    async index (stock) {
        return await this.get('realization', { stock });
    }

    async detail (id) {
        return await this.get('realization-detail', { id });
    }

    async resolve (id, code) {
        return await this.get('realization-resolve', { id, code });
    }

    async edit (id, item) {
        return await this.get('realization-edit', { id, item });
    }

    async editResolve (id, code) {
        return await this.get('realization-edit-resolve', { id, code });
    }

    async submit (id, data) {
        return await this.post('realization-submit', { id, data });
    }

}


export default class API {
    constructor() {

        this.common = new Common()
        this.order = new Order()
        this.realization = new Realization()
    }
}
