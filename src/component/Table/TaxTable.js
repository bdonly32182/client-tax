import React from 'react'
import {Table,Button} from 'antd'
import {EditFilled} from '@ant-design/icons'
import {useHistory} from 'react-router-dom'
function TaxTable(props) {
    let uniqueId=0;
    const history = useHistory();
    const {Column,ColumnGroup} = Table
        return (
            <div>
               
                <Table  dataSource={Array.isArray(props.tax)&&props.tax}
                rowKey={(record)=>{
                    if (!record.__uniqueId)
                record.__uniqueId = ++uniqueId;
                return record.__uniqueId;
                }}
                bordered={true}
                pagination={{pageSize:props.size}}
                onChange={props.HandleChangePage}
                >
                <Column 
                title="รหัสผู้เสียภาษีประจำเขต"
                dataIndex="uid_tax"
                key="uid_tax"
                render={text=><p>{text}</p>}
                />
                <Column 
                
                    title="รหัสผู้เสียภาษี"
                    dataIndex="Tax_ID"
                    key="Tax_ID"
                    render={text=><p>{text}</p>}
                />
                <Column
                title="ประเภท"
                dataIndex="Category_Tax"
                key="Category_Tax"
                render={text=><p>{text}</p>}
                 />
                 <ColumnGroup title="ครอบครอง" >
                    <Column
                    title="สมาชิก"
                    dataIndex="countCustomer"
                    key="countCustomer"
                    />
                        <Column
                    title="ที่ดิน"
                    dataIndex="countLand"
                    key="countLand"
                    />
                        <Column
                    title="สิ่งปลูกสร้าง"
                    dataIndex="countBuild"
                    key="countBuild"
                    />
                        <Column
                    title="ห้องชุด"
                    dataIndex="countRoom"
                    key="countRoom"
                    />
                 </ColumnGroup>
                <Column 
                 title="จัดการ"
                 render={(text,record)=><Button onClick={()=>history.push(`/tax/${record.uid_tax}`)} style={{backgroundColor:'whitesmoke'}}><EditFilled /></Button>}
                />
                </Table>
            </div>
        );
    }


export default TaxTable


