import React from 'react'
import {Table,Image,Popover} from 'antd'
function PDS4Table({condo,loading,tax}) {
    const {Column,ColumnGroup} = Table;
    let uniqueId = 0 ;
    const content = (customers=[]) => {
        return customers.map(({Cus_No,title,Cus_Fname,Cus_Lname})=><div key={Cus_No}>
            <p>เลขบัตรประชาชน :{Cus_No}</p>
            <p>ชื่อ-นามสกุล :{`${title} ${Cus_Fname} ${Cus_Lname}`}</p>
        </div>)
    }
    return (
        <div>
             <div style={{display:'block',paddingLeft:'650px'}}>
                                <Image src="/logobkk.jpeg" width={90} alt="logo"  preview={false}/>
                            </div>
                            <div style={{textAlign:'center'}}>
                                <p>แบบแจ้งข้อมูลรายการห้องชุด</p>
                                <p>ตามประกาศกรุงเทพมหานคร ลงวันที่   29 ธันวาคม 2563</p>
                                <p>เรื่อง บัญชีรายการที่ดินและสิ่งปลูกสร้าง ตามพระราชบัญญัติภาษีที่ดินและสิ่งปลูกสร้าง พ.ศ.๒๕๖๒</p>
                            </div>
                            <div style={{padding:'20px'}}>
                            <Popover content={content(tax?.Customers)}>
                                    <p>รหัสผู้เสียภาษีที่ดินและสิ่งปลูกสร้าง : <b>{`${tax?.uid_tax||""} (${tax?.Category_Tax||""})`}</b></p>
                            </Popover>
                </div>
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
            <Column title="ชื่ออาคารชุด" dataIndex="Room"
            render={(text)=><p>{text.Condo.Condo_name}</p>}/>
            <Column title="เลขทะเบียนอาคารชุด" dataIndex="Room"
            render={(text)=><p>{text.Condo.Register_no}</p>}/>
            <ColumnGroup title="ที่ตั้ง">
                <Column title="โฉนดเลขที่" dataIndex="Room"
            render={(text)=><p>{text.Condo.Parcel_no}</p>}/>
                <Column title="หน้าสำรวจ" dataIndex="Room"
            render={(text)=><p>{text.Condo.Survey_no}</p>}/>
                <Column title="ตำบล/แขวง" dataIndex="Room"
            render={(text)=><p>{text.Condo.Tambol}</p>}
                />
                <Column title="อำเภอ/เขต" dataIndex="Room"
            render={(text)=><p>{text.Condo.District_name}</p>}
            />
            </ColumnGroup>
            <Column title="เลขที่ห้องชุด" dataIndex="Room" 
            render={(rooms)=>rooms.Room_no} 
            />
            <Column title="ขนาดพื้นที่รวม (ตร.ม)" dataIndex="Amount_Place"/>
           
            <ColumnGroup title="ลักษณะการทำประโยชน์(ตร.ม)">
                <Column title="อยู่อาศัย"  dataIndex="Category_use"
                render={(text,record)=>text==="อยู่อาศัย"&&<p>{record.Amount_Place}</p>}
                />
                <Column title="อื่นๆ"  dataIndex="Category_use"
                render={(text,record)=>text==="อื่นๆ"&&<p>{record.Amount_Place}</p>}
                />
                <Column title="ว่างเปล่า"  dataIndex="Category_use"
                render={(text,record)=>text==="ว่างเปล่า"&&<p>{record.Amount_Place}</p>}
                />
            </ColumnGroup>
            <Column title="หมายเหตุ" dataIndex="Mark"/>
        </Table>
        </div>
        
    )
}

export default PDS4Table
