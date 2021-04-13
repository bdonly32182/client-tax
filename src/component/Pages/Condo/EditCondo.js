import { Row ,Col, Button, Space, Divider,Tabs,Select} from 'antd'
import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {fetch_condo,ondelete_condo}from '../../../store/action/CondoAction'
import Header from '../../Header'
import RoomModal from '../../Modal/RoomModal'
import RoomTable from '../../Table/RoomTable'
import {SearchOutlined,DeleteFilled} from '@ant-design/icons'
import RateRoomModal from '../../Modal/RateRoomModal'
import ConfirmModal from '../../Modal/ConfirmModal'
import axios from '../../../config/axios';
import CondoModal from '../../Modal/CondoModal'
import {MarkPrice,MarlAll,MarkType} from '../../Select/data'
import {FetchsRoomInCondo,filterRoom,onDeleteSelect} from '../../../store/action/RoomAction'
import PDS2Table from '../../Table/PDS2Table'
function EditCondo(props) {
    const {TabPane} = Tabs;
    const {Option} = Select;
    const usageUseful = [{id:0,value:'ไม่มีเจ้าของทรัพย์สิน'},{id:1,value:'มีเจ้าของทรัพย์สิน'},{id:2,value:'ทั้งหมด'}]//0 is don't have ownerroom and 1 is have owner and 2 is twin 0,1
    const Price =  [{id:0,value:'ไม่มีราคาประเมิน'},{id:1,value:'มีราคาประเมิน'},{id:2,value:'ทั้งหมด'}]//0 is Room price 0 and 1 is room Price >0 and 2 is all price
    const { id } = useParams();
    const dispatch = useDispatch();
    const condo= useSelector(state => state.condo)
    const [selectRows,setSelectRows] = useState([]);
    const [keys,setKeys] = useState("");
    const [pds2,setPds2] = useState([]);
    const [selectFloor,setSelectFloor] = useState([]);
    const [floor, setFloor] = useState('')
    const [useful, setUseful] = useState(2);
    const [price, setPrice] = useState(2);
    const rooms = useSelector(state=>state.rooms)
    useEffect(() => {
       dispatch(fetch_condo(id));
        dispatch(FetchsRoomInCondo(id));
       axios.get('/api/selectfloor/'+id).then((result) => {
           setSelectFloor(result.data);
           setFloor(result.data[0]?.Floor)
        //    selectFloor[0]?.Floor
       }).catch((err) => {
           
       });
    }, [dispatch,id]);
    const onDeleteRoom =() => {
        let mapRoomID = selectRows.map(room=>room.id)
            dispatch(onDeleteSelect(mapRoomID))
    }
    const onDeleteCondo = () => {
        dispatch(ondelete_condo(id))
    }
    const onTabsClick =(value)=>{
        setKeys(value)
        if (value === "2") {
           pds2.length===0&& axios.get('/api/usefultype'+id).then((result) => {
                setPds2(result.data)
            }).catch((err) => {
                
            });
        }
    }
    const onChangeFloor =(value) => {
        setFloor(value)
    }
    const onChangeUseful =(value)=>{
        setUseful(value)
    }
    const onChangePrice = (value) => {
        setPrice(value)
    }
    const onSearch = ()=>{
        dispatch(filterRoom(floor,id,price,useful))
    }
    console.log(floor);
    return (
        <div >
           <div>
               <Header />
           </div>
           <div style={{textAlignLast:'right',padding:'10px'}}>
               <ConfirmModal titleButton={<DeleteFilled />} confrimDelete={onDeleteCondo}/>
              
           </div>
          <Tabs type="card" onTabClick={onTabsClick}>
              <TabPane tab="การจัดการข้อมูล" key="1">
                <div style={{padding:'30px'}}>
                        <Row style={{display:'block'}}>
                            <Col xs={15} sm	={13} md={10} lg={10} xl={10} xxl={10}>
                                <h1>{`อาคารชุด : ${condo.Condo_name}`}</h1>
                                <div style={{display:'inline-block'}}>
                                    <Space >
                                        <CondoModal titleButton={'แก้ไขข้อมูลอาคารชุด'} condo={condo} color="#F5F5E7"/>
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
                                    <Select style={{width:200}}  onChange={onChangeFloor}>
                                      {selectFloor.map(floor=><Option value={floor.Floor} key={floor.Floor}>{floor.Floor}</Option>)}  
                                    </Select>
                                    
                                </div>
                            </Col>
                            <Col xs={6} sm	={6} md={6} lg={6} xl={6} xxl={6}>
                                <div style={{display:'block',paddingLeft:'20px'}}>
                                    <p>ตัวกรองการลงราคาประเมิน</p>
                                    <Select style={{width:200}} onChange={onChangePrice}>
                                        {Price.map(price=><Option value={price.id} key={price.id}>{price.value}</Option>)}
                                    </Select>
                                </div>
                            </Col>
                            <Col xs={6} sm	={6} md={6} lg={6} xl={6} xxl={6}>
                                <div style={{display:'block',paddingLeft:'20px'}}>
                                    <p>ตัวกรองระบุผู้ถือครองกรรมสิทธิ์</p>
                                    <Select style={{width:200}} onChange={onChangeUseful}>
                                        {usageUseful.map(useful=><Option value={useful.id} key={useful.id}>{useful.value}</Option>)}
                                    </Select>
                                </div>
                            </Col>
                            <Col xs={6} sm	={6} md={6} lg={6} xl={6} xxl={6}>
                                <div style={{display:'block',paddingLeft:'60px',paddingTop:'34px'}}>
                                    <Button onClick={onSearch} icon={<SearchOutlined />}>ค้นหา</Button>
                                </div>
                            </Col>
                            </Row> 
                        </div>
                        
                        <div style={{borderRadius:'5px ',backgroundColor:'#8BD6F3' ,marginTop:'15px',padding:'20px',margin:'20px'}}>
                            
                            <Row style={{padding:'25px',display:'inline-block',paddingLeft:'50px'}}>
                                <h3 style={{color:'purple'}}>การจัดการห้องชุดหลายรายการ</h3>
                                <p>{`จำนวนรายการห้องชุดที่เลือกอยู่ ${selectRows.length}/${rooms?.length}`}</p>
                                <Space>
                                    <RateRoomModal titleButton="อัพเดทราคาประเมินห้องชุดที่เลือก" Mark ={MarkPrice} selectRows={selectRows} condoID={id}/>
                                    <RateRoomModal titleButton="อัพเดทราคาประเมิน ประเภท และพื้นที่ห้องชุดที่เลือก(ขั้นสูง)" Mark={MarlAll} selectRows={selectRows} condoID={id}/>
                                    <RateRoomModal titleButton="อัพเดทการใช้ประโยชน์ห้องชุดที่เลือก" Mark={MarkType} selectRows={selectRows} condoID={id}/>
                                    <ConfirmModal titleButton={<DeleteFilled />}
                                                    onDeleteRoom ={onDeleteRoom}
                                                    disable={selectRows.length>0?false:true}
                                                    content="ห้องชุดที่ถูกเลือกทั้งหมดจะถูกลบอย่างถาวรคุณแน่ใจหรือไม่ที่จะลบ"

                                    />
                                </Space>
                                
                            </Row>
                        </div>
                        
                        <Row style={{padding:'20px'}}>
                            <Col xs={24} sm	={24} md={24} lg={24} xl={24} xxl={24}>
                                <RoomTable rooms = {rooms} id_condo={id} setSelectRows={setSelectRows} 
                                Floor={floor}Condo_no={id}Price={price} Useful={useful}
                                />
                            </Col>
                        </Row>  
                    </div>
              </TabPane>
              <TabPane tab={`ภดส.2( ${condo.Condo_name} )`} key="2">
                  {keys === "2" &&
                    <div style={{padding:'20px'}}>
                        <PDS2Table condo={condo} type={pds2}/>      
                    </div>
                  }
                  
               
              </TabPane>
          </Tabs>
          
        </div>
    )
}

export default EditCondo
