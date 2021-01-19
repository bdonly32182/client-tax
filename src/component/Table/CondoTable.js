import React from 'react'
import {Table} from 'antd'
function CondoTable(props) {
    const {Column,ColumnGroup} = Table
    return (
        <>
        {props.isEdit &&
        <h3>{`รายการที่เป็นเจ้าของอาคารชุด (${props.condos&&props.condos.length})`}</h3>
        }
        <Table dataSource={props.condos} size="small" bordered={true}>
            <Column title="ชื่ออาคารชุด"/>
            <Column title="เลขทะเบียนอาคารชุด"/>
            <Column title="เลขที่ห้องชุด"/>
            <Column title="ชั้นที่"/>
        </Table>
        </>
    )
}

export default CondoTable