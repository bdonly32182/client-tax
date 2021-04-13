import React,{useEffect,useState} from 'react';
import { Form, Input, Space, Divider, Select ,notification} from 'antd';
import axios from '../../config/axios';
function CondoForm({formModal,condo}) {
    const [employee,setEmployee] = useState([]);
    useEffect(() => {
        axios.get('/api/employee').then((result) => {
            setEmployee(result.data)
        }).catch((err) => {
            notification.error({message:'เรียกดูพนักงานล้มเหลว'})
        });
    }, [])
    return (
        <Form  form={formModal}
        layout={{
                    labelCol: {
                    span: 4,
                    },
                    wrapperCol: {
                    span: 14,
                    },
                }
            }
            initialValues={condo&&{...condo}}
         >
         <Space style={{ display: 'flex', marginBottom: 8 ,padding:'3px'}} align="baseline">
          <Form.Item label="ชื่ออาคารชุด" name="Condo_name"
          rules={[{ required: true, message: 'Missing ปีที่สร้าง' }]}
          >
              <Input placeholder="กรอกชื่ออาคารชุด" />
          </Form.Item>  
          <Form.Item label="เลขทะเบียนอาคารชุด" name="Register_no"
          rules={[{ required: true, message: 'Missing ปีที่สร้าง' }]}
          >
              <Input placeholder="กรอกเลขทะเบียนอาคารชุด"/>
          </Form.Item>   
         </Space>
        <Divider />
         <Space style={{ display: 'flex', marginBottom: 6 }} align="baseline">
          <Form.Item label="เลขที่โฉนด" name="Parcel_no"
          >
              <Input placeholder="กรอกเลขที่โฉนด"/>
          </Form.Item>  
          <Form.Item label="หน้าสำรวจ" name="Survey_no"
          >
              <Input placeholder="กรอกหน้าสำรวจ"/>
          </Form.Item>  
         </Space>

         <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
          <Form.Item label="ที่ตั้งเลขที่" name="Condo_no"
        //   rules={[{ required: true, message: 'Missing ปีที่สร้าง' }]}
          >
              <Input placeholder="ที่ตั้งเลขที่"/>
          </Form.Item>  
          <Form.Item label="หมู่บ้าน" name="village">
              <Input placeholder="หมู่บ้าน"/>
          </Form.Item>  
         </Space>

         <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
          <Form.Item label="ตรอกซอย" name="Soi">
              <Input placeholder="กรอกตรอกซอย"/>
          </Form.Item>  
          <Form.Item label="ถนน" name="Road">
              <Input placeholder="กรอกถนน"/>
          </Form.Item>  
         </Space>

         <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
          <Form.Item label="จังหวัด" name="Country"
          rules={[{ required: true, message: 'Missing ปีที่สร้าง' }]}
          >
              <Input placeholder="เลือกจังหวัด"/>
          </Form.Item>  
          <Form.Item label="อำเภอ/เขต" name="District_name"
          rules={[{ required: true, message: 'Missing ปีที่สร้าง' }]}
          >
              <Input placeholder="เลือกอำเภอ/เขต"/>
          </Form.Item>  
         </Space>

         <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
          <Form.Item label="ตำบล/แขวง" name="Tambol"
          rules={[{ required: true, message: 'Missing ปีที่สร้าง' }]}
          >
              <Input placeholder="เลือกตำบล/แขวง"/>
          </Form.Item>  
          <Form.Item label="รหัสไปรษณีย์" name="Post_no"
          rules={[{ required: true, message: 'Missing ปีที่สร้าง' }]}
          >
              <Input placeholder="เลือกรหัสไปรษณีย์"/>
          </Form.Item>  
         </Space>
         <Divider />
          <Form.Item label="ปีที่สร้าง" name="AgeCondo"
                    rules={[{ required: true, message: 'Missing ปีที่สร้าง' }]}
          >
              <Input placeholder="กรอก พ.ศ.ที่สร้างห้อง"/>
          </Form.Item>  
          <Form.Item
                label="เจ้าหน้าที่ที่รับผิดชอบ"
                name="employee_condo"
                rules={[{ required: true, message: 'กรุณาเลือกเจ้าหน้าที่ที่รับผิดชอบ!' }]}
          >
                  <Select style={{width:200}}>
                    {employee.map(emp => 
                        <Select.Option key={emp.Pers_no} value={emp.Pers_no}>{`${emp.Fname} ${emp.Lname}`}</Select.Option>
                    )}
                  </Select>                      
            </Form.Item>
         
          <Form.Item label="หมายเหตุ" name="Mark">
              <Input />
          </Form.Item>    
      
      </Form>
    )
}

export default CondoForm
