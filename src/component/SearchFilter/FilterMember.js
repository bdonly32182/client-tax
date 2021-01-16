import React from 'react'
import {Input,Row,Col} from 'antd'
function FilterMember(props) {
    const {Search} = Input
    const onSearch = value => console.log(value);

    return (
        <div style={{width:"100%",paddingTop:10}}>
            <Row gutter={{xs:8,sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={7}  >
                <Search placeholder="เลือกเ" onSearch={onSearch} style={{ width: 200 }} />
                </Col>
            </Row>
            
        </div>
    )
}

export default FilterMember
