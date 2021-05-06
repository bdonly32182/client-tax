import React from 'react'
import {Form,Input} from 'antd'
function FarmForm({Farm,formFarm}) {
    return (
        <div>
            <Form form ={formFarm}
            initialValues={{...Farm,
                // "RateFarmTax":Farm?.Useful_farm?.RateFarmTax
            }}
            >
                
                <Form.Item 
                label="เปอร์เซ็นต์"
                name="Percent_Farm">
                   <Input />
                </Form.Item>
                {/* <Form.Item
                label="อัตตราภาษี"
                name="RateFarmTax"
                >
                    <Input />
                </Form.Item> */}
            </Form>
        </div>
    )
}

export default FarmForm
