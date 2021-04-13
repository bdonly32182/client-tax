import React,{useState,useEffect} from 'react'
import { Form, Input, Button, Space, Divider,Checkbox,Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined ,DeleteFilled } from '@ant-design/icons';
function RoomForm({formModal,room,onDelteUseful}) {
  const {Option} = Select;
  const [category,setCategory ] = useState("")
  const onChange =(value)=>{
    setCategory(value)
  }
  useEffect(() => {
    formModal.resetFields()
  }, [formModal,room])
    return (
 
        <Form 
        name="dynamic_form_nest_item" autoComplete="off"
        form ={formModal}
        initialValues={room?{...room}:{"LiveStatus":false,"UsageRoom":true}}
        >
         <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
          <Form.Item label="รหัสห้องชุด" name="id"
          >
              <Input placeholder="รหัสห้องชุด" disabled/>
          </Form.Item>  
          <Form.Item label="เลขที่ห้องชุด" name="Room_no"
          rules={[{ required: true, message: 'Missing เลขที่ห้องชุด' }]}
          >
              <Input placeholder="กรอกเลขที่ห้องชุด"/>
          </Form.Item>   
         </Space>
         <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
          <Form.Item label="ชั้นที่" name="Floor"
          rules={[{ required: true, message: 'Missing ชั้นที่' }]}
          >
              <Input placeholder="กรอกชั้น"/>
          </Form.Item>  
         </Space>
         <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
          <Form.Item label="กรณีอยู่อาศัย(หลักหลัง)" name="LiveStatus"
          valuePropName="checked"
          >
              <Checkbox />
          </Form.Item>  
         </Space>
         <Divider />
        
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
                    style={{width:100}}
                    onChange={onChange}
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
                  {category ==="ว่างเปล่า"||room?.Useful_rooms[field.name]?.Category_use ==="ว่างเปล่า"?
                      <Form.Item
                      {...field}
                      name={[field.name, 'StartYearEmpty']}
                      fieldKey={[field.fieldKey, 'StartYearEmpty']}
                      rules={[{ required: true, message: 'กรุณากรอกปีที่เริ่มว่างเปล่า' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || value>2400) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('กรุณากรอกเป็นปี พ.ศ.'));
                        },
                      })
                    ]}
                    >
                      <Input placeholder="ปีที่เริ่มว่างเปล่า" />
                    </Form.Item>
                    :null
                  }
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
                  {room?
                  <DeleteFilled style={{color:'red'}} onClick={()=>onDelteUseful(remove(field.name),field.key)}/>
                  :
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                  }
                  
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
        <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
          <Form.Item label="ปีที่สร้าง" name="AgeRoom"
          rules={[{ required: true, message: 'Missing ปีที่สร้าง' }]}
          >
              <Input placeholder="กรอก พ.ศ.ที่สร้างห้อง"/>
          </Form.Item>  
          <Form.Item label="การให้เช่า" name="UsageRoom"
          >
            <Select placeholder="การใช้เช่า"
                    >
                      <Option value={true}>ใช้เอง</Option>
                      <Option value={false}>ให้เช่า</Option>
            </Select>
          </Form.Item>   
        </Space>
        <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
          <Form.Item label="หมายเหตุ" name="mark">
              <Input placeholder=""/>
          </Form.Item>    
         </Space>
        {/* <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item> */}
      </Form>
  
    )
}

export default RoomForm
