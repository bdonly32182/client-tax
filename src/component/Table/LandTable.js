import React from 'react'
import {Table} from 'antd'
import {EditFilled,CheckSquareTwoTone} from '@ant-design/icons'
function LandTable({isEdit,lands,onSelectCross}) {
    const {Column,ColumnGroup} = Table
    let uniqueId = 0 ;
    return (
        <>
        {isEdit&&
            <h3>{`รายการที่เป็นเจ้าของแปลงที่ดิน (${lands&&lands.length})`}</h3>
        }
        <Table dataSource={lands} bordered={true} size="small"
                rowKey={(record)=>{
                    if (!record.__uniqueId)
                record.__uniqueId = ++uniqueId;
                return record.__uniqueId;
                }}
        >
            <Column 
            title="ประเภทเอกสาร"
            dataIndex="Category_doc"
            key="Category_doc" />
            <Column 
            title="เลขที่เอกสารสิทธิ์"
            dataIndex="Parcel_No"
            key="Parcel_No" />
            
            <ColumnGroup title="ตำแหน่งที่ดิน">
                <Column 
                title="หน้าสำรวจ"
                dataIndex="Survey_No"
                key="Survey_No"  />
                <Column 
                title="เลขที่ดิน"
                dataIndex="Land_No"
                key="Land_No"  />
            </ColumnGroup>
        
             <ColumnGroup title= "เนื้อที่ (ไร่-งาน-ตร.ว)">
             <Column 
             title="ไร่"
             dataIndex="RAI"
             key="RAI"  />
             <Column 
             title="งาน"
             dataIndex="GNAN"
             key="GNAN"  />
             <Column 
             title="ตร.ว"
             dataIndex="WA"
             key="WA"  />
             </ColumnGroup>
            <Column 
            title="จัดการ"
            render={(text,record)=>onSelectCross?<CheckSquareTwoTone  onClick={()=>onSelectCross(record)} style={{fontSize:25}}/>//from BuildAccrossModal
                :<EditFilled onClick={()=>window.open(`/land/detial/${record.code_land}`,'_blank')}/>}//from EditTax
            />
        </Table>
        </>
    )
}

export default LandTable
