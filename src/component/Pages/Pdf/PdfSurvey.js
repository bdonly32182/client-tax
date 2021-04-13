import React,{useState,useEffect} from 'react'
import pdfMake from "pdfmake/build/pdfmake";
import { Button,notification,Select } from 'antd';
import jwtDecode from 'jwt-decode';
import LocalStorageService from '../../../LocalStorage/LocalStorageSevice';
import axios from '../../../config/axios';
import {YearsDoc} from './FuncPdf'
function PdfSurvey({land,tax:{uid_tax,Category_Tax},condo,amountCustomer,customers}) {
    pdfMake.fonts={
        Sarabun:{
            normal:'Sarabun-Regular.ttf',
            bold:'Sarabun-Bold.ttf',
            italics:'Sarabun-Italic.ttf',
            bolditalics:'Sarabun-BoldItalic.ttf'
        }
    }
    const {Option} = Select;
    const [imageKrut,setImageKrut] = useState(null);
    const [logoBkk,setLogoBkk] = useState(null);
    let NowDate = new Date() ;
    let DateThai = NowDate.toDateString().split(" ");
    const [yearDoc,setYearDoc] = useState(+DateThai[3]+543);
    const [amountDoc , setAmountDoc] = useState(0);
    
    let token  = LocalStorageService.getToken();
    let jwt = jwtDecode(token);
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
           let imageLogo = new Buffer(arrImage[1],'base64');
           setLogoBkk(imageLogo);
       }).catch(e=>console.log(e))
     }
     const EmployeeTakeCare = (land =[],condo =[]) => {
        if(land.length !== 0) return land[0]?.Land?.employee_land
        return condo[0]?.Room.Condo.employee_condo
    }
     const fetch_AmountDoc =()=>{
        let EmpTakeCare =  EmployeeTakeCare(land,condo)
        
        EmpTakeCare&& axios.get(`/api/numberCheck/${EmpTakeCare}`).then((result) => {
            setAmountDoc(result.data.numberRun[0]?.amountBook);
        }).catch((err) => {
            notification.error({message:'เรียกหมายเลขหนังสือของพนักงานล้มเหลว'})
        });
    }
     useEffect(() => {
        fetch_image();
         fetch_AmountDoc();
      }, [land,condo])
      const ReplaceMonth = (monthNA) =>{
        let monthThai = monthNA;
        monthThai = monthThai.replace("Jan","มกราคม")
        monthThai = monthThai.replace("Feb","กุมภาพันธ์")
        monthThai = monthThai.replace("Mar","มีนาคม")
        monthThai = monthThai.replace("Apr","เมษายน")
        monthThai = monthThai.replace("May","พฤษภาคม")
        monthThai = monthThai.replace("Jun","มิถุนายน")
        monthThai = monthThai.replace("Jul","กรกฎาคม")
        monthThai = monthThai.replace("Aug","สิงหาคม")
        monthThai = monthThai.replace("Sep","กันยายน")
        monthThai = monthThai.replace("Oct","ตุลาคม")
        monthThai = monthThai.replace("Nov","พฤศจิกายน")
        monthThai = monthThai.replace("Dec","ธันวาคม")
        return monthThai
    }
    const runNumber = () => {
        let Soon = "";
        let nextNumber = amountDoc + 1;
        for (let index = 0; index < 6 - nextNumber.toString().length; index++) {
            Soon += "0"
        }
        return Soon
    }
    const DocDifinition = () => {
        let HavePds3 = land.length>0
        let HavePds4 = condo.length > 0
       let docDifinition ={
            pageSize:'A3',
            info: {
                title: `${uid_tax}/${+DateThai[3] + 543}`
            },
           content:[
               {text:'ภ.ด.ส.๖',fontSize:12,alignment:'right'},
               {image:imageKrut,width: 80,height: 60,alignment: 'center'},
               {text:`ที่ ${jwt.Abbreviations}.........`,style:'boldStyle',alignment:'left'},
               {text:`สำนักงานเขต${jwt?.District_name}`,style:['alignItemDistrict']},     
               {text:`วันที่ ${DateThai[2]} เดือน ${ReplaceMonth(DateThai[1])} ปี ${+DateThai[3] + 543}`,margin: [300, 5, 20, 5]},
               'เรื่อง แจ้งให้ตรวจสอบรายการที่ดินและสิ่งปลูกสร้าง',, 
               {text:`เรียน ${customers[0].title}${customers[0].Cus_Fname} ${customers[0].Cus_Lname} ${amountCustomer>1?"และผู้ที่เป็นเจ้าของทรัพย์สินร่วม":''}`},
               'สิ่งที่ส่งมาด้วย แบบบัญชีรายการที่ดินและสิ่งปลูกสร้าง',
               {text:`ตามพระราชบัญญัติภาษีที่ดินและสิ่งปลูกสร้าง พ.ศ. ๒๕๖๒ มาตรา ๓๗ ประกอบกับระเบียบกระทรวงมหาดไทยว่าด้วยการดำเนินการ`,style:['sizeFonts','marginText']},
               {text:[{text:`ตามพระราชบัญญัติภาษีที่ดินและสิ่งปลูกสร้าง พ.ศ. ๒๕๖๒ ข้อ ๒๓ข้อ ๒๔ และข้อ ๒๕ `},
               {text:`ให้องค์กรปกครองส่วนท้องถิ่นสำรวจที่ดินและสิ่งปลูกสร้าง ภายในเขตองค์กรปกครองส่วนท้องถิ่นแล้วจัดทำแบบบัญชี-รายการที่ดินและสิ่งปลูกสร้าง`},
               {text:`โดยแสดงประเภท จำนวน ขนาดของสิ่งปลูกสร้าง การใช้ประโยชน์ในที่ดินสิ่งปลูกสร้าง รวมถึงรายละเอียดอื่นที่จำเป็น `},
               {text:`แก่การประเมินภาษีและประกาศบัญชี ดังกล่าวให้ผู้เสียภาษีทราบนั้น`}]},
              {text:` สํานักงานเขต${jwt?.District_name} ได้จัดทำบัญชีรายการที่ดินและสิ่งปลูกสร้างแล้วเสร็จจึงแจ้งให้ท่านตรวจสอบรายการที่ดินและสิ่งปลูกสร้างของท่าน `,style:['sizeFonts','marginText']},
              {text:[
              {text:`ตามบัญชีรายการที่ดินและสิ่งปลูกสร้าง ชุดที่๑ ปิดประกาศไว้`,style:['sizeFonts','marginText']},
              {text:` ณ สำนักงานเขตจอมทอง ตามรายการที่ดินลำดับที่ ...`,style:'sizeFonts'}
                    ]},
              {text:`หากรายการที่ดิน สิ่งปลูกสร้าง หรือการใช้ประโยชน์ ไม่ถูกต้องตามความเป็นจริง ให้ยื่นคำร้องขอแก้ไขได้ ณ สํานักงานเขต${jwt?.District_name}`,style:['sizeFonts','marginText']},
              {text:`ภายใน ๑๕ วัน นับแต่วันที่ได้รับหนังสือฉบับนี้หากพ้นกำหนดดังกล่าว จะถือว่ารายการตามบัญชีที่ดินและสิ่งปลูกสร้างถูกต้อง แล้วจะดำเนินการประเมินค่า
              ภาษีที่ดินและสิ่งปลูกสร้าง และแจ้ง ให้ท่านทราบภายในเดือน กุมภาพันธ์ พ.ศ. ๒๕๖๓ อนึ่ง หากท่านได้เปลี่ยนแปลงการใช้ประโยชน์ในที่ดินหรือสิ่งปลูกสร้าง
              ให้ยื่นแบบแจ้งการเปลี่ยนแปลงการใช้ประโยชน์ในที่ดินหรือสิ่งปลูกสร้าง ณ สำนักงานเขตจอมทอง ภายใน ๖๐ วัน นับแต่ วันที่มีการเปลี่ยนแปลง`,style:'sizeFonts'},
              {text:` จึงเรียนมาเพื่อทราบ`,style:['alignCenter','marginTopText','sizeFonts']},
               {text:`ขอแสดงความนับถือ`,style:['alignCenter'],margin:[100,20,0,0]},
               {text:`( .......................................... )`,style:['alignCenter'],margin:[100,20,0,0]},
               {text:`....................................................`,style:'alignCenter',margin:[100,20,0,0]},
               
            
           ],
           defaultStyle:{
               font:'Sarabun'
           },
           styles: {
               boldStyle: {
                   fontSize: 12,
                   bold: true
               },
               alignItemDistrict:{
                //    alignment:'right'
                margin:[500,0,0,0]
               },
               marginText:{
                   margin: [60, 5, 0, 0]
                   //[left, top, right, bottom]
               },
               sizeFonts:{
                   fontSize: 12, 
               },
               alignCenter:{
                   alignment:'center'
               },
               marginTopText:{
                   margin:[0,20,0,0]
               },
               MarginNameLeader:{
                   margin:[0,60,0,0]
               },
               header: {
                fontSize: 12,
                bold: true,
                margin: [200, 40, 0, 0]
            },
            subheader: {
                fontSize: 12,
                bold: true,
                margin: [170, 0, 0, 0]
            },
            tableExample: {
                margin: [0, 10, 0, 15]
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            },
            tableFontSize:{
                fontSize:10,
                
            },
            totalPrice:{
                fontSize: 9,
                bold: true,
                color:'#ce1212'
            },
            tableFontSizePds8:{
                fontSize:12
            },
            tablePds8:{
                margin: [170, 0, 0, 0]
            }
               
           }
       }
       if (HavePds3) {
        let result = land.map(record=>{
           
            return [
            {text:record.Land.Serial_code_land,style:'tableFontSize'},
            {text:`${record.Land.Category_doc}`,style:'tableFontSize'},
            {text:`${record.Land.Parcel_No}`,style:'tableFontSize'},
            {text:record.UsefulLand_Tax_ID===uid_tax?`${record.Land.Land_No}`:'',style:'tableFontSize'},
            {text:record.UsefulLand_Tax_ID===uid_tax?`${record.Land.Survey_No}`:'',style:'tableFontSize'},
            {text:record.UsefulLand_Tax_ID===uid_tax?`${record.Land.Tambol_name}`:'',style:'tableFontSize'},
            {text:record.UsefulLand_Tax_ID===uid_tax?record.Useful_RAI:'',style:'tableFontSize'},
            {text:record.UsefulLand_Tax_ID===uid_tax?record.Useful_GNAN:'',style:'tableFontSize'},
            {text:record.UsefulLand_Tax_ID===uid_tax?record.Useful_WA:'',style:'tableFontSize'},
            {text:record.UsefulLand_Tax_ID===uid_tax&&record.TypeName==="เกษตร"?record.Place:'',style:'tableFontSize'},
            {text:record.UsefulLand_Tax_ID===uid_tax&&record.TypeName==="อยู่อาศัย"?record.Place:'',style:'tableFontSize'},
            {text:record.UsefulLand_Tax_ID===uid_tax&&record.TypeName==="อื่นๆ"?record.Place:'',style:'tableFontSize'},
            {text:record.UsefulLand_Tax_ID===uid_tax&&record.TypeName==="ว่างเปล่า"?record.Place:'',style:'tableFontSize'},
            {text:record.UsefulLand_Tax_ID===uid_tax&&record.TypeName==="หลายประเภท"?record.Place:'',style:'tableFontSize'},
            record.BuildOnUsefulLands.map((build,index)=> {return {text:index+1,style:'tableFontSize'}}),
            record.BuildOnUsefulLands.map(({Building:{No_House}})=> {return {text:No_House,style:'tableFontSize'}}),
            record.BuildOnUsefulLands.map(({Building:{Sub_Category}})=> {return {text:Sub_Category,style:'tableFontSize'}}),
            record.BuildOnUsefulLands.map(({Building:{StyleBuilding}})=> {return {text:StyleBuilding,style:'tableFontSize'}}),
            record.BuildOnUsefulLands.map(({Building:{Build_Total_Place}})=> {return {text:Build_Total_Place.toLocaleString(),style:'tableFontSize'}}),
            record.BuildOnUsefulLands.map(({Building:{FarmType}})=> {return {text:FarmType?FarmType.Farm_Size:'',style:'tableFontSize'}}),
            record.BuildOnUsefulLands.map(({Building:{LiveType}})=> {return {text:LiveType?LiveType.Live_Size:'',style:'tableFontSize'}}),
            record.BuildOnUsefulLands.map(({Building:{OtherType}})=> {return {text:OtherType?OtherType.Other_Size:'',style:'tableFontSize'}}),
            record.BuildOnUsefulLands.map(({Building:{EmptyType}})=> {return {text:EmptyType?EmptyType.Empty_Size:'',style:'tableFontSize'}}),
            record.BuildOnUsefulLands.map(({Building:{Age_Build}})=> {return {text:Age_Build.toLocaleString(),style:'tableFontSize'}}),
    
        ]
        })
           docDifinition.content = [...docDifinition.content,
        
            {text: 'ภ.ด.ส.๓', pageOrientation: 'landscape', pageBreak: 'before',alignment:'right'},
            {image:logoBkk,width: 80,height: 80,alignment: 'center'},
            {text:'แบบแสดงรายการคำนวณภาษีที่ดินและสิ่งปลูกสร้าง',alignment:'center',style:'boldStyle'},
            {text:`รหัสผู้เสียภาษีที่ดินและสิ่งปลูกสร้าง ${uid_tax} (${Category_Tax})`,style:'tableExample'},
            {
                color: '#444',//เส้นขอบคอลัมน์
                table: {
                    widths: [20, 28,38,23,45,41,
                            20,20,20,35,36,28,
                             36,56,16,40,44,44,
                             35,32,35,32,35,35],//width ต้อทำทุกคอลัมน์
                    body: [
                        [
                        {text:'ที่',style:'tableFontSize'},{text:'ประเภทที่ดิน',style:'tableFontSize'},{text:'เลขที่เอกสารสิทธิ์',style:'tableFontSize'},
                        {text:'เลขที่ดิน',style:'tableFontSize'},{text:'หน้าสำรวจ',style:'tableFontSize'},{text:'สถานที่ตั้ง',style:'tableFontSize'},
                        {text:'ไร่',style:'tableFontSize'},{text:'งาน',style:'tableFontSize'},{text:'วา',style:'tableFontSize'},
                        {text:'เกษตร',style:'tableFontSize'},{text:'อยู่อาศัย',style:'tableFontSize'},
                        {text:'อื่นๆ',style:'tableFontSize'},{text:'ว่างเปล่า',style:'tableFontSize'},
                        {text:'หลายประเภท',style:'tableFontSize'},{text:'ที่',style:'tableFontSize'},
                        {text:'บ้านเลขที่',style:'tableFontSize'},{text:'ประเภทสิ่งปลูกสร้าง',style:'tableFontSize'},
                        {text:'ลักษณะสิ่งปลูกสร้าง',style:'tableFontSize'},{text:'ขนาดพื้นที่รวม (ตร.ม)',style:'tableFontSize'},
                        {text:'เกษตร',style:'tableFontSize'},{text:'อยู่อาศัย',style:'tableFontSize'},
                        {text:'อื่นๆ',style:'tableFontSize'},{text:'ว่างเปล่า',style:'tableFontSize'},
                        {text:'อายูสิ่งปลูกสร้าง',style:'tableFontSize'},
                        ],
                    ...result
                        
                    ]
                   
                }
            }
        ]
       }
       if (HavePds4) {
        let rowResult = condo.map(record=>{
            return [
                {text:record.Room.Condo.id,style:'tableFontSizePds8'},
                {text:record.Room.Condo.Condo_name,style:'tableFontSizePds8'},
                {text:record.Room.Condo.Register_no,style:'tableFontSizePds8'},
                {text:record.Room.Condo.Parcel_no,style:'tableFontSizePds8'},
                {text:record.Room.Condo.Survey_no,style:'tableFontSizePds8'},
                {text:record.Room.Condo.Tambol,style:'tableFontSizePds8'},
                {text:record.Room.Condo.District_name,style:'tableFontSizePds8'},
                {text:record.Room.Room_no,style:'tableFontSizePds8'},
                {text:record.Amount_Place,style:'tableFontSizePds8'},
                {text:record.Category_use==='อยู่อาศัย'?record.Amount_Place:'',style:'tableFontSizePds8'},
                {text:record.Category_use==='อื่นๆ'?record.Amount_Place:'',style:'tableFontSizePds8'},
                {text:record.Category_use==='ว่างเปล่า'?record.Amount_Place:'',style:'tableFontSizePds8'}
               
             ]
        })
     docDifinition.content = [...docDifinition.content,
         {text: 'ภ.ด.ส.๔', pageOrientation: 'landscape', pageBreak: 'before',alignment:'right'},
         {image:logoBkk,width: 80,height: 80,alignment: 'center'},
         {text:'แบบแสดงรายการคำนวณภาษีที่ดินและสิ่งปลูกสร้าง',alignment:'center',style:'boldStyle'},
         {text:`รหัสผู้เสียภาษีที่ดินและสิ่งปลูกสร้าง ${uid_tax} (${Category_Tax})`,style:'tableExample'},
         {
             style:'tablePds8',
             color: '#444',          
             table: {
                 widths: [
                         'auto','auto','auto','auto','auto','auto',  
                         'auto','auto','auto','auto','auto','auto',
                         ],   
                 body: [
                     [
                     {text:'ที่',style:'tableFontSizePds8'},
                     {text:'ชื่ออาคารชุด',style:'tableFontSizePds8'},{text:'เลขทะเบียนอาคารชุด',style:'tableFontSizePds8'},
                     {text:'โฉนดเลขที่',style:'tableFontSizePds8'},{text:'หน้าสำรวจ',style:'tableFontSizePds8'},
                     {text:'ตำบล/แขวง',style:'tableFontSizePds8'},{text:'อำเภอ/เขต',style:'tableFontSizePds8'},{text:'เลขที่ห้องชุด',style:'tableFontSizePds8'},
                     {text:'ขนาดพื้นที่รวม(ตร.ม)',style:'tableFontSizePds8'},{text:'อยู่อาศัย',style:'tableFontSizePds8'},
                     {text:'อื่นๆ',style:'tableFontSizePds8'},{text:'ว่างเปล่า',style:'tableFontSizePds8'}
                     ],
                     ...rowResult,
                     
                 ],
                 
                
             }
         }
     ]
    }
       return docDifinition        
    }
     function  OpenPDF (){
       
         let docDifinition = DocDifinition();
        pdfMake.createPdf(docDifinition).open()
    }
    
    const SavePDF =()=>{
        let SaveDoc = DocDifinition();

        let positionSoon = runNumber();
        let GeneratePDF = pdfMake.createPdf(SaveDoc);
        GeneratePDF.getBlob(file=>{
            const formData =new FormData();
            let EmpTakeCare =  EmployeeTakeCare(land,condo)
            formData.append('file',file,`${uid_tax}-${yearDoc}-pds3`);
            formData.append('Year',yearDoc);
            formData.append('TaxCheckBook',uid_tax);
            formData.append('CheckBookNo',`${jwt.distict_id}_${jwt.TableNo}${positionSoon}${amountDoc+1}-${yearDoc}`)
            formData.append('PathPDF',`/Document/${uid_tax}-${yearDoc}-pds3`);
            formData.append('districtNo',jwt.distict_id);
            formData.append('Employee_No',EmpTakeCare);
            axios.post(`/api/generateCheckDoc`,formData).then((result) => {
                notification.success({message:'บันทึกไฟล์เรียบร้อยแล้ว'})
            }).catch((err) => {
                notification.error({message:'บันทึกไฟล์ล้มเหลว'})
            });
        })
    }
    let years = YearsDoc();

    return (
        <div>
            <Select style={{width:200}} defaultValue={+DateThai[3]+543} onChange={(value)=>setYearDoc(value)}>
                {years.map(year=><Option value={year} key={year} >{year}</Option>)}
            </Select>
            <Button onClick={OpenPDF}>Open PDF</Button>
            <Button onClick={SavePDF}>Save PDF</Button>
        </div>
    )
}

export default PdfSurvey
