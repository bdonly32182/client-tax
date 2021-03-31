import React,{useEffect} from 'react'
import {Row,Col,Form, Button,Image,Input,Select} from 'antd'
import {districtname} from '../../Select/data'
function ChangeProfile(props) {
    const [form] =Form.useForm();
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
      useEffect(() =>{ 
        form.setFieldsValue(props.user);
      }, [props.user,form]);

      const onFinish = (values) => {
          props.onSubmit(values)
        };
        console.log(props.user);
    return (
        <div style={{padding:80}}>
         <Row gutter={{xs:8,sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={6}>
                <Image style={{borderRadius:' 50%'}}
                 src={props.user?.picture?'http://localhost:3001/Image/Profile/'+props.user?.picture:"/profile.png"} width={300}/>
            </Col>
            <Col className="gutter-row" span={12}>
                <Form
                    form={form}
                    {...layout}
                   
                    onFinish={onFinish}
                  >
                    <Form.Item
                      label="รหัสบัตรประชาชน"
                      name="Pers_no"
                    >
                      <Input disabled={true}/>
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
                     label="เขต/อำเภอ"
                     name="distict_id"
                     >
                        <Select
                         style={{ width: 200 }}
                         placeholder="เลือกเขตที่ท่านบรรจุ"
                         >
                           {districtname.map(district=>
                           <Select.Option value={district.no} key={district.no}>{district.name}</Select.Option>
                            )}
                             
                        </Select>
                    </Form.Item>
                    <Form.Item label="ตำแหน่ง" name="role">
                        <Select
                         style={{ width: 200 }}
                         placeholder="เลือกตำแหน่งของท่าน"
                         optionFilterProp="children"
                         filterOption={(input, option) =>
                           option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                         }
                         disabled={props.user?true:false}
                        >
                            <Select.Option value="leader" >หัวหน้าฝ่ายรายได้</Select.Option>
                            <Select.Option value="employee" >พนักงานฝ่ายรายได้</Select.Option>
                        </Select>                     
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                      <Button type="primary" htmlType="submit">
                      ยืนยันการแก้ไข
                      </Button>
                    </Form.Item>
                </Form>
                
            </Col>
            
         </Row>
       
        </div>
    )
}

export default ChangeProfile
