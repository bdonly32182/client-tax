import React,{useState,useEffect} from 'react'
import { Form, Input, Button, Col,Select , Modal, notification } from 'antd';
import {category_customer,title_customer} from '../Select/data'
import axios from 'axios';

  const tailLayout = {
    wrapperCol: {
      offset: 3,
      span: 16,
    },
  };
function CustomerForm(props) {
    const [form] = Form.useForm();
    const [title,setTitle] = useState(title_customer[category_customer[0]])
    const [secondTitle, setSecondTitle] = useState(title_customer[category_customer[0]][0])
    const [visible,setVisible] = useState(false);
    const [persdistrict,setPersDistrict] = useState('');
    useEffect(()=>{
      props.customer&& form?.setFieldsValue(props.customer)
      props.formModal&& props?.formModal?.resetFields();
    },[props.customer,form,props.formModal])
    const onFinish = (values) => { 
   props.onEdit(values.id_customer,values)
  };
  const onChangeCate =(value)=>{
    setTitle(title_customer[value])
    setSecondTitle(title_customer[value][0])
   
  }
  const onChangeTitle =(value) =>{
     setSecondTitle(value)
  }
  const onEditTax = ()=>{
    const {id_customer} = props.customer
    let body = {
      BeforeNumber:id_customer,
      AfterNumber:persdistrict
    }
    console.log(body);
    axios.post('/api/edit/persno',body).then((result) => {
      notification.success({message:'แก้ไขรหัสประจำเขตเรียบร้อยแล้ว'})
    }).catch((err) => {
      notification.error({message:"แก้ไขรหัสประจำเขตล้มเหลว"})
    });
  }
    return (
        <Form
        //props.formModal คือส่งค่าฟอร์มมาจาก โมดอล CustomerModal.js
                form={props.formModal||form}
                    wrapperCol={{offset:3}}
                    
                    onFinish={onFinish}    
                    style={{borderBlockColor:"ActiveBorder",border:"groove"}}
                
                  >
                    <Form.Item>
                      <Input.Group compact>
                        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                              <Form.Item
                                label="ประเภทเจ้าของทรัพย์สิน"
                                name="category_Cus"
                                rules={[{ required: true, message: 'กรุณากรอกประเภทเจ้าของทรัพย์สิน !' }]}
                                >
                                <Select placeholder="เลือกประเภทเจ้าของทรัพย์สิน" onChange={onChangeCate}
                                style={{width:120}} virtual={false}
                                >
                                            {category_customer.map(category=>(
                                                <Select.Option value={category} key={category}>{category}</Select.Option>
                                            ))}
                                            
                                        </Select>
                            </Form.Item>
                        </Col>
                      </Input.Group>
                    </Form.Item>
                    <Form.Item>
                      <Input.Group compact>
                        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                            <Form.Item
                              label="คำนำหน้า"
                              name="title"
                              
                              rules={[{ required: true, message: 'กรุณากรอกคำนำหน้า!' }]}
                            >
                              <Select placeholder="เลือกคำนำหน้า" value={secondTitle} onChange={onChangeTitle}
                              style={{width:300}} virtual={false}
                              >
                                            {title.map(title=>(
                                                <Select.Option value={title} key={title}>{title}</Select.Option>
                                            ))}
                                            
                              </Select>
                            </Form.Item>
                        </Col>
                        
                      </Input.Group>
                    </Form.Item>
                    <Form.Item>
                      <Input.Group compact>
                        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                              <Form.Item
                                label="ชื่อ"
                                name="Cus_Fname"
                                rules={[{ required: true, message: 'กรุณากรอกชื่อ!' }]}
                              >
                                <Input />
                              </Form.Item>
                        </Col>
                        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                               <Form.Item
                                label="นามสกุล "
                                name="Cus_Lname"
                
                              >
                                <Input />
                              </Form.Item>
                        </Col>
                      </Input.Group>
                    </Form.Item>
                     <Form.Item>
                       <Input.Group compact>
                       <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                        <Form.Item
                                  label="รหัสบัตรประชาชน "
                                  name="Cus_No"
                                  rules={[{ required: true, message: 'กรุณากรอกรหัสบัตรประชาชน!' },
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
                          {props.onEdit&&<Form.Item
                            label="รหัสประจำเขต"
                            name="id_customer"
                              >
                              <Input disabled={true}/>
                            </Form.Item>}
                       </Col>
                       </Input.Group>
                    </Form.Item>                         
                    <Form.Item>
                      <Input.Group compact>
                        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                            <Form.Item
                                label="บ้านเลขที่"
                                name="Num_House"
                                // rules={[{ required: true, message: 'กรุณากรอกบ้านเลขที่!' }]}
                              >
                                <Input />
                              </Form.Item>
                        </Col>
                        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                             <Form.Item
                              label="หมู่"
                              name="Moo"
                            >
                              <Input />
                            </Form.Item> 
                        </Col>
                        
                      </Input.Group>
                    </Form.Item>

                    <Form.Item>
                      <Input.Group compact>
                        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                          <Form.Item
                              label="ถนน"
                              name="Road_Name"
                            >
                              <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                            <Form.Item
                              label="ซอย"
                              name="Soi"
                            >
                              <Input />
                            </Form.Item>
                        </Col>
                        
                      </Input.Group>
                    </Form.Item>
                     <Form.Item>
                       <Input.Group compact>
                            <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                              <Form.Item
                                  label="ตำบล/แขวง"
                                  name="Tambol"
                                  rules={[{ required: true, message: 'กรุณากรอกแขวง!' }]}
                                >
                                  <Input />
                                </Form.Item> 
                            </Col>
                            <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                                <Form.Item
                                  label="เขต/อำเภอ"
                                  name="district_name"
                                  rules={[{ required: true, message: 'กรุณากรอกชื่อเขต!' }]}
                                >
                                  <Input />
                                </Form.Item>
                            </Col>
                       </Input.Group>
                     </Form.Item>                         
                    <Form.Item>
                      <Input.Group compact>
                        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                            <Form.Item
                              label="จังหวัด"
                              name="Changwat"
                              rules={[{ required: true, message: 'กรุณากรอกจังหวัด!' }]}
                            >
                              <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                            <Form.Item
                              label="รหัสไปรษณีย์"
                              name="Post_No"
                              rules={[{ required: true, message: 'กรุณากรอกรหัสไปรษณีย์!' }]}
                            >
                              <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                              <Form.Item
                                label="เบอร์ติดต่อ"
                                name="Phone_no"
                                // rules={[{ required: true, message: 'กรุณากรอกชื่อเขต!' }]}
                              >
                                <Input />
                              </Form.Item>
                        </Col>
                      </Input.Group>
                    </Form.Item>

                    <Form.Item>
                      <Input.Group compact>
                        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                            <Form.Item
                              label="ค่าภาษีบำรุงท้องที่ ปี 2562"
                              name="Land_years"
                              rules={[{ required: true, message: 'กรุณากรอกชื่อเขต!' }]}
                            >
                              <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                            <Form.Item
                              label="ค่าภาษีโรงเรือนและที่ดิน ปี 2562"
                              name="Build_years"
                              rules={[{ required: true, message: 'กรุณากรอกชื่อเขต!' }]}
                            >
                              <Input />
                            </Form.Item>
                        </Col>
                      </Input.Group>
                    </Form.Item>
                    
                    {props.button &&                          
                    <Form.Item {...tailLayout}>
                      <Button htmlType="submit" style={{backgroundColor:'#EDC224'}}>    
                        {props.button}
                      </Button>
                      <Button style={{backgroundColor:'red',color:'whitesmoke'}} onClick={()=>props.onDelete(props.customer.id_customer)}>ลบข้อมูลประชาชน</Button>
                      {props.onEdit &&
                      <>
                        <Button style={{backgroundColor:'#344fa1',color:'whitesmoke'}} onClick={()=>setVisible(true)}>แก้ไขรหัสผู้เสียภาษีประจำเขต</Button>
                        <Modal visible={visible} title="แก้ไขรหัสผู้เสียภาษีประจำเขต"
                        onCancel={()=>setVisible(false)}
                        onOk={onEditTax}
                        >
                            <Input onChange={(e)=>setPersDistrict(e.target.value)}/>
                        </Modal> 
                      </>
                      }
                    </Form.Item>
                      
                  }
                </Form>
    )
}

export default CustomerForm
