import React from 'react'
import {Table} from 'antd'
import seperate from '../../Seperate'
function PDS8Table({condo,loading}) {
    let uniqueId = 0 ;
    const {Column} = Table;
    return (
        <Table 
        dataSource={condo}
        pagination={false}
        bordered={true}
        loading={loading}
        rowKey={(record)=>{
            if (!record.__uniqueId)
        record.__uniqueId = ++uniqueId;
        return record.__uniqueId;
        }}
        summary={pageData=>{
            let total = 0;
            pageData.forEach((record)=>{
                let price = record.Rooms.map((room,index)=>room.LiveStatus?
                    record.Rooms[index].Useful_rooms.map(type=>(type.Price_Room * type.Amount_Place)- 50000000 <0?0:
                                (type.Price_Room * type.Amount_Place)- 50000000)
                        :
                        record.Rooms[index].Useful_rooms.map(type=>(type.Price_Room * type.Amount_Place))
                        )
            let totalPrice =  price.map(price=>seperate(price,'อยู่อาศัย').map(res=>res.percent * res.price))
            let sum = totalPrice.reduce((pre,cur)=>pre+ +cur,0);
            total += sum
            
            }) 
            return <>
            <Table.Summary.Row>
            <Table.Summary.Cell colSpan={12}>ยอดรวมทั้งหมด</Table.Summary.Cell>
            
            <Table.Summary.Cell colSpan={3}>
                <b style={{color:'red'}}>{`${total.toLocaleString()} ฿`}</b>
            </Table.Summary.Cell>
            </Table.Summary.Row>
        </>
        }}
        >
            <Column title="ที่" render={(text,record)=>text} dataIndex="id"/>
            <Column title="ชื่ออาคารชุด" dataIndex="Condo_name"/>
            <Column title="เลขทะเบียนอาคารชุด" dataIndex="Register_no"/>
            <Column title="ที่ตั้งอาคารชุด" dataIndex="District_name"/>
            <Column title="ลักษณะการทำประโยชน์"  dataIndex="Rooms"
            render={(rooms)=>rooms.map(room=>room.Useful_rooms.map(type=>type.Category_use))}
            />
            <Column title="เลขที่ห้องชุด" dataIndex="Rooms" 
            render={(rooms)=>rooms.map(room=><p>{room.Room_no}</p>)} 
            />
            <Column title="ขนาดพื้นที่รวม (ตร.ม)" dataIndex="Rooms"
            render={(rooms)=>rooms.map(room=>room.Useful_rooms.map(type=><p>{type.Amount_Place}</p>))}/>
            <Column title="ราคาประเมินต่อตารางเมตร"  dataIndex="Rooms"
            render={(rooms)=>rooms.map(room=>room.Useful_rooms.map(type=><p>{type.Price_Room}</p>))}
            />
            <Column title="ราคาประเมินห้องชุด"  dataIndex="Rooms"
            render={(rooms)=>rooms.map(room=>room.Useful_rooms.map(type=><p>{type.Price_Room * type.Amount_Place}</p>))}
            />
            <Column title="หักมูลค่าที่ได้รับยกเว้น"  dataIndex="Rooms"
            render={(rooms)=>rooms.map(room=>room.LiveStatus?<p>50</p>:<p>0</p>)}
            />
            <Column title="คงเหลือทรัพย์ที่ต้องเสียภาษี"  dataIndex="Rooms"
            render={(rooms)=>{
              return    rooms.map((room,index)=>room.LiveStatus?
                    rooms[index].Useful_rooms.map(type=><p>{(type.Price_Room * type.Amount_Place)- 50000000 <0?0:
                            (type.Price_Room * type.Amount_Place)- 50000000}</p>)
                    :
                    rooms[index].Useful_rooms.map(type=><p>{(type.Price_Room * type.Amount_Place)}</p>)
                    )
            
             
            }}
            />
            <Column title="อัตราเสียภาษี"  dataIndex="Rooms" 
            render={(rooms)=>{
                let price = rooms.map((room,index)=>room.LiveStatus?
                        rooms[index].Useful_rooms.map(type=>(type.Price_Room * type.Amount_Place)- 50000000 <0?0:
                                (type.Price_Room * type.Amount_Place)- 50000000)
                        :
                        rooms[index].Useful_rooms.map(type=>(type.Price_Room * type.Amount_Place))
                        )
            return     price.map(price=>seperate(price,'อยู่อาศัย').map(res=><p>{res.percent}</p>))
             
            }}
            />
            <Column title="ราคาภาษีที่ต้องชำระ"  dataIndex="Rooms"
            render={(rooms)=>{
                let price = rooms.map((room,index)=>room.LiveStatus?
                        rooms[index].Useful_rooms.map(type=>(type.Price_Room * type.Amount_Place)- 50000000 <0?0:
                                (type.Price_Room * type.Amount_Place)- 50000000)
                        :
                        rooms[index].Useful_rooms.map(type=>(type.Price_Room * type.Amount_Place))
                        )
            return     price.map(price=>seperate(price,'อยู่อาศัย').map(res=><p>{res.percent * res.price}</p>))
             
            }}
            />
        </Table>
    )
}

export default PDS8Table
