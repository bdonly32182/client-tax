import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {FetchCheck} from '../../../../store/action/CheckDocAction';
import Header from '../../../Header'
import {Button,notification,Popover} from 'antd';
import axios from '../../../../config/axios';
function EditCheckDoc() {
    const dispatch = useDispatch();
    const check = useSelector(state => state.Checks)
    const {id} = useParams();
    useEffect(() => {
       dispatch(FetchCheck(id));
    }, [dispatch,id]);
    const ContentPopover = (customers = []) => {
        return customers.map((customer,i)=>   <p key={i}>{`${customer?.title}${customer?.Cus_Fname} ${customer?.Cus_Lname}`}</p>
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
            <p>{`CostNo ${check?.CheckBookNo}`}</p>
            <p>{`Employee : ${check?.Employee?.TitleEmp}${check?.Employee?.Fname} ${check?.Employee?.Lname}`}</p>
            <Popover content={ContentPopover(check?.Tax_Group?.Customers)}>
             <p>{`TaxID : ${check?.TaxCheckBook}`}</p>   
            </Popover>
            <Button onClick={()=>OpenPdf(check?.PathPDF)}>Open PDF</Button>
        </div>
    )
}

export default EditCheckDoc
