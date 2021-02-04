import React,{useState} from 'react'
import { Form, Input, Button, Col,Select ,Divider} from 'antd';
import {code_cate_building,sub_Cate} from '../Select/data'
function BuildingForm(props) {
  const [category,setCategory] = useState(sub_Cate[code_cate_building[0].code]);//เอาไปเป็นตัวเลือก
  const [secondCate,setSecondCate] = useState(sub_Cate[code_cate_building[0].code][0]);//เก็บค่าไว้เมื่อกด select
  const {Option} = Select;
  const onChangeCategory =(value) =>{
    setCategory(sub_Cate[value]);
    setSecondCate(sub_Cate[value][0]);
  }
  const onChangeSubCate = value => {
    setSecondCate(value);
  }
  return (
        <Form
        form={props.formModal}
            wrapperCol={{offset:3}}
            labelCol={{offset:10}}
            initialValues={props.onEdit?{
              ...props.building,
              Farm_Size:props.building.FarmType&&props.building.OtherType.Farm_Size ,
              Live_Size:props.building.LiveType&&props.building.OtherType.Live_Size ,
              Empty_Size:props.building.EmptyType&&props.building.OtherType.Empty_Size ,
              Other_Size:props.building.OtherType&&props.building.OtherType.Other_Size ,
              rating_id:props.building.RateOfBuilding.Code
            }:{
              rating_id:code_cate_building[0].code,
              Sub_Category:secondCate,
              Farm_Size:0,
              Live_Size:0,
              Empty_Size:0,
              Other_Size:0
            }}
          >
           {!props.onEdit&& <h1>รหัสผู้เสียภาษีเริ่มต้นของสิ่งปลูกสร้าง {props.uid_tax}</h1>}
            <Form.Item>
              <Input.Group compact>
                  <Col>
                    <Form.Item
                      label="รหัสสิ่งปลูกสร้าง"
                      name="Build_Id" 
                    >
                      <Input disabled={true}/>
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      label="บ้านเลขที่"
                      name="No_House"
                      rules={[{ required: true, message: 'กรุณากรอกบ้านเลขที่ !' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
              </Input.Group>
            </Form.Item>

            <Form.Item>
              <Input.Group compact>
                  <Col>
                    <Form.Item
                      label="ประเภทสิ่งปลูกสร้าง"
                      name="rating_id"
                      rules={[{ required: true, message: 'กรุณาเลือกประเภทสิ่งปลูกสร้าง !' }]}
                    >
                      <Select onChange={onChangeCategory} placeholder="เลือกประเภทการใช้ประโยชน์ย่อย">
                        {code_cate_building.map(cate=><Select.Option  value={cate.code} key={cate.code}>{cate.category}</Select.Option >)}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      label="ประเภทสิ่งปลูกสร้างย่อย"
                      name="Sub_Category"
                      rules={[{ required: true, message: 'กรุณาเลือกประเภทสิ่งปลูกสร้างย่อย !' }]}
                    >
                      <Select placeholder="เลือกประเภทการใช้ประโยชน์ย่อย"  value={secondCate} onChange={onChangeSubCate}>
                        {category.map(subcate=>(<Select.Option key={subcate} >{subcate}</Select.Option>))}
                      </Select>
                    </Form.Item>
                  </Col>
                  
              </Input.Group>
            </Form.Item>
            <Form.Item>
              <Input.Group compact>
                 <Col>
                      <Form.Item
                      label="ลักษณะสิ่งปลูกสร้าง"
                      name="StyleBuilding"
                      rules={[{ required: true, message: 'กรุณาเลือกลักษณะสิ่งปลูกสร้าง !' }]}
                      >
                        <Select placeholder="เสือกลักษณะสิ่งปลูกสร้าง">
                          <Option value="ไม้">ไม้</Option>
                          <Option value="ตึก">ตึก</Option>
                          <Option value="ครึ่งตึกครึ่งไม้">ครึ่งตึกครึ่งไม้</Option>
                        </Select>
                      </Form.Item>
                  </Col>
              </Input.Group>
            </Form.Item>
            <Divider />
            <Form.Item>
              <Input.Group compact>
                  <Col>
                    <Form.Item
                        label="จำนวนห้อง"
                        name="Amount_Room"
                        rules={[{ required: true, message: 'กรุณากรอกจำนวนห้อง !' }]}
                      >
                        <Input />
                      </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      label="จำนวนชั้น"
                      name="Amount_Floor"
                      rules={[{ required: true, message: 'กรุณากรอกจำนวนชั้น !' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
              </Input.Group>
            </Form.Item>

            <Form.Item>
              <Input.Group compact>
                  <Col>
                    <Form.Item
                      label="กว้าง (เมตร)"
                      name="Width"
                      rules={[{ required: true, message: 'กรุณากรอกความกว้าง!' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      label="ยาว (เมตร)"
                      name="Length"
                      rules={[{ required: true, message: 'กรุณากรอกความยาว !' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
              </Input.Group>
            </Form.Item>
        <Divider />
        {props.building&&<>
        {/* <h2 style={{color:"cadetblue"}}>{`คิดเป็นสัดส่วนการใช้ประโยชน์ได้ :${props.building.UsefulType.totalAVG} %`}</h2> */}
        <Divider />
        </>}
        
            <Form.Item>
              <Input.Group compact>
                <Col>
                     <Form.Item
                      label="การเกษตร(ตารางเมตร)"
                      name="Farm_Size"
                    >
                      <Input disabled={props.TypeName === "การเกษตร"||props.TypeName==="หลายประเภท" ?false:true}/>
                      
                    </Form.Item>
                   
                  </Col>
                 <Col>
                    <Form.Item
                      label="อยู่อาศัย"
                      name="Live_Size"
                    >
                      <Input disabled={props.TypeName === "อยู่อาศัย"||props.TypeName==="หลายประเภท" ?false:true}/>
                      
                    </Form.Item>
                 
                  </Col>
                  
              </Input.Group>
              
            </Form.Item>

            <Form.Item>
              <Input.Group compact>
                  <Col>
                    <Form.Item
                      label="อื่นๆ"
                      name="Other_Size"
                    >
                      <Input disabled={props.TypeName === "อื่นๆ"||props.TypeName==="หลายประเภท"?false:true}/>
                      
                    </Form.Item>
                 
                  </Col>
                  <Col>
                   <Form.Item
                      label="ว่างเปล่า"
                      name="Empty_Size"
                    >
                      <Input disabled={props.TypeName === "ว่างเปล่า" ||props.TypeName==="หลายประเภท"?false:true}/>
                      
                    </Form.Item>
                   
                  </Col>
                  
                      
              </Input.Group>
            </Form.Item>

              
        <Divider />
            <Form.Item>
              <Input.Group compact>
                  <Col>
                      <Form.Item
                        label="อายุสิ่งปลูกสร้าง"
                        name="Age_Build"
                        rules={[{ required: true, message: 'กรุณากรอกอายุสิ่งปลูกสร้าง !' }]}
                      >
                        <Input style={{width:450}}/>
                      </Form.Item>
                  </Col>
                    
                  
              </Input.Group>
            </Form.Item>
            <Form.Item>
              <Input.Group compact >
                <Col>
                    <Form.Item
                      label="หมายเหตุ"
                      name="Mark"
                      
                    >
                      <Input style={{width:500}}/>
                    </Form.Item>
                </Col>
                    
              </Input.Group>
            </Form.Item>
            <Divider />
        </Form>
    )
}

export default BuildingForm
