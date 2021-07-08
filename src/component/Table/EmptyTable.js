import React,{useState} from 'react'
import {Table,Modal,Space,Popconfirm,Button,Form,notification} from 'antd'
import {EditTwoTone,DeleteOutlined,QuestionCircleOutlined} from '@ant-design/icons'
import EmptyForm from '../Form/EmptyForm'
import axios from '../../config/axios'
import {FETCH_USEFUL_LAND} from '../../store/action/ActionType'
import {useDispatch} from 'react-redux'
import NextoModal from '../Modal/NextoModal'

function EmptyTable({EmptyList,onDelete,isAccross,tax_id,useful_id}) {
    const dispatch = useDispatch();
    const {Column,ColumnGroup} = Table;
    const [form] = Form.useForm();
    const [visible,setVisible] = useState(false);
    let uniqueId = 0 ;
    const onOk = (type)=> {
        form.validateFields().then((body) => {
            axios.put(`/api/empty/${type.id}?usefulId=${type.Useful_empty.Useful_empty_ID}`,body).then((result) => {
                notification.success({message:'แก้ไขสัดส่วนเรียบร้อยแล้ว'})
                axios.get(`/api/read/usefuls?useful_id=${type.Useful_empty.Useful_empty_ID}`).then((result) => {
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
            <Table dataSource={Array.isArray(EmptyList)&&EmptyList}
                rowKey={(record)=>{
                    if (!record.__uniqueId)
                record.__uniqueId = ++uniqueId;
                return record.__uniqueId;
                }}
                size="middle"
                pagination={{pageSize:5}}
                >
                <ColumnGroup title="สัดส่วนการใช้ประโยชน์ที่ว่างเปล่า">
                    <Column title="ประเภท"dataIndex="Empty_Type"/>
                    <Column title="ขนาด" dataIndex="Empty_Size"/>
                    <Column title="เปอร์เซ็นต์" dataIndex="Percent_Empty"/>
                    <Column title="บ้านเลขที่" render={(text,record)=>record.Building.No_House}/>
                    <Column title="จัดการ"
                    render={(text,record)=>
                    <Space>
                                <EditTwoTone onClick={()=>setVisible(true)}/>
                                <Modal
                                title="แก้ไขเปอร์เซ็นประเภทว่างเปล่า"
                                 visible={visible}
                                 onCancel={()=>setVisible(false)}
                                 onOk={()=>onOk(record)}
                                >
                                <EmptyForm formEmpty={form} Empty={record}/>
                                </Modal>
                                <Popconfirm title="คุณต้องการลบใช่หรือไม่"
                                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                onConfirm={()=>onDelete(record.Useful_empty.Empty_ID,record.Useful_empty.Useful_empty_ID)}
                                >
                                    <Button type="link">
                                    <DeleteOutlined style={{color:'red'}}/>
                                    </Button>
                                </Popconfirm>
                                {isAccross &&
                                    <NextoModal tax_id={tax_id} useful_id={useful_id} TypeName="ว่างเปล่า" isAccross={isAccross}/>
                                }
                    </Space>}
                    />
                </ColumnGroup>
            </Table>
        </div>
    )
}

export default EmptyTable
