import React from 'react'
import {Tabs,Row} from 'antd'
import UsefulLandForm from '../Form/UsefulLandForm';
function TabsUseful(props) {
    const {TabPane}  = Tabs;
    return (
        <Tabs>
                <TabPane tab="แก้ไขข้อมูล" key="1">
                    <UsefulLandForm  formModal={props.formModal} useful ={props.useful} />
                </TabPane>
                <TabPane tab="แปลงติดกัน" key="2">
                        <Row>
                           
                        </Row>
                
                </TabPane>
              
            </Tabs>
    )
}

export default TabsUseful
