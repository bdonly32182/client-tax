import React,{useState,useEffect} from 'react'
import {Button,Table,Modal, notification} from 'antd'
import axios from '../../../../../config/axios'
import {useParams} from 'react-router-dom'
import CartWarning from '../../../../Modal/CartWarning';
function ListWarningDoc() {
    let uniqueId = 0;
    const [visible, setVisible] = useState(false)
    const [warning, setWarning] = useState([])
    const {year} = useParams();
    const {Column} = Table
    const onSearchWarning =()=>{
        axios.get(`/api/cart/warning?year=${year}`).then((result) => {
            setWarning(result.data)
        }).catch((err) => {
            notification.error({message:'ค้นหาล้มเหลว'})
        });
    }
    
    return (
        <div>
            <CartWarning warning={warning} onSearchWarning={onSearchWarning} setWarning={setWarning}/>
        </div>
    )
}

export default ListWarningDoc
