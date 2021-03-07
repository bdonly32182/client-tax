import React from 'react'
import {Table} from 'antd'
import Column from 'antd/lib/table/Column'
function RateTable({rate}) {
    let uniqueId = 0;
    return (
        <Table dataSource={rate} bordered={true}
        rowKey={(record)=>{
            if (!record.__uniqueId)
        record.__uniqueId = ++uniqueId;
        return record.__uniqueId;
        }}
        size="middle"
        >
            <Column title="รหัส" dataIndex="Code" key="Code"/>
            <Column title="ประเภทสิ่งปลูกสร้างหลัก" dataIndex="Category_build" key="Category_build"/>
            <Column title="ราคาประเมิน" dataIndex="Rate_Price" key="Rate_Price"/>
        </Table>
    )
}

export default RateTable
