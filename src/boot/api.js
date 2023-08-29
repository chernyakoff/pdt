import { boot } from 'quasar/wrappers'
import axios from 'axios'

class API {

  constructor() {
    this.http = axios.create({
      baseURL: `${process.env.API_URL}/pdt/api`,
      withCredentials: true,
    });
  }

  async resolve (code) {
    const { data } = await this.http.get('/resolve', { params: { code } });
    return data;
  }

  async search () {
    const { data } = await this.http.get('/search');
    return data;
  }

  async select (params) {
    const { data } = await this.http.get('/select', { params });
    return data;
  }

}

export default boot(async ({ app }) => {
  app.provide('api', new API())
})
