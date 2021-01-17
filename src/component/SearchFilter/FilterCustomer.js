import React from 'react'
import { Col, Row ,Input} from 'antd';

function FilterCustomer(props) {
    return (
        <div >
             <Row gutter={16}>
                 <Col span={7}/>
                <Col span={4}>
                   <Input.Search style={{width:250}} enterButton placeholder="ค้นหาด้วยบัตรประชาชน"></Input.Search>
                </Col>
                <Col span={4}>
                <Input.Search style={{width:250}} enterButton></Input.Search>

                </Col>
                <Col span={4}>
                <Input.Search style={{width:250}} enterButton placeholder="ค้นหาด้วยชื่อ"></Input.Search>

                </Col>
            </Row>
        </div>
    )
}

export default FilterCustomer
