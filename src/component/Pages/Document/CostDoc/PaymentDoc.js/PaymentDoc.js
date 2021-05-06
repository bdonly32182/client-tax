import React,{useState} from 'react'
import {Button,Modal,Table,Row,Col,Input,DatePicker, Divider,notification, Space, Popconfirm} from 'antd'
import {AppstoreAddOutlined,PrinterFilled ,DeleteFilled} from '@ant-design/icons'
import axios from '../../../../../config/axios'
import {useDispatch} from 'react-redux'
import {FetchCost} from '../../../../../store/action/ConstDocAction'
import PaymentModal from '../../../../Modal/PaymentModal'
import PaymentPdf from './PaymentPdf'
function PaymentDoc({costbook,payment_doc}) {
    let uniqueId = 0;
    const {Column} = Table;
    const dispatch = useDispatch();
    let address = costbook?.Tax_Group?.Address
    const { TextArea } = Input;
    const [visible, setVisible] = useState(false);
    const DocRef = costbook?.CostBookNo
    const [NameWarning , setNameWarning] = useState(costbook?.SendTo);
    const [PaymentAddress,setPaymentAddress] = useState(`บ้านเลขที่ ${address?.Num_House} หมู่ ${address?.Moo} ถนน ${address?.Road_Name} ซอย  ${address?.Soi} แขวง ${address?.Tambol} เขต ${address?.district_name} จ.${address?.Changwat} ${address?.Post_No}`);
    const [DayPay,setDayPay] = useState(null);
    const [DateRate , setDateRate] = useState(null);
    const DateWarnning = costbook?.WarningDocs?.length>0? new Date(costbook?.WarningDocs[costbook?.WarningDocs?.length - 1]?.DateWarnning):null
    const WarningBook = costbook?.WarningDocs[costbook?.WarningDocs?.length - 1]||null
    const FinishDate = new Date(costbook?.FinishMonth)   
    const onChangeDayPay = (date,dateString)=>{
        let Setdate = new Date(dateString)
        setDayPay(Setdate);
    }
    const onChangeDateRate = (date,dateString)=>{
        let Setdate = new Date(dateString)
        setDateRate(Setdate);
    }
    const BriefBills =(FinishDate,DateWarning,DayPay,totalPrice) => {
        console.log('broef',DateWarning);
        let monthFinish = FinishDate?.getMonth();
        let monthDayPay = DayPay?.getMonth();//ใช้แทน วันที่เงินเพิ่มได้
        //  case 10 %
        if(DateWarning === null && monthFinish < monthDayPay){
            console.log('case 10');
            return {
                interestString:"10",
                interestTotal:totalPrice * 0.1,
                interestAdd : totalPrice * 0.01,
                amountMonth :1
            }
        }
        //case  0 %
        if(DateWarning === null && monthFinish >= monthDayPay){
            console.log('case 0');
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
            console.log('case 20');
            return {
                interestString:"20",
                interestTotal:totalPrice * 0.2,
                interestAdd : totalPrice * ((monthDayPay - monthFinish) / 100),
                amountMonth :monthDayPay - monthFinish
            }
        }
        //case 10 percent ที่โดนแจ้งเตือนแต่มาจ่ายก่อน
        if (monthDayPay>=monthWarning&&dateDayPay < dateWarning) {//ภายใน สิบห้าวัน
            console.log('case 102');
            return {
                interestString:"10",
                interestTotal:totalPrice * 0.1,
                interestAdd : totalPrice * 0.01,
                amountMonth :1
            }
        }
        //case 40 percent
        if (monthDayPay>=monthWarning&&dateDayPay - dateWarning >=15) {//ภายใน สิบห้าวัน
            console.log('case 40');
            return {
                interestString:"40",
                interestTotal:totalPrice * 0.4,
                interestAdd : totalPrice * ((monthDayPay - monthFinish) / 100),
                amountMonth :monthDayPay - monthFinish
            }
        }
    }
    console.log(DateWarnning);
    const briefBills = BriefBills(FinishDate,DateWarnning,DayPay,costbook?.BriefTotal);
    let totalPricePay =costbook?.BriefTotal + briefBills?.interestTotal + briefBills?.interestAdd
   
    const onOk = () => {
        if(!NameWarning||!FinishDate||!DayPay||!DateRate||
          !briefBills?.interestString||!briefBills?.interestTotal||!totalPricePay||
          !briefBills?.interestAdd||!DocRef){
          return  notification.warning({message:'กรุณากรอกข้อมูลให้ครบ'})
        }
        let body ={
            NamePayment:NameWarning,
            FinishDate,
            DayPay,
            DateRate,
            fineString:briefBills?.interestString,
            FineTotal:briefBills?.interestTotal,
            FineAdd:briefBills?.interestAdd,
            totalPay:totalPricePay,
            CostInPayID:costbook?.CostBookNo,
            DocRef,
            PaymentAddress:PaymentAddress,
            WarningInPayID:WarningBook?.IdWarning||null,
            EmployeePaymentID:costbook?.Employee_No,
            Year:costbook?.Year,
            amountMonth:briefBills?.amountMonth
            }
        axios.post(`/api/savepaymentdoc`,body).then((result) => {
            notification.success({message:'สร้างใบขอชำระภาษีเรียบร้อยแล้ว'});
            setVisible(false);
            dispatch(FetchCost(costbook?.CostBookNo))
        }).catch((err) => {
            notification.error({message:'บันทึกใบแจ้งเตือนล้มเหลว'})
        });
     
   }
   const onDeletePayment = id => {
       axios.delete(`/api/deletepayment/${id}`).then((result) => {
           notification.success({message:`ลบใบคำร้องขอชำระภาษีรหัส ${id} เรียบร้อยแล้ว`})
           dispatch(FetchCost(costbook?.CostBookNo))
       }).catch((err) => {
           notification.error({message:`ลบใบคำร้องขอชำระภาษีรหัส ${id} ล้มเหลว`})
       });
   }
    return (
        <div>
           <Row>
                <Col span={24}>
                    <Button onClick={()=>setVisible(true)} ><AppstoreAddOutlined /> บันทึกการชำระ</Button>
                    <Modal
                    visible={visible}
                    onCancel={()=>setVisible(false)}
                    title="แจ้งเตือนให้มาชำระภาษี"
                    width="75%"
                    onOk={onOk}
                    >
                        <Row>
                            <Col span={14}>
                                <h2>ข้อมูลใบคำร้องขอชำระเงินภาษี</h2>
                                <Row>
                                    <Col  span={22}>
                                        <h3>ได้รับคำร้องจาก</h3>
                                        <Input value={NameWarning} onChange={(e)=>setNameWarning(e.target.value)}/>
                                    </Col>
                                  
                                </Row> 
                                <Row style={{paddingTop:'15px'}}>
                                    <Col span={22}>
                                    <TextArea value={PaymentAddress} showCount maxLength={220} 
                                    onChange={(e)=>setPaymentAddress(e.target.value)} size="large" />
                                    </Col>
                                </Row> 
                                <Divider />
                                <h2>วันที่รับคำร้องและจำนวนเงิน</h2>
                                <Row>
                                
                                    <Col span={12}>
                                        <h3>วันที่รับคำร้อง</h3>
                                        <DatePicker picker="date" onChange={onChangeDayPay}/>
                                    </Col>
                                    <Col span={12}>
                                        <h3>ค่าภาษีที่ดินและสิ่งปลูกสร้าง (บาท)</h3>
                                      <Input value={costbook?.BriefTotal.toFixed(2)}/>
                                    </Col>
                                </Row>
                                <Divider />
                                    <h2>อ้างอิงหนังสือแจ้งการประเมิน</h2>
                                <Row>
                                    
                                    <Col span={11}>
                                    <h3>เลขหนังสืออ้างอิง</h3>
                                        <Input disabled={true} value={DocRef}/>
                                    </Col>
                                    <Col span={1}/>
                                    <Col  span={11}>
                                        <h3>วันที่ประเมิน</h3>
                                        <DatePicker picker="date" onChange={onChangeDateRate}/>      
                                    </Col>
                                </Row>
                            </Col>
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
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                <Table
                dataSource={payment_doc&&[payment_doc]}
                rowKey={(record)=>{
                    if (!record.__uniqueId)
                record.__uniqueId = ++uniqueId;
                return record.__uniqueId;
                }}
                >
                    <Column title="ลำดับ" dataIndex="PaymentID"/>
                    <Column title="ชื่อผู้ชำระภาษี" dataIndex="NamePayment"/>
                    <Column title="วันที่ออกใบแจ้ง" dataIndex="DateRate"/>
                    <Column title="รวมภาษีพร้อมเบี้ยปรับเงินเพิ่ม" dataIndex="totalPay"/>
                    <Column title="หนังสืออ้างอิง" dataIndex="CostInPayID"/>
                    <Column title="รายละเอียด" 
                    render={(_,record)=>
                    <Space>
                        <PaymentModal costbook={costbook}  payment={record} />
                        <PaymentPdf costbook={costbook} payment={record}/>
                        <Popconfirm onConfirm={()=>onDeletePayment(record.PaymentID)}
                        okText = "ยืนยัน" cancelText="ยกเลิก" title="คุณแน่ใจที่จะลบใช่หรือไม่"
                        >
                            <Button type="text" style={{color:'#fb3640'}} ><DeleteFilled /></Button>    
                        </Popconfirm>
                        
                        
                    </Space>
                    }
                    />
                </Table>
                </Col>
            </Row>
             
        </div>
    )
}

export default PaymentDoc
