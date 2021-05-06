import Seperate from './Seperate'
import {SeperateAccross} from './SeperateAccross'
export const Summary=({BuildOnUsefulLands,LiveTypes,OtherTypes,
                            FarmTypes,EmptyTypes,UsefulLand_Tax_ID,TypeName,StartYears,
                            EmptyAbsolutes,Useful,isNexto,PriceUseful,Special_Useful
                        },
                            Category_Tax,uid_tax,exceptEmergency,lands)=>{
    let sumArray = [];
    
    if (Useful.length > 0) {
        let TotalNexto =0;
        let OrginalPlace = BuildOnUsefulLands.map(({Building:{Width,Length}})=>Width * Length)
                                       .reduce((pre,cur)=>pre+cur,0);   
                    let OriginalUsefulPrice = BuildOnUsefulLands.map(({Building:{Width,Length,AfterPriceDepreciate}})=>
                                (((Width * Length)/OrginalPlace)*PriceUseful + AfterPriceDepreciate)
                    )
                    .reduce((pre,cur)=>pre+cur,0);
                  TotalNexto += OriginalUsefulPrice 
                    Useful.map((usefuls)=>{ 
                    
                            if (usefuls.BuildOnUsefulLands.length >0) {
                                let totalPlace = usefuls.BuildOnUsefulLands.map(({Building:{Width,Length}})=>Width * Length)
                                                .reduce((pre,cur)=>pre+cur,0);   
                                                
                                let totalPriceUseful = usefuls.BuildOnUsefulLands.map(({Building:{Width,Length,AfterPriceDepreciate}})=>
                                            ((((Width * Length)/totalPlace)*usefuls.PriceUseful) + AfterPriceDepreciate)
                                )
                                .reduce((pre,cur)=>pre+cur,0);
                                TotalNexto += totalPriceUseful
                            }
                            if (usefuls.LiveTypes.length === 0 &&usefuls.OtherTypes.length === 0&& usefuls.FarmTypes.length === 0&& usefuls.EmptyTypes.length === 0) {
                                TotalNexto += usefuls.PriceUseful
                            }
                            return TotalNexto
                            
                        })
                 Seperate(TotalNexto,TypeName,0,StartYears,EmptyAbsolutes).map(res=>Special_Useful>0&&exceptEmergency===0?
                sumArray.push((res.price * res.percent) *(Special_Useful/100))
                :
                sumArray.push(res.price * res.percent))
                return sumArray
    }else{
            
        if (isNexto) {
            return sumArray
        }else{
            if (BuildOnUsefulLands.length >0) {      
                let totalPlace = BuildOnUsefulLands.map(({Building:{Width,Length}})=>Width * Length)
                                       .reduce((pre,cur)=>pre+cur,0)      
                return BuildOnUsefulLands.map(({Building},i)=>{
                     <>
                                {
                                    Building.LiveType?
                                            Building.LiveType.Live_Status&&Category_Tax ==="บุคคล"?Building.Build_Tax_ID=== uid_tax && UsefulLand_Tax_ID=== uid_tax?
                                            Seperate(Building.LiveType?.Percent_Live * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100,
                                            "อยู่อาศัย",50000000
                                            ).map(res=>Special_Useful>0&&exceptEmergency===0?
                                                    sumArray.push((res.price * res.percent) *((100-Special_Useful)/100))
                                                :
                                                    sumArray.push(res.price * res.percent))
                                            :Seperate(Building.LiveType?.Percent_Live * Building.AfterPriceDepreciate/100,
                                            "อยู่อาศัย",10000000).map(res=>Special_Useful>0&&exceptEmergency===0?
                                                    sumArray.push((res.price * res.percent) *((100-Special_Useful)/100))
                                                :
                                                    sumArray.push(res.price * res.percent))
                                            :
                                            Seperate(
                                                UsefulLand_Tax_ID=== uid_tax?
                                                Building.LiveType?.Percent_Live * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                                :                                          
                                                Building.LiveType?.Percent_Live *  Building.AfterPriceDepreciate/100,
                                            "อยู่อาศัย").map(res=>Special_Useful>0&&exceptEmergency===0?
                                                    sumArray.push((res.price * res.percent) *((100-Special_Useful)/100))
                                                :
                                                    sumArray.push(res.price * res.percent))
                                    :null
                                }
                            
                                {
                                    Building.OtherType&&
                                    Seperate(
                                        UsefulLand_Tax_ID=== uid_tax?
                                        Building.OtherType?.Percent_Other * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                        :Building.OtherType?.Percent_Other *  Building.AfterPriceDepreciate/100,
                                    "อื่นๆ")
                                    .map(res=>Special_Useful>0&&exceptEmergency===0?
                                            sumArray.push((res.price * res.percent) *((100-Special_Useful)/100))
                                        :
                                             sumArray.push(res.price * res.percent))
                                }  
                                
                                {Building.FarmType?Category_Tax ==="บุคคล"?
                                        Seperate(
                                            UsefulLand_Tax_ID=== uid_tax?
                                                Building.FarmType?.Percent_Farm * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                                :Building.FarmType?.Percent_Farm *  Building.AfterPriceDepreciate/100,
                                        "เกษตร",50000000).map(res=>Special_Useful>0&&exceptEmergency===0?
                                                sumArray.push((res.price * res.percent) *((100-Special_Useful)/100))
                                            :
                                                sumArray.push(res.price * res.percent)) 
                                        :
                                        Seperate(
                                            UsefulLand_Tax_ID=== uid_tax?
                                                Building.FarmType?.Percent_Farm * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                                :Building.FarmType?.Percent_Farm *  Building.AfterPriceDepreciate/100,
                                        "เกษตร").map(res=>Special_Useful>0&&exceptEmergency===0?
                                                sumArray.push((res.price * res.percent) *((100-Special_Useful)/100))
                                            :
                                                sumArray.push(res.price * res.percent)) 
                                :null
                                }

                                {
                                    Building.EmptyType &&Building.EmptyType?.Percent_Empty &&
                                    Seperate(
                                        UsefulLand_Tax_ID=== uid_tax?
                                        Building.EmptyType?.Percent_Empty * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                        :Building.EmptyType?.Percent_Empty *  Building.AfterPriceDepreciate/100,
                                    'ว่างเปล่า',0, Building.EmptyType?.StartYear,Building.EmptyType?.EmptyAbsolute)
                                    .map(res=>Special_Useful>0&&exceptEmergency===0?
                                            sumArray.push((res.price * res.percent) *((100-Special_Useful)/100))
                                        :
                                        sumArray.push(res.price * res.percent))
                                }
    
                                    
                    </>
                    return sumArray
                })
                
            }
            if (LiveTypes.length === 0 &&OtherTypes.length === 0&& FarmTypes.length === 0&& EmptyTypes.length === 0) {
                    //ไม่มีอะไรเลยทั้งสิ่งปลูกสร้าง บนแปลง และ คร่อมแปลง เช่นเป็นเกษตรอย่างเดียว ไม่มีสิ่งปลูกสร้าง
                    
                                TypeName ==="เกษตร"?
                                    Category_Tax ==="บุคคล"?
                                    Seperate(PriceUseful,
                                    "เกษตร",50000000).map(res=>Special_Useful>0&&exceptEmergency===0?
                                            sumArray.push((res.price * res.percent) *((100-Special_Useful)/100))
                                        :
                                        sumArray.push(res.price * res.percent))
                                    :Seperate(PriceUseful,
                                    "เกษตร").map(res=>Special_Useful>0&&exceptEmergency===0?
                                            sumArray.push((res.price * res.percent) *((100-Special_Useful)/100))
                                        :
                                        sumArray.push(res.price * res.percent))
                                :Seperate(PriceUseful,
                                    TypeName,0,StartYears,EmptyAbsolutes
                                    ).map(res=>Special_Useful>0&&exceptEmergency===0?
                                        sumArray.push((res.price * res.percent) *((100-Special_Useful)/100))
                                        :
                                        sumArray.push(res.price * res.percent))
                 return sumArray
            }else{
                //กรณีที่ไม่มีสิ่งปลูกสร้าง แต่มีสัดส่วน ก็คือมีสิ่งปลูกสร้างคร่อมแปลงมาหรือว่าคนละเจ้าของกับแปลงที่ดิน Building.Build_Tax_ID
                //new version 

                LiveTypes.length>0&&LiveTypes.map((live,i)=>(<>
                    {live?.Useful_live?.Original_Live?
                        lands?.filter(land=>land.useful_id === live?.Useful_live?.Original_Live)
                        .map((usefulMap)=>{
                            //มีสิ่งปลูกสร้าง
                            if (usefulMap.BuildOnUsefulLands.length >0) {
                                let totalPlace = usefulMap.BuildOnUsefulLands.map(({Building:{Width,Length}})=>Width * Length)
                                .reduce((pre,cur)=>pre+cur,0)  ;
                                return usefulMap.BuildOnUsefulLands.map(({Building})=>{
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
                                       RateAccross.map(rate=>sumArray.push((rate.PriceOriginal * rate.percent)))
                                       

                                    //    return <> 
    
                                    //         {RateAccross.map(rate=><p>{(rate.PriceOriginal * rate.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                    //                              maximumFractionDigits: 2})}</p>)}
    
                                    //        </> 
                                        }
                                )
                                
                            }
                            //มีีแต่สัดส่วน
                            if (usefulMap?.LiveTypes?.length>0) {
                               return  usefulMap?.LiveTypes?.map(LiveTwo=>{
                                    return  LiveTwo.Live_Status&&Category_Tax ==="บุคคล"?LiveTwo.Building.Build_Tax_ID=== uid_tax && UsefulLand_Tax_ID=== uid_tax?
                                    Seperate((LiveTwo.Percent_Live * PriceUseful )/100 ,
                                    "อยู่อาศัย",LiveTwo.Useful_live.BalanceDiscount
                                    ).map(res=>Special_Useful>0&&exceptEmergency===0?
                                        sumArray.push((res.price * res.percent) *((100-Special_Useful)/100))
                                    :
                                    sumArray.push(res.price * res.percent))
                                        :Seperate((LiveTwo.Percent_Live * PriceUseful )/100,
                                        "อยู่อาศัย",LiveTwo.Useful_live.BalanceDiscount).map(res=>Special_Useful>0&&exceptEmergency===0?
                                            sumArray.push((res.price * res.percent) *((100-Special_Useful)/100))
                                    :
                                        sumArray.push(res.price * res.percent))
                                        :
                                        Seperate(
                                            (LiveTwo.Percent_Live * PriceUseful )/100,
                                        "อยู่อาศัย",).map(res=>Special_Useful>0&&exceptEmergency===0?
                                            sumArray.push((res.price * res.percent) *((100-Special_Useful)/100))
                                    :
                                    sumArray.push(res.price * res.percent))
                                })
                            }
                            return sumArray
                        })
                      :
                            live.Live_Status&&Category_Tax ==="บุคคล"?live.Building.Build_Tax_ID=== uid_tax && UsefulLand_Tax_ID=== uid_tax?
                                Seperate((live.Percent_Live * PriceUseful )/100 ,
                                "อยู่อาศัย",live.Useful_live.BalanceDiscount
                                ).map(res=>Special_Useful>0&&exceptEmergency===0?
                            sumArray.push((res.price * res.percent) *((100-Special_Useful)/100))
                            :
                            sumArray.push(res.price * res.percent))
                                :Seperate((live.Percent_Live * PriceUseful )/100,
                                "อยู่อาศัย",live.Useful_live.BalanceDiscount).map(res=>Special_Useful>0&&exceptEmergency===0?
                            sumArray.push((res.price * res.percent) *((100-Special_Useful)/100))
                            :
                            sumArray.push(res.price * res.percent))
                                :
                                Seperate(
                                    (live.Percent_Live * PriceUseful )/100,
                                "อยู่อาศัย").map(res=>Special_Useful>0&&exceptEmergency===0?
                            sumArray.push((res.price * res.percent) *((100-Special_Useful)/100))
                            :
                            sumArray.push(res.price * res.percent))
                        // live.Live_Status&&Category_Tax ==="บุคคล"?live.Building.Build_Tax_ID=== uid_tax && UsefulLand_Tax_ID=== uid_tax?
                        //     Seperate((live.Percent_Live * PriceUseful )/100 ,
                        //     "อยู่อาศัย",live.Useful_live.BalanceDiscount
                        //     ).map(res=>Special_Useful>0&&exceptEmergency===0?
                        //         (res.price * res.percent) *((100-Special_Useful)/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                        //             maximumFractionDigits: 2})
                        //     :
                        //     <p>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                        //         maximumFractionDigits: 2})}</p>)
                        //         :Seperate((live.Percent_Live * PriceUseful )/100,
                        //         "อยู่อาศัย",live.Useful_live.BalanceDiscount).map(res=>Special_Useful>0&&exceptEmergency===0?
                        //     (res.price * res.percent) *((100-Special_Useful)/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                        //         maximumFractionDigits: 2})
                        //     :
                        //     <p>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                        //         maximumFractionDigits: 2})}</p>)
                        //         :
                        //         Seperate(
                        //             (live.Percent_Live * PriceUseful )/100,
                        //         "อยู่อาศัย",).map(res=>Special_Useful>0&&exceptEmergency===0?
                        //     (res.price * res.percent) *((100-Special_Useful)/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                        //         maximumFractionDigits: 2})
                        //     :
                        //     <p>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                        //         maximumFractionDigits: 2})}</p>)
    
                    }
                    
                    </>))
                OtherTypes.length>0&&OtherTypes.map((other,i)=>(<>      
                    { other?.Useful_other?.Original_Other?
                        lands?.filter(land=>land.useful_id === other?.Useful_other?.Original_Other)
                        .map((usefulMap)=>{
                            //มีสิ่งปลูกสร้าง
                            if (usefulMap.BuildOnUsefulLands.length >0) {
                                let totalPlace = usefulMap.BuildOnUsefulLands.map(({Building:{Width,Length}})=>Width * Length)
                                .reduce((pre,cur)=>pre+cur,0)  ;
                                return usefulMap.BuildOnUsefulLands.map(({Building})=>{
                                    let PriceCondition1 = Building?.OtherType?.Percent_Other * (((Building?.Width * Building?.Length)/totalPlace)*usefulMap?.PriceUseful + Building?.AfterPriceDepreciate)/100||0;
                                    let PriceCondition2 = Building?.OtherType?.Percent_Other *  Building?.AfterPriceDepreciate/100||0;
                                 
                                      let priceArray =  Seperate(
                                            UsefulLand_Tax_ID=== uid_tax?
                                            PriceCondition1                                        
                                            :PriceCondition2,
                                        "อื่นๆ").filter(rate => rate.price !== 0);//เพราะมันมีกรณี ค่าที่ส่งไปมันยังคำนวนไม่เสร็จและส่งกลับมาเลยมีค่าเท่ากับ ศูนย์
                                       let RateAccross = SeperateAccross(other.Percent_Other *  PriceUseful /100,"อื่นๆ",0,priceArray);
                                       RateAccross.map(rate=>Special_Useful>0&&exceptEmergency===0?
                                        sumArray.push(rate.PriceOriginal * rate.percent) *((100-Special_Useful)/100)
                                        :
                                        sumArray.push(rate.PriceOriginal * rate.percent)

                                            )
                                    //    return <> 
                                    //         {
                                    //         RateAccross.map(rate=>Special_Useful>0&&exceptEmergency===0?
                                    //             (rate.PriceOriginal * rate.percent) *((100-Special_Useful)/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                    //                 maximumFractionDigits: 2})
                                    //             :
                                    //             <p>{(rate.PriceOriginal * rate.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                    //                 maximumFractionDigits: 2})}</p>)
                                    //         }
                                    //        </> 
                                        }
                                        
                                )
                                
                            }
                            //มีีแต่สัดส่วน
                            if (usefulMap?.OtherTypes?.length>0) {
                               return  usefulMap?.OtherTypes?.map(OtherTwo=>{
                                  Seperate((OtherTwo.Percent_Other *  PriceUseful )/100,
                                    "อื่นๆ")
                                    .map(res=>Special_Useful>0&&exceptEmergency===0?
                                        sumArray.push((res.price * res.percent) *((100-Special_Useful)/100))
                                        :
                                        sumArray.push(res.price * res.percent))
                                })
                            }
                            return sumArray
                        })
                        :
                            Seperate((other.Percent_Other *  PriceUseful )/100,
                                "อื่นๆ")
                                .map(res=>Special_Useful>0&&exceptEmergency===0?
                            sumArray.push((res.price * res.percent) *((100-Special_Useful)/100))
                            :
                            sumArray.push(res.price * res.percent))
                        // Seperate((other.Percent_Other *  PriceUseful )/100,
                        // "อื่นๆ")
                        // .map(res=>Special_Useful>0&&exceptEmergency===0?
                        //     (res.price * res.percent) *((100-Special_Useful)/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                        //         maximumFractionDigits: 2})
                        //     :
                        //     <p>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                        //         maximumFractionDigits: 2})}</p>)
                       
                    }              
                        
                    </>))    
                FarmTypes.length>0&&FarmTypes.map((farm,i)=>(<>  
                        {
                            Category_Tax ==="บุคคล"?Seperate((farm.Percent_Farm * PriceUseful )/100,
                                        "เกษตร",50000000).map(res=>Special_Useful>0&&exceptEmergency===0?
                                sumArray.push((res.price * res.percent) *(Special_Useful/100))
                                :
                                sumArray.push(res.price * res.percent))
                                                    :
                                                    Seperate((farm.Percent_Farm * PriceUseful )/100,
                                                    "เกษตร").map(res=>Special_Useful>0&&exceptEmergency===0?
                                sumArray.push((res.price * res.percent) *(Special_Useful/100))
                                :
                                sumArray.push(res.price * res.percent))
                        }
                    </>)) 
                  
                EmptyTypes.length>0&&EmptyTypes.map((empty,i)=><>
                        {  empty?.Useful_empty?.Original_Empty?
                            lands?.filter(land=>land.useful_id === empty?.Useful_empty?.Original_Empty)
                            .map((usefulMap)=>{
                                //มีสิ่งปลูกสร้าง
                                if (usefulMap.BuildOnUsefulLands.length >0) {
                                    let totalPlace = usefulMap.BuildOnUsefulLands.map(({Building:{Width,Length}})=>Width * Length)
                                    .reduce((pre,cur)=>pre+cur,0)  ;
                                    return usefulMap.BuildOnUsefulLands.map(({Building})=>{
                                        
                                        let PriceCondition1 = Building?.EmptyType?.Percent_Empty * (((Building?.Width * Building?.Length)/totalPlace)*usefulMap?.PriceUseful + Building?.AfterPriceDepreciate)/100||0;
                                        let PriceCondition2 = Building?.EmptyType?.Percent_Empty *  Building?.AfterPriceDepreciate/100||0;
                                     
                                          let priceArray =  Seperate(
                                                UsefulLand_Tax_ID=== uid_tax?
                                                PriceCondition1                                        
                                                :PriceCondition2,
                                            "ว่างเปล่า",0,empty.StartYear,empty.EmptyAbsolute).filter(rate => rate.price !== 0);//เพราะมันมีกรณี ค่าที่ส่งไปมันยังคำนวนไม่เสร็จและส่งกลับมาเลยมีค่าเท่ากับ ศูนย์
                                           let RateAccross = SeperateAccross(empty.Percent_Empty *  PriceUseful /100,"ว่างเปล่า",0,priceArray,empty.StartYear,empty.EmptyAbsolute);
                                           RateAccross.map(rate=>sumArray.push(rate.PriceOriginal * rate.percent))
                                        //    return <> 
                                        //         {RateAccross.map(rate=><p>{(rate.PriceOriginal * rate.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                        //                                     maximumFractionDigits: 2})}</p>)}
                                        //        </> 
                                            }
                                    )
                                    
                                }
                                //มีีแต่สัดส่วน
                                if (usefulMap?.EmptyTypes?.length>0) {
                                   return  usefulMap?.EmptyTypes?.map(EmptyTwo=>{
                                          Seperate((EmptyTwo.Percent_Empty *  PriceUseful )/100,
                                        "ว่างเปล่า",0, EmptyTwo.StartYear,EmptyTwo.EmptyAbsolute)
                                        .map(res=>Special_Useful>0&&exceptEmergency===0?
                                            sumArray.push((res.price * res.percent) *((100-Special_Useful)/100))
                                            :
                                            sumArray.push(res.price * res.percent))
                                    })
                                }
                                return sumArray
                            })
                        :
                                         Seperate((empty.Percent_Empty * PriceUseful )/100,'ว่างเปล่า',
                                                        empty.StartYear,empty.EmptyAbsolute
                                                        )
                                                        .map(res=>Special_Useful>0&&exceptEmergency===0?
                                        sumArray.push((res.price * res.percent) *((100-Special_Useful)/100))
                                        :
                                        sumArray.push(res.price * res.percent))
                                   
                                    
                        }
                            
                    </>)

                // old version
                // LiveTypes.length>0&&LiveTypes.map((live,i)=>(<>
                // {
                //     live.Live_Status&&Category_Tax ==="บุคคล"?live.Building.Build_Tax_ID=== uid_tax && UsefulLand_Tax_ID=== uid_tax?
                //     Seperate((live.Percent_Live * PriceUseful )/100 ,
                //     "อยู่อาศัย",live.Useful_live.BalanceDiscount
                //     ).map(res=>Special_Useful>0&&exceptEmergency===0?
                // sumArray.push((res.price * res.percent) *(Special_Useful/100))
                // :
                // sumArray.push(res.price * res.percent))
                //     :Seperate((live.Percent_Live * PriceUseful )/100,
                //     "อยู่อาศัย",live.Useful_live.BalanceDiscount).map(res=>Special_Useful>0&&exceptEmergency===0?
                // sumArray.push((res.price * res.percent) *(Special_Useful/100))
                // :
                // sumArray.push(res.price * res.percent))
                //     :
                //     Seperate(
                //         (live.Percent_Live * PriceUseful )/100,
                //     "อยู่อาศัย").map(res=>Special_Useful>0&&exceptEmergency===0?
                // sumArray.push((res.price * res.percent) *(Special_Useful/100))
                // :
                // sumArray.push(res.price * res.percent))
                // }
                
                // </>))
                // OtherTypes.length>0&&OtherTypes.map((other,i)=>(<>      
                // {
                //     Seperate((other.Percent_Other *  PriceUseful )/100,
                //     "อื่นๆ")
                //     .map(res=>Special_Useful>0&&exceptEmergency===0?
                // sumArray.push((res.price * res.percent) *(Special_Useful/100))
                // :
                // sumArray.push(res.price * res.percent))
                // }              
                    
                // </>))   
                // FarmTypes.length>0&&FarmTypes.map((farm,i)=>(<>  
                //     {
                //         Category_Tax ==="บุคคล"?Seperate((farm.Percent_Farm * PriceUseful )/100,
                //                     "เกษตร",50000000).map(res=>Special_Useful>0&&exceptEmergency===0?
                // sumArray.push((res.price * res.percent) *(Special_Useful/100))
                // :
                // sumArray.push(res.price * res.percent))
                //                     :
                //                     Seperate((farm.Percent_Farm * PriceUseful )/100,
                //                     "เกษตร").map(res=>Special_Useful>0&&exceptEmergency===0?
                // sumArray.push((res.price * res.percent) *(Special_Useful/100))
                // :
                // sumArray.push(res.price * res.percent))
                //     }
                // </>))  
                // EmptyTypes.length>0&&EmptyTypes.map((empty,i)=><>
                //     {  
                //                 Seperate((empty.Percent_Empty * PriceUseful )/100,'ว่างเปล่า',
                //                 empty.StartYear,empty.EmptyAbsolute
                //                 )
                //                 .map(res=>Special_Useful>0&&exceptEmergency===0?
                // sumArray.push((res.price * res.percent) *(Special_Useful/100))
                // :
                // sumArray.push(res.price * res.percent))
                //     }
                        
                // </>)
                return sumArray            
            }   
        }
        
    
    }
}