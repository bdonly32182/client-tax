import Seperate from './Seperate'
export const Summary=({BuildOnUsefulLands,LiveTypes,OtherTypes,
                            FarmTypes,EmptyTypes,UsefulLand_Tax_ID,TypeName,StartYears,
                            EmptyAbsolutes,Useful,isNexto,PriceUseful,Special_Useful
                        },
                            Category_Tax,uid_tax,exceptEmergency)=>{
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
                            if (LiveTypes.length === 0 &&OtherTypes.length === 0&& FarmTypes.length === 0&& EmptyTypes.length === 0) {
                                TotalNexto += usefuls.PriceUseful + PriceUseful
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
                                                sumArray.push((res.price * res.percent) *(Special_Useful/100))
                                            :
                                            <p>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                maximumFractionDigits: 2})}</p>)
                                            :Seperate(Building.LiveType?.Percent_Live * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100,
                                            "อยู่อาศัย",10000000).map(res=>Special_Useful>0&&exceptEmergency===0?
                                                    sumArray.push((res.price * res.percent) *(Special_Useful/100))
                                                :
                                                    sumArray.push(res.price * res.percent))
                                            :
                                            Seperate(
                                                Building.LiveType?.Percent_Live * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100,
                                            "อยู่อาศัย").map(res=>Special_Useful>0&&exceptEmergency===0?
                                                    sumArray.push((res.price * res.percent) *(Special_Useful/100))
                                                :
                                                    sumArray.push(res.price * res.percent))
                                    :null
                                }
                            
                                {
                                    Building.OtherType&&
                                    Seperate(
                                        Building.OtherType?.Percent_Other * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100,
                                    "อื่นๆ")
                                    .map(res=>Special_Useful>0&&exceptEmergency===0?
                                            sumArray.push((res.price * res.percent) *(Special_Useful/100))
                                        :
                                             sumArray.push(res.price * res.percent))
                                }  
                                
                                {Building.FarmType?Category_Tax ==="บุคคล"?
                                        Seperate(Building.FarmType?.Percent_Farm * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100,
                                        "เกษตร",50000000).map(res=>Special_Useful>0&&exceptEmergency===0?
                                                sumArray.push((res.price * res.percent) *(Special_Useful/100))
                                            :
                                                sumArray.push(res.price * res.percent)) 
                                        :
                                        Seperate(Building.FarmType?.Percent_Farm * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100,
                                        "เกษตร").map(res=>Special_Useful>0&&exceptEmergency===0?
                                                sumArray.push((res.price * res.percent) *(Special_Useful/100))
                                            :
                                                sumArray.push(res.price * res.percent)) 
                                :null
                                }

                                {
                                    Building.EmptyType &&Building.EmptyType?.Percent_Empty &&
                                    Seperate(Building.EmptyType?.Percent_Empty * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100,
                                    'ว่างเปล่า',0, Building.EmptyType?.StartYear,Building.EmptyType?.EmptyAbsolute)
                                    .map(res=>Special_Useful>0&&exceptEmergency===0?
                                            sumArray.push((res.price * res.percent) *(Special_Useful/100))
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
                                            sumArray.push((res.price * res.percent) *(Special_Useful/100))
                                        :
                                        sumArray.push(res.price * res.percent))
                                    :Seperate(PriceUseful,
                                    "เกษตร").map(res=>Special_Useful>0&&exceptEmergency===0?
                                            sumArray.push((res.price * res.percent) *(Special_Useful/100))
                                        :
                                        sumArray.push(res.price * res.percent))
                                :Seperate(PriceUseful,
                                    TypeName,0,StartYears,EmptyAbsolutes
                                    ).map(res=>Special_Useful>0&&exceptEmergency===0?
                                        sumArray.push((res.price * res.percent) *(Special_Useful/100))
                                        :
                                        sumArray.push(res.price * res.percent))
                 return sumArray
            }else{
                //กรณีที่ไม่มีสิ่งปลูกสร้าง แต่มีสัดส่วน ก็คือมีสิ่งปลูกสร้างคร่อมแปลงมาหรือว่าคนละเจ้าของกับแปลงที่ดิน Building.Build_Tax_ID
            
                LiveTypes.length>0&&LiveTypes.map((live,i)=>(<>
                {
                    live.Live_Status&&Category_Tax ==="บุคคล"?live.Building.Build_Tax_ID=== uid_tax && UsefulLand_Tax_ID=== uid_tax?
                    Seperate((live.Percent_Live * PriceUseful )/100 ,
                    "อยู่อาศัย",live.Useful_live.BalanceDiscount
                    ).map(res=>Special_Useful>0&&exceptEmergency===0?
                sumArray.push((res.price * res.percent) *(Special_Useful/100))
                :
                sumArray.push(res.price * res.percent))
                    :Seperate((live.Percent_Live * PriceUseful )/100,
                    "อยู่อาศัย",live.Useful_live.BalanceDiscount).map(res=>Special_Useful>0&&exceptEmergency===0?
                sumArray.push((res.price * res.percent) *(Special_Useful/100))
                :
                sumArray.push(res.price * res.percent))
                    :
                    Seperate(
                        (live.Percent_Live * PriceUseful )/100,
                    "อยู่อาศัย").map(res=>Special_Useful>0&&exceptEmergency===0?
                sumArray.push((res.price * res.percent) *(Special_Useful/100))
                :
                sumArray.push(res.price * res.percent))
                }
                
                </>))
                OtherTypes.length>0&&OtherTypes.map((other,i)=>(<>      
                {
                    Seperate((other.Percent_Other *  PriceUseful )/100,
                    "อื่นๆ")
                    .map(res=>Special_Useful>0&&exceptEmergency===0?
                sumArray.push((res.price * res.percent) *(Special_Useful/100))
                :
                sumArray.push(res.price * res.percent))
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
                    {  
                                Seperate((empty.Percent_Empty * PriceUseful )/100,'ว่างเปล่า',
                                empty.StartYear,empty.EmptyAbsolute
                                )
                                .map(res=>Special_Useful>0&&exceptEmergency===0?
                sumArray.push((res.price * res.percent) *(Special_Useful/100))
                :
                sumArray.push(res.price * res.percent))
                    }
                        
                </>)
                return sumArray            
            }   
        }
        
    
    }
}