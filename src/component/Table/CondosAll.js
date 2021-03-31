import React from 'react'
import {Table} from 'antd'
import CondoModal from '../Modal/CondoModal';
import { Link } from 'react-router-dom';
function CondosAll({condo}) {
    const {Column} = Table;
    let uniqueId = 0;
    return (
        <Table dataSource={Array.isArray(condo)&&condo}
        rowKey={(record)=>{
            if (!record.__uniqueId)
        record.__uniqueId = ++uniqueId;
        return record.__uniqueId;
        }}
        >
            <Column 
            title="ลำดับ"
            dataIndex="ลำดับ"
            render={(text,record,index)=>index+1}
            />
            <Column 
            title="รหัสอาคารชุด"
            dataIndex="id"
            key="id"
            />
            <Column 
            title="ชื่ออาคารชุด"
            dataIndex="Condo_name"
            key="Condo_name"
            />
            <Column 
            title="เลขที่ใบอนุญาต"
            dataIndex="Register_no"
            key="Register_no"
            />
            <Column 
            title="เลขที่โฉนด"
            dataIndex="Parcel_no"
            key="Parcel_no"
            />
            <Column 
            title="หน้าสำรวจ"
            dataIndex="Survey_no"
            key="Survey_no"
            />
            <Column 
            title="ตำบล/แขวง"
            dataIndex="Tambol"
            key="Tambol"
            />
            <Column 
            title="อำเภอ/เขต"
            dataIndex="District_name"
            key="District_name"
            />
            <Column 
            title="จำนวนห้อง"
            dataIndex="amount"
            key="amount"
            />
            <Column 
            title="จัดการข้อมูลอาคารชุด"
            dataIndex="actionCondo"
            key="actionCondo"
            render={(text,record)=><CondoModal titleButton="แก้ไขข้อมูลอาคารชุด" condo={record} color="#DDBB0F"/>}
            />
            <Column 
            title="จัดการรายและห้องชุด"
            dataIndex="actionRoom"
            key="actionRoom"
            render={(text,record)=><Link to={`/condo/${record.id}`}>จัดการรายและห้องชุด</Link>}
            />
           
        </Table>
    )
}

export default CondosAll
