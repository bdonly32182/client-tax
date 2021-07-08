import React,{useState,useEffect} from 'react'
import {Button} from 'antd'
import {PrinterFilled} from '@ant-design/icons'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { readNumber } from '../../../../../FuncPDS7/ReadNumber';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
function PaymentPdf({payment,costbook}) {
    pdfMake.fonts={
        Sarabun:{
            normal:'Sarabun-Regular.ttf',
            bold:'Sarabun-Bold.ttf',
            italics:'Sarabun-Italic.ttf',
            bolditalics:'Sarabun-BoldItalic.ttf'
        }
    }
    const WarningBook = costbook?.WarningDocs[costbook?.WarningDocs?.length - 1]||null
    const [logoBkk,setLogoBkk] = useState(null);
    let splitCostPrice =costbook?.BriefTotal.toString().split('.')
    let bathCostPrice = splitCostPrice[0];
    let satangCostPrice =splitCostPrice[1]||0;
    let splitFineTotal = payment?.FineTotal?.toFixed(2).toString().split('.')
    let bathFineTotal = splitFineTotal[0];
    let satangFineTotal = splitFineTotal[1]||0;
    let splitFineAdd= payment?.FineAdd?.toFixed(2).toString().split('.')
    let bathFineAdd = splitFineAdd[0];
    let satangFineAdd = splitFineTotal[1]||0;
    let splitTotalPrice = payment?.totalPay?.toFixed(2).toString().split('.')
    let bathTotalPrice = splitTotalPrice[0];
    let satangTotalPrice = splitTotalPrice[1]||0;
    useEffect(() => {
        fetch_image();
    }, [])
    const fetch_image =()=>{
        Promise.all(['/krut.jpeg','/logobkk.jpeg'].map(index=>{
            return new Promise((resolve,reject)=>{
               let xhr =  new XMLHttpRequest();
               xhr.open('GET',index,true);
               xhr.responseType = 'arraybuffer'
               xhr.onload = function (e) {
                   if (xhr.readyState === 4) {
                       if(xhr.status === 200) {
                         resolve(this.response)
                       } else {
                         reject(xhr.statusText)
                       }
                   }
               };
               xhr.send()
            })
        })).then(arrImage => {
           let imageLogo = new Buffer(arrImage[1],'base64');
           setLogoBkk(imageLogo);
       }).catch(e=>console.log(e))
     }
     const DocDifinition = () => {
       let docDifinition ={
            pageSize:'A4',
            info: {
                title: `${payment.PaymentID}`
            },
           content:[
                {text:`เลขที่คำร้อง ${payment.PaymentID}`,alignment:'right'},
               {image:logoBkk,width: 80,height: 60,alignment: 'center'},
               {text:'ใบคำร้องขอชำระเงินภาษีที่ดินและสิ่งปลูกสร้าง',alignment:'center',margin:[0,10,0,0]},
               {text:`วันที่ ${new Date(WarningBook?.DateWarnning)?.toLocaleDateString('th-TH', { year: 'numeric',month: 'long',
                day: 'numeric',})}`,margin:[320,10,0,10],bold: true},

                {text:[
                    {text:`ได้รับคำร้องขอชำระเงินภาษีที่ดินและสิ่งปลูกสร้างจาก  `},
                    {text:`${payment.NamePayment}  `,bold: true }  ,
                    'อยู่บ้านเลขที่ ',
                    {text:`${payment.PaymentAddress} `,bold: true},
                    'ตามหนังสือแจ้งการประเมินเลขที่ ',
                    {
                        text:`${payment.CostInPayID}  `,bold: true
                    },'\nลงวันที่ ',
                    {
                        text:`${new Date(payment.DateRate)?.toLocaleDateString('th-TH', { year: 'numeric',
                        month: 'long',day: 'numeric',bold: true})} ประจำปี พ.ศ. ${payment?.Year}`,bold: true
                    }

                ],margin:[0,0,0,15]},
               ,
               {
                    color: '#444',//เส้นขอบคอลัมน์
                    table: {
                        widths: [30, 200,60,60,110],//width ต้อทำทุกคอลัมน์
                     
                        body: [
                            [
                                {text:'ที่'},
                                {text:'รายการ',alignment:'center'},
                                {text:'บาท',alignment:'center'},
                                {text:'สตางค์',alignment:'center'},
                                {text:'หมายเหตุ',alignment:'center'},                            
                            ],
                            [
                                {text:'1'},
                                {text:'ค่าภาษีที่ดินและสิ่งปลูกสร้าง'},
                                {text:parseInt(bathCostPrice).toLocaleString(),alignment:'center'},
                                {text:satangCostPrice,alignment:'center'},
                                {text:payment?.MarkPay,alignment:'center',rowSpan:4},   
                            ],
                            [
                                {text:'2'},
                                {text:`เบี้ยปรับ ร้อยละ ${payment?.fineString}`},
                                {text:parseInt(bathFineTotal).toLocaleString(),alignment:'center'},
                                {text:satangFineTotal,alignment:'center'},
                                {text:''},   
                            ],
                            [
                                {text:'3'},
                                {text:`เงินเพิ่มกรณีชําระเกินกําหนดเวลา ${payment?.amountMonth} เดือน`},
                                {text:parseInt(bathFineAdd).toLocaleString(),alignment:'center'},
                                {text:satangFineAdd,alignment:'center'},
                                {text:''},   
                            ],
                            [
                                {text:`(${readNumber(`${payment?.totalPay.toFixed(2)}`)})`,colSpan:2,bold: true},
                                {text:''},  
                                {text:parseInt(bathTotalPrice).toLocaleString(),alignment:'center'},  
                                {text:satangTotalPrice,alignment:'center'},  
                                {text:''},  
                            ]
                        ]
                    
                    }
                },
               {text:[
                 {text:`ลงชื่อ ..................................... เจ้าหน้าที่ `}, 
                 {text:`                           `}, 
                 {text:`ลงชื่อ .......................................... พนักงานเก็บภาษี`}, 
               ],margin:[0,60,0,0]},
               {text:[
                {text:`( ............................................................. )`}, 
                {text:`                       `}, 
                {text:`( .............................................................. )`},, 
              ],margin:[0,15,0,0]},
  
           ],
           defaultStyle:{
               font:'Sarabun'
           },
          
       }
     
       return docDifinition        
    }
    function  OpenPDF (){    
        let PreviewDoc = DocDifinition();
       pdfMake.createPdf(PreviewDoc).open()
   }
    return (
        <div>
             <Button type="text" style={{color:'blue'}} onClick={OpenPDF}><PrinterFilled /></Button>
        </div>
    )
}

export default PaymentPdf
