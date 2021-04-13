import React from 'react'
import {Row,Col,Image, Divider} from 'antd'
import jwtDecode from 'jwt-decode'
import LocalStorageService from '../../../LocalStorage/LocalStorageSevice'
import {Summary} from '../../../FuncPDS7/Summary'
import  { readNumber } from  '../../../FuncPDS7/ReadNumber'
import {SummaryCondo,TotalPrice} from '../Pdf/FuncPdf'
function PDS6({land,tax:{uid_tax,Category_Tax,exceptEmergency},condo,leader,amountCustomer,tax,invit,customers}) {
    let NowDate = new Date() 
    let DateThai = NowDate.toDateString().split(" ")
    let token  = LocalStorageService.getToken();
    let jwt = jwtDecode(token)
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
  
    const sumPDS7 = (land = []) => {
        let total = 0;
        land.forEach((record)=>{
            let result = Summary(record,Category_Tax,uid_tax,exceptEmergency)
            if (result[0]?.length>0) {
            let array2D = result[0].reduce((pre,cur)=>pre+cur,0)
            return total += array2D
            }
            let reducerResult = result.reduce((pre,cur)=>pre+cur,0)
            total += reducerResult
        })
        return total
    }
    let PricePds7 = sumPDS7(land);
    let PricePds8 = SummaryCondo(condo);
    let {BriefTotal} = TotalPrice(PricePds7,PricePds8,exceptEmergency,customers);
    return (
        <div style={{margin:'40px'}}>
            <Divider />
            <Row >
                <Col >
                    <div style={{paddingLeft:'600px'}}>
                       <Image preview={false} src="/krut.jpeg"width={110} alt="logo"/> 
                    </div>
                
                </Col>
                <Col>
                <div style={{paddingLeft:'500px'}}>
                  <p>ภ.ด.ส.๖</p>  
                </div>
                
                </Col>
            </Row>
            <Row>
                <Col>
                <div style={{textAlign:'center',paddingLeft:'550px'}}>
                    <p><b>หนังสือเเจ้งการประเมินที่ดินและสิ่งปลูกสร้าง</b></p>
                    <p> <b>{`ประจำปี พ.ศ.${+DateThai[3] + 543}`}</b></p>
                </div>
                
                   
                
                </Col>
            </Row>
            <Row style={{display:'block',paddingLeft:'100px'}}>
                <div style={{display:'inline-block'}}>
                  <b>{`ที่ ${jwt.Abbreviations}.........`}</b>  
                  <b style={{paddingLeft:'650px'}}>{`สำนักงานเขต${jwt?.District_name}`}</b>
                </div>
                <p style={{paddingTop:'15px',paddingLeft:'580px'}}>{`วันที่ .......... เดือน ${ReplaceMonth(DateThai[1])} ปี ${+DateThai[3] + 543}`}</p>
                <p>เรื่อง แจ้งการประเมินเพื่อเสียภาษีที่ดินและสิ่งปลูกสร้าง</p>
                <p>เรียน <b>{`${invit.title}${invit.Cus_Fname} ${invit.Cus_Lname} ${amountCustomer>1?"และผู้ที่เป็นเจ้าของทรัพย์สินร่วม":''}` }</b></p>
                <p style={{paddingLeft:'100px'}}>ตามที่ท่านเป็นเจ้าของทรัพย์สิน ประกอบด้วย</p>
                <p style={{paddingLeft:'100px'}}>1.ที่ดิน จำนวน <b>{`${leader.Land?.length>0?leader.Land[0]?.totalLand:0}`}</b>  แปลง</p>
                <p style={{paddingLeft:'100px'}}>2.สิ่งปลูกสร้าง จำนวน <b>{`${leader.Building?.length>0?leader.Building[0]?.totalBuild:0}`}</b> หลัง</p>
                <p style={{paddingLeft:'100px'}}>3.อาคารชุด/ห้องชุด จำนวน <b>{leader.Room?.length>0?leader.Room[0]?.totalRoom:0}</b> หลัง</p>
                <p style={{paddingLeft:'100px'}}>{`พนักงานประเมินได้ทําการประเมินภาษีที่ดินและสิ่งปลูกสร้างแล้ว เป็นจํานวนเงิน `}<b>{`${BriefTotal.toLocaleString(undefined,{minimumFractionDigits: 2,
                maximumFractionDigits: 2})} บาท (${readNumber(`${BriefTotal.toFixed(2)}`)})`}</b></p>
                <p>ตามรายการที่ปรากฏในแบบแสดงรายการคํานวณภาษีที่ดิน และสิ่งปลูกสร้าง แนบท้ายหนังสือฉบับนี้</p>
                <p style={{paddingLeft:'100px'}}>{`ฉะนั้น ขอให้ท่านนําเงินภาษีที่ดินและสิ่งปลูกสร้างไปชําระ ณ สํานักงานเขตจอมทอง
ภายในเดือน มิถุนายน ${+DateThai[3] + 543}`}</p>
                <p style={{paddingLeft:'100px'}}>{`ถ้าไม่ชําระภาษีภายในกําหนดจะต้องเสียเบี้ยปรับและเงินเพิ่มตามมาตรา ๖๘ มาตรา ๖๙
และ มาตรา ๗๐ แห่งพระราชบัญญัติภาษีที่ดินและสิ่งปลูกสร้าง พ.ศ. ๒๕๖๒`}</p>
                <p style={{paddingLeft:'100px'}}>{`อนึ่ง หากท่านได้รับแจ้งการประเมินภาษีที่ดินและสิ่งปลูกสร้างแล้ว เห็นว่าการประเมินไม่ถูก
ต้องมีสิทธิยื่นคําร้องคัดค้านต่อผู้บริหารท้องถิ่นเพื่อพิจารณาทบทวนตามแบบ ภ.ด.ส.๑๐`}</p>
                <p style={{paddingRight:'100px'}}>{` ภายในสามสิบวัน นับ
แต่วันที่ได้รับแจ้งการประเมิน และหากผู้บริหารท้องถิ่นไม่เห็นชอบกับคําร้องคัดค้านนี้ ให้มีสิทธิอุทธรณ์ ต่อ
คณะกรรมการพิจารณาอุทธรณ์การประเมินภาษี โดยยื่นอุทธรณ์ต่อผู้บริหารท้องถิ่นภายในสามสิบวัน แต่วันที่
ได้รับหนังสือแจ้ง และกรณีไม่เห็นด้วยกับคําวินิจฉัยอุทธรณ์ มีสิทธิฟ้องเป็นคดีต่อศาลในสามสิบวันนับแต่วันที่
ได้รับแจ้งคําวินิจฉัยอุทธรณ์ ทั้งนี้ ตาม มาตรา ๗๓ และมาตรา ๘๒ แห่งพระราชบัญญัติภาษีที่ดินและสิ่งปลูก
สร้าง พ.ศ. ๒๕๖๒`}</p>
            <div style={{textAlign:'center'}}>
                <p >ขอแสดงความนับถือ</p>
                <p style={{paddingTop:'70px'}}>{`( ${leader.leader?.TitleEmp}${leader?.leader?.Fname} ${leader?.leader?.Lname} )`}</p>
                <p>นักวิชาการจัดเก็บรายได้ชำนาญการพิเศษ</p>
                <p>{`หัวหน้าฝ่ายรายได้ สำนักงานเขต${jwt?.District_name}`}</p>
                <p>พนักงานประเมิน</p>
            </div>
                
            </Row>
        </div>
    )
}

export default PDS6
