import React from 'react'
import {Form,Input} from 'antd'
function LiveForm({Live,formLive}) {
    return (
        <div>
            <Form form ={formLive}
            initialValues={Live}
            >
                
                <Form.Item 
                label="เปอร์เซ็นต์"
                name="Percent_Live">
                   <Input />
                </Form.Item>
            </Form>
        </div>
    )
}

export default LiveForm
