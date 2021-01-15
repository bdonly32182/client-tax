import React from 'react'
import {useDispatch} from 'react-redux'
import { Form, Input, Button, Row ,Col, Divider} from 'antd';
import {user_login} from '../../../store/action/UserAction'
import {Link} from 'react-router-dom'
function Login(props) {
  const dispatch =useDispatch();
  const layout = 
  {
    
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 12,
      }
      ,
    };
  
    const tailLayout = 
    {
      wrapperCol: {
        offset: 12,
        span: 12,
      },
    };
  
  
  const onFinish = (values) => {    
    dispatch(user_login(values,props.setRole))    
  };

     return (
       <>
         <Divider></Divider>
         <Row gutter={{xs:8,sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={6}>
            </Col>
            <Col className="gutter-row" span={12}>
                <Form
                    {...layout}
                    onFinish={onFinish}
                  >
                    <Form.Item
                      label="รหัสบัตรประชาชน"
                      name="Pers_no"
                      rules={[{ required: true, message: 'กรุณากรอกบัตรประชาชนของท่าน!' }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="รหัสผ่าน"
                      name="password"
                      rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าของท่าน!' }]}
                    >
                      <Input.Password />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                      <Button type="primary" htmlType="submit">
                        เข้าสู่ระบบ
                      </Button>
                    </Form.Item>
                </Form>
            </Col>
            <Col className="gutter-row" span={6}>
            </Col>
         </Row>
         <Row gutter={{xs:8,sm: 16, md: 24, lg: 32 }}>
         <Col className="gutter-row" span={12}>
            </Col>
             <Col className="gutter-row" span={12}>
                <Link to="/register">สมัครสมาชิก</Link>
            </Col>
         </Row>
       </>
            
        )
}

export default Login