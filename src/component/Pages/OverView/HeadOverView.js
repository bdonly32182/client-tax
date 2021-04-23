import React from 'react'
import {Statistic , Card, Row , Col} from 'antd';
import {SendOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'

function HeadOverView({Headstatistic}) {
    const {totalLandInDistrict,totalBuilding,totalRoom,amountTax,totalLandHaveUseful} = Headstatistic;
    return (
        <div style={{paddingLeft:'50px'}}>
            <Row>

            
             <Col span={3} >
                    <Card title="แปลงที่ดิน"
                        actions={[
                        <Link to={`/land`}><SendOutlined /><b>ไปที่รายการ</b></Link>
                        ]}
                    >
                            <Statistic
                            value={totalLandInDistrict}
                            />    
                    </Card>
               </Col>
                <Col span={2}/>
               <Col span={3} >
                    <Card title="แปลงที่สำรวจแล้ว"
                        actions={[
                        <Link to={`/land`}><SendOutlined /><b>ไปที่รายการ</b></Link>
                        ]}
                    >
                            <Statistic
                            value={totalLandHaveUseful}
                            />    
                    </Card>
               </Col>

               <Col span={2}/>

               <Col span={3} >
                    <Card title="สิ่งปลูกสร้าง"
                        actions={[
                        <Link to={`/building`}><SendOutlined /><b>ไปที่รายการ</b></Link>
                        ]}
                    >
                            <Statistic
                            value={totalBuilding}
                            />    
                    </Card>
               </Col>

               <Col span={2}/>

               <Col span={3} >
                    <Card title="ห้องชุด"
                        actions={[
                        <Link to={'/condo'}><SendOutlined /><b>ไปที่รายการ</b></Link>
                        ]}
                    >
                            <Statistic
                            value={totalRoom}
                            />    
                    </Card>
               </Col>

               <Col span={2}/>

               <Col span={3} >
                    <Card title="เจ้าของทรัพย์สิน"
                        actions={[
                        <Link to='/tax'><SendOutlined /><b>ไปที่รายการ</b></Link>
                        ]}
                    >
                            <Statistic
                            value={amountTax}
                            />    
                    </Card>
               </Col>
            </Row>
        </div>
    )
}

export default HeadOverView
