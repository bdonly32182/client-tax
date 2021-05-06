import React from 'react'
import {Table,Image,Popover} from 'antd'
import seperate from '../../FuncPDS7/Seperate'
function PDS8Table({condo,loading,tax:{uid_tax,Category_Tax,exceptEmergency,Customers}}) {
    let uniqueId = 0 ;
    const {Column} = Table;
    const content = (customers=[]) => {
        return customers.map(({Cus_No,title,Cus_Fname,Cus_Lname})=><div>
            <p>เลขบัตรประชาชน :{Cus_No}</p>
            <p>ชื่อ-นามสกุล :{`${title} ${Cus_Fname} ${Cus_Lname}`}</p>
        </div>)
    }
    return (
        <div>
                            <div style={{textAlign:'right',paddingRight:'60px'}}>
                                <p>ภ.ด.ส.๘</p>

                            </div>
                            <div style={{display:'block',paddingLeft:'650px'}}>
                                <Image src="/logobkk.jpeg" width={90} alt="logo"  preview={false}/>
                                
                            </div>
                            <div style={{padding:'20px'}}>
                            <Popover content={content(Customers)}>
                                    <p>รหัสผู้เสียภาษีที่ดินและสิ่งปลูกสร้าง : <b>{`${uid_tax} (${Category_Tax})`}</b></p>
                            </Popover>
                            </div>
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
                let Price =   record.Room.LiveStatus?(record.Price_Room * record.Amount_Place)- 50000000 <0?0:
                (record.Price_Room * record.Amount_Place)- 50000000:
                record.Price_Room * record.Amount_Place
              let totalPrice = seperate(Price,record.Category_use,0,record.StartYearEmpty).map(res=>res.percent * res.price)
                                .reduce((pre,cur)=>pre+cur);
            total += totalPrice
            
            }) 
            return <>
            <Table.Summary.Row>
            <Table.Summary.Cell colSpan={10}></Table.Summary.Cell>

            <Table.Summary.Cell colSpan={1}>ยอดรวมทั้งหมด</Table.Summary.Cell>
            
            <Table.Summary.Cell colSpan={4}>
                <b style={{color:'red'}}>{`${total.toLocaleString()} ฿`}</b>
            </Table.Summary.Cell>
            </Table.Summary.Row>
            {exceptEmergency>0&&
                <Table.Summary.Row>
                <Table.Summary.Cell colSpan={10}></Table.Summary.Cell>

                <Table.Summary.Cell colSpan={1}><b style={{textAlign:'center'}}>{`(ได้รับส่วนลดกรณีฉุกเฉิน ${exceptEmergency>0&&exceptEmergency} %)`}</b></Table.Summary.Cell>
                
                <Table.Summary.Cell colSpan={4}>
                    <b style={{color:'red'}}>{`${(total*((100-exceptEmergency)/100)).toLocaleString()} ฿`}</b>
                </Table.Summary.Cell>
                </Table.Summary.Row>
            }
        </>
        }}
        >
            <Column title="ที่" 
            dataIndex="Room"
            render={(text)=><p>{text.Condo.id}</p>}/>
            <Column title="ชื่ออาคารชุด" 
            dataIndex="Room"
            render={(text)=><p>{text.Condo.Condo_name}</p>}
            />
            <Column title="เลขทะเบียนอาคารชุด"
            dataIndex="Room"
            render={(text)=><p>{text.Condo.Register_no}</p>}
            />
            <Column title="ที่ตั้งอาคารชุด" dataIndex="Room"
            render={(text)=><p>{text.Condo.District_name}</p>}
            />
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
            render={(text)=>text.LiveStatus?<p>50ล้าน</p>:<p>0</p>}
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
                return seperate(Price,record.Category_use,0,record.StartYearEmpty).map((res,i)=><p key={i}>{res.percentShow}</p>)
              }}
             
    
            />
            <Column title="ราคาที่ต้องชำระ"  dataIndex="Room"
            render={(text,record)=>{
                let Price =   text.LiveStatus?(record.Price_Room * record.Amount_Place)- 50000000 <0?0:
                (record.Price_Room * record.Amount_Place)- 50000000:
                record.Price_Room * record.Amount_Place
                return seperate(Price,record.Category_use,0,record.StartYearEmpty).map((res,i)=><p key={i}>{(res.percent * res.price).toLocaleString()}</p>)
              }}
            />
        </Table>
        </div>
    )
}

export default PDS8Table
