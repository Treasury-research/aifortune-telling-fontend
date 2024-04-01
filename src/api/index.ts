import axios from "axios";

export const baseURL = process.env.NEXT_PUBLIC_DOMAIN;

import { userInfoStore } from "store/userInfoStore";

const api = axios.create({
	baseURL,
	retry: 1,
	timeout: 60000,
} as any);

api.interceptors.request.use(
	(config) => {
		const token = userInfoStore.getState().token;
		config.headers.Lang = navigator.language.startsWith("en") ? "En" : "Cn";
		config.headers.authorization = token || undefined;
		return config;
	},
	(err) => {
		return Promise.reject(err);
	}
);

api.interceptors.response.use(
	(res: any) => {
		if (res.status === 200) {
			return res.data;
		}
	},
	(error: any) => {}
);

export default api;
