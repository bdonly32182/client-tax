import React,{useState} from 'react'
import { Modal ,Form,Button, notification} from 'antd';
import UsefulLandForm from '../Form/UsefulLandForm'
import {useDispatch} from 'react-redux'
import {create_useful_land,edit_useful} from '../../store/action/UsefulLandAction'
import TabsUseful from '../Tabs/TabsUseful';
function UsefulModal(props) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(props.visible);    
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModal = () => {
        setVisible(true);
        
    };
    const Split_place =(place)=>{
        let Obj_Place ={}
        if (place >= 400) {
            let RAI = Math.floor(place/400)
            Obj_Place.Useful_RAI=RAI
            let Mod_RAI = place % 400
            if (Mod_RAI >= 100) {
                let GNAN = Math.floor(Mod_RAI/100)
                let Mod_Metre = Mod_RAI % 100
                Obj_Place.Useful_GNAN=GNAN
                Obj_Place.Useful_WA= Mod_Metre
            }else{
                let Mod_Metre = Mod_RAI % 100
                Obj_Place.Useful_GNAN=0
                Obj_Place.Useful_WA= Mod_Metre               
            }
                   
        }
        if (place >= 100 && place <400) {
            let GNAN  = Math.floor(place/100)
            let WA = place % 100
            Obj_Place.Useful_RAI = 0
            Obj_Place.Useful_GNAN = GNAN
            Obj_Place.Useful_WA= WA
        }
        if (place<100) {
            Obj_Place.Useful_RAI =0
            Obj_Place.Useful_GNAN=0
            Obj_Place.Useful_WA = Number(place)
        }
        return Obj_Place
    }
    const handleOk = () => {
        form.validateFields()
            .then((values)=>{
               if (values.Place > props.balancePlace) {//เมื่อกรอกเนื้อที่เกินให้คืนค่าการแจ้งเตือนออกไปเพื่อให้กรอกใหม่
                  return  notification.error({message:'คุณกรอกเนื้อที่เกิน กรุณากรอกใหม่'});  
               }
               
             let separatePlace = Split_place(values.Place);

              setConfirmLoading(true);
              
              if (props.usefulTable) {
                   dispatch(edit_useful(values.useful_id,{...values,...separatePlace},props.usefulTable.Land_id));
              }else{
                    let useful_id =SetID(props.useful);
                  dispatch(create_useful_land({...values,...separatePlace,useful_id,Land_id:props.code_land ,UsefulLand_Tax_ID:props.tax_id_land},props.code_land));
    
              }
              setTimeout(() => {
            
                    setVisible(false);
                    setConfirmLoading(false);
            }, 2000);
            })
            .catch((info)=>{
                notification.error({message:"Validate Failed",info})
            })
        
        
    };
    const SetID =(useful)=>{
        if (useful.length ===0) {
          return `${props.code_land}-0${useful.length + 1}`;
        }
      let thelastIndex =  useful.slice(-1).pop()
      let id = thelastIndex.useful_id.split("-")
      return `${props.code_land}-0${Number(id[1])+1}`;
    }

    const handleCancel = () => {
        setVisible(false);
    };
    return (
        <>
            <Button type={props.type||"primary"} onClick={showModal} >
                {props.button}
            </Button>
            <Modal
            title={props.balancePlace&&`เพิ่มการใช้ประโยชน์ที่ดิน(เนื้อที่คงเหลือ : ${props.balancePlace})`}
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            width="50%"
            wrapClassName="center"
            style={{justifyContent:"center"}}
                > 
                {props.onEdit?<TabsUseful  formModal={form} useful ={props.usefulTable} />
                    :
                  <UsefulLandForm  formModal={form}   balancePlace={props.balancePlace}/>
                }

            </Modal>
    </>
    )
}

export default UsefulModal
