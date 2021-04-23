import React,{useEffect,useState} from 'react'
import {Button} from 'antd'
import {PrinterFilled} from '@ant-design/icons'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import LocalStorageService from '../../../../../LocalStorage/LocalStorageSevice';
import jwtDecode from 'jwt-decode';
import { readNumber } from '../../../../../FuncPDS7/ReadNumber';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
function WarningPdf({WarningBook,costbook}) {
    pdfMake.fonts={
        Sarabun:{
            normal:'Sarabun-Regular.ttf',
            bold:'Sarabun-Bold.ttf',
            italics:'Sarabun-Italic.ttf',
            bolditalics:'Sarabun-BoldItalic.ttf'
        }
    }
    let token = LocalStorageService.getToken();
    let  jwt = jwtDecode(token);
    const [imageKrut,setImageKrut] = useState(null);
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
           let imageKrut = new Buffer(arrImage[0],'base64');
           setImageKrut(imageKrut)
          
       }).catch(e=>console.log(e))
     }
     const DocDifinition = () => {
        let docDifinition ={
             pageSize:'A4',
             info: {
                 title: `${jwt?.exportBookNo}/${WarningBook?.IdWarning}`
             },
            content:[
                 {text:`แบบ ภดส.กทม.๑`,alignment:'right'},
                 {image:imageKrut,width: 80,height: 60,alignment: 'center'},
                 {text:[
                  {text:`ที่ ${jwt?.exportBookNo}/${WarningBook?.IdWarning}`},
                    '                                 ',   
                  '                             ',
                  'สำนักงานเขตจอมทอง'
                 ]},
                            
                {text:`วันที่ ${new Date(WarningBook?.DateWarnning)?.toLocaleDateString('th-TH', { year: 'numeric',month: 'long',
                 day: 'numeric',})}`,alignment:'center',bold: true,margin:[0,0,0,10]},
                 'เรื่อง เตือนให้มาชำระภาษีค้าง',
                 {text:`เรียน ${WarningBook?.NameWarning}`},
                 {text:[
                     {text:`อ้างถึง หนังสือแจ้งการประเมินภาษีที่ดินและสิ่งปลูกสร้าง ประจำปีภาษี พ.ศ.${costbook?.Year}`},
                     {text:`ที่ ${WarningBook?.DocRef} `,bold: true }  ,
                     'ลงวันที่  ',
                     {text:`${new Date(WarningBook.DateRate)?.toLocaleDateString('th-TH', { year: 'numeric',
                     month: 'long',day: 'numeric',bold: true})} `,bold: true},
                     
 
                 ],margin:[0,0,0,15]},
                 {text:`ตามหนังสือที่อ้างถึง สำนักงานเขตจอมทอง ได้แจ้งการประเมินภาษีที่ดินและ สิ่งปลูกสร้าง`,margin:[70,0,0,0]},
                 {text:[
                   {text:`ประจำปีภาษี พ.ศ. ${costbook?.Year} เป็นเงินค่าภาษีทั้งสิ้น `},  
                   {text:`${costbook?.BriefTotal.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2})} บาท (${readNumber(`${costbook?.BriefTotal.toFixed(2)}`)}) นั้น`,bold:true}
                 ]},
                 {text:`ปรากฏว่าท่านไม่ได้มาชำระค่าภาษีภายในระยะเวลาที่กำหนด จึงต้องเสียเบี้ยปรับและเงินเพิ่มตามกฎหมาย ดังมีรายละเอียดต่อไปนี้`,margin:[0,0,0,20]},
                {
                     color: '#444',//เส้นขอบคอลัมน์
                     table: {
                         widths: [100, 100,100,100,100],//width ต้อทำทุกคอลัมน์
                      
                         body: [
                             [
                                 {text:'ปีภาษี พ.ศ.'},
                                 {text:'ค่าภาษี',alignment:'center'},
                                 {text:'เบี้ยปรับ',alignment:'center'},
                                 {text:'เงินเพิ่ม',alignment:'center'},
                                 {text:'รวมเป็นเงิน',alignment:'center'},                            
                             ],
                             [
                                 {text:costbook?.Year},
                                 {text:costbook?.BriefTotal.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2})},
                                 {text:WarningBook?.interestTotal.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2}),alignment:'center'},
                                 {text:WarningBook?.interestAdd.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2}),alignment:'center'},
                                 {text:WarningBook?.totalPricePay.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2}),alignment:'center'},   
                             ]
                         ]
                     
                     }
                 },
                 {text:`หมายเหตุ : เบี้ยปรับและเงินเพิ่มคำนวณถึงวันที่ ${new Date(WarningBook?.DateRate)?.toLocaleDateString('th-TH', { year: 'numeric',
                 month: 'long',day: 'numeric'})}`,margin:[50,15,0,0]},
                 {text:[
                   {text:`รวมเป็นเงินภาษีค้างทั้งสิ้น `}, 
                   {text:`${WarningBook?.totalPricePay} บาท (${readNumber(`${WarningBook?.totalPricePay.toFixed(2)}`)})`,bold:true} 
                 ]},
                 
                 {text:`ไปชำระที่ ฝ่ายรายได้ สำนักงานเขต${jwt?.District_name} ภายใน ๑๕ วัน นับแต่วันที่ได้รับหนังสือฉบับนี้ ทั้งนี้ หากเห็นว่า 
                 การเรียกเก็บภาษีไม่ถูกต้อง ให้ยื่นคำร้องคัดค้านตามแบบที่ รัฐมนตรีว่าการกระทรวงมหาดไทยประกาศกำหนด
                  (แบบ ภ.ด.ส. ๑๐) ต่อ สำนักงานเขต${jwt?.District_name} ภายใน ๓๐ วัน นับตั้งแต่วันที่ได้รับหนังสือนี้`},
                  {text:`จึงเรียนมาเพื่อโปรดชำระภาษีค้างภายในเวลาที่กำหนด`,margin: [100,10,0,0],},
                 {text:`ขอแสดงความนับถือ `,alignment:'center',margin:[0,15,0,0]},
                 {text:`(${jwt?.district_leader})`,alignment:'center',margin:[0,60,0,0]},
                 {text:`พนักงานเก็บภาษี`,alignment:'center'}
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
              <Button onClick={OpenPDF} type="text"> <PrinterFilled /></Button>      
        </div>
    )
}

export default WarningPdf
