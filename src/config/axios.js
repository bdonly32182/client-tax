import axios from 'axios';
import LocalStorageService from '../LocalStorage/LocalStorageSevice'
import {notification} from 'antd'
axios.defaults.baseURL ="http://localhost:3001";
axios.interceptors.request.use(
    config=>{

        if(config.url.includes("/api/login")|| config.url.includes("/api/registmember")) return config;
        const token = LocalStorageService.getToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`
        }
        return config
    },
    err=>{
        Promise.reject(err)
    }
)
axios.interceptors.response.use(
    //will get respone and error from server
    response =>{
        return response
    },
    err=>{
        if (err.response?.status === 401) {
            LocalStorageService.removeToken();
            window.location.reload();
            notification.error({message:"กรุณาเข้าสู่ระบบใหม่"})
            return Promise.reject(err)

        }
        if (err.response?.status === 403) {
            window.location.replace('/main')
            notification.error({message:"ข้อมูลนี้คุณไม่มีสิทธิ์ในการเข้าถึง"})
            
            return Promise.reject(err)
        }
        return Promise.reject(err)
    }
)
export default axios;