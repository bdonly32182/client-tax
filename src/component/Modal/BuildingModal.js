import React,{useState} from 'react'
import {Modal,Button,Form,notification} from 'antd'
import {useDispatch} from 'react-redux'
import BuildingForm from '../Form/BuildingForm'
import {depreciate} from '../Select/data'
import {create_building,edit_building} from '../../store/action/BuildingAction'
import TabsBuild from '../Tabs/TabsBuild'
function BuildingModal(props) {
    const dispatch =useDispatch();
    const [form] = Form.useForm();
    const [visible,setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    let usefulTypeAll = [];   
    const onOk =() => {
        setConfirmLoading(true);
        form.validateFields()
            .then(async(values)=>{
                let date =new Date()
                let nowYear = date.getFullYear() + 543
                let findAge =values.Age_Build>2000?nowYear-values.Age_Build:values.Age_Build
                let Build_Total_Place = +values.Farm_Size+  + values.Live_Size+ + values.Other_Size+ + values.Empty_Size;
               if (props.onEdit&&props.building) {
                   let {FarmType,LiveType,OtherType,EmptyType,Build_Id} = props.building
                   values.Farm_Size >0&&values.Percent_Farm > 0 &&usefulTypeAll.push({Farm_Size:values.Farm_Size,Percent_Farm:values.Percent_Farm,Build_farm_ID:Build_Id,id:FarmType?.id});
                   values.Live_Size >0&&values.Percent_Live> 0 &&usefulTypeAll.push({Live_Size:values.Live_Size,Percent_Live:values.Percent_Live,Live_Status:values.Live_Status,Build_live_ID:Build_Id,id:LiveType?.id});
                   values.Other_Size > 0&&values.Percent_Other > 0&& usefulTypeAll.push({Other_Size:values.Other_Size,Percent_Other:values.Percent_Other,Build_other_ID:Build_Id,id:OtherType?.id});
                   values.Empty_Size > 0 &&values.Percent_Empty > 0 && usefulTypeAll.push({Empty_Size:values.Empty_Size,Percent_Empty:values.Percent_Empty,Build_empty_ID:Build_Id,id:EmptyType?.id,
                                         EmptyAbsolute:values.EmptyAbsolute,StartYear:values.StartYear<2000?nowYear - values.StartYear:values.StartYear
                                    });                    
                    let find_percent = await depreciate.find(obj => obj.Age === +findAge && obj.category === values.StyleBuilding);
                    let Percent_Age = (find_percent&& find_percent.percent) || 0;
                    let body ={
                        ...values,
                        Age_Build:values.Age_Build>2000?nowYear-values.Age_Build:values.Age_Build,
                        Percent_Age,
                        Build_Total_Place,
                        usefulTypeAll:usefulTypeAll,
                    };
                  return  dispatch(edit_building(body,props.useful_id,props.code_land));
               }
                let Build_Id = setBuildingID(props.buildings);
               //usefulAll  props.useful_id
                values.Farm_Size !== 0&&usefulTypeAll.push({Farm_Size:values.Farm_Size,Percent_Farm:Math.floor((values.Farm_Size/Build_Total_Place*100)*100 )/100,Build_farm_ID:Build_Id});
                values.Live_Size !==0&&usefulTypeAll.push({Live_Size:values.Live_Size,Percent_Live:Math.floor((values.Live_Size/Build_Total_Place*100)*100)/100,Live_Status:values.Live_Status,Build_live_ID:Build_Id});
                values.Other_Size !== 0&& usefulTypeAll.push({Other_Size:values.Other_Size,Percent_Other:Math.floor((values.Other_Size/Build_Total_Place*100)*100)/100,Build_other_ID:Build_Id});
                values.Empty_Size !== 0 && usefulTypeAll.push({Empty_Size:values.Empty_Size,Percent_Empty:Math.floor((values.Empty_Size / Build_Total_Place*100)*100) / 100,Build_empty_ID:Build_Id,
                                EmptyAbsolute:values.EmptyAbsolute,StartYear:values.StartYear<2000?nowYear - values.StartYear:values.StartYear
                                     });
                
                //Percen_Age
                let find_percent =await depreciate.find(obj => obj.Age === +findAge && obj.category === values.StyleBuilding);
                let Percent_Age = (find_percent&& find_percent.percent) || 0;
                let body ={
                    ...values,
                    Age_Build:values.Age_Build>2000?nowYear-values.Age_Build:values.Age_Build,
                    Percent_Age,
                    Build_Total_Place,
                    Build_Tax_ID:props.uid_tax,
                    Build_Id,
                    usefulTypeAll:usefulTypeAll,
                    useful_id:props.useful_id
                }
                dispatch(create_building(body,props.useful_id));
            })
            .catch((info)=>{
                    notification.error({message:"Validate Failed",info})
                })
        setTimeout(() => {
            
            setVisible(false);
            setConfirmLoading(false);
        }, 1500);
    }
    const onShow = () => {
        setVisible(true)
    }
    const onCancle =() =>{
        setVisible(false)
    }
    const setBuildingID =(arrBuild) => {
        if (arrBuild.length === 0) {
            return `${props.useful_id}-${arrBuild.length + 1}`
        }
       let LastIndex = arrBuild.pop();
       let buildSeparate = LastIndex.Build_id_in_Useful.split("-")
       return `${props.useful_id}-${Number(buildSeparate[2]) + 1}`
    }
    return (
        <>
            <Button onClick={()=>onShow()}type="link" 
            style={props.style||{backgroundColor:"green",color:"whitesmoke"}}
            disabled={props.isAccross||props.Special_Useful===100?true:false}
            > {props.button}</Button>
            <Modal 
            visible={visible}
            onOk={onOk}
            onCancel={onCancle}
            confirmLoading={confirmLoading}
            width="70%"
            >   
            {props.onEdit&&props.building?<div><TabsBuild building={props.building} TypeName={props.TypeName} 
            formModal ={form} useful_id={props.useful_id} PriceUseful={props.PriceUseful} buildings={props.buildings}
            UsefulLand_Tax_ID={props.UsefulLand_Tax_ID}
            /></div>
            :<BuildingForm TypeName={props.TypeName} formModal ={form} uid_tax={props.uid_tax} />

            }
            
            </Modal>
        </>
    )
}
export default BuildingModal
