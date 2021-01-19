import React from 'react'
import {Table, Space,Button} from 'antd'
import {useHistory} from 'react-router-dom'
function LandList(props) {
    let history = useHistory()
    let uniqueId = 0;
    const detail_land =(id)=>{
        history.push(`/land/detial/${id}`)
    }
    const colums =[
        {
            title:"ลำดับ",
            dataIndex:"Serial_code_land",
            key:"Serial_code_land",
            render:text=><a>{text}</a>
        },
        {
            title:"รหัสแปลงที่ดิน",
            dataIndex:"code_land",
            key:"code_land" 
        },
        {
            title:"ประเภทเอกสาร",
            dataIndex:"Category_doc",
            key:"Category_doc" 
        },
        {
            title:"เลขที่เอกสารสิทธิ์",
            dataIndex:"Parcel_No",
            key:"Parcel_No" 
        },
        {
            title:"หน้าสำรวจ",
            dataIndex:"Survey_No",
            key:"Survey_No" 
        },
        {
            title:"เลขที่ดิน",
            dataIndex:"Land_No",
            key:"Land_No" 
        },
        {
            title:"ระวาง",
            dataIndex:["UTM_Code","UTM_Map","UTM_No"],
            key:"UTM_No" 
        },
        {
            title:"เนื้อที่ (ไร่-งาน-ตร.ว)",
            dataIndex:'RAI',
            key:"RAI",
            render:(t,r)=><p style={{textAlign:'center'}}>{`${r.RAI}-${r.GNAN}-${r.WA}`}</p> 
        },
        {
            title:"ราคาประเมิน (บาท/ตร.ว)",
            dataIndex:"Price",
            key:"Price" ,
            render:(t,r)=><p style={{textAlign:'center'}}>{t}</p> 

        },
        {
            title:"จัดการและการออกรายงาน",
            dataIndex:"action",
            key:"action" ,
            render:(text,record,i) =>(
                <Space>
                    <Button onClick={()=>detail_land(record.code_land)}>ดูรายละเอียด</Button>
                </Space>
            )
        }
    ]
    
    return (
        <div>

            <Table columns={colums} dataSource={Array.isArray(props.lands)&&props.lands}
                bordered={true}
                rowKey={(record)=>{
                    if (!record.__uniqueId)
                record.__uniqueId = ++uniqueId;
                return record.__uniqueId;
                }}
            />
            
        </div>
    )
}

export default LandList
