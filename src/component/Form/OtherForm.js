import React from 'react'
import {Form, Input} from 'antd'
function OtherForm({other,formOther}) {
    console.log(other);
    return (
        <div>
            <Form form ={formOther}
            initialValues={{...other,
                // "RateOtherTax":other?.Useful_other?.RateOtherTax
            }}
            >
               
                <Form.Item 
                label="เปอร์เซ็นต์"
                name="Percent_Other">
                   <Input />
                </Form.Item>
                {/* <Form.Item
                label="อัตตราภาษี"
                name="RateOtherTax"
                >
                    <Input />
                </Form.Item> */}
            </Form>
        </div>
    )
}

export default OtherForm
