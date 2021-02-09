import React from 'react'
import {Button, Table,Popover, Divider,Row} from 'antd'
function UsefulTaxTable(props) {
    const {Column} = Table;
    let uniqueId = 0;
    const listCustomer = customers =>{
        return (
            <div style={{width:1500}}>
                {customers.map(customer=>(
                    <div>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{paddingInline:10}} align="middle">
                            <p>เลขบัตรประชาชน: <a >{customer.Cus_No}</a></p>  <p>  ประเภท : <a>{customer.category_Cus}</a></p>
                            <p>ชื่อ - นามสกุล <a>{`${customer.Cus_Fname} ${customer.Cus_Lname}`}</a></p> 
                            <Divider />  
                            
                        </Row>
            
                    </div>
            ))}
            </div>
        )
    }
    return (
        <Table dataSource={props.customers[0]&&props.customers[0].Tax_Groups}
                rowKey={(record)=>{
                    if (!record.__uniqueId)
                record.__uniqueId = ++uniqueId;
                return record.__uniqueId;
                }}
        >
            <Column title="รหัสผู้เสียภาษี" dataIndex="uid_tax" key="uid_tax"
            render={(text,record)=><>
                    <Popover content={listCustomer(record.Customers)} >
                        <a>{text}</a>
                    </Popover>
                </>}
            />
            <Column title="ประเภท" dataIndex="Category_Tax" key="Category_Tax"/>
            <Column title="เลือก" 
            render={(text,record)=><Button type="link" style={{backgroundColor:'#A6495A'}} onClick={()=>props.onSelectTax(record.uid_tax)}>เลือกรหัสผู้เสียภาษีนี้</Button>}
            />
        </Table>
    )
}

export default UsefulTaxTable
