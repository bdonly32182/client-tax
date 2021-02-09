import React from 'react'
import { Space, Table,Button} from 'antd'
import {CheckOutlined,DeleteFilled,EditFilled} from '@ant-design/icons'

function BuildInTaxTable(props) {
    const {Column,ColumnGroup} = Table
    let uniqueId = 0 ;
    return (
        <div>
            {props.isEdit&&
                <h3>{`รายการที่เป็นเจ้าของสิ่งปลูกสร้าง (${props.building&&props.building.length})`}</h3>
            }
            <Table dataSource={props.building} bordered={true} size="small" 
                    rowKey={(record)=>{
                        if (!record.__uniqueId)
                    record.__uniqueId = ++uniqueId;
                    return record.__uniqueId;
                    }}
            >
            <Column 
            title="บ้านเลขที่"
            dataIndex="No_House"
            key="No_House"
            render={(text,record)=><p>{`${record.No_House} `}</p>}
            />
            <Column 
            title="ประเภทสิ่งปลูกสร้าง(ตามกรมธนารักษ์)"
            dataIndex="RateOfBuilding"
            key="RateOfBuilding"
            render={(text,record)=><p>{record.RateOfBuilding.Category_build}</p>}
            />
            <ColumnGroup title="ลักษณะสิ่งปลูกสร้าง">
                <Column 
                title="ตึก"
                dataIndex="Category"
                key="tuk"
                render={(text,record)=><p>{record.Category ==="ตึก" ? <CheckOutlined />:null}</p>}
                />
                <Column 
                title="ไม้"
                dataIndex="Category"
                key="Category"
                render={(text,record)=><p>{record.Category ==="ไม้" ? <CheckOutlined />:null}</p>}
                />
                <Column 
                title="ครึ่งตึกครึ่งไม้"
                dataIndex="Category"
                key="half"
                render={(text,record)=><p>{record.Category ==="ครึ่งตึกครึ่งไม้" ? <CheckOutlined />:null}</p>}
                />
            </ColumnGroup>
            <ColumnGroup title="จำนวน">
                <Column title="ชั้น" dataIndex="Amount_Floor" key="Amount_Floor"/>
                <Column title="ห้อง" dataIndex="Amount_Room" key="Amount_Room"/>
            </ColumnGroup>
            <ColumnGroup title="ขนาด">
                <Column title="กว้าง" dataIndex="Width" key="Width"/>
                <Column title="ยาว" dataIndex="Length" key="Length"/>
            </ColumnGroup>
            <Column title="อายุ(ปี)"dataIndex="Age_Build" key="Age_Build"/>
            
            <Column title="หมายเหตุ" dataIndex="Mark" key="Mark"/>
            <Column title="จัดการ" dataIndex="action" key="action" 
            render={(text,record)=>(
                <Button ><EditFilled /></Button>
            )}
            />
        </Table>
        </div>
    )
}

export default BuildInTaxTable
