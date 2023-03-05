import { boot } from 'quasar/wrappers'
import axios from 'axios'

class API {

  constructor() {
    this.http = axios.create({
      baseURL: `${process.env.API_URL}/pdt/api`,
      withCredentials: true,
    });
  }

  async codeResolve (code) {
    const { data } = await this.http.get('/code-resolve', { params: { code } });
    return data;
  }

}

export default boot(async ({ app }) => {
  app.provide('api', new API())
})
