import React ,{useState,useEffect}from 'react'
import {Tabs,Row, Col,notification} from 'antd'
import UsefulLandForm from '../Form/UsefulLandForm';
import FarmTable from '../Table/FarmTable';
import LiveTable from '../Table/LiveTable';
import EmptyTable from '../Table/EmptyTable';
import OtherTable from '../Table/OtherTable';
import axios from '../../config/axios'
import NextoTable from '../Table/NextoTable';
import NextoModal from '../Modal/NextoModal';
function TabsUseful({useful,formModal}) {
    const {TabPane}  = Tabs;
    const [Live,setLive] = useState([]);
    const [Farm,setFarm] = useState([]);
    const [Other,setOther] = useState([]);
    const [Empty,setEmpty] = useState([]);
    const [nextos,setNextos] = useState([]);
    useEffect(() => {
        setNextos(useful.Useful)
        setEmpty(useful.EmptyTypes);
        setOther(useful.OtherTypes);
        setFarm(useful.FarmTypes);
        setLive(useful.LiveTypes);
    }, [/*useful.LiveTypes,useful.FarmTypes,useful.OtherTypes,useful.EmptyTypes,setNextos*/useful]);

    const onDeleteOther = (type_id,useful_id) =>{
        axios.delete(`/api/other/${type_id}?useful=${useful_id}`).then((result) => {
            notification.success({message:'ลบสัดส่วนเรียบร้อยแล้ว'})
        }).catch((err) => {
            notification.error({message:'ลบสัดส่วนล้มเหลว'})
        });
        setOther(Other.filter(other=>other.Useful_other.Other_ID !== type_id));
    }
    const onDeleteLive =(type_id,useful_id)=>{
        axios.delete(`/api/live/${type_id}?useful=${useful_id}`).then((result) => {
            notification.success({message:'ลบสัดส่วนเรียบร้อยแล้ว'})
        }).catch((err) => {
            notification.error({message:'ลบสัดส่วนล้มเหลว'})
        });
        setLive(Live.filter(live=>live.Useful_live.Live_ID !== type_id));
    }
    const onDeleteEmpty =(type_id,useful_id)=> {
        axios.delete(`/api/empty/${type_id}?useful=${useful_id}`).then((result) => {
            notification.success({message:'ลบสัดส่วนเรียบร้อยแล้ว'})
        }).catch((err) => {
            notification.error({message:'ลบสัดส่วนล้มเหลว'})
        });
        setEmpty(Empty.filter(empty=>empty.Useful_empty.Empty_ID !== type_id));
    }
    const onDeleteFarm =(type_id,useful_id)=> {
        axios.delete(`/api/farm/${type_id}?useful=${useful_id}`).then((result) => {
            notification.success({message:'ลบสัดส่วนเรียบร้อยแล้ว'})
        }).catch((err) => {
            notification.error({message:'ลบสัดส่วนล้มเหลว'})
        });
        setFarm(Farm.filter(farm=>farm.Useful_farm.Farm_ID !== type_id));
    }
   const onDeleteNexto =async (nexto) => {
    let filterNexto = nextos.filter(next => next.useful_id !== nexto.useful_id)
    setNextos(filterNexto)
   axios.delete(`api/deleteNexto/${useful.useful_id}?nexto_id=${nexto.useful_id}`)
            .then(result=>
                notification.success({message:"ลบการใช้ประโยชน์ที่ดินเรียบร้อยแล้ว"})
                )
            .catch(e=>notification.error({message:"ลบการใช้ประโยชน์ที่ดินล้มเหลว"}))
   }
    return (
        <div style={{padding:10,paddingLeft:15}}>
        <Tabs>
                <TabPane tab="แก้ไขข้อมูล" key="1">
                    <UsefulLandForm  formModal={formModal} useful ={useful} />
                </TabPane>
                <TabPane tab="แปลงติดกัน" key="2">
                        <Row>
                           <Col >
                           {useful.TypeName ==="หลายประเภท" ?<h3 style={{color:'red'}}>**เนื่องจากการใช้ประโยชน์ที่ดินเป็นหลายประเภทจึงไม่สามารถทำที่ดินแปลงติดกันได้ ต้องไปทำที่คร่อมแปลงแทน</h3>:
                           <Row>
                               <Col>
                                 <NextoModal tax_id={useful.UsefulLand_Tax_ID} useful_id ={useful.useful_id} TypeName={useful.TypeName}/>
                               </Col>
                               <Col>
                                    <NextoTable tabs={true} nextos ={nextos} onDeleteNexto={onDeleteNexto}/>
                             </Col>
                           </Row>
                            }
                           </Col>
                           
                        </Row>
                
                </TabPane>
                <TabPane tab="สัดส่วนการใช้ประโยชน์" key="3">
                        <Row>
                           <Col>
                           <FarmTable FarmList={Farm} onDelete={onDeleteFarm}/>
                           </Col>
                           <Col span={3}></Col>
                           <Col>
                           <LiveTable LiveList={Live} onDelete={onDeleteLive}/>
                           </Col>
                        </Row>
                        <Row>
                            <Col>
                           <EmptyTable EmptyList={Empty} onDelete={onDeleteEmpty}/>
                           </Col>
                           <Col span={3}></Col>
                           <Col>
                           <OtherTable OtherList={Other} onDelete={onDeleteOther}/>
                           </Col>
                        </Row>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default TabsUseful
