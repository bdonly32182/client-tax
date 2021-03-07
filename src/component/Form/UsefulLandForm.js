import React,{useEffect} from 'react'
import { Form, Input,Col,Select } from 'antd';
const layout = {
    labelCol: {
      span: 3,
    },
    wrapperCol: {
      // span: 16,
      offset:3
    },
  };
  const options = [
    { label: 'การเกษตร', value: 'เกษตร' },
    { label: 'อื่นๆ', value: 'อื่นๆ' },
    { label: 'อยู่อาศัย', value: 'อยู่อาศัย' },
    { label: 'ว่างเปล่า', value: 'ว่างเปล่า' },
    { label: 'หลายประเภท', value: 'หลายประเภท' },

  ];
  
function UsefulLandForm(props) {
    const  {Option} = Select;
    useEffect(() => {
        props.formModal.resetFields();
    }, [props.balancePlace,props.formModal])
    return (
        <div>
            
            <Form
                form={props.formModal}
                    {...layout}
                initialValues={props.useful?
                    {...props.useful,
                        Special_Useful:`${props.useful.Special_Useful}`
                    }
                    :{
                    Place:props.balancePlace,
                    Usage:true,
                    Special_Useful:'0'}}
            >
                <Form.Item>
                    <Input.Group compact>
                        <Col>
                            <Form.Item
                            label="รหัสการใช้ประโยชน์"
                            name="useful_id"
                            >
                            <Input disabled={true}/>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item
                            label={`เนื้อที่(ตร.ว)`}
                            name="Place"
                            rules={[{ required: true, message: 'กรุณากรอกเนื้อที่!' }]}
                            >
                            <Input />
                            </Form.Item>
                        </Col>  
                    </Input.Group>
                </Form.Item>  
                <Form.Item >
                    <Input.Group compact>
                        <Col>
                        <Form.Item label="ลักษณะการใช้"  
                                    name="Usage"
                                    rules={[{ required: true, message: 'กรุณาเลือกลักษณะการใช้!' }]}
                        >
                            <Select placeholder="เลือกลักษณะการใช้">
                                <Option value={true}>ใช้เอง</Option>
                                <Option value={false}>ให้เช่า</Option>                                       
                            </Select>
                        </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item name="TypeName"
                                label="ลักษณะการใช้ประโยชน์"
                                rules={[{ required: true, message: 'กรุณาเลือกลักษณะการใช้ประโยชน์!' }]}
                            >
                                <Select placeholder="ลักษณะการใช้ประโยชน์" >
                                    {options.map((option,i) =><Option value={option.value} key={i}>{option.label}</Option>)}
                                </Select>
                            
                            </Form.Item> 
                        </Col>
                        <Col>
                        <Form.Item
                            label="ลักษณะพิเศษ"
                            name="Special_Useful"
                            rules={[{ required: true, message: 'กรุณาเลือกลักษณะพิเศษ!' }]}
                        >
                            <Select placeholder="เลือกการยกเว้นภาษี" style={{width:220}}>
                                <Option value="0">ไม่เลือก</Option>
                                <Option value="100">ยกเว้นภาษีตาม พรบ.มาตรา 8</Option>
                                <Option value="90">ยกเว้นภาษีตาม พรก.มาตรา 4</Option>
                                <Option value="50">ยกเว้นภาษีตาม พรก.มาตรา 3 </Option>                                          
                            </Select>
                        </Form.Item>
                    </Col>
                    
                    </Input.Group>
                </Form.Item>
                <Form.Item>
                    <Input.Group compact>
                        <Col>
                                <Form.Item
                                label="หมายเหตุ"
                                name="marks"
                                >
                                <Input style={{width:400}}/>
                                </Form.Item>
                        </Col>
                    </Input.Group>
                </Form.Item>
                            
        </Form>
        </div>
    )
}

export default UsefulLandForm
