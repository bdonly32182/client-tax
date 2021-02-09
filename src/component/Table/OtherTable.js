import React,{useState} from 'react'
import {Table,Modal,Space,Popconfirm,Button,Form,notification} from 'antd'
import {EditTwoTone,DeleteOutlined,QuestionCircleOutlined} from '@ant-design/icons'
import OtherForm from '../Form/OtherForm'
import axios from '../../config/axios'
import {FETCH_USEFUL_LAND} from '../../store/action/ActionType'
import {useDispatch} from 'react-redux'
function OtherTable({OtherList,onDelete}) {
    const dispatch = useDispatch();
    const {Column,ColumnGroup} = Table;
    const [form] = Form.useForm();
    const [visible,setVisible] = useState(false);
    let uniqueId = 0 ;
    const onOk = (type)=> {
        form.validateFields().then((body) => {
            axios.put(`/api/other/${type.id}`,body).then((result) => {
                notification.success({message:'แก้ไขสัดส่วนเรียบร้อยแล้ว'})
                axios.get(`/api/read/usefuls?useful_id=${type.Useful_other.Useful_other_ID}`).then((result) => {
                    dispatch({type:FETCH_USEFUL_LAND,payload:result.data})
    
                }).catch((err) => {
                    notification.error({message:'การเรียกดูข้อมูลการใช้ประโยชน์ของที่ดินล้มเหลว'})
                });
            }).catch((err) => {
                
            });
        }).catch((err) => {
            
        });
        setVisible(false);
    }
    return (
        <div>
            <Table dataSource={Array.isArray(OtherList)&&OtherList}
                rowKey={(record)=>{
                    if (!record.__uniqueId)
                record.__uniqueId = ++uniqueId;
                return record.__uniqueId;
                }}
                size="middle"
                pagination={{pageSize:5}}
                >
                <ColumnGroup title="สัดส่วนการใช้ประโยชน์อื่นๆ">
                    <Column title="ประเภท"dataIndex="Other_Type"/>
                    <Column title="ขนาด" dataIndex="Other_Size"/>
                    <Column title="เปอร์เซ็นต์" dataIndex="Percent_Other"/>
                    <Column title="บ้านเลขที่" render={(text,record)=>record.Building.No_House}/>
                    <Column title="จัดการ"
                    render={(text,record)=>
                    <Space>
                                <EditTwoTone onClick={()=>setVisible(true)}/>
                                <Modal
                                title="แก้ไขเปอร์เซ็นประเภทอื่นๆ"
                                 visible={visible}
                                 onCancel={()=>setVisible(false)}
                                 onOk={()=>onOk(record)}
                                >
                                <OtherForm other={record} formOther={form}/>
                                </Modal>
                                <Popconfirm title="คุณต้องการลบใช่หรือไม่"
                                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                onConfirm={()=>onDelete(record.Useful_other.Other_ID,record.Useful_other.Useful_other_ID)}
                                >
                                    <Button type="link">
                                    <DeleteOutlined style={{color:'red'}}/>
                                    </Button>
                                </Popconfirm>
                    </Space>}
                    />
                </ColumnGroup>
            </Table>
        </div>
    )
}

export default OtherTable
