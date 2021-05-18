import axios from 'axios';
// import { message as AntMessage } from 'antd';
// import { baseUrl } from './api.config';

export async function Api(url, options, token) {

    const instance = axios.create({
        baseURL: "http://localhost:5000",
        timeout: 5000
    });
    instance.interceptors.request.use((req) => {
        if (localStorage.getItem('profile')) {
          req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
        }
      
        return req;
      });
    switch (options?.method?.toLowerCase()) {
        case "post":
        case "put":
        case "patch":
            return instance({
                'method': options.method,
                'url': url,
                'data': options.payload,
                'headers': {
                    'content-type': "application/json",
                    // 'Authorization': `Bearer ${token}`
                }
            });
        case "delete":
            return instance({
                'method': options.method,
                'url': url,
                'headers': {
                    'content-type': "application/json",
                    // 'Authorization': `Bearer ${token}`
                }
            });   
        default:
            return instance({
                'method': "GET",
                'url': url
            });
    }
}
export function handleError(error, message) {
    if (error.code === "ECONNABORTED") {
        return;
    }
    if (error.response) {
        let status = error.response.status;
        switch (status) {
            case 400:
                message = "Bad request";
                break;
            case 401:
                message = "Unauthorized";
                break;
            case 404:
                message = "The server responded with a status of 404 (Not Found)";
                break;
            case 403:
                message = "Forbidden";
                break;
            case 500:
                message = "Internal server error";
                break;
            default:
                message = "Internal server error";
                break;
        }
    }
    return;
}



// Api.interceptors.request.use((req) => {
//     if (localStorage.getItem('profile')) {
//       req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//     }
  
//     return req;
// });

export const signIn = (formData) => Api.post('auth/signin', formData);
export const signUp = (formData) => Api.post('auth/signup', formData);

// export default {
//     getData: () =>
//     Api({
//         'method':'GET',
//         'url':'/query',
//         'params': {
//             'search':'parameter',
//         },
//     }),
//     postData: () =>
//     Api({
//         'method': 'POST',
//         'url':'/api',
//         'data': {
//             'item1':'data1',
//             'item2':'item2'
//         },
//         'headers': {
//             'content-type':'application/json'  // override instance defaults
//         }
//     })
// }