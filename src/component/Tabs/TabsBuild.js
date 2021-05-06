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
                {props.buildings&&
                <TabPane tab="สิ่งปลูกสร้างคร่อมแปลง" key="3">
                    <Row>
                        <Col>
                            <p style={{color:"#1AB885",fontSize:20}}>ที่ดินที่สิ่งปลูกสร้างตั้งอยู่</p>
                        </Col>
                        <Col span={15}></Col>
                        <Col>
                            <BuildAccrossModal titleButton="เลือกที่ดินคร่อมแปลง" building={props.building} usefulLandID={props.useful_id}
                            PriceUseful={props.PriceUseful}  buildings={props.buildings} UsefulLand_Tax_ID={props.UsefulLand_Tax_ID} />
                        </Col>
                    </Row>
                
                   
                    <UsefulTable ListUseful={props.building.BuildOnUsefulLands[0].UsefulLand}/>
                  <Row style={{padding:'30px',display:'block'}}>
                      <u style={{fontSize:20}}>หมายเหตุ</u>
                      <p style={{padding:'10px',color:'red'}}>* กรณีสิ่งปลูกสร้างที่เป็นอยู่อาศัยหลักหลังและคร่อมแปลง ต้องใส่ข้อมูลสิ่งปลูกสร้างทั้งหมดบนการใช้ประโยชน์นี้แล้ว</p>
                      <p style={{padding:'10px',color:'blueviolet'}}>* กรณีที่ทำการคร่อมแปลงไปแล้ว แล้วจะสร้างสิ่งปลูกสร้างบนการใช้ประโยชน์นี้เพิ่มให้ไปลบการใช้ประโยชน์ที่ถูกคร่อมไปก่อนแล้วค่อยทำการคร่อมแปลงใหม่</p>
                      <p style={{padding:'10px',color:'red'}}>* แก้ไขสัดส่วนให้เรียบร้อยก่อนที่จะทำการคร่อมแปลง</p>
                      <p style={{padding:'10px',color:'red'}}>* กรณีมีการเปลี่ยนแปลงกับสิ่งปลูกสร้างแปลงนี้ให้ทำการลบการใช้ประโยชน์ที่ถูกคร่อมทิ้งก่อน แล้วค่อยทำการคร่อมแปลงใหม่</p>
                  </Row>
                </TabPane>
                }
            </Tabs>
        </>
    )
}

export default TabsBuild
