import React from 'react'
import {Table,Button} from 'antd'
import {useHistory} from 'react-router-dom'
function CustomerTable(props) {
    let uniqueId =0;
    const history =useHistory()
    const  handleTableChange = (page, filters, sorter) => {
        console.log(page);
      };
    const editCustomer = (id_customer)=>{
        history.push('/customer/'+id_customer)
    }
    const column =[
        {
            title:"รหัสบัตรประชาชน",
            dataIndex:"Cus_No",
            key:"Cus_No",
            render:text=><a>{text}</a>
        },
        {
            title:"ชื่อ-นามสกุล",
            dataIndex:"Cus_Fname",
            key:"Cus_Fname",
            render:(text,record)=><p>{`${record.title} ${text} ${record.Cus_Lname}`}</p>
        },
        {
            title:"ที่อยู่",
            dataIndex:"Num_House",
            key:"Num_House" ,
            render:(text,record)=><p>{`${text} ${record.Moo} ${record.Road_Name} ${record.Soi} 
            ${record.Tambol} ${record.district_name} ${record.Changwat} ${record.Post_No}`}</p>
        },
        {
            title:"เบอร์ติดต่อ",
            dataIndex:"Phone_no",
            key:"Phone_no"
        },
        {
            title:"จัดการ",
            dataIndex:"action",
            render:(text,record)=>
                <>
                <Button onClick={()=>editCustomer(record.id_customer)}>ดูรายละเอียด</Button>
                <Button>ลบ</Button>
                </>
            
        }
    ]
    return (
        <Table columns={column} dataSource={props.customer}
              
                rowKey={(record)=>{
                    if (!record.__uniqueId)
                record.__uniqueId = ++uniqueId;
                return record.__uniqueId;
                }}
                onChange={handleTableChange}
        ></Table>
    )
}

export default CustomerTable
