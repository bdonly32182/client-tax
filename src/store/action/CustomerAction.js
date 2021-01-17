import axios from '../../config/axios'
import {notification} from 'antd'
import {EDIT_CUSTOMER,FETCHS_CUSTOMER,FETCH_CUSTOMER} from './ActionType'

export const fetchs_customer = () =>{
    return dispatch => {
        axios.get('/api/customer').then((result) => {
            dispatch({type:FETCHS_CUSTOMER,payload:result.data})
        }).catch((err) => {
            notification.error({message:"การร้องขอข้อมูลของคุณล้มเหลว"})
        });
    }
}

export const create_customer = (body) =>{
    return dispatch =>{
        axios.post('/api/createCus',body).then((result) => {
            axios.get('/api/customer').then((result) => {
                dispatch({type:FETCHS_CUSTOMER,payload:result.data})
            }).catch((err) => {
                notification.error({message:"การร้องขอข้อมูลของคุณล้มเหลว"})
            });
            notification.success({message:result.data.msg})
        }).catch((err) => {
            notification.error({message:"คุณสร้างข้อมูลประชาชนล้มเหลว"})
        });
    }
}
export const edit_customer = (id,body) =>{
    return dispatch =>{
        axios.put('/api/customer/'+id,body).then((result) => {
            dispatch({type:EDIT_CUSTOMER})
            notification.success({message:result.data.msg})

        }).catch((err) => {
            notification.error({message:"การเปลี่ยนแปลงข้อมูลล้มเหลว"})
        });
    }
}

export const delete_customer =(id) => {
    return dispatch => {
        axios.delete('/api/customer/'+id).then(async(result) => {
           await notification.success({message:"ลบเจ้าข้อมูลประชาชนเรียบร้อยแล้ว"})
        }).catch((err) => {
            notification.error({message:"ลบเจ้าของทรัพย์สินล้มเหลว"})
        });
    }
}
export const fetch_customer =(id,history) =>{
    return dispatch => {
        axios.get('/api/customer/'+id).then((result) => {
            dispatch({type:FETCH_CUSTOMER,payload:result.data})
        }).catch((err) => {
            history.push('/customer')
            notification.error({message:"ไม่มีประชาชนรายนี้"})
        });
    }
}
