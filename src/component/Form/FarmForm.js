import React from 'react'
import {Form,Input} from 'antd'
function FarmForm({Farm,formFarm}) {
    return (
        <div>
            <Form form ={formFarm}
            initialValues={Farm}
            >
                
                <Form.Item 
                label="เปอร์เซ็นต์"
                name="Percent_Farm">
                   <Input />
                </Form.Item>
            </Form>
        </div>
    )
}

export default FarmForm
