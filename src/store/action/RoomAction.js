import axios from '../../config/axios'
import {notification} from 'antd'
import {FETCHS_ROOM,DELETE_ROOM, DELETE_SELECT} from './ActionType'
export const FetchsRoomInCondo =(condoID)=>{
    return dispatch => {
        axios.get(`/api/fetchsrooms/${condoID}`).then((result) => {
            dispatch({type:FETCHS_ROOM,payload:result.data})
        }).catch((err) => {
            notification.error({message:'เรียกดูห้องชุดล้มเหลว'})
        });
    }
}
export const createRoom = (body,id_condo)=>{
    return dispatch=>{
            axios.post(`/api/create/room`,body).then((result) => {
            notification.success({message:'สร้างห้องชุดเรียบร้อยแล้ว'})
                axios.get(`/api/fetchsrooms/${id_condo}`).then((result) => {
                    dispatch({type:FETCHS_ROOM,payload:result.data})
                }).catch((err) => {
                    notification.error({message:'เรียกดูห้องชุดล้มเหลว'})
                });
            }).catch((err) => {
                notification.error({message:'สร้างห้องชุดล้มเหลว'})
            });
    }
    
}

export const generate_tax_room = (uid_tax,customer_has_tax,customer,Category_Tax,Room_ID) => {
    return dispatch => {
        axios.post(`/api/generate/room`,{uid_tax,customer_has_tax,customer,Category_Tax,Room_ID}).then((result) => {
            notification.success({message:'สร้างรหัสผู้เสียภาภาษีห้องชุดเรียบร้อย'})

        }).catch((err) => {
            notification.error({message:'สร้างรหัสผู้เสียภาภาษีห้องชุดล้มเหลว'})

        });
    }
}
export const filterRoom =(Floor,Condo_no,Price,Useful)=>{
    return dispatch =>{
        axios.get(`/api/filter/room?Floor=${Floor}&Condo_no=${Condo_no}&Price=${Price}&Useful=${Useful}`)
        .then((result) => {
            dispatch({type:FETCHS_ROOM,payload:result.data});
        }).catch((err) => {
            notification.error({message:'การค้นหาล้มเหลว'})
        });
    }
}
export const onDelete_room = (id,id_condo)=>{
    return dispatch => {
        axios.delete(`/api/room/${id}`).then((result) => {
            notification.success({message:'ลบห้องชุดเรียบร้อยแล้ว'})
            dispatch({type:DELETE_ROOM,RemoveId:id})
        }).catch((err) => {
            notification.error({message:'ลบห้องชุดล้มเหลว'})
        });
    }
}
export const onDeleteSelect = (mapRoomID) => {
    return dispatch=>{
        axios.post('/api/rows/rooms',{rooms:mapRoomID}).then((result) => {
            dispatch({type:DELETE_SELECT,RemoveAll:mapRoomID});
        }).catch((err) => {
            notification.error({message:'ห้องชุดที่ท่านเลือกที่จะลบล้มเหลว'})
        });
    }
}
export const UpgrateSelect =(body,condoID)=>{
    return dispatch=>{
        axios.post(`/api/rows/usefuls/`,body).then((result) => {
            notification.success({message:'อัพเดทเรียบร้อย'})
            axios.get(`/api/fetchsrooms/${condoID}`).then((result) => {
                dispatch({type:FETCHS_ROOM,payload:result.data})
            }).catch((err) => {
                notification.error({message:'เรียกดูห้องชุดล้มเหลว'})
            });
        }).catch((err) => {
            notification.error({message:'อัพเดทล้มเหลว'})
        });
    }
}
export const onEdit_room = (body,Floor,Condo_no,Price,Useful) => {
    return dispatch => {
        //ใช้โพสเพราะว่า รหัสห้องเราเอา รหัสคอนโด-เลขที่ห้อง
        console.log(Floor,Condo_no,Price,Useful);
        axios.post(`/api/edit/room`,body).then((result) => {
            notification.success({message:'แก้ไขห้องชุดเรียบร้อยแล้ว'})
            axios.get(`/api/filter/room?Floor=${Floor}&Condo_no=${Condo_no}&Price=${Price}&Useful=${Useful}`)
            .then((result) => {
                dispatch({type:FETCHS_ROOM,payload:result.data});
            }).catch((err) => {
                notification.error({message:'การค้นหาล้มเหลว'})
            });
            
        }).catch((err) => {
            notification.error({message:'แก้ไขห้องชุดล้มเหลว'})
        });

    }
} 
