import React from 'react'
import { Table,Image,Popover} from 'antd'
function PDS3Table({land,tax,loading}) {
    const {Column,ColumnGroup} = Table;
    let uniqueId = 0;
    const content = (customers=[]) => {
        return customers.map(({Cus_No,title,Cus_Fname,Cus_Lname})=><div>
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
                                <p>แบบแจ้งข้อมูลรายการที่ดินและสิ่งปลูกสร้าง</p>
                                <p>ตามประกาศกรุงเทพมหานคร ลงวันที่   29 ธันวาคม 2563</p>
                                <p>เรื่อง บัญชีรายการที่ดินและสิ่งปลูกสร้าง ตามพระราชบัญญัติภาษีที่ดินและสิ่งปลูกสร้าง พ.ศ.๒๕๖๒</p>
                            </div>
                            <div style={{padding:'20px'}}>
                            <Popover content={content(tax?.Customers)}>
                                    <p>รหัสผู้เสียภาษีที่ดินและสิ่งปลูกสร้าง : <b>{`${tax?.uid_tax} (${tax?.Category_Tax})`}</b></p>
                            </Popover>
                </div>
                            <Table bordered={true} dataSource={land } size="small"
                rowKey={(record)=>{
                    if (!record.__uniqueId)
                record.__uniqueId = ++uniqueId;
                return record.__uniqueId;
                }}
                loading={loading}
        >
            <ColumnGroup title="รายการที่ดิน">
                <Column 
                title="ที่"
                dataIndex="Serial_code_land"
                key="Serial_code_land"
                render={(text,record)=><p>{record.Land.Serial_code_land}</p>}

                />
                <Column 
                title="ประเภทที่ดิน"
                dataIndex="Category_doc"
                key="Category_doc"
                render={(text,record)=><p>{record.Land.Category_doc}</p>}
                />
                <Column 
                title="เลขที่เอกสารสิทธิ์"
                dataIndex="Parcel_No"
                key="Parcel_No"
                render={(text,record)=><p>{record.Land.Parcel_No}</p>}
                />
                <Column 
                    title="เลขที่ดิน"
                    dataIndex="Land_No"
                    key="Land_No"
                    render={(text,record)=><p>{record.UsefulLand_Tax_ID===tax?.uid_tax&&record.Land.Land_No}</p>}
                />
                <Column 
                    title='หน้าสำรวจ'
                    dataIndex="Survey_No"
                    key="Survey_No"
                    render={(text,record)=><p>{record.UsefulLand_Tax_ID===tax?.uid_tax&&record.Land.Survey_No}</p>}
                   
                />
                <Column title="สถานที่ตั้ง"
                dataIndex="Tambol_name"
                key="Tambol_name"
                render={(text,record)=><p>{record.UsefulLand_Tax_ID===tax?.uid_tax&&record.Land.Tambol_name}</p>}

                />
                <ColumnGroup title="จำนวนเนื้อที่ดิน">
                    <Column dataIndex="Useful_RAI" title="ไร่" key="Useful_RAI"
                    render={(text,record)=><p>{record.UsefulLand_Tax_ID===tax?.uid_tax&&record.Useful_RAI}</p>}
                    />
                    <Column dataIndex="Useful_GNAN" title="งาน" key="Useful_GNAN"
                    render={(text,record)=><p>{record.UsefulLand_Tax_ID===tax?.uid_tax&&record.Useful_GNAN}</p>}                   
                    />
                    <Column dataIndex="Useful_WA" title="ตร.วา" key="Useful_WA"
                    render={(text,record)=><p>{record.UsefulLand_Tax_ID===tax?.uid_tax&&record.Useful_WA}</p>}
                    />
                </ColumnGroup>
                <ColumnGroup title="ลักษณะการใช้ประโยชน์ (ตร.ว)">
                    <Column title="ประกอบการเกษตร" dataIndex="UsefulLands"
                    render={(text,record) =>record.UsefulLand_Tax_ID===tax?.uid_tax&&record.TypeName==="เกษตร"&&<p>{record.Place}</p>}
                    />
                    
                    <Column title="อยู่อาศัย" dataIndex="UsefulLands"
                    render={(text,record) =>record.UsefulLand_Tax_ID===tax?.uid_tax&&record.TypeName==="อยู่อาศัย"&&<p>{record.Place}</p>}
                    />
                    <Column title="อื่นๆ" dataIndex="UsefulLands"
                    render={(text,record) =>record.UsefulLand_Tax_ID===tax?.uid_tax&&record.TypeName==="อื่นๆ"&&<p>{record.Place}</p>}
                    />
                    <Column title="ว่างเปล่า" dataIndex="UsefulLands"
                    render={(text,record) =>record.UsefulLand_Tax_ID===tax?.uid_tax&&record.TypeName==="ว่างเปล่า"&&<p>{record.Place}</p>}
                    />
                    <Column title="หลายประเภท" dataIndex="UsefulLands"
                    render={(text,record) =>record.UsefulLand_Tax_ID===tax?.uid_tax&&record.TypeName==="หลายประเภท"&&<p>{record.Place}</p>}
                    />
                </ColumnGroup>
            </ColumnGroup>
            <ColumnGroup title="รายการสิ่งปลูกสร้าง" >
                            
                            <Column 
                                title="ที่"
                                 render={(text,record,index) =>record.BuildOnUsefulLands.length>0?record.BuildOnUsefulLands.map((onuseful,i)=><p key={i}>{i+1}</p>):null}  
                                />
                                <Column title="บ้านเลขที่"
                                 render={(text,record,index) =>record.BuildOnUsefulLands.length>0?record.BuildOnUsefulLands.map((onuseful,i)=><p key={i}>{onuseful.Building.No_House}</p>):null}  
                                 />
                                <Column  title="ประเภทสิ่งปลูกสร้าง"
                                 render={(text,record,index) =>record.BuildOnUsefulLands.length>0?record.BuildOnUsefulLands.map((onuseful,i)=><p key={i}>{onuseful.Building.Sub_Category}</p>):null}  
                                 />
                                <Column title="ลักษณะสิ่งปลูกสร้าง" 
                                 render={(text,record,index) =>record.BuildOnUsefulLands.length>0?record.BuildOnUsefulLands.map((onuseful,i)=><p key={i}>{onuseful.Building.StyleBuilding}</p>):null}  

                                />
                                <Column title="ขนาดพื้นที่รวม (ตร.ม)" 
                                 render={(text,record,index) =>record.BuildOnUsefulLands.length>0?record.BuildOnUsefulLands.map((onuseful,i)=><p key={i}>{onuseful.Building.Build_Total_Place}</p>):null}  

                                />
                                <ColumnGroup title="ลักษณะการใช้ประโยชน์ (ตร.ม)">
                                    <Column title="การเกษตร"
                                 render={(text,record,index) =>record.BuildOnUsefulLands.length>0&&record.BuildOnUsefulLands.map((onuseful,i)=><p key={i}>{onuseful.Building.FarmType&&onuseful.Building.FarmType.Farm_Size}</p>)}  
                                    />
                                    <Column title="อยู่อาศัย"                                   
                                 render={(text,record,index) =>record.BuildOnUsefulLands.length>0&&record.BuildOnUsefulLands.map((onuseful,i)=><p key={i}>{onuseful.Building.LiveType&&onuseful.Building.LiveType.Live_Size}</p>)}  
                                 />
                                    <Column title="อื่นๆ"                                    
                                 render={(text,record,index) =>record.BuildOnUsefulLands.length>0&&record.BuildOnUsefulLands.map((onuseful,i)=><p key={i}>{onuseful.Building.OtherType&&onuseful.Building.OtherType.Other_Size}</p>)}  
                                 />
                                    <Column title="ว่างเปล่า"                               
                                 render={(text,record,index) =>record.BuildOnUsefulLands.length>0&&record.BuildOnUsefulLands.map((onuseful,i)=><p key={i}>{onuseful.Building.EmptyType&&onuseful.Building.EmptyType.Empty_Size}</p>)}  
                                 />
                                </ColumnGroup>
                                <Column title="อายูสิ่งปลูกสร้าง"                                
                                 render={(text,record,index) =>record.BuildOnUsefulLands.length>0&&record.BuildOnUsefulLands.map((onuseful,i)=><p key={i}>{onuseful.Building.Age_Build}</p>)}  
                                 />
                                <Column title="หมายเหตุ" 
                                 render={(text,record,index) =>record.BuildOnUsefulLands.length>0&&record.BuildOnUsefulLands.map((onuseful,i)=><p key={i}>{onuseful.Building.Mark}</p>)}  
                                 /> 
            </ColumnGroup>
            
        </Table>       
        </div>
       
    )
}

export default PDS3Table
