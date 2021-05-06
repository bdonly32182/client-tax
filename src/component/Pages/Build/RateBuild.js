import React,{useEffect,useState} from 'react'
import axios from '../../../config/axios'
import {notification} from 'antd'
import RateTable from '../../Table/RateTable';
function RateBuild(props) {
    const [rate,setRate] = useState([]);
    useEffect(() => {
        axios.get('/api/rate/build').then((result) => {
            setRate(result.data)
        }).catch((err) => {
            notification.error({message:'เรียกดูราคาประเมินสิ่งปลูกสร้างล้มเหลว'})
        });
    }, [])
    return (
        <div style={{padding:'30px'}}>
            <RateTable  rate = {rate} />
        </div>
    )
}

export default RateBuild
