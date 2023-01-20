import axios from 'axios'


class API {
	constructor() {
		this.http = axios.create({
			baseURL: `${process.env.API_URL}/pdt/api`,
			withCredentials: true,
		});
	}

	async checkCode (code) {
		const { data } = await this.http.get('/code', { params: { code } });
		return data;
	}

}

const api = new API();


export { api }
