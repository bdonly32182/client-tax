import React,{useState} from 'react';
import {Modal,Button,Form,Row,Col,Input,DatePicker,Checkbox,notification,Divider} from 'antd';
import {EditFilled} from '@ant-design/icons'
import moment from 'moment'
import axios from '../../config/axios';
import {useDispatch} from 'react-redux'
import {FetchCost} from '../../store/action/ConstDocAction'
function WarningModal({warning_doc,costbook}) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [visible,setVisible] = useState(false);
    const [DateWarnning,setDateWarnning] = useState(new Date(warning_doc?.DateWarnning));
    const [DateAdd,setDateAdd] = useState(new Date(warning_doc?.DateAdd));
    const [PercentMost,setPercentMost] = useState(false);
    const FinishDate = new Date(warning_doc?.FinishDate)
    const onChangeDateWarnning = (date,dateString)=>{
        let Setdate = new Date(dateString)
        setDateWarnning(Setdate);
    }
    const onChangeDateAdd = (date,dateString)=>{
        let Setdate = new Date(dateString)
        setDateAdd(Setdate);
    }
   
    const Bills = (FinishDate,PercentMost,DateAdd,totalPrice)=>{
        let monthFinish = FinishDate?.getMonth();
        let monthDateAdd = DateAdd?.getMonth();

        return {
            interestString:PercentMost?"40":"20",
            interestTotal:PercentMost?totalPrice * 0.4:totalPrice * 0.2,
            interestAdd : monthDateAdd - monthFinish >0?totalPrice * ((monthDateAdd - monthFinish) / 100):0,
            amountMonth :monthDateAdd - monthFinish >0 ?monthDateAdd - monthFinish:0
          }
    }
    const briefBills = Bills(FinishDate,PercentMost,DateAdd,costbook?.BriefTotal)
    let totalPricePay = costbook?.BriefTotal + briefBills?.interestTotal + briefBills?.interestAdd
    const onOk = () => {
        if(
          !briefBills?.interestString||!briefBills?.interestTotal||!totalPricePay||
          !briefBills?.interestAdd){
          return  notification.warning({message:'การคำนวณไม่ถูกต้องมีค่าที่ยังว่างอยู่'})
        }
        form.validateFields().then((values) => {
            let body ={
                ...values,
                interestString:briefBills?.interestString,
                interestTotal:briefBills?.interestTotal,
                interestAdd:briefBills.interestAdd,
                totalPricePay,
                interestMost:PercentMost,
               
            }
            axios.put(`/api/updatewarning/${warning_doc?.IdWarning}`,body).then((result) => {
                notification.success({message:'สร้างใบแจ้งเตือนเรียบร้อยแล้ว'})
                setVisible(false)
                dispatch(FetchCost(costbook?.CostBookNo))
            }).catch((err) => {
                notification.error({message:'บันทึกใบแจ้งเตือนล้มเหลว'})
            });  
        }).catch((err) => {
            
        });
       
     
   }
   
    return (
        <div>
            <Button onClick={()=>setVisible(true)} type="text"><EditFilled /></Button>
            <Modal visible={visible}
            onCancel={()=>setVisible(false)}
            onOk={onOk}
            width="70%"
            >
                <Row>
                    <Col span={12}>
                        <h2>ข้อมูลใบแจ้งเตือน</h2>
                       <Form form={form}
                            initialValues={{
                               ...warning_doc,
                               "DateWarnning":moment(warning_doc?.DateWarnning),
                               "DateAdd":moment(warning_doc?.DateAdd),
                               "DateRate":moment(warning_doc?.DateRate)
                            }}
                       >
                            <h3>เรียน (ผู้ค้างชำระภาษี)</h3>
                            <Form.Item name="NameWarning">
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Input.Group compact>
                                    <Col span={12}>
                                        <h3>วันที่ออกใบแจ้งเตือน</h3>
                                        <Form.Item name="DateWarnning">
                                         <DatePicker picker="date" onChange={onChangeDateWarnning}/>   
                                        </Form.Item>
                                        
                                    </Col>
                                    <Col span={12}>
                                        <h3>คำนวณถึงวันสุดท้ายของเดือน / ปี</h3>
                                        <Form.Item name="DateAdd">
                                            <DatePicker picker="date" onChange={onChangeDateAdd}/>    
                                        </Form.Item>
                                        
                                    </Col>
                                </Input.Group>
                            </Form.Item>
                            <Divider />
                                    <h2>อ้างอิงหนังสือแจ้งการประเมิน</h2>
                            <Form.Item>
                                <Input.Group compact>
                                    <Col span={12}>
                                        <h3>เลขหนังสืออ้างอิง</h3>
                                        <Form.Item name="DocRef">
                                         <Input disabled={true}/>  
                                        </Form.Item>
                                        
                                    </Col>
                                    <Col span={12}>
                                        <h3>วันที่ประเมิน</h3>
                                        <Form.Item name="DateRate">
                                            <DatePicker picker="date" />    
                                        </Form.Item>
                                        
                                    </Col>
                                </Input.Group>
                            </Form.Item>
                           
                        </Form> 
                    </Col>
                    <Col span={2}/>
                    <Col span={10}>
                        <h3>{`กำหนดชำระภายในวันที่ ${FinishDate?.toLocaleDateString('th-TH', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        })}`
                                }
                            </h3>
                            <h3>{`วันที่ออกใบแจ้งเตือน : ${DateWarnning?DateWarnning?.toLocaleDateString('th-TH', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        }):'โปรดระบุวันที่เเจ้งเตือน'}`}</h3>
                            <h3>{`เบี้ยปรับและเงินเพิ่มคำนวณถึงวันที่ : ${DateAdd?DateAdd?.toLocaleDateString('th-TH', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        }):`โปรดระบุวันสุดท้ายของเดือน`}`}</h3>
                            <h3>เบี้ยปรับสูงสุด (ร้อยละ 40) : <Checkbox  onChange={(value)=>setPercentMost(!PercentMost)}/>   บังคับปรับสูงสุด</h3>
                            <h2>คำนวณยอดเงินได้ดังต่อไปนี้</h2>
                            <h3>{`ค่าภาษีที่ดินและสิ่งปลูกสร้าง	 : ${costbook?.BriefTotal.toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2})}`}</h3>
                            <h3>{`เบี้ยปรับ ร้อยละ ${briefBills?.interestString||'0'} : `} <b>{briefBills?.interestTotal?.toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2})}</b></h3>
                            <h3>{`เงินเพิ่มกรณีชําระเกินกําหนดเวลา ${briefBills?.amountMonth||'-'} เดือน : ${briefBills?.interestAdd?.toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2})||0}`}</h3>
                            <h3>{`รวมทั้งสิ้น	 : ${(totalPricePay).toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2})||0}`}</h3>
                    </Col>
                </Row>
            </Modal>
            
        </div>
    )
}

export default WarningModal
