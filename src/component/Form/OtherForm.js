import React from 'react'
import {Form, Input} from 'antd'
function OtherForm({other,formOther}) {

    return (
        <div>
            <Form form ={formOther}
            initialValues={other}
            >
               
                <Form.Item 
                label="เปอร์เซ็นต์"
                name="Percent_Other">
                   <Input />
                </Form.Item>
            </Form>
        </div>
    )
}

export default OtherForm
