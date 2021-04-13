import { notification } from 'antd';
import axios from '../../config/axios';
import {FETCHS_CHECKDOCUMENT,FETCH_CHECKDOCUMENT} from './ActionType'
export const FetchsCheckDocumentEmployee = (year) =>{
    return dispatch =>{
        axios.get(`/api/checkbooks/employee?year=${year}`)
        .then((result) => {
            dispatch({type:FETCHS_CHECKDOCUMENT,payload:result.data});
        }).catch((err) => {
            notification.error({message:'เรียกดู ภ.ด.ส.๓ '})
        });
    } 
}
export const FetchsCheckDocumentDistrict = (year) =>{
    return dispatch =>{
        axios.get(`/api/checkbooks/district?year=${year}`)
        .then((result) => {
            dispatch({type:FETCHS_CHECKDOCUMENT,payload:result.data});
        }).catch((err) => {
            notification.error({message:'เรียกดู ภ.ด.ส.๓ '})
        });
    } 
}
export const FetchCheck = (id) => {
    return dispatch => {
        axios.get(`/api/checkbook/${id}`).then((result) => {
            dispatch({type:FETCH_CHECKDOCUMENT,payload:result.data});
        }).catch((err) => {
            notification.error({message:'เรียกดู ภ.ด.ส.๓'})
        });
    }
}