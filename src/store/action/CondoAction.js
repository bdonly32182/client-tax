import {FETCHS_CONDO,FETCH_CONDO} from './ActionType';
import axios from '../../config/axios';
import {notification} from 'antd'
export const fetchs_condo = () => {
    return dispatch =>{
        axios.get('/api/condos').then((result) => {
            dispatch({type:FETCHS_CONDO,payload:result.data})
        }).catch((err) => {
            notification.error({message:'เรียกดูข้อมูลอาคารชุดล้มเหลว'})
        });
    }
}
export const fetch_condo = (id) => {
    return dispatch => {
        axios.get(`/api/condo/${id}`).then((result) => {
            dispatch({type:FETCH_CONDO,payload:result.data});
        }).catch((err) => {
            notification.error({message:'เรียกดูอาคารชุดล้มเหลว'});

        });
    }
}
export const create_condo = (body) => {
    return dispatch => {
        axios.post(`/api/create/cond`,body).then((result) => {
            axios.get('/api/condos').then((result) => {
                dispatch({type:FETCHS_CONDO,payload:result.data})
            }).catch((err) => {
                notification.error({message:'เรียกดูข้อมูลอาคารชุดล้มเหลว'})
            });
           notification.success({message:'สร้างอาคารชุดใหม่เรียบร้อยแล้ว'}) 
        }).catch((err) => {
            notification.error({message:'สร้างอาคารชุดล้มเหลว'})
        });
    }
}   
export const SearchCondo = (search) => {
    return dispatch => {
        axios.get(`/api/search/condo?search=${search}`).then((result) => {
            dispatch({type:FETCHS_CONDO,payload:result.data});
        }).catch((err) => {
            notification.error({message:'ค้นหาห้องชุดล้มเหลว'})
        });
    }
}
export const ondelete_condo = id => {
    return dispatch => {
        axios.delete(`/api/condo/${id}`).then((result) => {
            notification.success({message:'ลบอาคารชุดแล้วร้อยแล้ว'})
            window.location.replace('/condo')
        }).catch((err) => {
            notification.error({message:'ลบอาคารชุดล้มเหลว'})
        });
    }
}

export const onEdit_condo =(id,body)=> {
    return dispatch=> {
        axios.put(`/api/condo/${id}`,body).then((result) => {
            notification.success({message:'แก้ไขอาคารชุดแล้วร้อยแล้ว'})
            axios.get('/api/condos').then((result) => {
                dispatch({type:FETCHS_CONDO,payload:result.data})
            }).catch((err) => {
                notification.error({message:'เรียกดูข้อมูลอาคารชุดล้มเหลว'})
            });
        }).catch((err) => {
            notification.error({message:'แก้ไขอาคารชุดล้มเหลว'})
        });
    }
}
