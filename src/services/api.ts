import axios from 'axios';

// 创建 axios 实例
const api = axios.create({
    baseURL: 'http://localhost:8080', // 替换为实际的后端 API 地址
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 请求拦截器
// api.interceptors.request.use(
//     (config) => {
//         // 在这里可以添加认证信息，如 token
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// 响应拦截器
api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        // 处理错误响应
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 处理未授权错误
                    break;
                case 404:
                    // 处理未找到错误
                    break;
                case 500:
                    // 处理服务器错误
                    break;
                default:
                    // 处理其他错误
                    break;
            }
        }
        return Promise.reject(error);
    }
);

export default api;
