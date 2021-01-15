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
axios.interceptors.request.use(
    //will get respone and error from server
    response =>{
        return response
    },
    err=>{
        console.log('error aixos');
        if (err.response?.status === 401) {
            LocalStorageService.removeToken();
            window.location.reload();
            notification.error({message:"กรุณาเข้าสู่ระบบใหม่"})
            return Promise.reject(err)

        }
        if (err.response?.status === 403) {
            console.log('axios stauts 403');
            notification.error({message:"ข้อมูลนี้คุณไม่มีสิทธิ์ในการเข้าถึง"})
            window.location.replace('/main')
            return Promise.reject(err)
        }
        return Promise.reject(err)
    }
)
export default axios;