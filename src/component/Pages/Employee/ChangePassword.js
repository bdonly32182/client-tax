import React from 'react'
import {Form, Input,Row,Col,Button} from 'antd'
function ChangePassword(props) {
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
      const onFinish =(value)=>{
          props.onSubmit(value)
      }
    return (
        <Row gutter={{xs:8,sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={4}>
        </Col>
        <Col className="gutter-row" span={12}>
                <Form
                {...layout}
                onFinish={onFinish}
                >
                <Form.Item
                        label="รหัสผ่านเดิม"
                        name="passwordold"
                        rules={[{ required: true, message: 'กรุณากรอกรหัสผ่านเดิมของท่าน!' }]}
                        >
                        <Input.Password />
                </Form.Item>
                <Form.Item
                        label="รหัสผ่านใหม่"
                        name="password"
                        hasFeedback
                        rules={[{ required: true, message: 'กรุณากรอกรหัสผ่านใหม่ของท่าน!' }]}
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
                <Form.Item {...tailLayout}>
                      <Button type="primary" htmlType="submit">
                        เปลี่ยนรหัสผ่าน
                      </Button>
                    </Form.Item>
            </Form>

        </Col>
       </Row>
    )
}

export default ChangePassword
