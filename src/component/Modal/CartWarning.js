import React,{useState} from 'react'
import {Button,Table,Modal,Row,Col,DatePicker,Progress} from 'antd'
import axios from '../../config/axios'
function CartWarning({onSearchWarning,warning,setWarning}) {
    let uniqueId = 0;
    const {Column} = Table;
    const [visible, setVisible] = useState(false);
    const [selectRows,setSelectRows] = useState([]);
    const [DateWarnning,setDateWarnning] = useState(null);
    const [DateAdd,setDateAdd] = useState(null);
    const [DateRate , setDateRate] = useState(null);
    const [amountSuccess,setAmountSuccess] = useState(0);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          setSelectRows(selectedRows)
        },
      
      };
    const onSaveAndCancel =async()=>{
            for (const [keys,row] of selectRows.entries()) {
                let monthFinish = new Date(row.FinishMonth).getMonth();
                let monthDateAdd = DateAdd?.getMonth();
                let interestTotal =row?.BriefTotal * 0.002;
                let interestAdd = monthDateAdd - monthFinish >0?row?.BriefTotal  * ((monthDateAdd - monthFinish) / 100):0
                let totalPricePay = row?.BriefTotal + interestTotal + interestAdd
                let body ={
                    NameWarning:row?.SendTo,
                    FinishDate:row?.FinishMonth,
                    DateWarnning,
                    DateAdd,
                    DateRate,
                    interestString:"20",
                    interestTotal,
                    interestAdd,
                    totalPricePay,
                    DocRef:row?.CostBookNo,
                    interestMost:false,
                    CostInWarning:row?.CostBookNo,
                    EmployeeWarningID:row?.Employee_No,
                    Year:row?.Year
                }
                
                await axios.post(`/api/savewarnigndoc`,body);
            
                setAmountSuccess(amountSuccess + keys + 1);
            }   
    }
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
    const onCancelAndOk = ()=>{
        setWarning([]);
        setVisible(false);
        setSelectRows([])
    }
   let handleButton = selectRows.length>0
   let conditionStart = DateAdd && DateWarnning && DateRate
   let conditionMax = amountSuccess >= selectRows.length
    return (
        <div>
                
                                
            <Button onClick={()=>setVisible(true)}>
                Cart Warning
            </Button>
            <Modal 
            visible={visible}
            onCancel={onCancelAndOk}
            onOk={onCancelAndOk}
            width="50%">
                <Row>
                    <Col span={8}>
                        <h3>วันที่ออกใบแจ้งเตือน</h3>
                        <DatePicker picker="date" onChange={onChangeDateWarnning} disabled={handleButton}/>
                    </Col>
                    <Col span={8}>
                        <h3>คำนวณถึงวันสุดท้ายของเดือน / ปี</h3>
                        <DatePicker picker="date" onChange={onChangeDateAdd} disabled={handleButton}/>
                                     
                    </Col>
                    <Col  span={8}>
                        <h3>วันที่ประเมิน</h3>
                        <DatePicker picker="date" onChange={onChangeDateRate} disabled={handleButton}/>      
                    </Col>
                </Row>
                <Row style={{paddingTop:'20px',marginLeft:'35%'}}>
                    <Col>
                    <Button onClick={()=>onSearchWarning()} disabled={!conditionStart || handleButton}>Search</Button>
                    </Col>
                    <Col>
                    {handleButton && <Button disabled={conditionMax} onClick={onSaveAndCancel}>{'เริ่มการบันทึกใบแจ้งเตือน'}</Button>}
                    </Col>
                </Row>
                {selectRows.length>0 &&
                <>
                    <Row>
                        <div>
                            <b>{`ที่เลือกอยู่ทั้งสิ้น ${selectRows.length} `}</b>     
                            <b style={{paddingLeft:'780px'}}>{`${amountSuccess}/${warning.length}`} </b>          
                        </div>
                    </Row>
                    <Row>
                            <Progress
                                    strokeColor={{
                                        '0%': '#108ee9',
                                        '100%': '#87d068',
                                    }}
                                    percent={100 * (amountSuccess/warning.length)}
                            />
                    </Row>
                </>
                }
                <div style={{padding:'20px'}}>
                    <p><b>หมายเหตุตะกร้าใบเเจ้งเตือนชำระเงิน</b></p>
                    <p>- ค้นหาเฉพาะเจ้าหน้าที่ที่รับผิดชอบเท่านั้น</p>
                    <p>- ค้นหาเฉพาะใบแจ้งประเมินที่ยังไม่มีใบเสร็จ และ ใบร้องขอชำระเงิน และ ไม่มีใบแจ้งเตือนให้มาชำระ</p>
                    <p>- คิดเบี้ยปรับแค่ร้อยละ 20 เท่านั้น</p>  
                </div>
                
                
                {warning.length>0&&
                <Table dataSource={warning}
                rowKey={(record)=>{
                    if (!record.__uniqueId)
                record.__uniqueId = ++uniqueId;
                return record.__uniqueId;
                
                }}
                rowSelection={{
                    ...rowSelection,
                }}
                pagination={false}
                >
                    <Column title="เลขหนังสือแจ้งการประเมิน" dataIndex="CostBookNo" key="CostBookNo"/>
                    <Column title="ชื่อผู้ชำระภาษี" dataIndex="SendTo"key="SendTo"/>
                    <Column title="ราคาทั้งหมด" dataIndex="BriefTotal"key="BriefTotal"
                            render={(text)=>text.toFixed(2)}
                    />
                    <Column title="ประจำปี" dataIndex="Year"key="Year"/>
                    {/* <Column title="พนักงานที่รับผิดชอบ" dataIndex="Employee_No"key="Employee_No"/> */}
                </Table>
                }
            </Modal>
        </div>
    )
}

export default CartWarning
