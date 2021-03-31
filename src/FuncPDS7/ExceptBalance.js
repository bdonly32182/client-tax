import Seperate from './Seperate'
import {Popover} from 'antd'
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
                            Category_Tax,uid_tax)=>{
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
            return Seperate(TotalNexto,TypeName,0,StartYears,EmptyAbsolutes).map(res=><Popover content={()=>contentNexto(Useful)}><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                    maximumFractionDigits: 2})}</p></Popover>)

    }else{
            
        if (isNexto) {
            return <p>แปลงติดกัน</p>
        }else{
            if (BuildOnUsefulLands.length >0) {      
                let totalPlace = BuildOnUsefulLands.map(({Building:{Width,Length}})=>Width * Length)
                                       .reduce((pre,cur)=>pre+cur,0)      
                return BuildOnUsefulLands.map(({Building},i)=>{
                    return <>
                                {
                                    Building.LiveType?
                                            Building.LiveType.Live_Status&&Category_Tax ==="บุคคล"?Building.Build_Tax_ID=== uid_tax && UsefulLand_Tax_ID=== uid_tax?
                                            //ได้รับ ห้าสิบล้าน เพราะเป็นเจ้าของที่และบ้านดังนั้นจึงจับ ที่ละบ้านบวกกันได้เลย
                                            Seperate(Building.LiveType?.Percent_Live * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                            ,
                                            "อยู่อาศัย",50000000
                                            ).map(res =><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                                maximumFractionDigits: 2})}</p>)
                                            :Seperate(Building.LiveType?.Percent_Live *  Building.AfterPriceDepreciate/100,
                                            "อยู่อาศัย",10000000).map(res =><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                                maximumFractionDigits: 2})}</p>)//เป็นบ้านหลังหลักอย่างเดียว
                                            :
                                            Seperate(
                                                UsefulLand_Tax_ID=== uid_tax?
                                                Building.LiveType?.Percent_Live * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                                :                                          
                                                Building.LiveType?.Percent_Live *  Building.AfterPriceDepreciate/100,
                                            "อยู่อาศัย").map(res =><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
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
                                    .map(res =><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2})}</p>)
                                }  
                                
                                {Building.FarmType?Category_Tax ==="บุคคล"?
                                        Seperate(
                                            UsefulLand_Tax_ID=== uid_tax?
                                            Building.FarmType?.Percent_Farm * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                            :Building.FarmType?.Percent_Farm *  Building.AfterPriceDepreciate/100,
                                        "เกษตร",50000000).map(res=><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2})}</p>)
                                        :
                                        Seperate(
                                            UsefulLand_Tax_ID=== uid_tax?
                                                Building.FarmType?.Percent_Farm * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                                :Building.FarmType?.Percent_Farm *  Building.AfterPriceDepreciate/100,
                                        "เกษตร").map(res=><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
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
                                    .map(res=><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2})}</p>)
                                }
                    </>
                })
                
            }
            if (LiveTypes.length === 0 &&OtherTypes.length === 0&& FarmTypes.length === 0&& EmptyTypes.length === 0) {
                    //ไม่มีอะไรเลยทั้งสิ่งปลูกสร้าง บนแปลง และ คร่อมแปลง เช่นเป็นเกษตรอย่างเดียว ไม่มีสิ่งปลูกสร้าง
                    
                    return <>
                            {
                                TypeName ==="เกษตร"?
                                    Category_Tax ==="บุคคล"?
                                    Seperate(PriceUseful,
                                    "เกษตร",50000000).map(res=><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2})}</p>)
                                    :Seperate(PriceUseful,
                                    "เกษตร").map(res=><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2})}</p>)
                                :Seperate(PriceUseful,
                                    TypeName).map(res=><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2})}</p>)
                            }
                        </>
            }else{
                //กรณีที่ไม่มีสิ่งปลูกสร้าง แต่มีสัดส่วน ก็คือมีสิ่งปลูกสร้างคร่อมแปลงมาหรือว่าคนละเจ้าของกับแปลงที่ดิน Building.Build_Tax_ID
            
                return  <>
                {LiveTypes.length>0&&LiveTypes.map((live,i)=>(<>
                {
                    live.Live_Status&&Category_Tax ==="บุคคล"?live.Building.Build_Tax_ID=== uid_tax && UsefulLand_Tax_ID=== uid_tax?
                    Seperate((live.Percent_Live * PriceUseful )/100 ,
                    "อยู่อาศัย",live.Useful_live.BalanceDiscount
                    ).map(res =><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2})}</p>)
                    :Seperate((live.Percent_Live * PriceUseful )/100,
                    "อยู่อาศัย",live.Useful_live.BalanceDiscount).map(res =><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2})} </p>)
                    :
                    Seperate(
                        (live.Percent_Live * PriceUseful )/100,
                    "อยู่อาศัย").map(res =><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2})} </p>)
                }
                
                </>))}
                {OtherTypes.length>0&&OtherTypes.map((other,i)=>(<>      
                {
                // !isNexto?
                    Seperate((other.Percent_Other *  PriceUseful )/100,
                    "อื่นๆ")
                    .map(res =><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                         maximumFractionDigits: 2})} </p>)
                // :"แปลงติดกัน"
                }              
                    
                </>))}    
                {FarmTypes.length>0&&FarmTypes.map((farm,i)=>(<>  
                    {
                    // !isNexto?
                        Category_Tax ==="บุคคล"?Seperate((farm.Percent_Farm * PriceUseful )/100,
                                    "เกษตร",50000000).map(res=><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2})}</p>)
                                    :
                                    Seperate((farm.Percent_Farm * PriceUseful )/100,
                                    "เกษตร").map(res=><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2})} </p>)
                    // :"แปลงติดกัน"              
                    }
                </>))}    
                {EmptyTypes.length>0&&EmptyTypes.map((empty,i)=><>
                    {  
                    //  !isNexto?
                                Seperate((empty.Percent_Empty * PriceUseful )/100,'ว่างเปล่า')
                                .map(res=><p>{res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                        maximumFractionDigits: 2})}</p>)
                        // :"แปลงติดกัน"
                    }
                        
                </>)}
                </>
            }   
        }
        
    
    }
}