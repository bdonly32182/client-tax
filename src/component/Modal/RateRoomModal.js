import React,{useState} from 'react'
import {Modal,Button, Divider, Input,Select,Space,Form,notification} from 'antd'
import {PlusOutlined,MinusCircleOutlined} from '@ant-design/icons'
import {useDispatch} from 'react-redux'
import {UpgrateSelect} from '../../store/action/RoomAction'
function RateRoomModal({titleButton,Mark,selectRows,condoID}) {
    let dispatch = useDispatch();
    const [visible,setVisible] = useState(false);
    const [category,setCategory] = useState('อยู่อาศัย');
    const [price, setPrice] = useState('');
    const {Option} = Select ;
    const [form] = Form.useForm();
    const onOk = () => {
        titleButton ==="อัพเดทราคาประเมินห้องชุดที่เลือก"&&upgradePrice();
        titleButton==="อัพเดทการใช้ประโยชน์ห้องชุดที่เลือก"&&upgradeCategory();
        titleButton==="อัพเดทราคาประเมิน ประเภท และพื้นที่ห้องชุดที่เลือก(ขั้นสูง)"&&upgradeAll();
        setVisible(false);
    }
    const upgradePrice = () => {
        let mapRoomID = selectRows.map(room=>room.id)
        let body ={
            Price_Room:price,
            rooms:mapRoomID
        }
        dispatch(UpgrateSelect(body,condoID))
        
    }
    const upgradeCategory =()=>{
        let mapRoomID = selectRows.map(room=>room.id)
        let body ={
            Category_use:category,
            rooms:mapRoomID
        }
        dispatch(UpgrateSelect(body,condoID))

    }
    const upgradeAll = () => {
        form.validateFields().then((values) => {
            let mapRoomID = selectRows.map(room=>room.id)
            let body ={
                ...values.Useful_rooms[0],
                rooms:mapRoomID
            }
            dispatch(UpgrateSelect(body,condoID))

        }).catch((err) => {
            notification.error({message:''})
        });
    }
    return (
        <div>
            <Button style={{borderRadius:'5px',color:'#238587'}} 
            onClick={()=>setVisible(true)}
            disabled={selectRows.length>0?false:true}
            >{titleButton}
            </Button>
            <Modal visible={visible}
                onCancel={()=>setVisible(false)}
                title={titleButton}
                onOk={onOk}
            >
                <p style={{color:'#28E0E3'}}>{`จำนวนเลยการห้องชุดที่เลือกอยู่ ${selectRows.length} รายการ`}</p>
                {titleButton ==="อัพเดทราคาประเมินห้องชุดที่เลือก"&&
                <Input placeholder="กรอกราคาประเมิน" onChange={(e)=>setPrice(e.target.value)}/>
                }
                {titleButton==="อัพเดทการใช้ประโยชน์ห้องชุดที่เลือก"&&
                    <Select placeholder="เลือกประเภทการใช้"
                    defaultValue="อยู่อาศัย" onChange={(value)=>setCategory(value)}
                    style={{width:'100%'}}
                    >
                    <Option value="อยู่อาศัย">อยู่อาศัย</Option>
                    <Option value="อื่นๆ">อื่นๆ</Option>
                    <Option value="ว่างเปล่า">ว่างเปล่า</Option>
                    </Select>
                }
                {titleButton==="อัพเดทราคาประเมิน ประเภท และพื้นที่ห้องชุดที่เลือก(ขั้นสูง)"&&
                <Form form={form}>
                            <Form.List name="Useful_rooms">
                        {(fields, { add, remove }) => (
                            <>
                            {fields.map(field => (
                                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                    {...field}
                                    name={[field.name, 'Category_use']}
                                    fieldKey={[field.fieldKey, 'Category_use']}
                                >
                                    <Select placeholder="เลือกประเภทการใช้"
                                    // defaultValue="อยู่อาศัย"
                                    >
                                    <Option value="อยู่อาศัย">อยู่อาศัย</Option>
                                    <Option value="อื่นๆ">อื่นๆ</Option>
                                    <Option value="ว่างเปล่า">ว่างเปล่า</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    {...field}
                                    name={[field.name, 'Category_place']}
                                    fieldKey={[field.fieldKey, 'Category_place']}
                                    rules={[{ required: true, message: 'กรุณากรอกประเภทพื้นที่' }]}
                                >
                                    <Input placeholder="ประเภทการใช้พื้นที่" />
                                </Form.Item>
                                <Form.Item
                                    {...field}
                                    name={[field.name, 'Price_Room']}
                                    fieldKey={[field.fieldKey, 'Price_Room']}
                                    rules={[{ required: true, message: 'กรุณากรอกราคาประเมิน' }]}
                                >
                                    <Input placeholder="ราคาประเมิน(บาท/ตร.ม)" />
                                </Form.Item>
                                <Form.Item
                                    {...field}
                                    name={[field.name, 'Amount_Place']}
                                    fieldKey={[field.fieldKey, 'Amount_Place']}
                                    rules={[{ required: true, message: 'กรุณากรอกจำนวนพื้นที่' }]}
                                >
                                    <Input placeholder="จำนวนพื้นที่(ตร.ม)" />
                                </Form.Item>
                                
                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                                
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                กำหนดพื้นที่ด้วยตนเอง
                                </Button>
                            </Form.Item>
                            </>
                        )}
                        </Form.List>
                </Form>
                }
                <Divider />
                <u>หมายเหตุ</u>
                {Mark.map((mark,i)=><p key={mark} style={i%2===0?{color:'red'}:{color:'blue'}}>{mark}</p>)}
            </Modal>
        </div>
    )
}

export default RateRoomModal
