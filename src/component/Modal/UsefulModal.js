import React,{useState} from 'react'
import { Modal ,Form,Button, notification,Input} from 'antd';
import UsefulLandForm from '../Form/UsefulLandForm'
import {useDispatch} from 'react-redux'
import {create_useful_land,edit_useful} from '../../store/action/UsefulLandAction'
import TabsUseful from '../Tabs/TabsUseful';
import axios from '../../config/axios';
import UsefulTaxTable from '../Table/UsefulTaxTable';
function UsefulModal(props) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(props.visible);    
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [taxID,setTaxID] = useState(props.tax_id_land);
    const [customers,setCustomers] = useState([]);
    const [name,setName] = useState('');
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
                Obj_Place.Useful_GNAN=GNAN.toFixed(2)
                Obj_Place.Useful_WA= Mod_Metre.toFixed(2)
            }else{
                let Mod_Metre = Mod_RAI % 100
                Obj_Place.Useful_GNAN=0
                Obj_Place.Useful_WA= Mod_Metre    .toFixed(2)           
            }
                   
        }
        if (place >= 100 && place <400) {
            let GNAN  = Math.floor(place/100)
            let WA = place % 100
            Obj_Place.Useful_RAI = 0
            Obj_Place.Useful_GNAN = GNAN.toFixed(2)
            Obj_Place.Useful_WA= WA.toFixed(2)
        }
        if (place<100) {
            Obj_Place.Useful_RAI =0
            Obj_Place.Useful_GNAN=0
            Obj_Place.Useful_WA = Number(place).toFixed(2)
        }
        return Obj_Place
    };
    const handleOk = () => {
        form.validateFields()
            .then((values)=>{
               if (values.Place > props.balancePlace) {//เมื่อกรอกเนื้อที่เกินให้คืนค่าการแจ้งเตือนออกไปเพื่อให้กรอกใหม่
                  return  notification.error({message:'คุณกรอกเนื้อที่เกิน กรุณากรอกใหม่'});  
               }
               
             let separatePlace = Split_place(values.Place);

              setConfirmLoading(true);
              
              if (props.usefulTable) {
                   dispatch(edit_useful(values.useful_id,{...values,...separatePlace,PriceUseful:props.PriceLand},props.usefulTable.Land_id));
              }else{
                    let useful_id =SetID(props.useful);
                    // props.PriceLand
                  dispatch(create_useful_land({
                      ...values,...separatePlace,useful_id,Land_id:props.code_land 
                    ,UsefulLand_Tax_ID:taxID,
                    PriceUseful:props.PriceLand
                    },props.code_land));
    
              }
              setTimeout(() => {
            
                    setVisible(false);
                    setConfirmLoading(false);
            }, 1500);
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
    };

    const handleCancel = () => {
        setVisible(false);
    };
    const onSelectTax = id => {
        setTaxID(id);
    };
    const onSearchName = value => {
        console.log(value);
        axios.get(`/api/search?name=${value}`).then((result) => {
            console.log(result.data);
            result.data.length<=0 && notification.warning({message:'ไม่มีผู้เสียภาษีรายนี้ในระบบ'})
            setCustomers(result.data)
        }).catch((err) => {
            notification.error({message:'ค้นหาข้อมูลผู้เสียภาษีล้มเหลว'})
        });
    }
  
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
            width="60%"
            wrapClassName="center"
            style={{justifyContent:"center"}}
                > 
                {props.onEdit?<TabsUseful  formModal={form} useful ={props.usefulTable} />
                    :
                    <>
                    {props.categoryTax&&props.categoryTax ==="รัฐบาล" &&props.tax_id_land=== taxID?
                    <>
                    <b style={{color:'#D12B49'}}>เนื่องจากรหัสผู้เสียภาษีที่ดินแปลงนี้เป็นของรัฐบาล ดังนั้นจึงต้องเลือกรหัสผู้เสียภาษีของผู้เช่าให้กับการใช้ประโยชน์ที่ดิน</b>
                    
                    <Input.Search placeholder="ค้นหาชื่อผู้เสียภาษี" enterButton
                            onChange={(e)=>setName(e.target.value)}
                            onSearch={()=>onSearchName(name)}
                    ></Input.Search>
                    <p style={{padding:15}}>{`รหัสผู้เสียภาษีของ ${name} `}</p>
                    <UsefulTaxTable customers={customers} onSelectTax={onSelectTax}/>
                    </>
                    :
                    <UsefulLandForm  formModal={form}   balancePlace={props.balancePlace}/>
                    }
                  </>
                }

            </Modal>
    </>
    )
}

export default UsefulModal
