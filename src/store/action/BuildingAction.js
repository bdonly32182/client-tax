import axios from '../../config/axios';
import {FETCHS_BUILD_IN_USEFULLAND, FETCH_BUILDING,DELETE_BUILDING} from './ActionType'
import {notification} from 'antd'
export const create_building = (body,useful_id,code_land) => {
    return dispatch => {
            axios.post('/api/create/build',body).then((result) => {
                axios.get(`/api/read/usefuls?useful_id=${useful_id}&Land_id=${code_land}`).then((result) => {
                    dispatch({type:FETCHS_BUILD_IN_USEFULLAND,payload:result.data.BuildOnUsefulLands})
                }).catch((err) => {
                    notification.error({message:'การเรียกดูข้อมูลการใช้ประโยชน์ของที่ดินล้มเหลว'})
                });
            }).catch((err) => {
                notification.error({message:'สร้างสิ่งปลูกสร้างล้มเหลว'})
            });
    
    }
}

export const edit_building =(body,useful_id,code_land)=>{
    return dispatch => {
        axios.put(`/api/build/${body.Build_Id}`,body).then((result) => {
            axios.get(`/api/read/usefuls?useful_id=${useful_id}&Land_id=${code_land}`).then((result) => {
                dispatch({type:FETCHS_BUILD_IN_USEFULLAND,payload:result.data.BuildOnUsefulLands})
            }).catch((err) => {
                notification.error({message:'การเรียกดูข้อมูลการใช้ประโยชน์ของที่ดินล้มเหลว'})
            });
        }).catch((err) => {
            notification.error({message:'เรียกดูข้อมูลสิ่งปลูกสร้างล้มเหลว'})
        });
    }
}

// export const fetch_building =(build_id)=>{
//     return dispatch => {
//         axios.get().then((result) => {
//             dispatch({type:FETCH_BUILDING,payload:result.data})
//         }).catch((err) => {
//             notification.error({message:'เรียกดูข้อมูลสิ่งปลูกสร้างล้มเหลว'})
//         });
//     }
// }

export const generate_building =(uid_tax,land_id,id_customer,customer,Category_Tax,Build_Id,useful_id)=>{
    return dispatch => {
        let body = {
            uid_tax,
            land_id,
            customer_has_tax:id_customer,
            customer,
            Category_Tax,
            Build_Id
        }
        console.log(useful_id);
        axios.post(`/api/build/tax`,body).then((result) => {
            notification.success({message:'สร้างรหัสผู้เสียภาษีสิ่งปลูกสร้างเรียบร้อยแล้ว'})
            
        }).catch((err) => {
            notification.error({message:'สร้างรหัสผู้เสียภาษีสิ่งปลูกสร้างล้มเหลว'})
        });
    }
}
export const delete_building=id=>{
    return dispatch => {
        axios.delete(`/api/build/${id}`).then((result) => {
            dispatch({type:DELETE_BUILDING,RemoveId:id})
            notification.success({message:'ลบแปลงที่ดินเรียบร้อยแล้ว'})
        }).catch((err) => {
            notification.error({message:'ลบแปลงที่ดินล้มเหลว'})
        });
    }
}