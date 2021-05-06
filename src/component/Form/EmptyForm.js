import React from 'react'
import {Form,Input} from 'antd'
function EmptyForm({Empty,formEmpty}) {
    return (
        <div>
            <Form form ={formEmpty}
            initialValues={{...Empty,
            // "RateEmptyTax":Empty?.Useful_empty?.RateEmptyTax
            }}
            >
                
                <Form.Item 
                label="เปอร์เซ็นต์"
                name="Percent_Empty">
                   <Input />
                </Form.Item>
                {/* <Form.Item
                label="อัตตราภาษี"
                name="RateEmptyTax"
                >
                    <Input />
                </Form.Item> */}
            </Form>
        </div>
    )
}

export default EmptyForm
