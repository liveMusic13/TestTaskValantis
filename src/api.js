import axios from 'axios';
import { md5 } from 'js-md5';

const API_URL = 'https://api.valantis.store:41000/';

const date = new Date();
const timestamp = `${date.getUTCFullYear()}${(date.getUTCMonth() + 1)
	.toString()
	.padStart(2, '0')}${date.getUTCDate().toString().padStart(2, '0')}`;
const password = 'Valantis';

const xAuth = md5(`${password}_${timestamp}`);

export const $axios = axios.create({
	baseURL: API_URL,
	headers: {
		'X-Auth': xAuth,
	},
});
