import React,{useState} from 'react'
import { Form, Input, Button, Row ,Col, Divider,Select,Upload,Image} from 'antd'
import {districtname} from '../../Select/data'
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {user_register} from '../../../store/action/UserAction'
function Register(props) {
    const dispatch = useDispatch();
    const [picture,setPicture] = useState(null);
    const [imagePreview,setImagePreview] = useState(null)
    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };
      const tailLayout = {
        wrapperCol: {
          offset: 14,
          span: 16,
        },
      };
      const onFinish = (values) => {
        
        dispatch(user_register(values,picture))
        };
      const propsUpload ={
          beforeUpload:file=>{
            const reader = new FileReader();
            reader.onload =()=>{
              setPicture(file);
              setImagePreview(reader.result)
            }
            reader.readAsDataURL(file)
            return false
          }
        }
      
    return (
        <div>
         <Divider></Divider>
         <Row gutter={{xs:8,sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={6}>
              <div style={{padding:'80px'}}>
                <Upload {...propsUpload}>
                  <Image  
                  style={{borderRadius:' 50%'}}
                  src={imagePreview||"/profile.png"} width={345}preview={false} alt="user_profile"/>
                  
                </Upload>
                   
              </div>
             
            </Col>
            <Col className="gutter-row" span={12}>
              <div style={{paddingTop:'80px'}}>
                  <Form
                      {...layout}
                      initialValues={{ 
                          remember: true ,
                          distict_member_id:"01",
                          role_name:'employee'
                      }}
                      onFinish={onFinish}
                    >
                      <Form.Item
                        label="รหัสบัตรประชาชน"
                        name="Pers_no"
                        rules={[{ required: true, message: 'กรุณากรอกบัตรประชาชนของท่าน!' },
                        ({getFieldValue})=>({
                          validator(_, value) {
                              if (value.length !== 13) {
                                return Promise.reject('กรุณากรอกบัตรประชาชน 13 หลัก!');
                                
                              }
                                return Promise.resolve();
                              
                            },
                      })
                      ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                      label="คำนำหน้า"      
                      name="TitleEmp"
                      rules={[{required:true,message:"กรุณากรอกคำนำหน้าของท่าน"}]}
                      >
                          <Input />
                      </Form.Item>
                      <Form.Item
                      label="ชื่อ"      
                      name="Fname"
                      rules={[{required:true,message:"กรุณากรอกชื่อของท่าน"}]}
                      >
                          <Input />
                      </Form.Item>
                      <Form.Item
                      label="นามสกุล"
                      name="Lname"
                      rules={[{required:true,message:"กรุณากรอกนามสกุลของท่าน"}]}

                      >
                          <Input />
                      </Form.Item>
                      

                      <Form.Item
                        label="รหัสผ่าน"
                        name="password"
                        rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าของท่าน!' }]}
                        hasFeedback
                      >
                        <Input.Password />
                      </Form.Item>
                      <Form.Item
                        label="ยืนยันรหัสผ่าน"
                        name="confirn-password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[{ required: true, message: 'กรุณายืนยันรหัสผ่าน!' },
                          ({getFieldValue})=>({
                              validator(_, value) {
                                  if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject('รหัสผ่านไม่ตรงกัน!');
                                },
                          })
                      ]}   
                      >
                        <Input.Password />
                      </Form.Item>
                      <Form.Item
                      label="เขต/อำเภอ"
                      name="distict_member_id"
                      >
                          <Select
                          style={{ width: 200 }}
                          placeholder="เลือกเขตที่ท่านบรรจุ"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }>
                              {districtname&&districtname.map(district=>
                              <Select.Option value={district.no} >{district.name}</Select.Option>)
                              }
                              
                              
                          </Select>
                      </Form.Item>
                      <Form.Item label="ตำแหน่ง" name="role_name">
                          <Select
                          style={{ width: 200 }}
                          placeholder="เลือกตำแหน่งของท่าน"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                          >
                              <Select.Option value="leader" >หัวหน้าฝ่ายรายได้</Select.Option>
                              <Select.Option value="employee" >พนักงานฝ่ายรายได้</Select.Option>
                          </Select>    
                      </Form.Item>
                      
                      <Form.Item label="รหัสประจำตำแหน่ง" name="TableNo"
                       rules={[{ required: true, message: 'กรุณากรอกรหัสประจำโต๊ะ!' }]}
                      >
                             <Input type="number"/>
                      </Form.Item>
                      <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                          สมัครสมาชิก
                        </Button>
                      </Form.Item>
                  </Form>
                  
              </div>
                
            </Col>
            
         </Row>
         <Row gutter={{xs:8,sm: 16, md: 24, lg: 32 }}>
         <Col className="gutter-row" span={12}>
            </Col>
             <Col className="gutter-row" span={12}>
                <Link style={{marginLeft:40}} to="/login"><b>กลับสู่หน้าล็อกอิน</b></Link>
            </Col>
         </Row>
        </div>
    )
}

export default Register
