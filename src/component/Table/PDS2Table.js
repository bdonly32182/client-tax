import React from 'react'
import {Table} from 'antd'
import seperate from '../../FuncPDS7/Seperate'
function PDS2Table({condo,type}) {
    let uniqueId = 0 ;
    const {Column} = Table;
 
    return (
        <Table 
        dataSource={type}
        pagination={false}
        bordered={true}
        size="small"
        rowKey={(record)=>{
            if (!record.__uniqueId)
        record.__uniqueId = ++uniqueId;
        return record.__uniqueId;
        }}>
            <Column title="ที่" render={(text)=><p>{condo.id}</p>} />
            <Column title="ชื่ออาคารชุด" render={(t)=><p>{condo.Condo_name}</p>}/>
            <Column title="เลขทะเบียนอาคารชุด" render={(t)=><p>{condo.Register_no}</p>}/>
            <Column title="ที่ตั้งอาคารชุด" render={(t)=><p>{condo.District_name}</p>}/>
            <Column title="ลักษณะการทำประโยชน์"  dataIndex="Category_use"
            // render={(rooms)=>rooms.map(room=>room.Useful_rooms.map(type=><p>{type.Category_use}</p>))}
            />
            <Column title="เลขที่ห้องชุด" dataIndex="Room" 
            render={(rooms)=>rooms.Room_no} 
            />
            <Column title="ขนาดพื้นที่รวม (ตร.ม)" dataIndex="Amount_Place"
            // render={(rooms)=>rooms.map(room=>room.Useful_rooms.map(type=><p>{type.Amount_Place}</p>))}
            />
            <Column title="ราคาประเมินต่อตารางเมตร"  dataIndex="Price_Room"
            render={(text)=><p>{text.toLocaleString()}</p>}
            />
            <Column title="ราคาประเมินห้องชุด"  
                render = {(text,record)=><p>{(record.Price_Room * record.Amount_Place).toLocaleString()}</p>}
            // render={(rooms)=>rooms.map(room=>room.Useful_rooms.map(type=><p>{type.Price_Room * type.Amount_Place}</p>))}
            />
            <Column title="หักมูลค่าที่ได้รับยกเว้น" 
             dataIndex="Room"
            render={(text)=>text.LiveStatus?<p>50</p>:<p>0</p>}
            />
            <Column title="คงเหลือทรัพย์ที่ต้องเสียภาษี"  dataIndex="Room"
            render={(text,record)=>{
              return    text.LiveStatus?<p>{(record.Price_Room * record.Amount_Place)- 50000000 <0?0:
              ((record.Price_Room * record.Amount_Place)- 50000000).toLocaleString()}</p>:
              <p>{(record.Price_Room * record.Amount_Place).toLocaleString()}</p>
            }}
            />
            <Column title="อัตราเสียภาษี"  dataIndex="Room" 
            render={(text,record)=>{
                let Price =   text.LiveStatus?(record.Price_Room * record.Amount_Place)- 50000000 <0?0:
                (record.Price_Room * record.Amount_Place)- 50000000:
                record.Price_Room * record.Amount_Place
                return seperate(Price,record.Category_use,0,record.StartYearEmpty).map(res=><p>{res.percent}</p>)
              }}
             
    
            />
            <Column title="หมายเหตุ"  dataIndex="Room"
            render={(text,record)=>{
                let Price =   text.LiveStatus?(record.Price_Room * record.Amount_Place)- 50000000 <0?0:
                (record.Price_Room * record.Amount_Place)- 50000000:
                record.Price_Room * record.Amount_Place
                return seperate(Price,record.Category_use,0,record.StartYearEmpty).map(res=><p>{(res.percent * res.price).toLocaleString()}</p>)
              }}
            />
        </Table>
    )
}

export default PDS2Table
