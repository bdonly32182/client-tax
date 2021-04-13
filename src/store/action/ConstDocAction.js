import { notification } from 'antd';
import axios from '../../config/axios';
import {FETCHS_COSTDOCUMENT, FETCH_COSTDOCUMENT} from './ActionType';

export const FetchsCostDocumentEmployee = (year) =>{
    return dispatch =>{
        axios.get(`/api/costbooks/employee?year=${year}`)
        .then((result) => {
            dispatch({type:FETCHS_COSTDOCUMENT,payload:result.data});
        }).catch((err) => {
            notification.error({message:'เรียกดู ภ.ด.ส.๗ ของพนักงานล้มเหลว'})
        });
    } 
}

export const FetchsCostDocumentDistrict = (year) =>{
    return dispatch =>{
        axios.get(`/api/costbooks/district?year=${year}`)
        .then((result) => {
            dispatch({type:FETCHS_COSTDOCUMENT,payload:result.data});
        }).catch((err) => {
            notification.error({message:'เรียกดู ภ.ด.ส.๗ '})
        });
    } 
}
export const FetchCost = id => {
    return dispatch=>{
        axios.get(`/api/costbook/${id}`).then((result) => {
            dispatch({type:FETCH_COSTDOCUMENT,payload:result.data});
        }).catch((err) => {
            notification.error({message:'เรียกดู ภ.ด.ส.๗ '})

        });
    }
} 