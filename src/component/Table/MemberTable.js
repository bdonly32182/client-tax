import React from 'react'
import { Table, Space, Button } from 'antd';
function MemberTable(props) {
    let uniqueId = 0;
    const colums =[
        {
            title:"รหัสบัตรประชาชน",
            dataIndex:"Pers_no",
            key:"Pers_no",
            render:text=><a>{text}</a>
        },
        {
            title:"ชื่อ",
            dataIndex:"Fname",
            key:"Fname"
        },
        {
            title:"นามสกุล",
            dataIndex:"Lname",
            key:"Lname" 
        },
        {
            title:"เขต/อำเภอ",
            dataIndex:"distict_member_id",
            key:"distict_member_id" 
        },
        {
            title:"ตำแหน่ง",
            dataIndex:"role_name",
            key:"role_name" 
        },
        {
            title:"กระทำการ",
            dataIndex:"id",
            key:"id" ,
            render:(text,record) =>(
                <Space>
                    <Button type="primary" onClick={()=>props.onConfirm(record)}>ยืนยัน</Button>
                    <Button type="danger" onClick={()=> props.onDelete(record.id)}>ลบ</Button>
    
                </Space>
            )
        }
    ]
    return (
        <div>
            {/* {props.memberlist.length >0&& */}
            <Table columns={colums} dataSource={props.employee} 
            rowKey={(record)=>{
                if (!record.__uniqueId)
            record.__uniqueId = ++uniqueId;
             return record.__uniqueId;
            }}
            ></Table>
            {/* // }            */}
        </div>
    )
}

export default (MemberTable)
