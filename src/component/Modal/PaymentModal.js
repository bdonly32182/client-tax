import React,{useState} from 'react'
import {Button,Modal,Row,Col,Input,DatePicker, Divider,notification,Form} from 'antd'
import {EditFilled} from '@ant-design/icons'
import {useDispatch} from 'react-redux'
import {FetchCost} from '../../store/action/ConstDocAction'
import axios from '../../config/axios';
import moment from 'moment'
function PaymentModal({costbook,payment}) {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const [visible, setVisible] = useState(false);
    const initalDaypay = new Date(payment.DayPay)
    const [DayPay,setDayPay] = useState(initalDaypay);
    const DateWarnning = new Date(costbook?.WarningDocs[costbook?.WarningDocs?.length - 1]?.DateWarnning)||null
    const WarningBook = costbook?.WarningDocs[costbook?.WarningDocs?.length - 1]||null
    const FinishDate = new Date(payment.FinishDate);   
    const onChangeDayPay = (date,dateString)=>{
        let Setdate = new Date(dateString)
        setDayPay(Setdate);
    }
    const BriefBills =(FinishDate,DateWarning,DayPay,totalPrice) => {
        
        let monthFinish = FinishDate?.getMonth();
        let monthDayPay = DayPay?.getMonth();//ใช้แทน วันที่เงินเพิ่มได้
        //  case 10 %
        if(DateWarning === null && monthFinish < monthDayPay){
            console.log('10%');
            return {
                interestString:"10",
                interestTotal:totalPrice * 0.1,
                interestAdd : totalPrice * 0.01,
                amountMonth :1
            }
        }
        //case  0 % 
        if(DateWarning === null && monthFinish >= monthDayPay){
            console.log('0%');

            return {
                interestString:"0",
                interestTotal:0,
                interestAdd : 0,
                amountMonth :0
            }
        }
        //case 20 percent
        let dateWarning = DateWarning?.getDate(); 
        let monthWarning = DateWarning?.getMonth();       
        let dateDayPay = DayPay?.getDate();
        if (monthDayPay>=monthWarning&&dateDayPay >= dateWarning&&dateDayPay - dateWarning <=15) {//ภายใน สิบห้าวัน
            return {
                interestString:"20",
                interestTotal:totalPrice * 0.2,
                interestAdd : totalPrice * ((monthDayPay - monthFinish) / 100),
                amountMonth :monthDayPay - monthFinish
            }
        }
        //case 10 percent ที่โดนแจ้งเตือนแต่มาจ่ายก่อน
        if (monthDayPay>=monthWarning&&dateDayPay < dateWarning) {//ภายใน สิบห้าวัน
            return {
                interestString:"10",
                interestTotal:totalPrice * 0.1,
                interestAdd : totalPrice * 0.01,
                amountMonth :1
            }
        }
        //case 40 percent
        if (monthDayPay>=monthWarning&&dateDayPay - dateWarning >=15) {//ภายใน สิบห้าวัน
            console.log('40%');

            return {
                interestString:"40",
                interestTotal:totalPrice * 0.4,
                interestAdd : totalPrice * ((monthDayPay - monthFinish) / 100),
                amountMonth :monthDayPay - monthFinish
            }
        }
    }
    const briefBills = BriefBills(FinishDate,DateWarnning,DayPay,costbook?.BriefTotal);
 
    let totalPricePay =costbook?.BriefTotal + briefBills?.interestTotal + briefBills?.interestAdd
    const onOk = () => {
        if(
          !briefBills?.interestString||!briefBills?.interestTotal||!totalPricePay||
          !briefBills?.interestAdd){
          return  notification.warning({message:'การคำนวณไม่ถูกต้องมีค่าที่ยังว่างอยู่'})
        }
        form.validateFields().then((values) => {
            let body ={
                ...values,
                fineString:briefBills?.interestString,
                FineTotal:briefBills?.interestTotal,
                FineAdd:briefBills?.interestAdd,
                totalPay:totalPricePay,
                amountMonth:briefBills?.amountMonth,
                }
            axios.put(`/api/updatepayment/${payment.PaymentID}`,body).then((result) => {
                notification.success({message:'แก้ไขคำร้องขอชำระภาษีเรียบร้อยแล้ว'});
                setVisible(false);
                dispatch(FetchCost(costbook?.CostBookNo))
            }).catch((err) => {
                notification.error({message:'บันทึกใบแจ้งเตือนล้มเหลว'})
            });  
        }).catch((err) => {
            
        });
        
     
   }
    return (
        <div>
          
                    <Button onClick={()=>setVisible(true)} type="text" style={{color:'#fdca40'}}><EditFilled /> </Button>
                    <Modal
                    visible={visible}
                    onCancel={()=>setVisible(false)}
                    title="แจ้งเตือนให้มาชำระภาษี"
                    width="75%"
                    onOk={onOk}
                    >
                        <Row>
                            <Col span={12}>
                                <h2>ข้อมูลใบคำร้องขอชำระเงินภาษี</h2>
                                <Form form={form} 
                                    initialValues={{
                                        ...payment,
                                        "PricePay":costbook?.BriefTotal,
                                        "DateRate":moment(payment.DateRate),
                                        "DayPay":moment(payment.DayPay)
                                    }}
                                >
                                    <h3>ได้รับคำร้องจาก</h3>
                                    <Form.Item name="NamePayment" >
                                            <Input />
                                    </Form.Item>
                                    <h3>ที่อยู่</h3>
                                    <Form.Item name="PaymentAddress">
                                        <TextArea  showCount maxLength={220} size="large" />
                                    </Form.Item>
                                        <h2>วันที่รับคำร้องและจำนวนเงิน</h2>
                                    <Form.Item>
                                        <Input.Group compact>
                                                <Col span={24}>
                                                    <h3>วันที่รับคำร้อง</h3>
                                                    <Form.Item name="DayPay">
                                                        <DatePicker  onChange={onChangeDayPay}/>    
                                                    </Form.Item>
                                               
                                                </Col>
                                                <Col span={24} >
                                                    <h3>ค่าภาษีที่ดินและสิ่งปลูกสร้าง (บาท)</h3>
                                                    <Form.Item name="PricePay" >
                                                    <Input />  
                                                    </Form.Item>
                                                    
                                                </Col>   
                                            
                                        </Input.Group>
                                    </Form.Item>
                                        <Divider />
                                        <h2>อ้างอิงหนังสือแจ้งการประเมิน</h2> 
                                    <Form.Item>
                                        <Input.Group compact>  
                                           <Col span={11}>
                                                <Form.Item label="เลขหนังสืออ้างอิง" name="CostInPayID">
                                                    <Input disabled={true} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={1}/>
                                            <Col  span={11}>
                                                <Form.Item label="วันที่ประเมิน" name="DateRate">
                                                    <DatePicker  />      
                                                </Form.Item>
                                            </Col>  
                                        </Input.Group>
                                    </Form.Item>
                                </Form>
                                <Divider />
                            </Col>
                            <Col span={2}/>
                            <Col span={10} >
                                    <div style={{width:'100vh',height:100}}>
                                        <h2>อ้างอิงหนังสือแจ้งเตือน</h2>
                                        <h3>เลขที่เอกสารล่าสุด : {WarningBook?.IdWarning ||'-'}</h3>
                                        <h3>กำหนดชำระภายในวันที่ : {new Date(WarningBook?.DateWarnning)?.toLocaleDateString('th-TH', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        }) || ' '}</h3>
                                    </div>
                                    <Divider />
                                    <h3>{`กำหนดชำระภายในวันที่ ${FinishDate?.toLocaleDateString('th-TH', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                                })}`
                                        }
                                    </h3>
                                    <h3>{`วันที่ออกใบคำร้อง: ${DayPay?DayPay?.toLocaleDateString('th-TH', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                                }):'โปรดระบุวันรับคำร้อง'}`}</h3>
                                
                                    <h3>{`ค่าภาษีที่ดินและสิ่งปลูกสร้าง	 : ${costbook?.BriefTotal.toLocaleString(undefined,{minimumFractionDigits: 2,
                                        maximumFractionDigits: 2})}`}</h3>
                                    <h3>{`เบี้ยปรับ ร้อยละ ${briefBills?.interestString||'0'} : `} <b>{briefBills?.interestTotal?.toLocaleString(undefined,{minimumFractionDigits: 2,
                                        maximumFractionDigits: 2})}</b></h3>
                                    <h3>{`เงินเพิ่มกรณีชําระเกินกําหนดเวลา ${briefBills?.amountMonth||'-'} เดือน : ${briefBills?.interestAdd?.toLocaleString(undefined,{minimumFractionDigits: 2,
                                        maximumFractionDigits: 2})||0}`}</h3>
                                    <h3>{`รวมทั้งสิ้น	 : ${briefBills?.interestTotal!==undefined &&briefBills?.interestAdd!== undefined?
                                        (totalPricePay).toLocaleString(undefined,{minimumFractionDigits: 2,
                                        maximumFractionDigits: 2}):'กรุณาเลือกวันที่รับชำระไม่ถูกต้อง'}`}</h3>
                            
                            </Col>
                        </Row>
                        
                    </Modal>
              
        </div>
    )
}

export default PaymentModal
