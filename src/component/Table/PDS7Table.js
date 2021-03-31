import React from 'react'
import { Table,Popover} from 'antd'
import seperate from '../../FuncPDS7/Seperate'
function PDS7Table({land,tax:{uid_tax,Category_Tax,exceptEmergency},loading,show}) {
    const {Column,ColumnGroup} = Table;
    let uniqueId = 0;
    const formatColHaveBuild = (builds =[],ColName) => {
      return  builds.map((build,i)=> {
                if (ColName ==="ราคาประเมิน")return<p key={i}>{build.Building.RateOfBuilding.Rate_Price.toLocaleString()}</p> 
                if (ColName ==="รวมราคาสิ่งปลูกสร้าง")return<p key={i}>{build.Building.Rate_Price_Build.toLocaleString()}</p> 
                if(ColName ==="ประเภทสิ่งปลูกสร้าง") return <p key={i}>{build.Building.Sub_Category}</p>
                if(ColName==="ลักษณะสิ่งปลูกสร้าง") return <p key={i}>{build.Building.StyleBuilding}</p>
                if(ColName==="ขนาดพื้นที่รวม") return <p key={i}>{build.Building.Build_Total_Place.toLocaleString()}</p>
                if(ColName==="อายูสิ่งปลูกสร้าง") return <p key={i}>{build.Building.Age_Build}</p>
                if(ColName==="เปอร์เซ็นต์") return <p key={i}>{`${build.Building.Percent_Age} %`}</p>
                if(ColName==="คิดเป็นค่าเสื่อม") return <p key={i}>{build.Building.PriceDepreciation.toLocaleString()}</p>
                if(ColName==="ราคาประเมินสิ่งปลูกสร้างหลังหักค่าเสื่อม") return <p key={i}>{build.Building.AfterPriceDepreciate.toLocaleString()}</p>
                if(ColName==="หมายเหตุ") return <p key={i}>{build.Building.Mark}</p>
                }
            
        )
        
    }
    const content =(typePercent =100 ,price= 0,Totalpercent =100,name,size=0)=>{
        return <div>
                <p>ประเภท {name}</p>
                <p>ขนาด {size} ตรม.</p>
                <p>{`${typePercent}*${price}/${Totalpercent}`}</p>
               
            </div>
    }
    const contentNexto =(usefuls=[])=>{
        return <div>
            <h3>คิดรวมกับการใช้ประโยชน์</h3>
            {usefuls.map(useful=><p key={useful.useful_id}>{`รหัส ${useful.useful_id}`}</p>)}
        </div>
    }
    let objPDS7 ={
        proportionType :(record =[]) => {
            let totalPercent = record.useful.BuildOnUsefulLands.length * 100||100 //ให้ แบ็คเอน ทำให้
            /*totalPercent === 0 || 100 คือ กรณีไม่มีสิ่งปลูกสร้างบนการใช้ประโยชน์ เช่น การใช้ประโยชน์เกษตร ที่ไม่มีสิ่งปลูกสร้าง 
            กรณี เป็นแปลงที่ถูกคร่อมมา  หรือ สิ่งปลูกสร้างคนละเจ้าของ จะมีสัดส่วนบนแปลงที่ดิน ทุกประเภทจะมีแค่อน่างละ อันเท่านั้น
            กรณีที่การใช้ประโยชน์หลายประเภทจะต้องมีสิ่งปลูกสร้างด้วย 
            ทุกกรณีนี้จะถูกเซ็ตเปอร์เซ็นให้เป็นหนึ่งร้อย
            */
           if (record.useful.BuildOnUsefulLands.length >0) {//กรณีมีสิ่งปลุกสร้าง
               return record.useful.BuildOnUsefulLands.map((build,i)=>{
                   return <>
                            <Popover key={i+1} 
                            content={content(build.Building.LiveType&&
                                build.Building.LiveType.Percent_Live,
                                record.PriceBuildAnduseful,totalPercent,
                                `อยู่อาศัย(${build.Building.LiveType&&build.Building.LiveType.Live_Status?'หลังหลัก':'หลังรอง'})`,
                                build.Building.LiveType&& build.Building.LiveType.Live_Size
                                )}
                            >
                            <p key={i+1}>{build.Building.LiveType&&((build.Building.LiveType.Percent_Live * Number(record.PriceBuildAnduseful)) / totalPercent).toLocaleString(undefined,{minimumFractionDigits: 2,
  maximumFractionDigits: 2})}</p>
                            </Popover>
                            <Popover key={i+2} 
                            content={content(build.Building.OtherType&&build.Building.OtherType.Percent_Other,
                                record.PriceBuildAnduseful,totalPercent,
                                "อื่นๆ",
                                build.Building.OtherType&&build.Building.OtherType.Other_Size
                                )}
                            >
                            <p key={i+2}>{build.Building.OtherType&&((build.Building.OtherType.Percent_Other * Number(record.PriceBuildAnduseful)) / totalPercent).toLocaleString(undefined,{minimumFractionDigits: 2,
  maximumFractionDigits: 2})}</p>             
                            </Popover>
                            <Popover key={i+3} 
                            content={content(build.Building.FarmType&&build.Building.FarmType.Percent_Farm,
                                record.PriceBuildAnduseful,totalPercent,
                                "เกษตร",
                                build.Building.FarmType&&build.Building.FarmType.Farm_Size
                                )}
                            >
                           <p key={i+3}>{build.Building.FarmType&&((build.Building.FarmType.Percent_Farm * Number(record.PriceBuildAnduseful)) / totalPercent).toLocaleString(undefined,{minimumFractionDigits: 2,
  maximumFractionDigits: 2})}</p>
                           </Popover>
                            <Popover key={i+4}
                            content={content(build.Building.EmptyType&&build.Building.EmptyType.Percent_Empty,
                                record.PriceBuildAnduseful,totalPercent,
                                "ว่างเปล่า",
                                build.Building.EmptyType&&build.Building.EmptyType.Empty_Size
                                )}
                             >
                             <p key={i+4}>{build.Building.EmptyType&&((build.Building.EmptyType.Percent_Empty * Number(record.PriceBuildAnduseful)) / totalPercent).toLocaleString(undefined,{minimumFractionDigits: 2,
  maximumFractionDigits: 2})}</p>     
                            </Popover>
                    </>
               })
               
           }
            if (record.useful.LiveTypes.length === 0 &&record.useful.OtherTypes.length === 0&& record.useful.FarmTypes.length === 0&& record.useful.EmptyTypes.length === 0) {
                   //ไม่มีอะไรเลยทั้งสิ่งปลูกสร้าง บนแปลง และ คร่อมแปลง
                   return (
                        <p>{record.PriceBuildAnduseful.toLocaleString(undefined,{minimumFractionDigits: 2,
  maximumFractionDigits: 2})}</p>
                        )
            }else{
                //กรณีที่ไม่มีสิ่งปลูกสร้าง แต่มีสัดส่วน ก็คือมีสิ่งปลูกสร้างคร่อมแปลงมา หรือ สิ่งปลูกสร้างกับที่ดินคนละเจ้าของ
                return <>
                        {record.useful.LiveTypes.length>0&&record.useful.LiveTypes.map((live,i)=>(<>
                                <Popover  
                                content={content(live.Percent_Live,
                                    record.PriceBuildAnduseful,totalPercent,
                                    `อยู่อาศัย(${live.Live_Status?'หลังหลัก':'หลังรอง'})s`,
                                    live.Live_Size
                                    )}
                                    key={i}
                                    >
                                <p key={i}>{((live.Percent_Live * Number(record.PriceBuildAnduseful)) / totalPercent).toLocaleString(undefined,{minimumFractionDigits: 2,
  maximumFractionDigits: 2})}</p>
                                </Popover>
                        </>))}
                        {record.useful.OtherTypes.length>0&&record.useful.OtherTypes.map((other,i)=>(<>
                                <Popover  
                                content={content(other.Percent_Other,
                                    record.PriceBuildAnduseful,totalPercent,
                                    "อื่นๆs",
                                    other.Other_Size
                                    )}
                                    key={i}
                                    >
                                <p key={i}>{((other.Percent_Other * Number(record.PriceBuildAnduseful)) / totalPercent).toLocaleString(undefined,{minimumFractionDigits: 2,
  maximumFractionDigits: 2})}</p>             
                                </Popover>
                        </>))}    
                        {record.useful.FarmTypes.length>0&&record.useful.FarmTypes.map((farm,i)=>(<>
                                <Popover  
                                    content={content(farm.Percent_Farm,
                                        record.PriceBuildAnduseful,totalPercent,
                                        "เกษตรs",
                                        farm.Farm_Size
                                        )}
                                        >
                                <p >{((farm.Percent_Farm * Number(record.PriceBuildAnduseful)) / totalPercent).toLocaleString(undefined,{minimumFractionDigits: 2,
  maximumFractionDigits: 2})}</p>
                                </Popover>
                        </>))}    
                        {record.useful.EmptyTypes.length>0&&record.useful.EmptyTypes.map((empty,i)=><>
                                <Popover 
                                content={content(empty.Percent_Empty,
                                    record.PriceBuildAnduseful,totalPercent,
                                    "ว่างเปล่าs",
                                    empty.Empty_Size
                                    )}
                                >
                                <p >{((empty.Percent_Empty * Number(record.PriceBuildAnduseful)) / totalPercent).toLocaleString(undefined,{minimumFractionDigits: 2,
  maximumFractionDigits: 2})}</p>     
                                </Popover>
                        </>)}    
                            
                    </>
            }
            
           
            
        },
        except:({useful,PriceBuildAnduseful})=>{
            /* เงื่อนไขในการได้รับส่วนลด
           - กรณีการใช้ประโยชน์ที่ดินตาม {
                มาตร 3 50% อื่นๆ และ ที่อยู่อาศัยหลังหลักที่ได้รับมรดกก่อนมีการเปลี่ยน กฏหมายที่ดินและสิ่งปลูกสร้าง ลด50ล้านบาทแล้ว เอาส่วนที่เหลือมาลดอีก 50%
                มาตรา4 90% อื่นๆ
                มาตรา 8 100% อื่นๆ
            }
            -กรณีที่ดินและสิ่งปลูกสร้างเป็นเจ้าของบุคคล ลด 50 ล้านบาท
            -กรณีเป็นเจ้าของสิ่งปลูกสร้างที่อยู่อาศัยหลังหลัก ลด 10 ล้านบาท
            -กรณีเกษตรที่เป็นของยุคคล ลด 50 ล้าน    TypeName
            */ //   return  Building.LiveType?Building.LiveType.Live_Status?Building.LiveType.Live_Status&&Building.Build_Tax_ID===uid_tax&&useful.UsefulLand_Tax_ID===uid_tax?50000000:10000000:0:0

           if (useful.BuildOnUsefulLands.length >0) {//กรณีมีสิ่งปลุกสร้าง
            return useful.BuildOnUsefulLands.map(({Building},i)=>{
                return <>
                            {Building.LiveType&&
                            <p key={i+1}>{Building.LiveType.Live_Status&&Category_Tax ==="บุคคล"?Building.Build_Tax_ID=== uid_tax && useful.UsefulLand_Tax_ID=== uid_tax?`50ล้าน`:`10ล้าน`:useful.Special_Useful}
                            </p>
                            }
                            {/* {Building.OtherType&&
                            <p key={i+2}>{exceptEmergency>0?`${exceptEmergency}%`:useful.Special_Useful}</p> 
                            }          */}
                            {Building.OtherType&&
                            <p key={i+2}>{useful.Special_Useful}</p> 
                            }  
                            {Building.FarmType&&
                                <p key={i+3}>{Category_Tax ==="บุคคล"?`50ล้าน`:0}</p>                            }
                            {/* {Building.EmptyType&&<p key={i+4}>{exceptEmergency>0?`${exceptEmergency}%`:useful.Special_Useful}</p> } */}
                            {Building.EmptyType&&<p key={i+4}>{useful.Special_Useful}</p> }

                                 
                </>
            })
            
        }
         if (useful.LiveTypes.length === 0 &&useful.OtherTypes.length === 0&& useful.FarmTypes.length === 0&& useful.EmptyTypes.length === 0) {
                //ไม่มีอะไรเลยทั้งสิ่งปลูกสร้าง บนแปลง และ คร่อมแปลง เช่นเป็นเกษตรอย่างเดียว ไม่มีสิ่งปลูกสร้าง
                
                return <>
                        <p>{useful.TypeName ==="เกษตร"&&Category_Tax ==="บุคคล"?`50ล้าน`:useful.Special_Useful}</p>
                    </>
         }else{
             //กรณีที่ไม่มีสิ่งปลูกสร้าง แต่มีสัดส่วน ก็คือมีสิ่งปลูกสร้างคร่อมแปลงมาหรือว่าคนละเจ้าของกับแปลงที่ดิน Building.Build_Tax_ID
          
             return  <>
             {useful.LiveTypes.length>0&&useful.LiveTypes.map((live,i)=>(<>
                     <p>{live.Live_Status&&Category_Tax ==="บุคคล"?live.Building.Build_Tax_ID=== uid_tax && useful.UsefulLand_Tax_ID=== uid_tax?
                        `${(live.Useful_live.BalanceDiscount/1000000).toFixed(2)}ล้าน`:`${(live.Useful_live.BalanceDiscount/1000000).toFixed(2)}ล้าน`
                     :useful.Special_Useful}</p>
                     
             </>))}
             {useful.OtherTypes.length>0&&useful.OtherTypes.map((other,i)=>(<>
                     
                     {/* <p key={i}>{exceptEmergency>0?`${exceptEmergency}%`:useful.Special_Useful}</p>           */}
                     <p>{useful.Special_Useful}</p>
                   
             </>))}    
             {useful.FarmTypes.length>0&&useful.FarmTypes.map((farm,i)=>(<>
                   
                <p key={i+3}>{Category_Tax ==="บุคคล"?`50ล้าน`:0}</p>                   
             </>))}    
             {useful.EmptyTypes.length>0&&useful.EmptyTypes.map((empty,i)=><>
                    
                     {/* <p >{exceptEmergency>0?`${exceptEmergency}%`:useful.Special_Useful}</p>      */}
                     <p>{useful.Special_Useful}</p>
                    
             </>)}
             </>
         }
        },
        exceptBalance:({useful,PriceBuildAnduseful})=>{
            let totalPercent = useful.BuildOnUsefulLands.length * 100||100
            if (useful.Useful.length > 0) {
                let TotalNexto =0;
                      useful.Useful.map(usefuls=>{ 
                        if (usefuls.BuildOnUsefulLands.length >0) {
                        let TotalPrice =   usefuls.BuildOnUsefulLands.reduce((pre,{Building:{AfterPriceDepreciate}})=>pre + AfterPriceDepreciate,0)
                          TotalNexto = TotalPrice +usefuls.PriceUseful + PriceBuildAnduseful;

                        }
                        if (useful.LiveTypes.length === 0 &&useful.OtherTypes.length === 0&& useful.FarmTypes.length === 0&& useful.EmptyTypes.length === 0) {
                            TotalNexto = useful.PriceUseful + PriceBuildAnduseful
                        }
                        
                    })
                    return seperate(TotalNexto,useful.TypeName,0,useful.StartYears,useful.EmptyAbsolutes).map(res=><Popover content={()=>contentNexto(useful.Useful)}><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2})}</p></Popover>)

            }else{
                    
                if (useful.isNexto) {
                    return <p>แปลงติดกัน</p>
                }else{
                    if (useful.BuildOnUsefulLands.length >0) {            
                        return useful.BuildOnUsefulLands.map(({Building},i)=>{
                            return <>
                                        {
                                            Building.LiveType?
                                            // !useful.isNexto?
                                                    Building.LiveType.Live_Status&&Category_Tax ==="บุคคล"?Building.Build_Tax_ID=== uid_tax && useful.UsefulLand_Tax_ID=== uid_tax?seperate((Building.LiveType?.Percent_Live * Number(PriceBuildAnduseful)) / totalPercent,
                                                    "อยู่อาศัย",50000000
                                                    ).map(res =><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2})}</p>)
                                                    :seperate((Building.LiveType?.Percent_Live * Number(PriceBuildAnduseful)) / totalPercent,
                                                    "อยู่อาศัย",10000000).map(res =><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2})}</p>)
                                                    :
                                                    seperate(
                                                        (Building.LiveType?.Percent_Live * Number(PriceBuildAnduseful)) / totalPercent,
                                                    "อยู่อาศัย").map(res =><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2})}</p>)
                                            // :"แปลงติดกัน"
                                            :null
                                        }
                                    
                                        {
                                        // !useful.isNexto?
                                            Building.OtherType&&
                                            seperate(
                                                (Building.OtherType?.Percent_Other * Number(PriceBuildAnduseful)) / totalPercent,
                                            "อื่นๆ")
                                            .map(res =><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2})}</p>)
                                        // :"แปลงติดกัน"
                                        }  
                                        
                                        {Building.FarmType?Category_Tax ==="บุคคล"?
                                            // !useful.isNexto?
                                                seperate((Building.FarmType?.Percent_Farm * Number(PriceBuildAnduseful)) / totalPercent,
                                                "เกษตร",50000000).map(res=><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2})}</p>)
                                                :
                                                seperate((Building.FarmType?.Percent_Farm * Number(PriceBuildAnduseful)) / totalPercent,
                                                "เกษตร").map(res=><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2})} </p>)
                                            // :"แปลงติดกัน"
                                        :null
                                        }

                                        {
                                        // !useful.isNexto?
                                            Building.EmptyType &&Building.EmptyType?.Percent_Empty &&
                                            seperate((Building.EmptyType?.Percent_Empty * Number(PriceBuildAnduseful)) / totalPercent,'ว่างเปล่า')
                                            .map(res=><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2})}</p>)
                                        // :"แปลงติดกัน"
                                        }
            
                                            
                            </>
                        })
                        
                    }
                    if (useful.LiveTypes.length === 0 &&useful.OtherTypes.length === 0&& useful.FarmTypes.length === 0&& useful.EmptyTypes.length === 0) {
                            //ไม่มีอะไรเลยทั้งสิ่งปลูกสร้าง บนแปลง และ คร่อมแปลง เช่นเป็นเกษตรอย่างเดียว ไม่มีสิ่งปลูกสร้าง
                            
                            return <>
                                    {
                                    // !useful.isNexto?
                                        useful.TypeName ==="เกษตร"?
                                            Category_Tax ==="บุคคล"?
                                            seperate(PriceBuildAnduseful,
                                            "เกษตร",50000000).map(res=><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2})}</p>)
                                            :seperate(PriceBuildAnduseful,
                                            "เกษตร").map(res=><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2})}</p>)
                                        :seperate(PriceBuildAnduseful,
                                            useful.TypeName).map(res=><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2})}</p>)
                                    // :"แปลงติดกัน"
                                    }
                                </>
                    }else{
                        //กรณีที่ไม่มีสิ่งปลูกสร้าง แต่มีสัดส่วน ก็คือมีสิ่งปลูกสร้างคร่อมแปลงมาหรือว่าคนละเจ้าของกับแปลงที่ดิน Building.Build_Tax_ID
                    
                        return  <>
                        {useful.LiveTypes.length>0&&useful.LiveTypes.map((live,i)=>(<>
                        {
                        // !useful.isNexto?
                            live.Live_Status&&Category_Tax ==="บุคคล"?live.Building.Build_Tax_ID=== uid_tax && useful.UsefulLand_Tax_ID=== uid_tax?seperate((live.Percent_Live * Number(PriceBuildAnduseful)) / totalPercent,
                            "อยู่อาศัย",live.Useful_live.BalanceDiscount
                            ).map(res =><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                    maximumFractionDigits: 2})}</p>)
                            :seperate((live.Percent_Live * Number(PriceBuildAnduseful)) / totalPercent,
                            "อยู่อาศัย",live.Useful_live.BalanceDiscount).map(res =><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                    maximumFractionDigits: 2})} </p>)
                            :
                            seperate(
                                (live.Percent_Live * Number(PriceBuildAnduseful)) / totalPercent,
                            "อยู่อาศัย").map(res =><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                    maximumFractionDigits: 2})} </p>)
                        // :"แปลงติดกัน"
                        }
                        
                        </>))}
                        {useful.OtherTypes.length>0&&useful.OtherTypes.map((other,i)=>(<>      
                        {
                        // !useful.isNexto?
                            seperate((other.Percent_Other * Number(PriceBuildAnduseful)) / totalPercent,
                            "อื่นๆ")
                            .map(res =><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                 maximumFractionDigits: 2})} </p>)
                        // :"แปลงติดกัน"
                        }              
                            
                        </>))}    
                        {useful.FarmTypes.length>0&&useful.FarmTypes.map((farm,i)=>(<>  
                            {
                            // !useful.isNexto?
                                Category_Tax ==="บุคคล"?seperate((farm.Percent_Farm * Number(PriceBuildAnduseful)) / totalPercent,
                                            "เกษตร",50000000).map(res=><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2})}</p>)
                                            :
                                            seperate((farm.Percent_Farm * Number(PriceBuildAnduseful)) / totalPercent,
                                            "เกษตร").map(res=><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2})} </p>)
                            // :"แปลงติดกัน"              
                            }
                        </>))}    
                        {useful.EmptyTypes.length>0&&useful.EmptyTypes.map((empty,i)=><>
                            {  
                            //  !useful.isNexto?
                                        seperate((empty.Percent_Empty * Number(PriceBuildAnduseful)) / totalPercent,'ว่างเปล่า')
                                        .map(res=><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                                maximumFractionDigits: 2})}</p>)
                                // :"แปลงติดกัน"
                            }
                                
                        </>)}
                        </>
                    }   
                }
                
            
            }
        },
        RateTax:({useful,PriceBuildAnduseful})=>{
            let totalPercent = useful.BuildOnUsefulLands.length * 100||100
            if (useful.Useful.length > 0) {
                let TotalNexto =0;
                      useful.Useful.map(usefuls=>{ 
                        if (usefuls.BuildOnUsefulLands.length >0) {
                        let TotalPrice =   usefuls.BuildOnUsefulLands.reduce((pre,{Building:{AfterPriceDepreciate}})=>pre + AfterPriceDepreciate,0)
                          TotalNexto = TotalPrice +usefuls.PriceUseful + PriceBuildAnduseful;

                        }if (useful.LiveTypes.length === 0 &&useful.OtherTypes.length === 0&& useful.FarmTypes.length === 0&& useful.EmptyTypes.length === 0) {
                            TotalNexto = useful.PriceUseful + PriceBuildAnduseful
                        }
                        
                    })
                    return seperate(TotalNexto,useful.TypeName,0,useful.StartYears,useful.EmptyAbsolutes).map(res=><Popover content={()=>contentNexto(useful.Useful)}><p>{res.percent.toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2})}</p></Popover>)

            }else{
                    
                if (useful.isNexto) {
                    return <p>0</p>
                }else{
                    if (useful.BuildOnUsefulLands.length >0) {            
                        return useful.BuildOnUsefulLands.map(({Building},i)=>{
                            return <>
                                        {
                                            Building.LiveType?
                                                    Building.LiveType.Live_Status&&Category_Tax ==="บุคคล"?Building.Build_Tax_ID=== uid_tax && useful.UsefulLand_Tax_ID=== uid_tax?seperate((Building.LiveType?.Percent_Live * Number(PriceBuildAnduseful)) / totalPercent,
                                                    "อยู่อาศัย",50000000
                                                    ).map(res =><p>{res.percent}</p>)
                                                    :seperate((Building.LiveType?.Percent_Live * Number(PriceBuildAnduseful)) / totalPercent,
                                                    "อยู่อาศัย",10000000).map(res =><p>{res.percent}</p>)
                                                    :
                                                    seperate(
                                                        (Building.LiveType?.Percent_Live * Number(PriceBuildAnduseful)) / totalPercent,
                                                    "อยู่อาศัย").map(res =><p>{res.percent}</p>)
                                            :null
                                        }
                                    
                                        {
                                            Building.OtherType&&
                                            seperate(
                                                (Building.OtherType?.Percent_Other * Number(PriceBuildAnduseful)) / totalPercent,
                                            "อื่นๆ")
                                            .map(res =><p>{res.percent}</p>)
                                        }  
                                        
                                        {Building.FarmType?Category_Tax ==="บุคคล"?
                                                seperate((Building.FarmType?.Percent_Farm * Number(PriceBuildAnduseful)) / totalPercent,
                                                "เกษตร",50000000).map(res=><p>{res.percent}</p>)
                                                :
                                                seperate((Building.FarmType?.Percent_Farm * Number(PriceBuildAnduseful)) / totalPercent,
                                                "เกษตร").map(res=><p>{res.percent} </p>)
                                        :null
                                        }

                                        {
                                            Building.EmptyType &&Building.EmptyType?.Percent_Empty &&
                                            seperate((Building.EmptyType?.Percent_Empty * Number(PriceBuildAnduseful)) / totalPercent,'ว่างเปล่า',
                                                   0, Building.EmptyType?.StartYear,Building.EmptyType?.EmptyAbsolute
                                            )
                                            .map(res=><p>{res.percent} </p>)
                                        }
            
                                            
                            </>
                        })
                        
                    }
                    if (useful.LiveTypes.length === 0 &&useful.OtherTypes.length === 0&& useful.FarmTypes.length === 0&& useful.EmptyTypes.length === 0) {
                            //ไม่มีอะไรเลยทั้งสิ่งปลูกสร้าง บนแปลง และ คร่อมแปลง เช่นเป็นเกษตรอย่างเดียว ไม่มีสิ่งปลูกสร้าง
                            
                            return <>
                                    {
                                        useful.TypeName ==="เกษตร"?
                                            Category_Tax ==="บุคคล"?
                                            seperate(PriceBuildAnduseful,
                                            "เกษตร",50000000).map(res=><p>{res.percent}</p>)
                                            :seperate(PriceBuildAnduseful,
                                            "เกษตร").map(res=><p>{res.percent}</p>)
                                        :seperate(PriceBuildAnduseful,
                                            useful.TypeName,0,useful.StartYears,useful.EmptyAbsolutes).map(res=><p>{res.percent}</p>)
                                    }
                                </>
                    }else{
                        //กรณีที่ไม่มีสิ่งปลูกสร้าง แต่มีสัดส่วน ก็คือมีสิ่งปลูกสร้างคร่อมแปลงมาหรือว่าคนละเจ้าของกับแปลงที่ดิน Building.Build_Tax_ID
                    
                        return  <>
                        {useful.LiveTypes.length>0&&useful.LiveTypes.map((live,i)=>(<>
                        {
                            live.Live_Status&&Category_Tax ==="บุคคล"?live.Building.Build_Tax_ID=== uid_tax && useful.UsefulLand_Tax_ID=== uid_tax?seperate((live.Percent_Live * Number(PriceBuildAnduseful)) / totalPercent,
                            "อยู่อาศัย",live.Useful_live.BalanceDiscount
                            ).map(res =><p>{res.percent}</p>)
                            :seperate((live.Percent_Live * Number(PriceBuildAnduseful)) / totalPercent,
                            "อยู่อาศัย",live.Useful_live.BalanceDiscount).map(res =><p>{res.percent}</p>)
                            :
                            seperate(
                                (live.Percent_Live * Number(PriceBuildAnduseful)) / totalPercent,
                            "อยู่อาศัย").map(res =><p>{res.percent}</p>)
                        }
                        
                        </>))}
                        {useful.OtherTypes.length>0&&useful.OtherTypes.map((other,i)=>(<>      
                        {
                            seperate((other.Percent_Other * Number(PriceBuildAnduseful)) / totalPercent,
                            "อื่นๆ")
                            .map(res =><p>{res.percent}</p>)
                        }              
                            
                        </>))}    
                        {useful.FarmTypes.length>0&&useful.FarmTypes.map((farm,i)=>(<>  
                            {
                                Category_Tax ==="บุคคล"?seperate((farm.Percent_Farm * Number(PriceBuildAnduseful)) / totalPercent,
                                            "เกษตร",50000000).map(res=><p>{res.percent}</p>)
                                            :
                                            seperate((farm.Percent_Farm * Number(PriceBuildAnduseful)) / totalPercent,
                                            "เกษตร").map(res=><p>{res.percent} </p>)
                            }
                        </>))}    
                        {useful.EmptyTypes.length>0&&useful.EmptyTypes.map((empty,i)=><>
                            {  
                                        seperate((empty.Percent_Empty * Number(PriceBuildAnduseful)) / totalPercent,'ว่างเปล่า',
                                        0, empty.StartYear,empty.EmptyAbsolute
                                        )
                                        .map(res=><p>{res.percent}</p>)
                            }
                                
                        </>)}
                        </>
                    }   
                }
                
            
            }
        },
        AmountPriceTax:({useful,PriceBuildAnduseful})=>{
            let totalPercent = useful.BuildOnUsefulLands.length * 100||100
            if (useful.Useful.length > 0) {
                let TotalNexto =0;
                      useful.Useful.map(usefuls=>{ 
                        if (usefuls.BuildOnUsefulLands.length >0) {
                        let TotalPrice =   usefuls.BuildOnUsefulLands.reduce((pre,{Building:{AfterPriceDepreciate}})=>pre + AfterPriceDepreciate,0)
                          TotalNexto = TotalPrice +usefuls.PriceUseful + PriceBuildAnduseful;
        
                        }if (useful.LiveTypes.length === 0 &&useful.OtherTypes.length === 0&& useful.FarmTypes.length === 0&& useful.EmptyTypes.length === 0) {
                            TotalNexto = useful.PriceUseful + PriceBuildAnduseful
                        }
                        
                    })
                    return seperate(TotalNexto,useful.TypeName,0,useful.StartYears,useful.EmptyAbsolutes).map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                        <p>{(res.price * res.percent) *(useful.Special_Useful/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                    maximumFractionDigits: 2})}</p>
                    :
                        <p>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2})}</p>)
        
            }else{
                    
                if (useful.isNexto) {
                    return <p>0</p>
                }else{
                    if (useful.BuildOnUsefulLands.length >0) {            
                        return useful.BuildOnUsefulLands.map(({Building},i)=>{
                            return <>
                                        {
                                            Building.LiveType?
                                            // !useful.isNexto?
                                                    Building.LiveType.Live_Status&&Category_Tax ==="บุคคล"?Building.Build_Tax_ID=== uid_tax && useful.UsefulLand_Tax_ID=== uid_tax?seperate((Building.LiveType?.Percent_Live * Number(PriceBuildAnduseful)) / totalPercent,
                                                    "อยู่อาศัย",50000000
                                                    ).map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                                                        <p>{(res.price * res.percent) *(useful.Special_Useful/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2})}</p>
                                                        :
                                                        <p>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2})}</p>)
                                                    :seperate((Building.LiveType?.Percent_Live * Number(PriceBuildAnduseful)) / totalPercent,
                                                    "อยู่อาศัย",10000000).map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                                                        <p>{(res.price * res.percent) *(useful.Special_Useful/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2})}</p>
                                                        :
                                                        <p>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2})}</p>)
                                                    :
                                                    seperate(
                                                        (Building.LiveType?.Percent_Live * Number(PriceBuildAnduseful)) / totalPercent,
                                                    "อยู่อาศัย").map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                                                        <p>{(res.price * res.percent) *(useful.Special_Useful/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2})}</p>
                                                        :
                                                        <p>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2})}</p>)
                                            // :"แปลงติดกัน"
                                            :null
                                        }
                                    
                                        {
                                        // !useful.isNexto?
                                            Building.OtherType&&
                                            seperate(
                                                (Building.OtherType?.Percent_Other * Number(PriceBuildAnduseful)) / totalPercent,
                                            "อื่นๆ")
                                            .map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                                                <p>{(res.price * res.percent) *(useful.Special_Useful/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2})}</p>
                                                :
                                                <p>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2})}</p>)
                                        // :"แปลงติดกัน"
                                        }  
                                        
                                        {Building.FarmType?Category_Tax ==="บุคคล"?
                                            // !useful.isNexto?
                                                seperate((Building.FarmType?.Percent_Farm * Number(PriceBuildAnduseful)) / totalPercent,
                                                "เกษตร",50000000).map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                                                    <p>{(res.price * res.percent) *(useful.Special_Useful/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2})}</p>
                                                    :
                                                    <p>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2})}</p>)
                                                :
                                                seperate((Building.FarmType?.Percent_Farm * Number(PriceBuildAnduseful)) / totalPercent,
                                                "เกษตร").map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                                                    <p>{(res.price * res.percent) *(useful.Special_Useful/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2})}</p>
                                                    :
                                                    <p>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2})}</p>)
                                            // :"แปลงติดกัน"
                                        :null
                                        }
        
                                        {
                                        // !useful.isNexto?
                                            Building.EmptyType &&Building.EmptyType?.Percent_Empty &&
                                            seperate((Building.EmptyType?.Percent_Empty * Number(PriceBuildAnduseful)) / totalPercent,'ว่างเปล่า',
                                            0, Building.EmptyType?.StartYear,Building.EmptyType?.EmptyAbsolute)
                                            .map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                                                <p>{(res.price * res.percent) *(useful.Special_Useful/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2})}</p>
                                                :
                                                <p>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2})}</p>)
                                        // :"แปลงติดกัน"
                                        }
            
                                            
                            </>
                        })
                        
                    }
                    if (useful.LiveTypes.length === 0 &&useful.OtherTypes.length === 0&& useful.FarmTypes.length === 0&& useful.EmptyTypes.length === 0) {
                            //ไม่มีอะไรเลยทั้งสิ่งปลูกสร้าง บนแปลง และ คร่อมแปลง เช่นเป็นเกษตรอย่างเดียว ไม่มีสิ่งปลูกสร้าง
                            
                            return <>
                                    {
                                    // !useful.isNexto?
                                        useful.TypeName ==="เกษตร"?
                                            Category_Tax ==="บุคคล"?
                                            seperate(PriceBuildAnduseful,
                                            "เกษตร",50000000).map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                                                <p>{((res.price * res.percent) *(useful.Special_Useful/100)).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2})} </p>
                                            :
                                                <p>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2})} </p>)
                                            :seperate(PriceBuildAnduseful,
                                            "เกษตร").map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                                                <p>{((res.price * res.percent) *(useful.Special_Useful/100)).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2})} </p>
                                            :
                                                <p>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2})} </p>)
                                        :seperate(PriceBuildAnduseful,
                                            useful.TypeName,0,useful.StartYears,useful.EmptyAbsolutes).map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                                                <p>{((res.price * res.percent) *(useful.Special_Useful/100)).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2})} </p>
                                            :
                                                <p>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2})} </p>)
                                    // :"แปลงติดกัน"
                                    }
                                </>
                    }else{
                        //กรณีที่ไม่มีสิ่งปลูกสร้าง แต่มีสัดส่วน ก็คือมีสิ่งปลูกสร้างคร่อมแปลงมาหรือว่าคนละเจ้าของกับแปลงที่ดิน Building.Build_Tax_ID
                    
                        return  <>
                        {useful.LiveTypes.length>0&&useful.LiveTypes.map((live,i)=>(<>
                        {
                        // !useful.isNexto?
                            live.Live_Status&&Category_Tax ==="บุคคล"?live.Building.Build_Tax_ID=== uid_tax && useful.UsefulLand_Tax_ID=== uid_tax?seperate((live.Percent_Live * Number(PriceBuildAnduseful)) / totalPercent,
                            "อยู่อาศัย",live.Useful_live.BalanceDiscount
                            ).map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                                <p>{(res.price * res.percent) *(useful.Special_Useful/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                    maximumFractionDigits: 2})}</p>
                                :
                                <p>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                    maximumFractionDigits: 2})}</p>)
                            :seperate((live.Percent_Live * Number(PriceBuildAnduseful)) / totalPercent,
                            "อยู่อาศัย",live.Useful_live.BalanceDiscount).map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                                <p>{(res.price * res.percent) *(useful.Special_Useful/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                    maximumFractionDigits: 2})}</p>
                                :
                                <p>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                    maximumFractionDigits: 2})}</p>)
                            :
                            seperate(
                                (live.Percent_Live * Number(PriceBuildAnduseful)) / totalPercent,
                            "อยู่อาศัย").map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                                <p>{(res.price * res.percent) *(useful.Special_Useful/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                    maximumFractionDigits: 2})}</p>
                                :
                                <p>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                    maximumFractionDigits: 2})}</p>)
                        // :"แปลงติดกัน"
                        }
                        
                        </>))}
                        {useful.OtherTypes.length>0&&useful.OtherTypes.map((other,i)=>(<>      
                        {
                        // !useful.isNexto?
                            seperate((other.Percent_Other * Number(PriceBuildAnduseful)) / totalPercent,
                            "อื่นๆ")
                            .map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                                <p>{(res.price * res.percent) *(useful.Special_Useful/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2})} </p>
                            :
                                <p>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2})} </p>)
                        // :"แปลงติดกัน"
                        }              
                            
                        </>))}    
                        {useful.FarmTypes.length>0&&useful.FarmTypes.map((farm,i)=>(<>  
                            {
                            // !useful.isNexto?
                                Category_Tax ==="บุคคล"?seperate((farm.Percent_Farm * Number(PriceBuildAnduseful)) / totalPercent,
                                            "เกษตร",50000000).map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                                                <p>{(res.price * res.percent) *(useful.Special_Useful/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2})}</p>
                                                :
                                                <p>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2})}</p>)
                                            :
                                            seperate((farm.Percent_Farm * Number(PriceBuildAnduseful)) / totalPercent,
                                            "เกษตร").map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                                                <p>{(res.price * res.percent) *(useful.Special_Useful/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2})}</p>
                                                :
                                                <p>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2})}</p>)
                            // :"แปลงติดกัน"              
                            }
                        </>))}    
                        {useful.EmptyTypes.length>0&&useful.EmptyTypes.map((empty,i)=><>
                            {  
                            //  !useful.isNexto?
                                        seperate((empty.Percent_Empty * Number(PriceBuildAnduseful)) / totalPercent,'ว่างเปล่า',
                                            0, empty.StartYear,empty.EmptyAbsolute
                                        )
                                        .map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                                            <p>{(res.price * res.percent) *(useful.Special_Useful/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                maximumFractionDigits: 2})}</p>
                                        :
                                            <p>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                maximumFractionDigits: 2})}</p>)
                                // :"แปลงติดกัน"
                            }
                                
                        </>)}
                        </>
                    }   
                }
                
            
            }
        },
        Summary:({useful,PriceBuildAnduseful})=>{
            let sumArray = [];
            let totalPercent = useful.BuildOnUsefulLands.length * 100||100
           
            if (useful.Useful.length > 0) {
                let TotalNexto =0;
                      useful.Useful.map(usefuls=>{ 
                        if (usefuls.BuildOnUsefulLands.length >0) {
                        let TotalPrice =   usefuls.BuildOnUsefulLands.reduce((pre,{Building:{AfterPriceDepreciate}})=>pre + AfterPriceDepreciate,0)
                          TotalNexto = TotalPrice +usefuls.PriceUseful + PriceBuildAnduseful;

                        }if (useful.LiveTypes.length === 0 &&useful.OtherTypes.length === 0&& useful.FarmTypes.length === 0&& useful.EmptyTypes.length === 0) {
                            TotalNexto = useful.PriceUseful + PriceBuildAnduseful
                        }
                       
                    })
                    seperate(TotalNexto,useful.TypeName,0,useful.StartYears,useful.EmptyAbsolutes).map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                        sumArray.push((res.price * res.percent) *(useful.Special_Useful/100))
                    :
                        sumArray.push(res.price * res.percent)
                    )
                    return sumArray

            }else{
                    
                if (useful.isNexto) {
                    return sumArray
                }else{
                    if (useful.BuildOnUsefulLands.length >0) {            
                        return useful.BuildOnUsefulLands.map(({Building},i)=>{
                            <>
                            {
                                            Building.LiveType?
                                                    Building.LiveType.Live_Status&&Category_Tax ==="บุคคล"?Building.Build_Tax_ID=== uid_tax && useful.UsefulLand_Tax_ID=== uid_tax?seperate((Building.LiveType?.Percent_Live * Number(PriceBuildAnduseful)) / totalPercent,
                                                    "อยู่อาศัย",50000000
                                                    ).map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                                                        sumArray.push((res.price * res.percent) *(useful.Special_Useful/100))
                                                        :
                                                        sumArray.push(res.price * res.percent)
                                                        )
                                                    :seperate((Building.LiveType?.Percent_Live * Number(PriceBuildAnduseful)) / totalPercent,
                                                    "อยู่อาศัย",10000000).map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                                                        sumArray.push((res.price * res.percent) *(useful.Special_Useful/100))
                                                        :
                                                        sumArray.push(res.price * res.percent)
                                                        )
                                                    :
                                                    seperate(
                                                        (Building.LiveType?.Percent_Live * Number(PriceBuildAnduseful)) / totalPercent,
                                                    "อยู่อาศัย").map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                                                        sumArray.push((res.price * res.percent) *(useful.Special_Useful/100))
                                                        :
                                                        sumArray.push(res.price * res.percent)
                                                        )
                                            :null
                                        }
                                    
                                        {
                                            Building.OtherType&&
                                            seperate((Building.OtherType?.Percent_Other * Number(PriceBuildAnduseful)) / totalPercent,
                                            "อื่นๆ")
                                            .map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                                                sumArray.push((res.price * res.percent) *(useful.Special_Useful/100))
                                                :
                                                sumArray.push(res.price * res.percent)
                                            )
                                        }  
                                        
                                        {Building.FarmType?Category_Tax ==="บุคคล"?
                                                seperate((Building.FarmType?.Percent_Farm * Number(PriceBuildAnduseful)) / totalPercent,
                                                "เกษตร",50000000).map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                                                    sumArray.push((res.price * res.percent) *(useful.Special_Useful/100))
                                                    :
                                                    sumArray.push(res.price * res.percent)
                                                    )
                                                :
                                                seperate((Building.FarmType?.Percent_Farm * Number(PriceBuildAnduseful)) / totalPercent,
                                                "เกษตร").map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                                                    sumArray.push((res.price * res.percent) *(useful.Special_Useful/100))
                                                    :
                                                    sumArray.push(res.price * res.percent)
                                                    )
                                        :null
                                        }

                                        {
                                            Building.EmptyType &&Building.EmptyType?.Percent_Empty &&
                                            seperate((Building.EmptyType?.Percent_Empty * Number(PriceBuildAnduseful)) / totalPercent,'ว่างเปล่า',
                                            0, Building.EmptyType?.StartYear,Building.EmptyType?.EmptyAbsolute)
                                            .map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                                                sumArray.push((res.price * res.percent) *(useful.Special_Useful/100))
                                                :
                                                sumArray.push(res.price * res.percent)
                                                )
                                        }
                            </>
                            return sumArray
                        })
                        
                    }
                    if (useful.LiveTypes.length === 0 &&useful.OtherTypes.length === 0&& useful.FarmTypes.length === 0&& useful.EmptyTypes.length === 0) {
                            //ไม่มีอะไรเลยทั้งสิ่งปลูกสร้าง บนแปลง และ คร่อมแปลง เช่นเป็นเกษตรอย่างเดียว ไม่มีสิ่งปลูกสร้าง
                            
                                // !useful.isNexto?
                                    useful.TypeName ==="เกษตร"?
                                        Category_Tax ==="บุคคล"?
                                        seperate(PriceBuildAnduseful,
                                        "เกษตร",50000000).map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                                            sumArray.push((res.price * res.percent) *(useful.Special_Useful/100))
                                            :
                                            sumArray.push(res.price * res.percent)
                                            )
                                        :seperate(PriceBuildAnduseful,
                                        "เกษตร").map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                                            sumArray.push((res.price * res.percent) *(useful.Special_Useful/100))
                                            :
                                            sumArray.push(res.price * res.percent)
                                            )
                                    :seperate(PriceBuildAnduseful,
                                        useful.TypeName,0,useful.StartYears,useful.EmptyAbsolutes).map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                                            sumArray.push((res.price * res.percent) *(useful.Special_Useful/100))
                                            :
                                            sumArray.push(res.price * res.percent)
                                            )
                                // :"แปลงติดกัน"
                            
                            return  sumArray
                                    
                                
                    }else{
                        //กรณีที่ไม่มีสิ่งปลูกสร้าง แต่มีสัดส่วน ก็คือมีสิ่งปลูกสร้างคร่อมแปลงมาหรือว่าคนละเจ้าของกับแปลงที่ดิน Building.Build_Tax_ID
                        useful.LiveTypes.length>0&&useful.LiveTypes.map((live,i)=>(<>
                            {
                            // !useful.isNexto?
                                live.Live_Status&&Category_Tax ==="บุคคล"?live.Building.Build_Tax_ID=== uid_tax && useful.UsefulLand_Tax_ID=== uid_tax?seperate((live.Percent_Live * Number(PriceBuildAnduseful)) / totalPercent,
                                "อยู่อาศัย",live.Useful_live.BalanceDiscount
                                ).map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                                    sumArray.push((res.price * res.percent) *(useful.Special_Useful/100))
                                    :
                                    sumArray.push(res.price * res.percent)
                                    )
                                :seperate((live.Percent_Live * Number(PriceBuildAnduseful)) / totalPercent,
                                "อยู่อาศัย",live.Useful_live.BalanceDiscount).map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                                    sumArray.push((res.price * res.percent) *(useful.Special_Useful/100))
                                    :
                                     sumArray.push(res.price * res.percent)
                                    )
                                :
                                seperate(
                                    (live.Percent_Live * Number(PriceBuildAnduseful)) / totalPercent,
                                "อยู่อาศัย").map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                                    sumArray.push((res.price * res.percent) *(useful.Special_Useful/100))
                                    :
                                    sumArray.push(res.price * res.percent)
                                    )
                            // :"แปลงติดกัน"
                            }
                            
                            </>))
                            useful.OtherTypes.length>0&&useful.OtherTypes.map((other,i)=>(<>      
                            {
                            // !useful.isNexto?
                                seperate((other.Percent_Other * Number(PriceBuildAnduseful)) / totalPercent,
                                "อื่นๆ")
                                .map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                                    sumArray.push((res.price * res.percent) *(useful.Special_Useful/100))
                                    :
                                    sumArray.push(res.price * res.percent)
                                )
                            // :"แปลงติดกัน"
                            }              
                                
                            </>))  
                            useful.FarmTypes.length>0&&useful.FarmTypes.map((farm,i)=>(<>  
                                {
                                // !useful.isNexto?
                                    Category_Tax ==="บุคคล"?seperate((farm.Percent_Farm * Number(PriceBuildAnduseful)) / totalPercent,
                                                "เกษตร",50000000).map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                                                    sumArray.push((res.price * res.percent) *(useful.Special_Useful/100))
                                                    :
                                                    sumArray.push(res.price * res.percent)
                                                    )
                                                :
                                                seperate((farm.Percent_Farm * Number(PriceBuildAnduseful)) / totalPercent,
                                                "เกษตร").map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                                                    sumArray.push((res.price * res.percent) *(useful.Special_Useful/100))
                                                    :
                                                    sumArray.push(res.price * res.percent)
                                                )
                                // :"แปลงติดกัน"              
                                }
                            </>))
                            useful.EmptyTypes.length>0&&useful.EmptyTypes.map((empty,i)=><>
                                {  
                                //  !useful.isNexto?
                                            seperate((empty.Percent_Empty * Number(PriceBuildAnduseful)) / totalPercent,'ว่างเปล่า',
                                            0, empty.StartYear,empty.EmptyAbsolute)
                                            .map(res=>useful.Special_Useful>0&&exceptEmergency===0?
                                                sumArray.push((res.price * res.percent) *(useful.Special_Useful/100))
                                            :
                                                sumArray.push(res.price * res.percent)
                                            )
                                    // :"แปลงติดกัน"
                                }
                                    
                            </>)
                        return  sumArray

                    
                    }   
                }
                
            
            }
        
        }
    }
    return (
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
                        let result = objPDS7.Summary(record)
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

                        <Table.Summary.Cell colSpan={3}><b style={{textAlign:'center'}}>ยอดรวมทั้งหมด</b></Table.Summary.Cell>
                        
                        <Table.Summary.Cell colSpan={2}>
                            <b style={{color:'red'}}>{`${total.toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2})} บาท `}</b>
                        </Table.Summary.Cell>
                        </Table.Summary.Row>
                        {exceptEmergency>0&&
                        <Table.Summary.Row>
                        <Table.Summary.Cell colSpan={20}></Table.Summary.Cell>

                        <Table.Summary.Cell colSpan={3}><b style={{textAlign:'center'}}>{`(ได้รับส่วนลดกรณีฉุกเฉิน ${exceptEmergency>0&&exceptEmergency} %)`}</b></Table.Summary.Cell>
                       
                        <Table.Summary.Cell colSpan={2}>
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
                dataIndex="Serial_code_land"
                key="Serial_code_land"
                render={(text,record)=><p>{record.useful.Land.Serial_code_land}</p>}

                />
                <Column 
                title="ประเภทที่ดิน"
                dataIndex="Category_doc"
                key="Category_doc"
                render={(text,record)=><p>{`${record.useful.Land.Category_doc}/${record.useful.Land.Parcel_No}`}</p>}
                />
                <Column dataIndex="useful" title="ลักษณะการใช้ประโยชน์ที่ดิน"
                render={(text,record)=><p>{text.TypeName}</p>}
                />
                <ColumnGroup title="จำนวนเนื้อที่ดิน">
                    <Column dataIndex="Useful_RAI" title="ไร่" key="Useful_RAI"
                    render={(text,record)=><p>{record.useful.UsefulLand_Tax_ID===uid_tax&&record.useful.Useful_RAI}</p>}
                    />
                    <Column dataIndex="Useful_GNAN" title="งาน" key="Useful_GNAN"
                    render={(text,record)=><p>{record.useful.UsefulLand_Tax_ID===uid_tax&&record.useful.Useful_GNAN}</p>}                   
                    />
                    <Column dataIndex="Useful_WA" title="ตร.วา" key="Useful_WA"
                    render={(text,record)=><p>{record.useful.UsefulLand_Tax_ID===uid_tax&&record.useful.Useful_WA}</p>}
                    />
                </ColumnGroup>
                <Column title="คำนวณเป็น ตรว." key="Useful_WA"
                    render={(text,record)=><p>{record.useful.UsefulLand_Tax_ID===uid_tax&&record.useful.Place.toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2})}</p>}
                />
                <Column  title="ราคาประเมินต่อ ตรว." key="Useful_WA"
                    render={(text,record)=><p>{record.useful.UsefulLand_Tax_ID===uid_tax&&record.useful.Land.Price.toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2})}</p>}
                />
                <Column title="รวมราคาประเมิณของที่ดิ" key="Useful_WA"
                // width={100}  
                    render={(text,record)=><p>{record.useful.UsefulLand_Tax_ID===uid_tax&&record.useful.PriceUseful.toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2})}</p>}
                />
            </ColumnGroup>
            <ColumnGroup title="คำนวณประเมินทุนทรัพย์และสิ่งปลูกสร้าง" >
                            
                            <Column 
                                title="ที่"
                                 render={(text,record,index) =>record.useful.BuildOnUsefulLands.length>0?record.useful.BuildOnUsefulLands.map((onuseful,i)=><p key={i}>{i+1}</p>):null}  
                                />
                             
                                <Column  title="ประเภทสิ่งปลูกสร้าง"
                                width={80}  
                                render={(text,record)=>formatColHaveBuild(record.useful.BuildOnUsefulLands,"ประเภทสิ่งปลูกสร้าง")}
                                 />
                                <Column title="ลักษณะสิ่งปลูกสร้าง" 
                                width={68}  
                                render={(text,record)=>formatColHaveBuild(record.useful.BuildOnUsefulLands,"ลักษณะสิ่งปลูกสร้าง")}

                                />
                                <Column title="ขนาดพื้นที่รวม (ตร.ม)" 
                                width={65}  
                                 render={(text,record,index) =>formatColHaveBuild(record.useful.BuildOnUsefulLands,"ขนาดพื้นที่รวม")}  

                                />
                                <Column title="ราคาประเมินสิ่งปลูกสร้างต่อ ตรม."
                                width={80}  
                                render={(text,record)=>formatColHaveBuild(record.useful.BuildOnUsefulLands,"ราคาประเมิน")}
                                 /> 
                                  <Column title="รวมราคาสิ่งปลูกสร้าง"
                                  width={100}  
                                render={(text,record)=>formatColHaveBuild(record.useful.BuildOnUsefulLands,"รวมราคาสิ่งปลูกสร้าง")}
                                 /> 
                                <ColumnGroup title="ค่าเสื่อม">
                                    <Column title="อายูสิ่งปลูกสร้าง" 
                                    width={47}                                 
                                    render={(text,record,index) =>formatColHaveBuild(record.useful.BuildOnUsefulLands,"อายูสิ่งปลูกสร้าง")}  
                                    /> 
                                    {show &&
                                    <Column title="เปอร์เซ็นต์"   
                                    width={63}                               
                                    render={(text,record,index) =>formatColHaveBuild(record.useful.BuildOnUsefulLands,"เปอร์เซ็นต์")}  
                                    /> }
                                    <Column title="คิดเป็นค่าเสื่อม(บาท)"         
                                    width={100}                         
                                    render={(text,record,index) =>formatColHaveBuild(record.useful.BuildOnUsefulLands,"คิดเป็นค่าเสื่อม")}  
                                    /> 
                                </ColumnGroup>
                                <Column title="ราคาประเมินสิ่งปลูกสร้างหลังหักค่าเสื่อม(บาท)"
                                    width={100}                                
                                    render={(text,record,index) =>formatColHaveBuild(record.useful.BuildOnUsefulLands,"ราคาประเมินสิ่งปลูกสร้างหลังหักค่าเสื่อม")}  
                                    />                   
            </ColumnGroup>
                                <Column title="รวมราคาประเมิณที่ดินและสิ่งปลูกสร้าง" 
                                dataIndex="PriceBuildAnduseful"
                                width={110}
                                render={(text,record)=><p>{text.toLocaleString(undefined,{minimumFractionDigits: 2,
                                        maximumFractionDigits: 2})}</p>}
                                /> 
                                {show&&<>
                                       
                                        <Column title="รวมราคาประเมิณที่ดินและสิ่งปลูกสร้างตามสัดส่วน" 
                                        width={120}
                                        render={(text,record,index) =>objPDS7.proportionType(record)}
                                        />
                                        </>
                                        
                                    }
                                
                                <Column title="หักมูลค่าฐานภาษีที่ได้รับยกเว้น(บาท)" 
                                        width={140}
                                        render={(text,record)=>objPDS7.except(record)}
                                />
                                <Column title="คงเหลือราคาประเมิณทรัพย์ที่ต้องชำระ" 
                                        width={150}
                                        render={(text,record,index) =>objPDS7.exceptBalance(record)
                                  
                                        }
                                />
                                <Column title="อัตราภาษีร้อยละ" 
                                        width={120}
                                        // colSpan={2}
                                        render={(text,record,index) =>objPDS7.RateTax(record)}
                                />
                                <Column title="จำนวนภาษีต้องชำระ(บาท)" 
                                        width={120}
                                        render={(text,record,index) =>objPDS7.AmountPriceTax(record)}
                                />
                                
                               
        </Table>
    )
}

export default PDS7Table
