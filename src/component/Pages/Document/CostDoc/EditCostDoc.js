import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {FetchCost} from '../../../../store/action/ConstDocAction'
import {useParams} from 'react-router-dom'
import Header from '../../../Header'
import { Button ,Popover,notification} from 'antd'
import axios from '../../../../config/axios';
function EditCostDoc() {
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
    return (
        <div>
            <Header />
            <p>{`CostNo ${cost?.CostBookNo}`}</p>
            <p>{`Employee : ${cost?.Employee?.TitleEmp}${cost?.Employee?.Fname} ${cost?.Employee?.Lname}`}</p>
            <Popover content={ContentPopover(cost?.Tax_Group?.Customers)}>
             <p>{`TaxID : ${cost?.TaxCostBook}`}</p>   
            </Popover>
            <p>{`BriefTotal: ${cost?.BriefTotal}`}</p>
            <Button onClick={()=>OpenPdf(cost?.PathPDF)}>Open PDF</Button>

        </div>
    )
}

export default EditCostDoc
