import axios from '../../config/axios'
import {notification} from 'antd'
import {FETCHS_LAND,FETCH_LAND} from './ActionType'
export const create_codeland = value =>{
    return dispatch => {
        axios.post('/api/codeland',{code_land:value}).then((result) => {
            notification.success({message:'สร้างรหัสแปลงที่ดินเรียบร้อยแล้ว'})
        }).catch((err) => {
            notification.error({message:"สร้างรหัสแปลงที่ดินล้มเหลว"})
        
        });
    }
}

export const fetch_land = id =>{
    return dispatch => {
        axios.get(`/api/land/${id}`).then((result) => {
            dispatch({type:FETCH_LAND,payload:result.data})
        }).catch((err) => {
            notification.error({message:'เรียกดูข้อมูลที่ดินแปลงนี้ล้มเหลว'})
        });
    }
}
export const fetchs_land = () =>{
    return dispatch => {
        axios.get('/api/lands').then((result) => {
            dispatch({type:FETCHS_LAND,payload:result.data})
        }).catch((err) => {
            notification.error({message:'เรียกดูข้อมูลแปลงที่ดินทั้งหมดของเขตล้มเหลว'})
        });
    }
}