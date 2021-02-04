import React,{useEffect,useState} from 'react'
import {Tabs,Row,Col,Divider, Button} from 'antd'
import {useDispatch} from 'react-redux'
import BuildingForm from '../Form/BuildingForm';
import OwnerLand from '../Pages/Land/OwnerLand';
import UsefulTable from '../Table/UsefulTable'
// import {build_generate_tax} from '../../store/action/TaxAction'
function TabsBuild(props) {
    const dispatch = useDispatch();
    const {TabPane} = Tabs
    const [status,setStatus] = useState(true)
    let bulkcreate =[]
    useEffect(()=>{
        // setTax(props.customer&&props.customer.map(cus =>cus.Cus_No.substr(9,13)).reduce((pervious,current)=>pervious+current))
    })
    const generate_build_tax_id = ()=>{
        if (props.customer.length >1) {
           const id_tax =  props.customer.map(cus =>cus.Cus_No.substr(9,13)).reduce((pervious,current)=>pervious+current)
            const customers = props.customer.map(cus =>bulkcreate.push({Cus_No:cus.Cus_No,Tax_ID:id_tax}))
            // dispatch(build_generate_tax(id_tax,props.land[0].code_land,bulkcreate,props.Payment_Cus,props.building.Build_Id))
            bulkcreate.length=0 
        }else{
            props.customer.map(cus =>bulkcreate.push({Cus_No:cus.Cus_No,Tax_ID:cus.Cus_No}))
            // dispatch(build_generate_tax(props.customer[0].Cus_No,props.land[0].code_land,bulkcreate,props.Payment_Cus,props.building.Build_Id))
            bulkcreate.length=0 
        }
      
    }
    
    return (
        <>
            <Tabs>
                <TabPane tab="แก้ไขข้ออมูล" key="1">
                    <BuildingForm onEdit={true} building={props.building} TypeName={props.TypeName} formModal ={props.formModal}/>
                </TabPane>
                <TabPane tab="จัดการเจ้าของทรัพย์สิน" key="2">
                        <Row>
                            {/* <OwnerBuilding customers={props.building.Tax_Group.Customers}/>
                             */}
                             <OwnerLand customers={props.building.Tax_Group.Customers} Build_Id={props.building.Build_Id} useful_id={props.useful_id}/>
                        </Row>
                
                </TabPane>
                <TabPane tab="สิ่งปลูกสร้างคร่อมแปลง" key="3">
                    <p style={{color:"blue",fontSize:20}}>ที่ดินที่สิ่งปลูกสร้างตั้งอยู่</p>
                    {/* props.building.BuildOnUsefulLands */}
                    <UsefulTable ListUseful={props.building.BuildOnUsefulLands[0].UsefulLand}/>
                    <Row>
                        <p style={{color:"red",fontSize:20}}>ที่ดินที่สิ่งปลูกสร้างคร่อมแปลง</p>
                        <Col span={11}>
                        </Col>
                        {/* <AcrossLandModal Build_Id={props.building.Build_Id} useful_id={props.useful_id} button="เลือกที่ดินคร่อมแปลง"/> */}

                    </Row>
                    
                    {/* <LandList LandList={props.land&&props.land.filter(land=>land.code_land != props.building.Land_main)} tabbuild={true}/> */}

                </TabPane>
            </Tabs>
        </>
    )
}

export default TabsBuild
