import React,{useState} from 'react'
import {Table,Modal,Space,Popconfirm,Button,Form,notification} from 'antd'
import {EditTwoTone,DeleteOutlined,QuestionCircleOutlined} from '@ant-design/icons'
import FarmForm from '../Form/FarmForm'
import {useDispatch} from 'react-redux'
import axios from '../../config/axios'
import {FETCH_USEFUL_LAND} from '../../store/action/ActionType'
function FarmTable({FarmList,onDelete}) {
    const {Column,ColumnGroup} = Table;
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [visible,setVisible] = useState(false);
    let uniqueId = 0 ;
    const onOk = (type)=> {
        form.validateFields().then((body) => {
            axios.put(`/api/farm/${type.id}?usefulId=${type.Useful_farm.Useful_farm_ID}`,body).then((result) => {
                notification.success({message:'แก้ไขสัดส่วนเรียบร้อยแล้ว'})
                axios.get(`/api/read/usefuls?useful_id=${type.Useful_farm.Useful_farm_ID}`).then((result) => {
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
            <Table dataSource={Array.isArray(FarmList)&&FarmList}
                rowKey={(record)=>{
                    if (!record.__uniqueId)
                record.__uniqueId = ++uniqueId;
                return record.__uniqueId;
                }}
                pagination={{pageSize:5}}
                size="middle"
                >
                <ColumnGroup title="สัดส่วนการใช้ประโยชน์การเกษตร">
                    <Column title="ประเภท"dataIndex="Farm_Type"/>
                    <Column title="ขนาด" dataIndex="Farm_Size"/>
                    <Column title="เปอร์เซ็นต์" dataIndex="Percent_Farm"/>
                    <Column title="บ้านเลขที่" render={(text,record)=>record.Building.No_House}/>
                    <Column title="จัดการ"
                    render={(text,record)=>
                    <Space>
                                <EditTwoTone onClick={()=>setVisible(true)}/>
                                <Modal
                                title="แก้ไขเปอร์เซ็นประเภทการเกษตร"
                                 visible={visible}
                                 onCancel={()=>setVisible(false)}
                                 onOk={()=>onOk(record)}

                                >
                                <FarmForm formFarm={form} Farm={record}/>
                                </Modal>
                                <Popconfirm title="คุณต้องการลบใช่หรือไม่"
                                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                onConfirm={()=>onDelete(record.Useful_farm.Farm_ID,record.Useful_farm.Useful_farm_ID)}
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

export default FarmTable
