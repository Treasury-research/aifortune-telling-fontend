import axios from "axios";
import { isProduction } from "lib/common";

export const baseURL = isProduction
	? "https://api.zendao.ai"
	: "https://ai-fortune.staging.knn3.xyz";

const api = axios.create({
  baseURL,
  retry: 1,
} as any);

api.interceptors.request.use(
  (config) => {
    // config.headers.authorization = jwt ? `Bearer ${jwt}` : "";
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
  (error: any) => {
  }
);

export default api;
