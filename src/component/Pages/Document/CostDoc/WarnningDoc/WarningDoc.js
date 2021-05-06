import React,{useState} from 'react'
import {Button,Modal,Table,Row,Col,Input,DatePicker, Divider,Checkbox,notification, Space,Popconfirm} from 'antd'
import {AppstoreAddOutlined, DeleteFilled} from '@ant-design/icons'
import axios from '../../../../../config/axios'
import {useDispatch} from 'react-redux';
import {FetchCost} from '../../../../../store/action/ConstDocAction'
import WarningModal from '../../../../Modal/WarningModal';
import WarningPdf from './WarningPdf';
function WarningDoc({costbook,warning_doc}) {
    const dispatch = useDispatch();
    let uniqueId = 0;
    const {Column} = Table;
    const [visible, setVisible] = useState(false);
    const DocRef = costbook?.CostBookNo
    const [NameWarning , setNameWarning] = useState(costbook?.SendTo)
    const [DateWarnning,setDateWarnning] = useState(null);
    const [DateAdd,setDateAdd] = useState(null);
    const [DateRate , setDateRate] = useState(null);
    const FinishDate = new Date(costbook?.FinishMonth)
    const [PercentMost,setPercentMost] = useState(false);
    const onChangeDateWarnning = (date,dateString)=>{
        let Setdate = new Date(dateString)
        setDateWarnning(Setdate);
    }
    const onChangeDateAdd = (date,dateString)=>{
        let Setdate = new Date(dateString)
        setDateAdd(Setdate);
    }
    const onChangeDateRate = (date,dateString)=>{
        let Setdate = new Date(dateString)
        setDateRate(Setdate);
    }
    const Bills = (FinishDate,PercentMost,DateAdd,totalPrice)=>{
        let monthFinish = FinishDate?.getMonth();
        let monthDateAdd = DateAdd?.getMonth();

        return {
            interestString:PercentMost?"40":"20",
            interestTotal:PercentMost?totalPrice * 0.004:totalPrice * 0.002,
            interestAdd : monthDateAdd - monthFinish >0?totalPrice * ((monthDateAdd - monthFinish) / 100):0,
            amountMonth :monthDateAdd - monthFinish >0 ?monthDateAdd - monthFinish:0
          }
    }
    const briefBills = Bills(FinishDate,PercentMost,DateAdd,costbook?.BriefTotal)
    let totalPricePay = costbook?.BriefTotal + briefBills?.interestTotal + briefBills?.interestAdd
    const onOk = () => {
        if(!NameWarning||!FinishDate||!DateWarnning||!DateAdd||!DateRate||
          !briefBills?.interestString||!briefBills?.interestTotal||!totalPricePay||
          !briefBills?.interestAdd||!DocRef){
          return  notification.warning({message:'กรุณากรอกข้อมูลให้ครบ'})
        }
        let body ={
            NameWarning,
            FinishDate,
            DateWarnning,
            DateAdd,
            DateRate,
            interestString:briefBills?.interestString,
            interestTotal:briefBills?.interestTotal,
            interestAdd:briefBills.interestAdd,
            totalPricePay,
            DocRef,
            interestMost:PercentMost,
            CostInWarning:costbook?.CostBookNo,
            EmployeeWarningID:costbook?.Employee_No,
            Year:costbook?.Year
        }
        axios.post('/api/savewarnigndoc',body).then((result) => {
            notification.success({message:'สร้างใบแจ้งเตือนเรียบร้อยแล้ว'})
            setVisible(false)
            dispatch(FetchCost(costbook?.CostBookNo))
        }).catch((err) => {
            notification.error({message:'บันทึกใบแจ้งเตือนล้มเหลว'})
        });
     
   }
   const onDeleteWarning = (id) => {
        axios.delete(`/api/deletewarning/${id}`).then((result) => {
            notification.success({message:`ลบใบเเจ้งเตือนรหัส ${id} เรียบร้อยแล้ว`})
            dispatch(FetchCost(costbook?.CostBookNo))

        }).catch((err) => {
            notification.error({message:`ลบใบเเจ้งเตือนรหัส ${id} ล้มเหลว`})
        });
    }
    return (
        <div>
            <Row>
                <Col span={24}>
                    <Button onClick={()=>setVisible(true)} ><AppstoreAddOutlined /> เพิ่มใบแจ้งเตือน</Button>
                    <Modal
                    visible={visible}
                    onCancel={()=>setVisible(false)}
                    title="แจ้งเตือนให้มาชำระภาษี"
                    width="75%"
                    onOk={onOk}
                    >
                        <Row>
                            <Col span={14}>
                                <h2>ข้อมูลใบแจ้งเตือน</h2>
                                <Row>
                                    <Col  span={22}>
                                        <h3>เรียน (ผู้ค้างชำระภาษี)</h3>
                                        <Input value={NameWarning} onChange={(e)=>setNameWarning(e.target.value)}/>
                                    </Col>
                                  
                                </Row>  
                                <Row>
                                    <Col span={12}>
                                        <h3>วันที่ออกใบแจ้งเตือน</h3>
                                        <DatePicker picker="date" onChange={onChangeDateWarnning}/>
                                    </Col>
                                    <Col span={12}>
                                        <h3>คำนวณถึงวันสุดท้ายของเดือน / ปี</h3>
                                        <DatePicker picker="date" onChange={onChangeDateAdd}/>
                                     
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
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                <Table dataSource={warning_doc}
                rowKey={(record)=>{
                    if (!record.__uniqueId)
                record.__uniqueId = ++uniqueId;
                return record.__uniqueId;
                }}
                >
                    <Column title="ลำดับ" dataIndex="IdWarning" key="IdWarning"/>
                    <Column title="ชื่อผู้ชำระภาษี" dataIndex="NameWarning"key="NameWarning"/>
                    <Column title="วันที่ออกใบแจ้ง" dataIndex="DateWarnning"key="DateWarnning"/>
                    <Column title="รวมภาษีพร้อมเบี้ยปรับเงินเพิ่ม" dataIndex="totalPricePay"key="totalPricePay"/>
                    <Column title="หนังสืออ้างอิง" dataIndex="DocRef"/>
                    <Column title="รายละเอียด" 
                        render={(_,record)=>
                        <Space>
                            <WarningModal costbook={costbook} warning_doc={record}/>
                            <WarningPdf WarningBook={record} costbook={costbook}/>
                            <Popconfirm title="คุณแน่ใจที่จะลบใช่หรือไม่"
                                okText="ยืนยัน" cancelText="ยกเลิก" onConfirm={()=>onDeleteWarning(record.IdWarning)}
                            >
                                <Button type="text"><DeleteFilled /></Button>
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

export default WarningDoc
