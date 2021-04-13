import axios from '../../config/axios';
import {FETCHS_USEFUL_IN_LAND,FETCH_LAND,FETCH_USEFUL_LAND,FETCHS_BUILD_IN_USEFULLAND} from './ActionType';
import {notification} from 'antd'
export const create_useful_land = (body,id_land) => {
    return dispatch => {
        console.log(body);
        axios.post('/api/create/useful',body).then((result) => {
            axios.get(`/api/land/${id_land}`).then((result) => {
                dispatch({type:FETCH_LAND,payload:result.data})
            }).catch((err) => {
                notification.error({message:'เรียกดูข้อมูลที่ดินแปลงนี้ล้มเหลว'})
            });
        }).catch((err) => {
            notification.error({message:'สร้างการใช้ประโยชน์ทัี่ดินล้มเหลว'})
        });
    }
}

export const fetchs_useful_in_land =(id_land)=> {
    return dispatch => {
        axios.get(`/api/useful/${id_land}`).then((result) => {
            dispatch({type:FETCHS_USEFUL_IN_LAND,payload:result.data})
        }).catch((err) => {
            notification.error({message:'การเรียกดูข้อมูลการใช้ประโยชน์ของที่ดินล้มเหลว'})
        });
    }
}
export const edit_useful = (id,body,land_id) =>{
    return dispatch => {
        axios.put(`/api/edit/useful/${id}`,body).then((result) => {
            notification.success({message:'แก้ไขการใช้ประโยชน์ของที่ดินเรียบร้อย'});
            axios.get(`/api/read/usefuls?useful_id=${id}&Land_id=${land_id}`).then((result) => {
                dispatch({type:FETCH_USEFUL_LAND,payload:result.data})
                dispatch({type:FETCHS_BUILD_IN_USEFULLAND,payload:result.data.BuildOnUsefulLands})
                axios.get(`/api/land/${land_id}`).then((result) => {
                    dispatch({type:FETCH_LAND,payload:result.data})
                }).catch((err) => {
                    notification.error({message:'เรียกดูข้อมูลที่ดินแปลงนี้ล้มเหลว'})
                });
            }).catch((err) => {
                notification.error({message:'การเรียกดูข้อมูลการใช้ประโยชน์ของที่ดินล้มเหลว'})
            });
            
        }).catch((err) => {
            notification.error({message:'แก้ไขการใช้ประโยชน์ของที่ดินล้มเหลว'});

        });
    }
}
export const delete_usefulland = (id,land_id) =>{
    return dispatch => {
        axios.delete(`/api/delete/useful/${id}`).then((result) => {
            notification.success({message:'ลบการใช้ประโยชน์ที่ดินเรียบร้อยแล้ว'})
            window.location.reload();
        }).catch((err) => {
            notification.error({message:'ลบการใช้ประโยชน์ของที่ดินล้มเหลว'})
        });
    }
}