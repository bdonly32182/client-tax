import React,{useState,useEffect} from 'react'
import { Form, Input, Col,Select ,Divider,Checkbox} from 'antd';
import {code_cate_building,sub_Cate} from '../Select/data'
function BuildingForm(props) {
  const [category,setCategory] = useState(sub_Cate[code_cate_building[0].code]);//เอาไปเป็นตัวเลือก
  const [secondCate,setSecondCate] = useState(sub_Cate[code_cate_building[0].code][0]);//เก็บค่าไว้เมื่อกด select
  const {Option} = Select;
  useEffect(() => {
    props.formModal.resetFields()
  }, [props.formModal,props.building])
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
              Farm_Size:props.building.FarmType?props.building.FarmType.Farm_Size:0 ,
              Live_Size:props.building.LiveType?props.building.LiveType.Live_Size :0,
              Empty_Size:props.building.EmptyType?props.building.EmptyType.Empty_Size:0 ,
              Other_Size:props.building.OtherType?props.building.OtherType.Other_Size:0 ,
              rating_id:props.building.RateOfBuilding.Code,
              Percent_Farm:props.building.FarmType?props.building.FarmType.Percent_Farm:0,
              Percent_Live:props.building.LiveType?props.building.LiveType.Percent_Live:0,
              Percent_Other:props.building.OtherType?props.building.OtherType.Percent_Other:0,
              Percent_Empty:props.building.EmptyType?props.building.EmptyType.Percent_Empty:0,
              Live_Status:props.building.LiveType?props.building.LiveType.Live_Status:0,
              StartYear:props.building.EmptyType?props.building.EmptyType.StartYear:0,
              EmptyAbsolute:props.building.EmptyType?props.building.EmptyType.EmptyAbsolute:0
              // StartYear EmptyAbsolute
            }:{
              rating_id:code_cate_building[0].code,
              Sub_Category:secondCate,
              Farm_Size:0,
              Live_Size:0,
              Empty_Size:0,
              Other_Size:0,
              Live_Status:false
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
                      <Select onChange={onChangeCategory} placeholder="เลือกประเภทการใช้ประโยชน์ย่อย" style={{width:280}}>
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
                      <Select placeholder="เลือกประเภทการใช้ประโยชน์ย่อย"  value={secondCate} onChange={onChangeSubCate} style={{width:280}}>
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
                        <Select placeholder="เสือกลักษณะสิ่งปลูกสร้าง" style={{width:130}}>
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
                      <Input placeholder="ความกว้างของชั้นที่หนึ่ง"/>
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      label="ยาว (เมตร)"
                      name="Length"
                      rules={[{ required: true, message: 'กรุณากรอกความยาว !' }]}
                    >
                      <Input placeholder="ความยาวของชั้นที่หนึ่ง"/>
                    </Form.Item>
                  </Col>
                  
              </Input.Group>
            </Form.Item>
        <Divider />
        {props.building&&<>
        <Divider />
        </>}
        
            <Form.Item>
              <Input.Group compact>
                <Col>
                     <Form.Item
                      label="การเกษตร(ตารางเมตร)"
                      name="Farm_Size"
                    >
                      <Input disabled={props.TypeName === "เกษตร"||props.TypeName==="หลายประเภท" ?false:true}/>
                      
                    </Form.Item>
                    {props.building&&
                      <div style={{display:'block',paddingRight:'20px'}}>
                        <p style={{color:'red'}}>*สัดส่วนประเภทเกษตร</p>
                          <Form.Item
                            name="Percent_Farm"
                          >
                            <Input disabled={props.TypeName === "เกษตร"||props.TypeName==="หลายประเภท" ?false:true}/>
                          </Form.Item>
                      </div>
                       
                    }
                  </Col>
                 <Col>
                    <Form.Item
                      label="อยู่อาศัย"
                      name="Live_Size"
                    >
                      <Input disabled={props.TypeName === "อยู่อาศัย"||props.TypeName==="หลายประเภท" ?false:true}/>
                    </Form.Item>
                    {props.building&&
                      <div style={{display:'block'}}>
                        <p style={{color:'red'}}>*สัดส่วนประเภทอยู่อาศัย</p>
                        <Form.Item
                          name="Percent_Live"
                        >
                          <Input disabled={props.TypeName === "อยู่อาศัย"||props.TypeName==="หลายประเภท" ?false:true}/>
                        </Form.Item> 
                      </div>
                      
                      }
                  </Col>
                  <Col>
                      <Form.Item
                        label="กรณีที่อยู่หลังหลัก"
                        name="Live_Status"
                        valuePropName="checked"
                      >
                        <Checkbox  disabled={props.TypeName === "อยู่อาศัย"||props.TypeName==="หลายประเภท" ?false:true}
                        />
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
                      {props.building&&
                        <div style={{display:'block',paddingRight:'20px'}}>
                            <p style={{color:'red'}}>*สัดส่วนประเภทอื่นๆ</p>
                            <Form.Item
                              name="Percent_Other"
                            >
                              <Input disabled={props.TypeName === "อื่นๆ"||props.TypeName==="หลายประเภท"?false:true}/>
                            </Form.Item>
                        </div>
                        
                      } 
                  </Col>
                  <Col>
                   <Form.Item
                      label="ว่างเปล่า"
                      name="Empty_Size"
                    >
                      <Input disabled={props.TypeName === "ว่างเปล่า" ||props.TypeName==="หลายประเภท"?false:true}/>
                      
                    </Form.Item>
                    
                    {props.building &&
                        <div style={{display:'block',paddingRight:'20px'}}>
                            <p style={{color:'red'}}>*สัดส่วนประเภทว่างเปล่า</p>
                            <Form.Item
                                name="Percent_Empty"
                              >
                                <Input disabled={props.TypeName === "ว่างเปล่า" ||props.TypeName==="หลายประเภท"?false:true}/>
                              </Form.Item>
                        </div>
                       
                      
                      }
                  </Col>
                  
                      
              </Input.Group>
            </Form.Item>
            
            {props.TypeName === "ว่างเปล่า" ||props.TypeName==="หลายประเภท"?
                        <Form.Item>
                          <Input.Group compact>
                            <Col>
                              <Form.Item label="ปีที่เริ่มว่างเปล่า"
                              name="StartYear"
                              >
                                  <Input />
                              </Form.Item>
                            </Col>
                            <Col>
                              <Form.Item label="ว่างเปล่าแท้จริง"
                                name="EmptyAbsolute"
                                valuePropName="checked"

                                >
                                <Checkbox></Checkbox>
                                </Form.Item> 
                            </Col>
                            
                            </Input.Group>
                        </Form.Item> 
                          
                          
                    :null}
              
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
