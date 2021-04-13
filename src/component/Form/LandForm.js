import React,{useState,useEffect} from 'react'
import { Form, Input, Button, Col,Select ,Divider, notification} from 'antd';
import CodeLandModal from '../Modal/CodelandModal'
import {category_doc,districtname,Tambolname} from '../Select/data'
import {edit_land,delete_land} from '../../store/action/LandAction'
import {useDispatch} from 'react-redux'
import ConfirmModal from '../Modal/ConfirmModal';
import axios from '../../config/axios';
function LandForm(props) {
    const [tambol,setTambol] = useState([]);
    const [secondTambol,setSecondTambol] = useState([]);
    const [form] = Form.useForm();
    const {Option} = Select
    const dispatch = useDispatch();
    const [employee,setEmployee] = useState([]);
    useEffect(() => {
        axios.get('/api/employee').then((result) => {
            setEmployee(result.data)
        }).catch((err) => {
            notification.error({message:'เรียกดูพนักงานล้มเหลว'})
        });
        form.resetFields();
        if (props.land.distict_id) {
         setTambol(Tambolname[districtname[props.land?.distict_id -1]?.no])
         setSecondTambol(Tambolname[districtname[props.land?.distict_id -1]?.no][0]);    
        }
       
    }, [props.land,form]);
    const onChangeSelect = value=>{
        setTambol(Tambolname[value]);
        setSecondTambol(Tambolname[value][0])
    }
    const onChageTambol = value =>{
        setSecondTambol(value)
    }
    const onFinish = (values) => { 
         dispatch(edit_land(values.code_land,values,values.code_land));
    };
   const onDelete = () => {
    dispatch(delete_land(props.land.code_land))
   }
 
    return (
        <div>
            <Form
                form={form}
                    wrapperCol={{offset:3}}
                    onFinish={onFinish}
                    initialValues={props.land}
                    style={{borderBlockColor:"ActiveBorder",border:"groove"}}
                  ><Form.Item  >
                        <Input.Group compact >
                            <Col  >
                            <Form.Item
                                        label="รหัสแปลงที่ดิน"
                                        name="code_land"
                                        >
                                        <Input disabled={true} style={{width:140}} />
                                </Form.Item>
                            </Col>
                            <Col  >
                            <Form.Item
                                        label="ลำดับที่ดิน"
                                        name="Serial_code_land"
                                        rules={[{ required: true, message: 'กรุณากรอกลำดับที่ดิน!' }]}
                                        >
                                        <Input  style={{width:100}} />
                                </Form.Item>
                            </Col>
                                
                        </Input.Group>
                  </Form.Item>

                  <Form.Item >
                        <Input.Group compact>
                            <Col >
                             <Form.Item
                                        label="ประเภทเอกสาร"
                                        name="Category_doc"
                                        rules={[{ required: true, message: 'กรุณาเลือกประเภทเอกสาร!' }]}
                                        >
                                        <Select placeholder="เลือกประเภทเอกสาร" style={{ width: 120 }}>
                                            {category_doc.map(category=>(
                                                <Select.Option value={category} key={category}>{category}</Select.Option>
                                            ))}
                                            
                                        </Select>
                                </Form.Item>
                            </Col>   
                            <Col>
                                    <Form.Item
                                        label="เลขที่เอกสาร"
                                        name="Parcel_No"
                                        rules={[{ required: true, message: 'กรุณากรอกเลขเอกสารสิทธิ์!' }]}
                                        >
                                        <Input />
                                    </Form.Item>
                            </Col>
                                    
                        </Input.Group>
                    </Form.Item>

                    <Form.Item >
                        <Input.Group compact>
                            <Col>
                                    <Form.Item
                                    label="ระวาง"
                                    name="UTM_Code"
                                    rules={[{ required: true, message: 'กรุณากรอกเลขระวาง!' }]}
                                    >
                                    <Input style={{width:100}}/>
                                    </Form.Item>
                            </Col>
                            <Col>
                                    <Form.Item
                                        name="UTM_No"
                                        rules={[{ required: true, message: 'กรุณากรอกเลขระวาง!' }]}
                                        >
                                        <Input style={{width:100}}/>
                                    </Form.Item>
                            </Col>
                            <Col>
                                    <Form.Item
                                        name="UTM_Map"
                                        rules={[{ required: true, message: 'กรุณากรอกเลขระวาง!' }]}
                                        >
                                        <Input style={{width:100}}/>
                                    </Form.Item>
                            </Col>
                                    
                        </Input.Group>
                    </Form.Item>
                   <Form.Item >
                       <Input.Group compact>
                            <Col>
                                 <Form.Item
                                    label="เลขที่ดิน"
                                    name="Land_No"
                                    rules={[{ required: true, message: 'กรุณากรอกเลขที่ดิน!' }]}
                                    >
                                    <Input style={{width:120}}/>
                                </Form.Item>
                            </Col>
                            <Col>
                                    <Form.Item
                                        label="หน้าสำรวจ"
                                        name="Survey_No"
                                        rules={[{ required: true, message: 'กรุณากรอกหน้าสำรวจ!' }]}
                                        >
                                        <Input style={{width:120}}/>
                                    </Form.Item>
                            </Col>
                       </Input.Group>
                   </Form.Item>
                   
                   <Form.Item>
                       <Input.Group compact>
                           <Col>
                                <Form.Item
                                    label="หมู่ที่"
                                    name="Moo"
                                    >
                                    <Input />
                                </Form.Item>
                           </Col>
                           <Col>
                                <Form.Item
                                    label="เขต/อำเภอ"
                                    name="distict_id"
                                    rules={[{ required: true, message: 'กรุณาเลือกเขต!' }]}
                                    >
                                     <Select placeholder="เลือกเขตหรืออำเภอ" onChange={onChangeSelect} style={{ width: 120 }} >
                                            {districtname.map(district =>(
                                                <Select.Option value={district.no} key={district.no}>{district.name}</Select.Option>
                                            ))} 
                                        </Select>
                                </Form.Item>
                           </Col>
                           <Col>
                                <Form.Item
                                    label="แขวง/ตำบล"
                                    name="Tambol_name"
                                    rules={[{ required: true, message: 'กรุณาเลือกแขวง/ตำบล!' }]}
                                    >
                                    <Select placeholder="เลือกแขวงหรือตำบล" value={secondTambol}  onSelect={onChageTambol} style={{ width: 120 }} >
                                            {tambol.map(tam =>(
                                                <Option key={tam} value={tam}>{tam}</Option>
                                            ))} 
                                        </Select>
                                </Form.Item>
                           </Col>                  
                       </Input.Group>
                   </Form.Item>
                    <Divider></Divider>
                   <Form.Item >
                       <Input.Group compact>
                           <Col>
                                <Form.Item
                                    label="ไร่"
                                    name="RAI"
                                    rules={[{ required: true, message: 'กรุณากรอกจำนวน ไร่!' }]}
                                    >
                                    <Input type="number"/>
                                </Form.Item>
                           </Col>
                           <Col>  
                                <Form.Item
                                    label="งาน"
                                    name="GNAN"
                                    rules={[{ required: true, message: 'กรุณากรอกจำนวน งาน!' }]}
                                    >
                                    <Input type="number"/>
                                 </Form.Item>   
                            </Col>
                            <Col>
                                 <Form.Item
                                    label="ตร.ว"
                                    name="WA"
                                    rules={[{ required: true, message: 'กรุณากรอกจำนวน ตร.ว!' }]}
                                    >
                                    <Input type="number"/>
                                </Form.Item>
                            </Col>
                       </Input.Group>
                   </Form.Item>
                   <Divider></Divider>
                   <Form.Item>
                       <Input.Group compact>
                           <Col>
                                <Form.Item
                                label="หมายเหตุ"
                                name="Mark"
                                >
                                    <Input style={{width:600}}/>
                                </Form.Item>
                           </Col>
                          
                       </Input.Group>
                   </Form.Item>
                    
                      <Form.Item  >
                          <Input.Group compact>
                              <Col>
                                <Form.Item
                                        label="เจ้าหน้าที่ที่รับผิดชอบ"
                                        name="employee_land"
                                        style={{font:'red'}}
                                        rules={[{ required: true, message: 'กรุณาเลือกเจ้าหน้าที่ที่รับผิดชอบ!' }]}
                                        >
                                            <Select style={{ width: 200 }}>
                                                {employee.map(emp=>
                                                <Select.Option key={emp.Pers_no} value={emp.Pers_no}>{`${emp.Fname} ${emp.Lname}`}</Select.Option>
                                                )}    
                                            </Select>
                                   
                                </Form.Item>
                                
                              </Col>
                              <Col>
                                    <Form.Item
                                            label="ราคาประเมินจากกรมธนารักษ์"
                                            name="Price"
                                            >
                                        <Input style={{width:200}} type="number"/>
                                    </Form.Item>
                              </Col>
                            
                          </Input.Group>
                      </Form.Item>

                    <Form.Item  wrapperCol={{offset:5}}>
                        <Input.Group compact>
                            <Col span={8}>
                                <Button type="primary" htmlType="submit">
                                    บันทึกการเปลี่ยนแปลง
                                </Button>
                            </Col>
                            <Col span={8}>
                            <CodeLandModal onEdit ={true} title ="แก้ไขรหัสแปลงที่ดิน" target={props.land.code_land} bodyLand={props.land}/>
                            </Col>
                            <Col span={8}>
                                <ConfirmModal titleButton ="ลบที่ดินแปลงนี้"
                                    content="เมื่อคุณลบที่ดิน สิ่งปลูกสร้างบนแปลงที่ดินจะถูกลบไปด้วย คุณแน่ใจที่จะลบใช่หรือไม่"
                                    confrimDelete={onDelete}
                                />
                            </Col>   
                        </Input.Group>
                      
                    </Form.Item>
                </Form>
        </div>
    )
}

export default LandForm
