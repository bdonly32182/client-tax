import {FETCHS_CONDO,FETCH_CONDO,DELETE_CONDO,EDIT_CONDO,DELETE_ROOM,CREATE_ROOM} from './ActionType';
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
//
export const createRoom = (body,id_condo)=>{
    return dispatch=>{
            axios.post(`/api/create/room`,body).then((result) => {
            notification.success({message:'สร้างห้องชุดเรียบร้อยแล้ว'})
                axios.get(`/api/condo/${id_condo}`).then((result) => {
                    dispatch({type:FETCH_CONDO,payload:result.data});
                }).catch((err) => {
                    notification.error({message:'เรียกดูอาคารชุดล้มเหลว'});
        
                });
            }).catch((err) => {
                notification.error({message:'สร้างห้องชุดล้มเหลว'})
            });
    }
    
}
export const onDelete_room = (id,id_condo)=>{
    return dispatch => {
        
        axios.delete(`/api/room/${id}`).then((result) => {
            notification.success({message:'ลบห้องชุดเรียบร้อยแล้ว'})
            axios.get(`/api/condo/${id_condo}`).then((result) => {
                dispatch({type:FETCH_CONDO,payload:result.data});
            }).catch((err) => {
                notification.error({message:'เรียกดูอาคารชุดล้มเหลว'});
    
            });
        }).catch((err) => {
            notification.error({message:'ลบห้องชุดล้มเหลว'})
        });
    }
}

export const onEdit_room = (body,id_condo) => {
    return dispatch => {
        //ใช้โพสเพราะว่า รหัสห้องเราเอา รหัสคอนโด-เลขที่ห้อง
        axios.post(`/api/edit/room`,body).then((result) => {
            notification.success({message:'แก้ไขห้องชุดเรียบร้อยแล้ว'})
            axios.get(`/api/condo/${id_condo}`).then((result) => {
                console.log(result.data);
                dispatch({type:FETCH_CONDO,payload:result.data});
            }).catch((err) => {
                notification.error({message:'เรียกดูอาคารชุดล้มเหลว'});
    
            });
        }).catch((err) => {
            notification.error({message:'แก้ไขห้องชุดล้มเหลว'})
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