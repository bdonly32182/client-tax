import React,{useState} from 'react';
import {Modal,Button,Input,notification} from 'antd';
import axios from '../../config/axios';
import LandTable from '../Table/LandTable';
function BuildAccrossModal({titleButton,building,PriceUseful,buildings,UsefulLand_Tax_ID,usefulLandID}) {
    const [visible , setVisible] = useState(false);
    const [lands,setLand] = useState([]);
    const onSearchLand = (value) => {
        axios.get(`/search/${value}`).then((result) => {
            console.log(result.data);
            setLand(result.data)
        }).catch((err) => {
            notification.error({message:'ค้นหาโฉนดแปลงที่ดินล้มเหลว'})
        });
    };
    const CalculatePlace =({FarmType,LiveType,EmptyType,OtherType}, buildings = [])=>{
        let totalPlaceBuilding = buildings.map(({Building:{FarmType,LiveType,EmptyType,OtherType}})=>
        FarmType?.Farm_Size||0+ +LiveType?.Live_Size||0 + +EmptyType?.Empty_Size||0 + +OtherType?.Other_Size||0
        ).reduce((pre,cur)=>pre+cur,0);
        let PriceBuild = FarmType?.Farm_Size||0+ +LiveType?.Live_Size||0 + +EmptyType?.Empty_Size||0 + +OtherType?.Other_Size||0
        return PriceBuild / totalPlaceBuilding * 100
    }
    const onSelectLandCros=({UsefulLands,code_land,Price,Tax_Group})=>{
        let arrUseful = [];
        let useful_id = SetID(UsefulLands,code_land);
        let PercentPlaceBuild  = CalculatePlace(building,buildings)
        // let seperate = Split_place(building.Build_Total_Place/4);
        building.FarmType&&arrUseful.push({Build_farm_ID:building.FarmType.Build_farm_ID,
            Farm_Size:building.FarmType.Farm_Size,
            Percent_Farm:building.FarmType.Percent_Farm,
            Useful_farm_ID:useful_id,
            id:building.FarmType.id
        });
        building.LiveType&&arrUseful.push({Build_live_ID:building.LiveType.Build_live_ID,
            Live_Status:building.LiveType.Live_Status,
            Live_Size:building.LiveType.Live_Size,
            Percent_Live:building.LiveType.Percent_Live,
            Useful_live_ID:useful_id,
            id:building.LiveType.id
        });
        building.EmptyType&&arrUseful.push({Build_empty_ID:building.EmptyType.Build_empty_ID,
            Empty_Size:building.EmptyType.Empty_Size,
            Percent_Empty:building.EmptyType.Percent_Empty,
            Useful_empty_ID:useful_id,
            id:building.EmptyType.id
        });
        building.OtherType&&arrUseful.push({Build_other_ID:building.OtherType.Build_other_ID,
            Other_Size:building.OtherType.Other_Size,
            Percent_Other:building.OtherType.Percent_Other,
            Useful_other_ID:useful_id,
            id:building.OtherType.id
        });
        let obj_useful ={
            useful_id,
            Land_id:code_land,
            PercentPlaceBuild:PercentPlaceBuild.toFixed(2),
            // Place:building.Build_Total_Place /4,
            PriceUseful:Price,
            Special_Useful:"0",
            
            // ...seperate,
            Usage:false,
            UsefulLand_Tax_ID:Tax_Group.Category_Tax === "รัฐบาล" ? building.Build_Tax_ID :Tax_Group.uid_tax
            
        }  
        let body ={
            obj_useful,
            ArrType:arrUseful,
            PriceUseful,
            buildings,
            building,
            buildTax:building.Build_Tax_ID,
            UsefulLand_Tax_ID,
            usefulLandID
        }      
        axios.post('/api/acrossland',body).then(result=>{
            result.status === 203 && notification.warning({message:result.data.msg})
            setLand(lands.filter(land =>land.code_land !== code_land))
            notification.success({message:result.data.msg})
        }).catch(e=>{
            notification.error({message:'สร้างสิ้งปลูกสร้างคร่อมแปลงล้มเหลว'})
        })
    }
    
    const SetID =(useful,land_id)=>{
        if (useful.length ===0) {
          return `${land_id}-0${useful.length + 1}`;
        }
      let thelastIndex =  useful[useful.length - 1]
      let id = thelastIndex.useful_id.split("-")
      return `${land_id}-0${Number(id[id.length - 1])+1}`;
    };
    return (
        <div>
            <Button onClick={()=>setVisible(true)} style={{backgroundColor:'#32E8B9',color:'#7C0919'}}>{titleButton}</Button>
            <Modal 
            visible={visible}
            onCancel={()=>setVisible(false)}
            onOk={()=>setVisible(false)}
            width="50%"
            >
                <div style={{paddingTop:20}}>
                        <Input.Search  
                            placeholder="ค้นหาโฉนดที่ดินที่สิ่งปลูกสร้างคร่อมแปลง"
                            enterButton onSearch={onSearchLand}
                            >
                        </Input.Search>      
                
                    <LandTable lands ={lands} onSelectCross={onSelectLandCros}/>
                </div>
                
            </Modal>
        </div>
    )
}

export default BuildAccrossModal
