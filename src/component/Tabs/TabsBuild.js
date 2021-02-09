import React from 'react'
import {Tabs,Row,Col} from 'antd'
import BuildingForm from '../Form/BuildingForm';
import OwnerLand from '../Pages/Land/OwnerLand';
import BuildAccrossModal from '../Modal/BuildAccrossModal';
import UsefulTable from '../Table/UsefulTable'
function TabsBuild(props) {
    const {TabPane} = Tabs;   
    return (
        <>
            <Tabs>
                <TabPane tab="แก้ไขข้ออมูล" key="1">
                    <BuildingForm onEdit={true} building={props.building} TypeName={props.TypeName} formModal ={props.formModal}/>
                </TabPane>
                <TabPane tab="จัดการเจ้าของทรัพย์สิน" key="2">
                        <Row>
                            
                             <OwnerLand customers={props.building.Tax_Group.Customers} Build_Id={props.building.Build_Id} useful_id={props.useful_id}/>
                        </Row>
                
                </TabPane>
                <TabPane tab="สิ่งปลูกสร้างคร่อมแปลง" key="3">
                    <Row>
                        <Col>
                            <p style={{color:"#1AB885",fontSize:20}}>ที่ดินที่สิ่งปลูกสร้างตั้งอยู่</p>
                        </Col>
                        <Col span={15}></Col>
                        <Col>
                            <BuildAccrossModal titleButton="เลือกที่ดินคร่อมแปลง" building={props.building}/>
                        </Col>
                    </Row>
                
                   
                    <UsefulTable ListUseful={props.building.BuildOnUsefulLands[0].UsefulLand}/>
                  
                </TabPane>
            </Tabs>
        </>
    )
}

export default TabsBuild
