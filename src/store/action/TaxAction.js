import axios from '../../config/axios'
import {notification}   from 'antd'
import {FETCHS_TAX,FETCH_TAX} from './ActionType'

export const fetch_tax =(id)=>{
    return dispatch=>{
            axios.get('/api/tax/'+id).then((result) => {
            dispatch({type:FETCH_TAX,payload:result.data})
        }).catch((err) => {
            notification.error({message:'การร้องขอข้อมูลล้มเหลว'})
        });
    }
    
}
export const fetchs_taxs =(size,currentPage)=>{
    return dispatch=>{
        axios.get(`/api/taxs?size=${size}&page=${currentPage}`).then((result) => {
            dispatch({type:FETCHS_TAX,payload:result.data})
        }).catch((err) => {
            notification.error({message:'การร้องขอข้อมูลล้มเหลว'})
        });
    }
}