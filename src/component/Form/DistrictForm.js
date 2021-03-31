import React from 'react';
import {Form, Input,Col,Select} from 'antd';
import {districtname} from '../Select/data';
function DistrictForm({formModal,district}) {
    return (
        <Form
        form={formModal}
        initialValues={district}
      >
          <Form.Item>
              <Input.Group compact>
                  <Col>
                        <Form.Item
                            label="รหัสประจำเขต"
                            name="District_no"
                            >
                                <Select
                                style={{ width: 200 }}
                                placeholder="เลือกเขตที่ท่านบรรจุ"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }>
                                    {districtname&&districtname.map(district=>
                                    <Select.Option value={district.no} key={district.no}>{district.no}</Select.Option>)
                                    }
                                    
                                    
                                </Select>
                        </Form.Item>
                  </Col>
                  <Col>
                        <Form.Item
                            label="เขต/อำเภอ"
                            name="District_name"
                            >
                                <Select
                                style={{ width: 200 }}
                                placeholder="เลือกเขตที่ท่านบรรจุ"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }>
                                    {districtname&&districtname.map(district=>
                                    <Select.Option value={district.no}  key={district.no}>{district.name}</Select.Option>)
                                    }
                                    
                                    
                                </Select>
                        </Form.Item>
                  </Col>
              </Input.Group>
            </Form.Item>
        
            <Form.Item>
              <Input.Group compact>
                  <Col>
                        <Form.Item
                            label="แขวง"
                            name="Address_Tambol"
                            >
                               <Input />
                        </Form.Item>
                  </Col>
                  <Col>
                        <Form.Item
                            label="เขต"
                            name="Address_District"
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
                            label="จังหวัด"
                            name="Address_Country"
                            >
                               <Input />
                        </Form.Item>
                  </Col>
                  <Col>
                        <Form.Item
                            label="รหัสไปรษณีย์"
                            name="Address_PostNo"
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
                            label="เบอร์โทร"
                            name="Tel"
                            >
                               <Input />
                        </Form.Item>
                  </Col>
                  <Col>
                        <Form.Item
                            label="ตัวอักษรย่อ"
                            name="Abbreviations"
                            >
                                <Input />
                        </Form.Item>
                  </Col>
              </Input.Group>
            </Form.Item>
        

    </Form>
    )
}

export default DistrictForm
