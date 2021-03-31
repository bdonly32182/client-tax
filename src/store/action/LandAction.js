import axios from '../../config/axios'
import {notification} from 'antd'
import {FETCHS_LAND,FETCH_LAND,FETCHS_USEFUL_IN_LAND} from './ActionType'
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
export const delete_land = id => {
    return dispatch => {
        axios.delete(`/api/delete/land/${id}`).then((result) => {
            notification.success({message:'ลบแปลงที่ดินเรียบร้อยแล้ว'});
            window.location.replace('/land');
        }).catch((err) => {
            notification.error({message:'ลบแปลงที่ดินแปลงนี้ล้มเหลว'});

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
export const edit_land = (target_id,body,current_id) => {
    return dispatch => {
        axios.put(`/api/editLand/${target_id}`,{...body,totalPlace:0,Rate_Price_land:0}).then((result) => {
            axios.get(`/api/land/${current_id}`).then((result) => {
                notification.success({message:'แก้ไขข้อมูลแปลงที่ดินเรียบร้อยแล้ว'})
                dispatch({type:FETCH_LAND,payload:result.data})
            }).catch((err) => {
                notification.error({message:'เรียกดูข้อมูลที่ดินแปลงนี้ล้มเหลว'})
            });
        }).catch((err) => {
            notification.error({message:'แก้ไขข้อมูลล้มเหลว'})

        });
    }
}

export const generate_tax_land = (uid_tax,land_id,id_customer,customer,Category_Tax)=>{
        return dispatch => {
        let body = {
            uid_tax,
            land_id,
            customer_has_tax:id_customer,
            customer,
            Category_Tax
        }
            axios.post('/api/generate',body).then((result) => {
            notification.success({message:'สร้างรหัสผู้เสียภาษีเรียบร้อยแล้ว'})
            axios.get(`/api/land/${land_id}`).then((result) => {
                dispatch({type:FETCH_LAND,payload:result.data})
            }).catch((err) => {
                notification.error({message:'เรียกดูข้อมูลที่ดินแปลงนี้ล้มเหลว'})
            });
        }).catch((err) => {
            notification.error({message:'สร้างรหัสผู้เสียภาษีล้มเหลว'})
        });
    }
}
export const Select_customer = (body) =>{
    return dispatch =>{
        axios.post('/api/createCus',body).then((result) => {
            notification.success({message:result.data.msg})
        }).catch((err) => {
            notification.error({message:"คุณสร้างข้อมูลประชาชนล้มเหลว"})
        });
    }
}
export const onSearch = (ParcelNo,SurveyNo,LandNo,CodeLand,TaxId,Operator,special) =>{
    return dispatch => {
        axios.get(`/api/filter/land?ParcelNo=${ParcelNo}&SurveyNo=${SurveyNo}&LandNo=${LandNo}&CodeLand=${CodeLand}&TaxId=${TaxId}&Operator=${Operator}&special=${special}`)
        .then((result) => {
            dispatch({type:FETCHS_LAND,payload:result.data})
        }).catch((err) => {
            notification.error({message:'ค้นหาล้มเหลว'})
        });
    }
}