import React from 'react'
import {Space, Table} from 'antd'
import DistrictModal from '../Modal/DistrictModal';
function DistrictTable({districts}) {
    const {Column} = Table;
    let uniqueId = 0 ;
    return (
        <Table
        rowKey={(record)=>{
            if (!record.__uniqueId)
        record.__uniqueId = ++uniqueId;
        return record.__uniqueId;
        }}
        size="small"
        dataSource={districts}
        >
            <Column title="รหัสประจำเขต" dataIndex="District_no"/>
            <Column title="ชื่อเขต" dataIndex="District_name"/>
            <Column title="แขวง" dataIndex="Address_Tambol"/>
            <Column title="เขต" dataIndex="Address_District"/>
            <Column title="จังหวัด" dataIndex="Address_Country"/>
            <Column title="รหัสไปรษณีย์" dataIndex="Address_PostNo"/>
            <Column title="เบอร์โทร" dataIndex="Tel"/>
            <Column title="ตัวอักษรย่อ" dataIndex="Abbreviations"/>
            <Column title="Action" 
            render={(_,record)=>
                <Space>
                    <DistrictModal district={record}/>
                </Space>
            }
            />
        </Table>
    )
}

export default DistrictTable
