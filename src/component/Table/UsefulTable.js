import React from 'react';
import {Table,Space,Spin,Popconfirm,Button} from 'antd';
import { EditFilled,DeleteFilled,CheckOutlined,QuestionCircleOutlined} from'@ant-design/icons';
import axios from '../../config/axios';
import UsefulModal from '../Modal/UsefulModal';
function UsefulTable(props) {
    let uniqueId = 0;
    const {Column,ColumnGroup} = Table;
    const onConfirm = id => {

    }
    return (
        <>
            <Table size="small" dataSource={props.ListUseful&&[props.ListUseful]} bordered={true} pagination={false}
                rowKey={(record)=>{
                    if (!record.__uniqueId)
                record.__uniqueId = ++uniqueId;
                return record.__uniqueId;
                }}
            >
                <ColumnGroup title="ลักษณะการใช้">
                    <Column title="ใช้เอง" 
                    render={(text,record) => record.Usage&&<CheckOutlined />}
                    />
                    <Column title="ให้เช่า"                    
                    render={(text,record) => !record.Usage&&<CheckOutlined />}
                    />
                </ColumnGroup>
                <Column title="เกษตร" 
                render={(text,record)=>record.TypeName ==='เกษตร'?<CheckOutlined />:null}
                />

                <Column title="อยู่อาศัย" 
                 render={(text,record)=>record.TypeName ==='อยู่อาศัย'?<CheckOutlined />:null}
               
                />
                <Column title="อื่นๆ"
                render={(text,record)=>record.TypeName ==='อื่นๆ'?<CheckOutlined />:null}
                />
                <Column title="ว่างเปล่า"
                   render={(text,record)=>record.TypeName ==='ว่างเปล่า'?<CheckOutlined />:null}
              
                />
                <Column title="หลายประเภท"
                 render={(text,record)=>record.TypeName ==='หลายประเภท'?<CheckOutlined />:null}
                
                />
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
                    <Space>
                    <UsefulModal button={<EditFilled />} type="link" usefulTable ={record} onEdit={true} />
                    <Popconfirm title="คุณต้องการลบใช่หรือไม่"
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    onConfirm={()=>onConfirm(record.Building.Build_Id)}
                    >
                        <Button type="link">
                            <DeleteFilled style={{ color: 'red' ,fontSize:15}}/>
                        </Button>
                    </Popconfirm>
                    </Space>
                   
                    </>
                )}
                />


            </Table> 
        
           
        </>
    )
}

export default UsefulTable
