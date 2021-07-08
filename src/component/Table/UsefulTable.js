import React from 'react';
import {Table,Space,Popconfirm,Button} from 'antd';
import { EditFilled,DeleteFilled,CheckOutlined,QuestionCircleOutlined} from'@ant-design/icons';
import {useDispatch} from 'react-redux'
import UsefulModal from '../Modal/UsefulModal';
import {delete_usefulland} from '../../store/action/UsefulLandAction'
function UsefulTable({ListUseful,PriceLand}) {
    let uniqueId = 0;
    const dispatch = useDispatch();
    const {Column,ColumnGroup} = Table;
    const onConfirm = useful => {
        // useful_id Land_id
        dispatch(delete_usefulland(useful.useful_id,useful.Land_id));
    }
    return (
        <>
            <Table size="small" dataSource={ListUseful&&[ListUseful]} bordered={true} pagination={false}
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
                <ColumnGroup title="เนื้อที่ใช้ประโยชน์" responsive= {['md']}>
                <Column title="ไร่" dataIndex="Useful_RAI"/>
                <Column title="งาน" dataIndex="Useful_GNAN"/>
                <Column title="วา" dataIndex="Useful_WA"/>

                </ColumnGroup>
                <Column title="การจัดการ"
                dataIndex="action"
                key="action"
                responsive= {['md']}
                render= {(text,record)=>(
                    <>
                    <Space>
                    <UsefulModal button={<EditFilled />} type="link" usefulTable ={record} onEdit={true} PriceLand={PriceLand}/>
                    <Popconfirm title="เมื่อคุณลบการใช้ประโยชน์ที่ดิน สิ่งปลูกสร้างจะถูกลบไปด้วย ยืนยันที่จะลบหรือไม่"
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    onConfirm={()=>onConfirm(record)}
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
