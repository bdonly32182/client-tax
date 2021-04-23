import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {FetchCost} from '../../../../store/action/ConstDocAction'
import {useParams} from 'react-router-dom'
import Header from '../../../Header'
import { Button ,Popover,notification,Tabs} from 'antd'
import axios from '../../../../config/axios';
import WarningDoc from './WarnningDoc/WarningDoc'
import PaymentDoc from './PaymentDoc.js/PaymentDoc'
function EditCostDoc() {
    const {TabPane} = Tabs
    const dispatch = useDispatch();
    const cost = useSelector(state => state.Costs)
    const {id} = useParams();
    useEffect(() => {
        dispatch(FetchCost(id))
    }, [dispatch,id])
    const ContentPopover = (customers = []) => {
        return customers.map((customer,index)=>   <p key={index}>{`${customer?.title}${customer?.Cus_Fname} ${customer?.Cus_Lname}`}</p>
        )
    }
    const OpenPdf = (path) => {
        axios.get(`/api/openpdf?path=${path}`,{
            responseType: 'arraybuffer',
            headers: {
              'Accept': 'application/pdf'
            }
          }).then((result) => {
              const blob = new Blob([result.data], {type: 'application/pdf'})
              let fileUrl = URL.createObjectURL(blob);
              window.open(fileUrl,'_blank');

        }).catch((err) => {
            notification.error({message:'เปิดไฟล์ PDF ล้มเหลว'})
        });
    }
    console.log(cost);
    return (
        <div>
            <Header />
            <Tabs>
                <TabPane tab="ข้อมูลหนังสือแจ้งการประเมิน" key="1">
                    <p>{`CostNo ${cost?.CostBookNo}`}</p>
                    <p>{`Employee : ${cost?.Employee?.TitleEmp}${cost?.Employee?.Fname} ${cost?.Employee?.Lname}`}</p>
                    <Popover content={ContentPopover(cost?.Tax_Group?.Customers)}>
                    <p>{`TaxID : ${cost?.SendTo}`}</p>   
                    </Popover>
                    <p>{`BriefTotal: ${cost?.BriefTotal}`}</p>
                    <Button onClick={()=>OpenPdf(cost?.PathPDF)}>Open PDF</Button>
                </TabPane>
                <TabPane tab="ข้อมูลการชำระเงิน" key="2">
                   
                </TabPane>
                <TabPane tab="บันทึกคำร้องขอชำระเงิน" key="3">
                    <PaymentDoc costbook={cost} payment_doc={cost?.PaymentDoc}/>
                </TabPane>
                <TabPane tab="ใบแจ้งเตือนให้มาชำระภาษี" key="4">
                  <WarningDoc costbook={cost} warning_doc={cost?.WarningDocs}/>
                </TabPane>
            </Tabs>
            

        </div>
    )
}

export default EditCostDoc
