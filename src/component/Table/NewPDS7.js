import React from 'react'
import { Table,Image,Popover} from 'antd'
import {ProportionType} from '../../FuncPDS7/ProportionType'
import { CategoryUseful } from '../../FuncPDS7/CategoryUseful';
import { SizeType } from '../../FuncPDS7/SizeType';
import { PercentType } from '../../FuncPDS7/PercentType';
import { Except } from '../../FuncPDS7/Except';
import { exceptBalance } from '../../FuncPDS7/ExceptBalance';
import {RateTax} from '../../FuncPDS7/RateTax'
import { AmountPriceTax } from '../../FuncPDS7/AmountPriceTax';
import {Summary} from '../../FuncPDS7/Summary'
function NewPDS7({land,tax:{uid_tax,Category_Tax,exceptEmergency,Customers},loading}) {
    const {Column,ColumnGroup} = Table;
    let uniqueId = 0;
    const formatColHaveBuild = (builds =[],ColName) => {
      return  builds.map(({Building:{RateOfBuilding,Rate_Price_Build,Sub_Category,StyleBuilding,Build_Total_Place,Age_Build,Percent_Age,PriceDepreciation,AfterPriceDepreciate,Mark}},i)=> {
                if (ColName ==="ราคาประเมิน")return<p key={i}>{RateOfBuilding.Rate_Price.toLocaleString()}</p> 
                if (ColName ==="รวมราคาสิ่งปลูกสร้าง")return<p key={i}>{Rate_Price_Build.toLocaleString()}</p> 
                if(ColName ==="ประเภทสิ่งปลูกสร้าง") return <p key={i}>{Sub_Category}</p>
                if(ColName==="ลักษณะสิ่งปลูกสร้าง") return <p key={i}>{StyleBuilding}</p>
                if(ColName==="ขนาดพื้นที่รวม") return <p key={i}>{Build_Total_Place.toLocaleString()}</p>
                if(ColName==="อายูสิ่งปลูกสร้าง") return <p key={i}>{Age_Build}</p>
                if(ColName==="เปอร์เซ็นต์") return <p key={i}>{`${Percent_Age} %`}</p>
                if(ColName==="คิดเป็นค่าเสื่อม") return <p key={i}>{PriceDepreciation.toLocaleString()}</p>
                if(ColName==="ราคาประเมินสิ่งปลูกสร้างหลังหักค่าเสื่อม") return <p key={i}>{AfterPriceDepreciate.toLocaleString()}</p>
                if(ColName==="หมายเหตุ") return <p key={i}>{Mark}</p>
                }
        )
    }
    const content = (customers=[]) => {
        return customers.map(({Cus_No,title,Cus_Fname,Cus_Lname})=><div>
            <p>เลขบัตรประชาชน :{Cus_No}</p>
            <p>ชื่อ-นามสกุล :{`${title} ${Cus_Fname} ${Cus_Lname}`}</p>
        </div>)
    }
    return (
        <div>
                            <div style={{textAlign:'right',paddingRight:'60px'}}>
                                <p>ภ.ด.ส.๗</p>

                            </div>
                            <div style={{display:'block',paddingLeft:'650px'}}>
                                <Image src="/logobkk.jpeg" width={90} alt="logo"  preview={false}/>
                                
                            </div>
                            <div style={{padding:'20px'}}>
                            <Popover content={content(Customers)}>
                                    <p>รหัสผู้เสียภาษีที่ดินและสิ่งปลูกสร้าง : <b>{`${uid_tax} (${Category_Tax})`}</b></p>
                            </Popover>
                            </div>
        <Table bordered={true} dataSource={land } size="small"
                rowKey={(record)=>{
                    if (!record.__uniqueId)
                record.__uniqueId = ++uniqueId;
                return record.__uniqueId;
                }}
                loading={loading}
                pagination={false}
                scroll={{ x: 'calc(700px + 50%)'}}
                summary={pageData=>{
                    let total = 0;
                    pageData.forEach((record)=>{
                        let result = Summary(record,Category_Tax,uid_tax,exceptEmergency)
                        // console.log(result[0]);
                        if (result[0]?.length>0) {//กรณีที่มัน มี building เราต้อง map เข้าไปจึงทำให้  return array 2D ออกมา
                            //result[0] เพราะว่า มันซ้ำกันเลยไม่ต้อง map
                        let array2D = result[0].reduce((pre,cur)=>pre+cur,0)
                        return total += array2D
                        }
                        let reducerResult = result.reduce((pre,cur)=>pre+cur,0)
                        total += reducerResult
                    })                    
                    return <>
                    <Table.Summary.Row>
                        <Table.Summary.Cell colSpan={20}></Table.Summary.Cell>

                        <Table.Summary.Cell colSpan={5}><b style={{textAlign:'center'}}>ยอดรวมทั้งหมด</b></Table.Summary.Cell>
                        
                        <Table.Summary.Cell colSpan={4}>
                            <b style={{color:'red'}}>{`${total.toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2})} บาท `}</b>
                        </Table.Summary.Cell>
                        </Table.Summary.Row>
                        {exceptEmergency>0&&
                        <Table.Summary.Row>
                        <Table.Summary.Cell colSpan={20}></Table.Summary.Cell>

                        <Table.Summary.Cell colSpan={5}><b style={{textAlign:'center'}}>{`(ได้รับส่วนลดกรณีฉุกเฉิน ${exceptEmergency>0&&exceptEmergency} %)`}</b></Table.Summary.Cell>
                       
                        <Table.Summary.Cell colSpan={4}>
                            <b style={{color:'red'}}>{`${exceptEmergency>0?((total * exceptEmergency) / 100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2}):total.toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2})} บาท `}</b>
                        </Table.Summary.Cell>
                        
                        </Table.Summary.Row>
                        }
                    </>
                }}
                
        >
            <ColumnGroup title="คำนวณประเมินทุนทรัพย์และที่ดิน">
                <Column 
                title="ที่"
                dataIndex="Land"
                key="Serial_code_land"
                render={(text)=><p>{text.Serial_code_land}</p>}

                />
                <Column 
                title="ประเภทที่ดิน"
                dataIndex="Land"
                key="Category_doc"
                render={(text)=><p>{`${text.Category_doc}/${text.Parcel_No}`}</p>}
                />
                <Column dataIndex="TypeName" title="ลักษณะการใช้ประโยชน์ที่ดิน"
                />
                <ColumnGroup title="จำนวนเนื้อที่ดิน">
                    <Column dataIndex="Useful_RAI" title="ไร่" key="Useful_RAI" 
                    render={(text,record)=>record.UsefulLand_Tax_ID===uid_tax&&text}
                    />
                    <Column dataIndex="Useful_GNAN" title="งาน" key="Useful_GNAN"
                    render={(text,record)=>record.UsefulLand_Tax_ID===uid_tax&&text}
                    />
                    <Column dataIndex="Useful_WA" title="ตร.วา" key="Useful_WA"
                    render={(text,record)=>record.UsefulLand_Tax_ID===uid_tax&&text}
                    />
                </ColumnGroup>
                <Column title="คำนวณเป็น ตรว." key="Place" dataIndex="Place"
                    render={(text,record)=>record.UsefulLand_Tax_ID===uid_tax&&text.toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2})}
                />
                <Column  title="ราคาประเมินต่อ ตรว." dataIndex="Land"
                     render={(Land,record)=>record.UsefulLand_Tax_ID===uid_tax&&Land.Price.toLocaleString(undefined,{minimumFractionDigits: 2,
                        maximumFractionDigits: 2})}
                />
                <Column title="รวมราคาประเมิณของที่ดิน" dataIndex="PriceUseful"
                width={100}  
                render={(text,record)=>{
                  return  record.UsefulLand_Tax_ID===uid_tax&&text.toLocaleString(undefined,{minimumFractionDigits: 2,
                    maximumFractionDigits: 2})
                }}
                />
            </ColumnGroup>
            <ColumnGroup title="คำนวณประเมินทุนทรัพย์และสิ่งปลูกสร้าง" >
                            
                            <Column 
                                title="ที่"
                                dataIndex="BuildOnUsefulLands"
                                width={10}
                                render={(build,record,index)=>{
                                    const obj={
                                        children:build.map((build,i)=><p key={i}>{i+1}</p>),
                                    }
                                    
                                    return obj
                                }}
                                
                                />
                             
                                <Column  title="ประเภทสิ่งปลูกสร้าง"
                                dataIndex="BuildOnUsefulLands"
                                width={80}  
                                render={(text)=>formatColHaveBuild(text,"ประเภทสิ่งปลูกสร้าง")}
                                 />
                                <Column title="ลักษณะสิ่งปลูกสร้าง" 
                                width={68}  
                                dataIndex="BuildOnUsefulLands"
                                render={(text)=>formatColHaveBuild(text,"ลักษณะสิ่งปลูกสร้าง")}

                                />
                                <Column title="ขนาดพื้นที่รวม (ตร.ม)" 
                                width={65}  
                                dataIndex="BuildOnUsefulLands"
                                render={(text)=>formatColHaveBuild(text,"ขนาดพื้นที่รวม")}

                                />
                                <Column title="ราคาประเมินสิ่งปลูกสร้างต่อ ตรม."
                                width={80}  
                                dataIndex="BuildOnUsefulLands"
                                render={(text)=>formatColHaveBuild(text,"ราคาประเมิน")}
                                 /> 
                                  <Column title="รวมราคาสิ่งปลูกสร้าง"
                                  width={100}  
                                  dataIndex="BuildOnUsefulLands"
                                  render={(text)=>formatColHaveBuild(text,"รวมราคาสิ่งปลูกสร้าง")}
                                 /> 
                                <ColumnGroup title="ค่าเสื่อม">
                                    <Column title="อายูสิ่งปลูกสร้าง" 
                                    width={47}     
                                    dataIndex="BuildOnUsefulLands"
                                    render={(text)=>formatColHaveBuild(text,"อายูสิ่งปลูกสร้าง")}                            
                                    /> 
                                    <Column title="เปอร์เซ็นต์"   
                                    width={63}   
                                    dataIndex="BuildOnUsefulLands"
                                    render={(text)=>formatColHaveBuild(text,"เปอร์เซ็นต์")}                                 
                                    /> 
                                    <Column title="คิดเป็นค่าเสื่อม(บาท)"         
                                    width={100}     
                                    dataIndex="BuildOnUsefulLands"
                                    render={(text)=>formatColHaveBuild(text,"คิดเป็นค่าเสื่อม")}                       
                                    /> 
                                </ColumnGroup>
                                <Column title="ราคาประเมินสิ่งปลูกสร้างหลังหักค่าเสื่อม(บาท)"
                                    width={100}       
                                    dataIndex="BuildOnUsefulLands"
                                    render={(text)=>formatColHaveBuild(text,"ราคาประเมินสิ่งปลูกสร้างหลังหักค่าเสื่อม")}                            
                                    />                   
            </ColumnGroup>
                                <Column title="รวมราคาประเมิณที่ดินและสิ่งปลูกสร้าง" 
                                dataIndex="BuildOnUsefulLands"
                                width={110}
                                render={(build,{PriceUseful,UsefulLand_Tax_ID})=>{
                                    let totalPlace = build.map(({Building:{Width,Length}})=>Width * Length)
                                                    .reduce((pre,cur)=>pre+cur,0)
                                    return build.length>0?UsefulLand_Tax_ID===uid_tax? build.map(({Building:{Width,Length,AfterPriceDepreciate}}) =><p>{(((Width * Length)/totalPlace)*PriceUseful +AfterPriceDepreciate )
                                                                .toLocaleString(undefined,{minimumFractionDigits: 2,
                                                                    maximumFractionDigits: 2})
                                                            }</p>):
                                                            build.map(({Building:{Width,Length,AfterPriceDepreciate}}) =><p>{(AfterPriceDepreciate)
                                                                .toLocaleString(undefined,{minimumFractionDigits: 2,
                                                                    maximumFractionDigits: 2})
                                                            }</p>)
                                            :<p>{PriceUseful.toLocaleString(undefined,{minimumFractionDigits: 2,
                                             maximumFractionDigits: 2})}</p>
                                }}
                                /> 
                                <Column title="ลักษณะการใช้ประโยชน์"
                                width={120}
                                render={(_,record)=>CategoryUseful(record)}
                                />
                                <Column title="ขนาดพื้นที่"
                                 render={(_,record)=>SizeType(record)}
                                />
                                <Column title="คิดเป็นสัดส่วน"
                                render={(_,record)=>PercentType(record)}
                                />
                                <Column title="รวมราคาประเมินที่ดินและสิ่งปลูกสร้างตามสัดส่วน"
                                render={(_,record)=>ProportionType(record,uid_tax)}
                                />
                                <Column title="หักมูลค่าฐานภาษีที่ได้รับยกเว้น(บาท)" 
                                        width={140}
                                        render={(_,record)=>Except(record,Category_Tax,uid_tax)}
                                />
                                <Column title="คงเหลือราคาประเมิณทรัพย์ที่ต้องชำระ" 
                                        width={150}
                                       render={(_,record)=>exceptBalance(record,Category_Tax,uid_tax)}
                                />
                                <Column title="อัตราภาษีร้อยละ" 
                                        width={120}
                                        // colSpan={2}
                                        render={(_,record) =>RateTax(record,Category_Tax,uid_tax)}
                                />
                                <Column title="จำนวนภาษีต้องชำระ(บาท)" 
                                        width={120}
                                        render={(_,record) =>AmountPriceTax(record,Category_Tax,uid_tax,exceptEmergency)}

                                        // render={(text,record,index) =>objPDS7.AmountPriceTax(record)}
                                />
                                
                               
        </Table>
     </div>
    )
}

export default NewPDS7
