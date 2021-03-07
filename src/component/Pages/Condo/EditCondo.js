import { Row ,Col, Button, Space, Divider,Input,Tabs} from 'antd'
import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {fetch_condo,ondelete_condo}from '../../../store/action/CondoAction'
import Header from '../../Header'
import RoomModal from '../../Modal/RoomModal'
import RoomTable from '../../Table/RoomTable'
import {HighlightOutlined ,SearchOutlined,DeleteFilled} from '@ant-design/icons'
import RateRoomModal from '../../Modal/RateRoomModal'
import ConfirmModal from '../../Modal/ConfirmModal'
import axios from '../../../config/axios';
import CondoModal from '../../Modal/CondoModal'
import {MarkPrice,MarlAll,MarkType} from '../../Select/data'
import PDS2Table from '../../Table/PDS2Table'
function EditCondo(props) {
    const {TabPane} = Tabs;
    const { id } = useParams();
    const dispatch = useDispatch();
    const condo= useSelector(state => state.condo)
    const [selectRows,setSelectRows] = useState([]);
    
    useEffect(() => {
       dispatch(fetch_condo(id))
    }, [dispatch,id]);
    const onDeleteRoom =() => {
        let mapRoomID = selectRows.map(room=>room.Room_ID)
        axios.post('/api/rows/rooms',{rooms:mapRoomID}).then((result) => {
            dispatch(fetch_condo(id))
        }).catch((err) => {
            
        });
    }
    const onDeleteCondo = () => {
        dispatch(ondelete_condo(id))
    }
    return (
        <div >
           <div>
               <Header />
           </div>
           <div style={{textAlignLast:'right',padding:'10px'}}>
               <ConfirmModal titleButton={<DeleteFilled />} confrimDelete={onDeleteCondo}/>
              
           </div>
          <Tabs type="card">
              <TabPane tab="การจัดการข้อมูล" key="1">
                <div style={{padding:'30px'}}>
                        <Row style={{display:'block'}}>
                            <Col xs={15} sm	={13} md={10} lg={10} xl={10} xxl={10}>
                                <h1>{`อาคารชุด : ${condo.Condo_name}`}</h1>
                                <div style={{display:'inline-block'}}>
                                    <Space >
                                        {/* <Button icon={<EditFilled />} style={{borderRadius:'5px'}}>แก้ไขข้อมูลอาคารชุด</Button> */}
                                        <CondoModal titleButton={'แก้ไขข้อมูลอาคารชุด'} condo={condo}/>
                                        <Button icon={<HighlightOutlined />} style={{borderRadius:'5px'}}>การอัพเดทการใช้ประโยชน์ของห้องชุดในอาคารชุด</Button>   
                                    </Space>
                                    
                                </div>
                                
                            </Col>
                        </Row>
                        <Divider />
                        <Row style={{padding:'10px'}}>
                        <Col xs={17} sm	={14} md={12} lg={10} xl={8} xxl={6}>
                            รายการอาคารชุด
                        </Col>
                        <Col span={12}/>
                        <Col xs={7} sm	={5} md={4} lg={3} xl={2} xxl={1}>
                            <RoomModal titleButton="สร้างห้องชุด" id_condo = {id} titleModal="เพิ่มรายการห้องชุด"/>
                        </Col>
                        </Row>
                        <div style={{borderRadius:'5px ',backgroundColor:'#E5EFF2',padding:'25px',margin:'20px'}}>
                            <Row style={{padding:'25px'}}>
                            <Col xs={6} sm	={6} md={6} lg={6} xl={6} xxl={6}>
                                <div style={{display:'block',paddingLeft:'20px'}}>
                                    <p>การเลือกแสดงข้อมูลตามชั้น</p>
                                    <Input />
                                </div>
                            </Col>
                            <Col xs={6} sm	={6} md={6} lg={6} xl={6} xxl={6}>
                                <div style={{display:'block',paddingLeft:'20px'}}>
                                    <p>ตัวกรองการลงราคาประเมิน</p>
                                    <Input />
                                </div>
                            </Col>
                            <Col xs={6} sm	={6} md={6} lg={6} xl={6} xxl={6}>
                                <div style={{display:'block',paddingLeft:'20px'}}>
                                    <p>ตัวกรองระบุผู้ถือครองกรรมสิทธิ์</p>
                                    <Input />
                                </div>
                            </Col>
                            <Col xs={6} sm	={6} md={6} lg={6} xl={6} xxl={6}>
                                <div style={{display:'block',paddingLeft:'60px',paddingTop:'34px'}}>
                                    <Button icon={<SearchOutlined />}>ค้นหา</Button>
                                </div>
                            </Col>
                            </Row> 
                        </div>
                        
                        <div style={{borderRadius:'5px ',backgroundColor:'#8BD6F3' ,marginTop:'15px',padding:'20px',margin:'20px'}}>
                            
                            <Row style={{padding:'25px',display:'inline-block',paddingLeft:'50px'}}>
                                <h3 style={{color:'purple'}}>การจัดการห้องชุดหลายรายการ</h3>
                                <p>{`จำนวนรายการห้องชุดที่เลือกอยู่ ${selectRows.length}/${condo.Rooms?.length}`}</p>
                                <Space>
                                    <RateRoomModal titleButton="อัพเดทราคาประเมินห้องชุดที่เลือก" Mark ={MarkPrice} selectRows={selectRows}/>
                                    <RateRoomModal titleButton="อัพเดทราคาประเมิน ประเภท และพื้นที่ห้องชุดที่เลือก(ขั้นสูง)" Mark={MarlAll} selectRows={selectRows}/>
                                    <RateRoomModal titleButton="อัพเดทการใช้ประโยชน์ห้องชุดที่เลือก" Mark={MarkType} selectRows={selectRows}/>
                                    <ConfirmModal titleButton={<DeleteFilled />}
                                                    onDeleteRoom ={onDeleteRoom}
                                                    disable={selectRows.length>0?false:true}
                                                    content="ห้องชุดที่ถูกเลือกทั้งหมดจะถูกลบอย่างถาวรคุณแน่ใจหรือไม่ที่จะลบ"

                                    />
                                    {/* <Button style={{borderRadius:'5px'}}>ลบห้องชุดที่เลือก</Button>      */}
                                </Space>
                                
                            </Row>
                        </div>
                        
                        <Row style={{padding:'20px'}}>
                            <Col xs={24} sm	={24} md={24} lg={24} xl={24} xxl={24}>
                                <RoomTable rooms = {condo.Rooms} id_condo={id} setSelectRows={setSelectRows}/>
                            </Col>
                        </Row>  
                    </div>
              </TabPane>
              <TabPane tab={`ภดส.2( ${condo.Condo_name} )`} key="2">
                <PDS2Table condo={condo}/>
              </TabPane>
          </Tabs>
          
        </div>
    )
}

export default EditCondo
