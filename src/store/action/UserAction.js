import { notification } from 'antd';
import axios from '../../config/axios';
import LocalStorageService from '../../LocalStorage/LocalStorageSevice'
import {USER_LOGIN} from './ActionType'
export const user_login =(body,setRole)=>{
    return dispatch =>{
        axios.post("/api/login",body).then(async(result) => {
         LocalStorageService.setToken(result.data.token);
          result.data.Role&&  setRole(result.data.Role)
          dispatch({type:USER_LOGIN,payload:result.data})
       
    }).catch((err) => {
        notification.error({
            message:"การเข้าสู่ระบบล้มเหลว"
        })
    });
    }
    
}

export const user_register =({Pers_no,Fname,Lname,password,distict_member_id,role_name,TableNo},picture) =>{
    return dispatch =>{
        const formData = new FormData();
        formData.append('file',picture);
        formData.append('Pers_no',Pers_no);
        formData.append('Fname',Fname);
        formData.append('Lname',Lname);
        formData.append('password',password);
        formData.append('distict_member_id',distict_member_id);
        formData.append('role_name',role_name);
        formData.append('TableNo',TableNo);
        axios.post('/api/registmember',formData).then((result) => {
            //ถ้ารหัสบัตรประชาชนถูกใช้แล้ว ให้เเจ้งเตือน
            if(result.status === 202)return notification.warning({message:result.data.msg})
            notification.success({message:result.data.msg})
        }).catch((err) => {
            notification.error({
                message:"การสมัครสมาชิกล้มเหลว"
            })
        });
    }
}
export const change_profile =(value)=>{
    return dispatch => {
        axios.post('/api/change',value).then((result) => {
            if(result.status === 202)return notification.warning({message:result.data.msg})
            notification.success({message:result.data.msg})
        })
        .catch((err) => {
            notification.error({message:'แก้ไขข้อมูลล้มเหลว'})
        });
    }
}