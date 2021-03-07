import React from 'react'
import {Table} from 'antd'
function PDS4Table({condo,loading}) {
    const {Column,ColumnGroup} = Table;
    let uniqueId = 0 ;
    return (
        <Table
        dataSource={condo}
        pagination={false}
        bordered={true}
        loading={loading}
        size="middle"
        rowKey={(record)=>{
            if (!record.__uniqueId)
        record.__uniqueId = ++uniqueId;
        return record.__uniqueId;
        }}
        >
            <Column title="ที่" render={(text,record)=>text} dataIndex="id"/>
            <Column title="ชื่ออาคารชุด" dataIndex="Condo_name"/>
            <Column title="เลขทะเบียนอาคารชุด" dataIndex="Register_no"/>
            <ColumnGroup title="ที่ตั้ง">
                <Column title="โฉนดเลขที่" dataIndex="Parcel_no"/>
                <Column title="หน้าสำรวจ" dataIndex="Survey_no"/>
                <Column title="ตำบล/แขวง" dataIndex="Tambol"/>
                <Column title="อำเภอ/เขต" dataIndex="District_name"/>
            </ColumnGroup>
            <Column title="เลขที่ห้องชุด" dataIndex="Rooms" 
            render={(rooms)=>rooms.map(room=><p>{room.Room_no}</p>)} 
            />
            <Column title="ขนาดพื้นที่รวม (ตร.ม)" dataIndex="Rooms"
            render={(rooms)=>rooms.map(room=>room.Useful_rooms.map(type=><p>{type.Amount_Place}</p>))}/>
           
            <ColumnGroup title="ลักษณะการทำประโยชน์(ตร.ม)">
                <Column title="อยู่อาศัย"  dataIndex="Rooms"
                render={(rooms)=>rooms.map(room=>room.Useful_rooms.map(type=>type.Category_use ==="อยู่อาศัย"?<p>{type.Amount_Place}</p>:<p>{``}</p>))}
                />
                <Column title="อื่นๆ"  dataIndex="Rooms"
                render={(rooms)=>rooms.map(room=>room.Useful_rooms.map(type=>type.Category_use ==="อื่นๆ"?<p>{type.Amount_Place}</p>:<p>{``}</p>))}
                />
                <Column title="ว่างเปล่า"  dataIndex="Rooms"
                render={(rooms)=>rooms.map(room=>room.Useful_rooms.map(type=>type.Category_use ==="ว่างเปล่า"?<p>{type.Amount_Place}</p>:<p>{``}</p>))}
                />
            </ColumnGroup>
            <Column title="หมายเหตุ" dataIndex="Mark"/>
        </Table>
    )
}

export default PDS4Table
