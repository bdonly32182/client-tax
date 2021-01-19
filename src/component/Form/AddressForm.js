import React from 'react'
import {Form,Input,Col,Button} from 'antd'
function AddressForm(props) {
    const tailLayout = {
        wrapperCol: {
          offset: 3,
          span: 16,
        },
      };
    return (
        <Form     
        form={props.form}   
        wrapperCol={{offset:3}}
        
        >
             <Form.Item>
                      <Input.Group compact>
                        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                         
                            <Form.Item
                                label="บ้านเลขที่"
                                name="num_House"
                                rules={[{ required: true, message: 'กรุณากรอกบ้านเลขที่!' }]}
                              >
                                <Input />
                              </Form.Item>
                        </Col>
                        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                             <Form.Item
                              label="หมู่"
                              name="moo"
                            >
                              <Input />
                            </Form.Item> 
                        </Col>
                         <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                          <Form.Item
                              label="ถนน"
                              name="road_Name"
                            >
                              <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                            <Form.Item
                              label="ซอย"
                              name="soi"
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
                              name="tambol"
                              rules={[{ required: true, message: 'กรุณากรอกชื่อแขวง!' }]}
                            >
                              <Input />
                            </Form.Item> 
                        </Col>
                        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                            <Form.Item
                              label="เขต/อำเภอ"
                              name="District_name"
                              rules={[{ required: true, message: 'กรุณากรอกชื่อเขต!' }]}
                            >
                              <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                                <Form.Item
                                label="จังหวัด"
                                name="changwat"
                                rules={[{ required: true, message: 'กรุณากรอกจังหวัด!' }]}
                                >
                                <Input />
                                </Form.Item>
                            </Col>
                            <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                                <Form.Item
                                label="รหัสไปรษณีย์"
                                name="post_No"
                                rules={[{ required: true, message: 'กรุณากรอกรหัสไปรษณีย์!' }]}
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
                                label="เบอร์ติดต่อ"
                                name="phone_no"
                                rules={[{ required: true, message: 'กรุณากรอกเบอร์ติดต่อ!' }]}
                              >
                                <Input />
                              </Form.Item>
                        </Col>
                        </Input.Group>
                        <Form.Item {...tailLayout}>
                            <Button htmlType="submit" style={{backgroundColor:'#EDC224'}}>    
                                ยืนยันที่อยู่ใหม่
                            </Button>
                        </Form.Item>
                    </Form.Item>
                    
        </Form>
    )
}

export default AddressForm
