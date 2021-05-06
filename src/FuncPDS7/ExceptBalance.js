import Seperate from './Seperate'
import {Popover} from 'antd'
import {SeperateAccross} from './SeperateAccross'
const contentNexto =(usefuls=[])=>{
    return <div>
        <h3>คิดรวมกับการใช้ประโยชน์</h3>
        {usefuls.map(useful=><p key={useful.useful_id}>{`รหัส ${useful.useful_id}`}</p>)}
    </div>
}
export const exceptBalance=({BuildOnUsefulLands,LiveTypes,OtherTypes,
                            FarmTypes,EmptyTypes,UsefulLand_Tax_ID,TypeName,StartYears,
                            EmptyAbsolutes,Useful,isNexto,PriceUseful
                        },
                            Category_Tax,uid_tax,lands)=>{
    if (Useful.length > 0) {
        let TotalNexto =0;
        let OrginalPlace = BuildOnUsefulLands.map(({Building:{Width,Length}})=>Width * Length)
                                       .reduce((pre,cur)=>pre+cur,0);   
                    let OriginalUsefulPrice = BuildOnUsefulLands.map(({Building:{Width,Length,AfterPriceDepreciate}})=>
                                (((Width * Length)/OrginalPlace)*PriceUseful + AfterPriceDepreciate)
                    )
                    .reduce((pre,cur)=>pre+cur,0);
                  TotalNexto += OriginalUsefulPrice 
            Useful.map((usefuls,index)=>{ 
                    if (usefuls.BuildOnUsefulLands.length >0) {
                        let totalPlace = usefuls.BuildOnUsefulLands.map(({Building:{Width,Length}})=>Width * Length)
                                        .reduce((pre,cur)=>pre+cur,0);   
                                        
                        let totalPriceUseful = usefuls.BuildOnUsefulLands.map(({Building:{Width,Length,AfterPriceDepreciate}})=>
                                    ((((Width * Length)/totalPlace)*usefuls.PriceUseful) + AfterPriceDepreciate)
                        )
                        .reduce((pre,cur)=>pre+cur,0);
                        TotalNexto += totalPriceUseful
                    }
                    //new version
                    if (usefuls.LiveTypes.length === 0 &&usefuls.OtherTypes.length === 0&& usefuls.FarmTypes.length === 0&& usefuls.EmptyTypes.length === 0) {
    
                        TotalNexto += usefuls.PriceUseful
                    }
                    // if (LiveTypes.length === 0 &&OtherTypes.length === 0&& FarmTypes.length === 0&& EmptyTypes.length === 0) {
                    //     console.log('usefuls.PriceUseful + PriceUseful',usefuls.PriceUseful + PriceUseful);
                    //     TotalNexto += usefuls.PriceUseful + PriceUseful
                    // } old version
                    return TotalNexto
                    
                })
            return Seperate(TotalNexto,TypeName,0,StartYears,EmptyAbsolutes).map((res,i)=><Popover key={i} content={()=>contentNexto(Useful)}><p  key={i}>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                    maximumFractionDigits: 2})}</p></Popover>)

    }else{
            
        if (isNexto) {
            return <p>แปลงติดกัน</p>
        }else{
            if (BuildOnUsefulLands.length >0) {      
                let totalPlace = BuildOnUsefulLands.map(({Building:{Width,Length}})=>Width * Length)
                                       .reduce((pre,cur)=>pre+cur,0)      
                return BuildOnUsefulLands.map(({Building},i)=>{
                    return <div key={i}>
                                {
                                    Building.LiveType?
                                            Building.LiveType.Live_Status&&Category_Tax ==="บุคคล"?Building.Build_Tax_ID=== uid_tax && UsefulLand_Tax_ID=== uid_tax?
                                            //ได้รับ ห้าสิบล้าน เพราะเป็นเจ้าของที่และบ้านดังนั้นจึงจับ ที่ละบ้านบวกกันได้เลย
                                            Seperate(Building.LiveType?.Percent_Live * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                            ,
                                            "อยู่อาศัย",50000000
                                            ).map((res,i) =><p key={i}>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                                maximumFractionDigits: 2})}</p>)
                                            :Seperate(Building.LiveType?.Percent_Live *  Building.AfterPriceDepreciate/100,
                                            "อยู่อาศัย",10000000).map((res,i) =><p key={i}>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                                maximumFractionDigits: 2})}</p>)//เป็นบ้านหลังหลักอย่างเดียว
                                            :
                                            Seperate(
                                                UsefulLand_Tax_ID=== uid_tax?
                                                Building.LiveType?.Percent_Live * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                                :                                          
                                                Building.LiveType?.Percent_Live *  Building.AfterPriceDepreciate/100,
                                            "อยู่อาศัย").map((res,i) =><p key={i}>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                                maximumFractionDigits: 2})}</p>)
                                    :null
                                }
                            
                                {
                                    Building.OtherType&&
                                    Seperate(
                                        UsefulLand_Tax_ID=== uid_tax?
                                        Building.OtherType?.Percent_Other * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                        :Building.OtherType?.Percent_Other *  Building.AfterPriceDepreciate/100,
                                    "อื่นๆ")
                                    .map((res,i) =><p key={i}>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2})}</p>)
                                }  
                                
                                {Building.FarmType?Category_Tax ==="บุคคล"?
                                        Seperate(
                                            UsefulLand_Tax_ID=== uid_tax?
                                            Building.FarmType?.Percent_Farm * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                            :Building.FarmType?.Percent_Farm *  Building.AfterPriceDepreciate/100,
                                        "เกษตร",50000000).map((res,i)=><p key={i}>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2})}</p>)
                                        :
                                        Seperate(
                                            UsefulLand_Tax_ID=== uid_tax?
                                                Building.FarmType?.Percent_Farm * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                                :Building.FarmType?.Percent_Farm *  Building.AfterPriceDepreciate/100,
                                        "เกษตร").map((res,i)=><p key={i}>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2})} </p>)
                                :null
                                }

                                {
                                    Building.EmptyType &&Building.EmptyType?.Percent_Empty &&
                                    Seperate(
                                        UsefulLand_Tax_ID=== uid_tax?
                                        Building.EmptyType?.Percent_Empty * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                        :Building.EmptyType?.Percent_Empty *  Building.AfterPriceDepreciate/100,
                                    'ว่างเปล่า')
                                    .map((res,i)=><p key={i}>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2})}</p>)
                                }
                    </div>
                })
                
            }
            if (LiveTypes.length === 0 &&OtherTypes.length === 0&& FarmTypes.length === 0&& EmptyTypes.length === 0) {
                    //ไม่มีอะไรเลยทั้งสิ่งปลูกสร้าง บนแปลง และ คร่อมแปลง เช่นเป็นเกษตรอย่างเดียว ไม่มีสิ่งปลูกสร้าง
                    
                    return <>
                            {
                                TypeName ==="เกษตร"?
                                    Category_Tax ==="บุคคล"?
                                    Seperate(PriceUseful,
                                    "เกษตร",50000000).map((res,i)=><p key={i}>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2})}</p>)
                                    :Seperate(PriceUseful,
                                    "เกษตร").map((res,i)=><p key={i}>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2})}</p>)
                                :Seperate(PriceUseful,
                                    TypeName).map((res,i)=><p key={i}>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2})}</p>)
                            }
                        </>
            }else{
                //version test
                return  <>
                {LiveTypes.length>0&&LiveTypes.map((live,i)=>(<div key={i}>
                {live?.Useful_live?.Original_Live?
                    lands?.filter(land=>land.useful_id === live?.Useful_live?.Original_Live)
                    .map((usefulMap)=>{
                        //มีสิ่งปลูกสร้าง
                        if (usefulMap.BuildOnUsefulLands.length >0) {
                            let totalPlace = usefulMap.BuildOnUsefulLands.map(({Building:{Width,Length}})=>Width * Length)
                            .reduce((pre,cur)=>pre+cur,0)  ;
                            return usefulMap.BuildOnUsefulLands.map(({Building},index)=>{
                                let priceArray =  Building?.LiveType?.Live_Status&&Category_Tax ==="บุคคล"?Building?.Build_Tax_ID=== uid_tax && UsefulLand_Tax_ID=== uid_tax?
                                Seperate(Building.LiveType?.Percent_Live * (((Building.Width * Building.Length)/totalPlace)*usefulMap?.PriceUseful + Building.AfterPriceDepreciate)/100
                                ,"อยู่อาศัย",50000000)

                                :Seperate(Building.LiveType?.Percent_Live *  Building.AfterPriceDepreciate/100,
                                "อยู่อาศัย",10000000)//เป็นบ้านหลังหลักอย่างเดียว
                                :
                                Seperate(
                                    UsefulLand_Tax_ID=== uid_tax?
                                    Building?.LiveType?.Percent_Live * (((Building?.Width * Building?.Length)/totalPlace)*usefulMap?.PriceUseful + Building?.AfterPriceDepreciate)/100
                                    :                                          
                                    Building?.LiveType?.Percent_Live *  Building?.AfterPriceDepreciate/100,"อยู่อาศัย")
                                    // .filter(rate=>rate.price>0 || !isNaN(rate.price) )
                                let filterPrice = priceArray.filter(rate=>rate.price>0 || !isNaN(rate.price) )
                               //เพราะมันมีกรณี ค่าที่ส่งไปมันยังคำนวนไม่เสร็จและส่งกลับมาเลยมีค่าเท่ากับ ศูนย์
                                   let RateAccross = SeperateAccross((live.Percent_Live * PriceUseful )/100,"อยู่อาศัย",live.Useful_live.BalanceDiscount,filterPrice);
                                   return <div key={index}> 

                                        {RateAccross.map((rate,i)=><p key={i}>{`${rate.PriceOriginal.toLocaleString(undefined,{minimumFractionDigits: 2,
                                    maximumFractionDigits: 2})}`}</p>)}

                                       </div> 
                                    }
                            )
                            
                        }
                       
                        return <p>Failed ExceptBalance 187</p>
                    })
                  :
                    live.Live_Status&&Category_Tax ==="บุคคล"?live.Building.Build_Tax_ID=== uid_tax && UsefulLand_Tax_ID=== uid_tax?
                    Seperate((live.Percent_Live * PriceUseful )/100 ,
                    "อยู่อาศัย",live.Useful_live.BalanceDiscount
                    ).map((res,i) =><p key={i}>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2})}</p>)
                    :Seperate((live.Percent_Live * PriceUseful )/100,
                    "อยู่อาศัย",live.Useful_live.BalanceDiscount).map((res,i) =><p key={i}>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2})} </p>)
                    :
                    Seperate(
                        (live.Percent_Live * PriceUseful )/100,
                    "อยู่อาศัย").map((res,i) =><p key={i}>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2})} </p>)
                }
                
                </div>))}
                {OtherTypes.length>0&&OtherTypes.map((other,i)=>(<div key ={i}>      
                { other?.Useful_other?.Original_Other?
                    lands?.filter(land=>land.useful_id === other?.Useful_other?.Original_Other)
                    .map((usefulMap)=>{
                        //มีสิ่งปลูกสร้าง
                        if (usefulMap.BuildOnUsefulLands.length >0) {
                            let totalPlace = usefulMap.BuildOnUsefulLands.map(({Building:{Width,Length}})=>Width * Length)
                            .reduce((pre,cur)=>pre+cur,0)  ;
                            return usefulMap.BuildOnUsefulLands.map(({Building},index)=>{
                                let PriceCondition1 = Building?.OtherType?.Percent_Other * (((Building?.Width * Building?.Length)/totalPlace)*usefulMap?.PriceUseful + Building?.AfterPriceDepreciate)/100||0;
                                let PriceCondition2 = Building?.OtherType?.Percent_Other *  Building?.AfterPriceDepreciate/100||0;
                             
                                  let priceArray =  Seperate(
                                        UsefulLand_Tax_ID=== uid_tax?
                                        PriceCondition1                                        
                                        :PriceCondition2,
                                    "อื่นๆ").filter(rate => rate.price !== 0);//เพราะมันมีกรณี ค่าที่ส่งไปมันยังคำนวนไม่เสร็จและส่งกลับมาเลยมีค่าเท่ากับ ศูนย์
                                   let RateAccross = SeperateAccross(other.Percent_Other *  PriceUseful /100,"อื่นๆ",0,priceArray);
                                   return <div key={index}> 
                                        {RateAccross.map((rate,i)=><p key={i}>{`${rate.PriceOriginal.toLocaleString(undefined,{minimumFractionDigits: 2,
                                    maximumFractionDigits: 2})}`}</p>)}
                                       </div> 
                                    }
                            )
                            
                        }
                       
                        return <p>Failed ExceptBalance 228</p>
                    })
                    :
                    Seperate((other.Percent_Other *  PriceUseful )/100,
                    "อื่นๆ")
                    .map((res,i) =><p key ={i}>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                         maximumFractionDigits: 2})} </p>)
                }              
                    
                </div>))}    
                {FarmTypes.length>0&&FarmTypes.map((farm,i)=>(<div key={i}>  
                    {
                        Category_Tax ==="บุคคล"?Seperate((farm.Percent_Farm * PriceUseful )/100,
                                    "เกษตร",50000000).map((res,i)=><p key={i}>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2})}</p>)
                                    :
                                    Seperate((farm.Percent_Farm * PriceUseful )/100,
                                    "เกษตร").map((res,i)=><p key={i}>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2})} </p>)
                    }
                </div>))}    
                {EmptyTypes.length>0&&EmptyTypes.map((empty,i)=><div key ={i}>
                    {  empty?.Useful_empty?.Original_Empty?
                        lands?.filter(land=>land.useful_id === empty?.Useful_empty?.Original_Empty)
                        .map((usefulMap)=>{
                            //มีสิ่งปลูกสร้าง
                            if (usefulMap.BuildOnUsefulLands.length >0) {
                                let totalPlace = usefulMap.BuildOnUsefulLands.map(({Building:{Width,Length}})=>Width * Length)
                                .reduce((pre,cur)=>pre+cur,0)  ;
                                return usefulMap.BuildOnUsefulLands.map(({Building},index)=>{
                                    
                                    let PriceCondition1 = Building?.EmptyType?.Percent_Empty * (((Building?.Width * Building?.Length)/totalPlace)*usefulMap?.PriceUseful + Building?.AfterPriceDepreciate)/100||0;
                                    let PriceCondition2 = Building?.EmptyType?.Percent_Empty *  Building?.AfterPriceDepreciate/100||0;
                                 
                                      let priceArray =  Seperate(
                                            UsefulLand_Tax_ID=== uid_tax?
                                            PriceCondition1                                        
                                            :PriceCondition2,
                                        "ว่างเปล่า").filter(rate => rate.price !== 0);//เพราะมันมีกรณี ค่าที่ส่งไปมันยังคำนวนไม่เสร็จและส่งกลับมาเลยมีค่าเท่ากับ ศูนย์
                                       let RateAccross = SeperateAccross(empty.Percent_Empty *  PriceUseful /100,"ว่างเปล่า",0,priceArray);
                                       return <div key={index}> 
                                            {RateAccross.map((rate,i)=><p key={i}>{`${rate.PriceOriginal.toLocaleString(undefined,{minimumFractionDigits: 2,
                                                 maximumFractionDigits: 2})}`}</p>)}
                                           </div> 
                                        }
                                )
                                
                            }
                            
                            return <p>Failed ExceptBalance 277</p>
                        })
                    :
                                Seperate((empty.Percent_Empty * PriceUseful )/100,'ว่างเปล่า')
                                .map((res,i)=><p key = {i}>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                        maximumFractionDigits: 2})}</p>)
                    }
                        
                </div>)}
                </>
                //old version 
                //กรณีที่ไม่มีสิ่งปลูกสร้าง แต่มีสัดส่วน ก็คือมีสิ่งปลูกสร้างคร่อมแปลงมาหรือว่าคนละเจ้าของกับแปลงที่ดิน Building.Build_Tax_ID
            
                // return  <>
                // {LiveTypes.length>0&&LiveTypes.map((live,i)=>(<>
                // {
                //     live.Live_Status&&Category_Tax ==="บุคคล"?live.Building.Build_Tax_ID=== uid_tax && UsefulLand_Tax_ID=== uid_tax?
                //     Seperate((live.Percent_Live * PriceUseful )/100 ,
                //     "อยู่อาศัย",live.Useful_live.BalanceDiscount
                //     ).map(res =><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                //             maximumFractionDigits: 2})}</p>)
                //     :Seperate((live.Percent_Live * PriceUseful )/100,
                //     "อยู่อาศัย",live.Useful_live.BalanceDiscount).map(res =><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                //             maximumFractionDigits: 2})} </p>)
                //     :
                //     Seperate(
                //         (live.Percent_Live * PriceUseful )/100,
                //     "อยู่อาศัย").map(res =><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                //             maximumFractionDigits: 2})} </p>)
                // }
                
                // </>))}
                // {OtherTypes.length>0&&OtherTypes.map((other,i)=>(<>      
                // {
                // // !isNexto?
                //     Seperate((other.Percent_Other *  PriceUseful )/100,
                //     "อื่นๆ")
                //     .map(res =><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                //          maximumFractionDigits: 2})} </p>)
                // // :"แปลงติดกัน"
                // }              
                    
                // </>))}    
                // {FarmTypes.length>0&&FarmTypes.map((farm,i)=>(<>  
                //     {
                //     // !isNexto?
                //         Category_Tax ==="บุคคล"?Seperate((farm.Percent_Farm * PriceUseful )/100,
                //                     "เกษตร",50000000).map(res=><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                //                             maximumFractionDigits: 2})}</p>)
                //                     :
                //                     Seperate((farm.Percent_Farm * PriceUseful )/100,
                //                     "เกษตร").map(res=><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                //                             maximumFractionDigits: 2})} </p>)
                //     // :"แปลงติดกัน"              
                //     }
                // </>))}    
                // {EmptyTypes.length>0&&EmptyTypes.map((empty,i)=><>
                //     {  
                //     //  !isNexto?
                //                 Seperate((empty.Percent_Empty * PriceUseful )/100,'ว่างเปล่า')
                //                 .map(res=><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                //                         maximumFractionDigits: 2})}</p>)
                //         // :"แปลงติดกัน"
                //     }
                        
                // </>)}
                // </>
            }   
        }
        
    
    }
}