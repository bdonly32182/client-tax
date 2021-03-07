import React from 'react'
import {Space, Table} from 'antd'
import {EditFilled} from '@ant-design/icons'
import RoomModal from '../Modal/RoomModal';
function CondoTable(props) {
    const {Column} = Table
    let uniqueId = 0;
    return (
        <>
        {props.isEdit &&
        <h3>{`รายการที่เป็นเจ้าของอาคารชุด (${props.condos&&props.condos.length})`}</h3>
        }
        <Table dataSource={props.condos} size="small" bordered={true}
                rowKey={(record)=>{
                    if (!record.__uniqueId)
                record.__uniqueId = ++uniqueId;
                return record.__uniqueId;
                }}
        >
            <Column title="ชื่ออาคารชุด" dataIndex="Condo"
            render={text=>text.Condo_name}
            />
            <Column title="เลขทะเบียนอาคารชุด" dataIndex="Condo"
            render={text=>text.Register_no}
            />
            <Column title="เลขที่ห้องชุด" dataIndex="Room_no"/>
            <Column title="ชั้นที่" dataIndex="Floor"/>
            <Column 
            title="manage"
            render={(text,record)=><RoomModal titleButton={<EditFilled /> }
            titleModal={`เลขที่ห้องชุด ${record.Room_no} (ชั้นที่ ${record.Floor})`}
            id_condo={record.Condo_no}
            room={record}/>}
            />
        </Table>
        </>
    )
}

export default CondoTable