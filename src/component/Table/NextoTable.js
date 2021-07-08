import React from 'react'
import {Table,Space, Button} from 'antd'
import {CheckOutlined,DeleteFilled,SisternodeOutlined}from '@ant-design/icons'
function NextoTable({tabs,nextos,selectNexto,onDeleteNexto,onIntregateLive}) {
    let uniqueId = 0;
    const {Column,ColumnGroup} = Table;
  
    return (
        <>
            <Table size="small" 
             dataSource={nextos}
             bordered={true} pagination={false}
                rowKey={(record)=>{
                    if (!record.__uniqueId)
                record.__uniqueId = ++uniqueId;
                return record.__uniqueId;
                }}
            >
                
                <Column title="รหัสแปลงที่ดิน" 
                dataIndex="Land_id"
              
                />

                <Column title="เลขโฉนด" 
                dataIndex="Land"
                 render={(text,record)=>text.Parcel_No}
               
                />
                <Column title="เลขสำรวจ"
                dataIndex="Land"
                render={(text,record)=>text.Survey_No}
                />
                <Column title="เลขที่ดิน"
                dataIndex="Land"
                   render={(text,record)=>text.Land_No}
              
                />
                <Column title="รหัสการใช้ประโยชน์"
                dataIndex="useful_id"
              
                />
               <ColumnGroup title="ลักษณะการใช้">
                    <Column title="ใช้เอง" 
                    render={(text,record) => record.Usage&&<CheckOutlined />}
                    />
                    <Column title="ให้เช่า"                    
                    render={(text,record) => !record.Usage&&<CheckOutlined />}
                    />
                </ColumnGroup>
                <ColumnGroup title="เนื้อที่ใช้ประโยชน์">
                <Column title="ไร่" dataIndex="Useful_RAI"/>
                <Column title="งาน" dataIndex="Useful_GNAN"/>
                <Column title="วา" dataIndex="Useful_WA"/>

                </ColumnGroup>
                <Column title="การจัดการ"
                dataIndex="action"
                key="action"
                render= {(text,record)=>(
                    <>
                    <Space >
                    {tabs&&<DeleteFilled  style={{color:'red' }} onClick={()=>onDeleteNexto(record)}/>}
                    {tabs&&record.TypeName === "อยู่อาศัย" && <SisternodeOutlined onClick={()=>onIntregateLive(record.useful_id)} style={{backgroundColor:'#289672',color:'whitesmoke'}}/>}
                    {selectNexto&&<Button style={{borderRadius:'10px'}} onClick={()=>selectNexto(record)}>เลือกแปลงติดกัน</Button>}
                    </Space>
                   
                    </>
                )}
                />


            </Table> 
        
           
        </>
    )
}

export default NextoTable
