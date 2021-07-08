import Seperate from './Seperate'
import {SeperateAccross} from './SeperateAccross'
export const AmountPriceTax=({BuildOnUsefulLands,LiveTypes,OtherTypes,
                            FarmTypes,EmptyTypes,UsefulLand_Tax_ID,TypeName,StartYears,
                            EmptyAbsolutes,Useful,isNexto,PriceUseful,Special_Useful
                        },
                            Category_Tax,uid_tax,exceptEmergency,lands)=>{
    if (Useful.length > 0) {
        let excepLive = BuildOnUsefulLands.filter(({Building:{LiveType}})=>LiveType?.Live_Status === true)
                        .map(({Building:{LiveType,Build_Tax_ID}}) => ({LiveStatus:LiveType?.Live_Status,Build_Tax_ID}));
        let TotalNexto =0;
                    Useful.map((usefuls,index)=>{ 
                         //usefuls คือแปลงที่ติดกัน
                        if (usefuls.UsefulLand_Tax_ID === uid_tax) { //สิ่งปลูกสรา้งกับที่ดินคนละเจ้าของ
                            let OrginalPlace = BuildOnUsefulLands.map(({Building:{Width,Length}})=>Width * Length)
                                .reduce((pre,cur)=>pre+cur,0);   
                            let OriginalUsefulPrice = BuildOnUsefulLands.map(({Building:{Width,Length,AfterPriceDepreciate}})=>
                                        (((Width * Length)/OrginalPlace)*PriceUseful + AfterPriceDepreciate)
                            )
                            .reduce((pre,cur)=>pre+cur,0);
                            if (index === 0 &&UsefulLand_Tax_ID=== uid_tax) { //ให้มันบวก ราคาที่ดินและสิ่งปลูกสร้างของแปลงหลักแค่ครั้งเดียว
                                if (OriginalUsefulPrice !== 0) {//มีสิ่งปลูกสร้าง   OriginalUsefulPrice !== 0
                                    TotalNexto += OriginalUsefulPrice 
                                }else{
                                    TotalNexto += PriceUseful
                                }
                            
                            }
                            
                            if (usefuls.BuildOnUsefulLands.length >0) {
                                let totalPlace = usefuls.BuildOnUsefulLands.map(({Building:{Width,Length}})=>Width * Length)
                                                .reduce((pre,cur)=>pre+cur,0);   
                                let totalPriceUseful = usefuls.BuildOnUsefulLands.map(({Building:{Width,Length,AfterPriceDepreciate,LiveType}})=>{
                                    return LiveType?
                                    LiveType.Live_Status? 0 :usefuls.LiveTypes.length>0&&usefuls.LiveTypes[0].Useful_live?.IntregateLive===true?
                                        ((((Width * Length)/totalPlace)*usefuls.PriceUseful) + AfterPriceDepreciate)
                                        : usefuls.PriceUseful
                                    : 
                                    ((((Width * Length)/totalPlace)*usefuls.PriceUseful) + AfterPriceDepreciate)
                                }              
                                )
                                .reduce((pre,cur)=>pre+cur,0);
                                TotalNexto += totalPriceUseful 
                            }
                            if (usefuls.LiveTypes.length === 0 &&usefuls.OtherTypes.length === 0&& usefuls.FarmTypes.length === 0&& usefuls.EmptyTypes.length === 0) {
            
                                TotalNexto += usefuls.PriceUseful
                            }
                            //ไม่มีสิ่งปลูกสร้าง
                            if (usefuls.BuildOnUsefulLands.length ===0 ) {
                                //มีสัดส่วน ก็คือสิ่งปลูกสร้างเป็นของคนอื่นในแปลงที่ติดกัน(แปลงรอง)
                                if (usefuls.FarmTypes.length>0 || usefuls.LiveTypes.length>0 || usefuls.OtherTypes.length>0 || usefuls.EmptyTypes.length>0) {                               
                                    TotalNexto += usefuls.PriceUseful 
                                }
                            
                            }
                        
                            return TotalNexto
                            
                    }else{
                            if (BuildOnUsefulLands.length >0 && index === 0) { //index === 0 เพราะว่าอาจมีแปลงติดกันหลายแปลง ทำให้ AfterPriceDepreciate * index ดังนั้นจึงให้ทำแค่รอบเดียวพอ
                                //  สิ่งปลูกสร้างคนละเจ้าของ
                                let totalPriceUseful = BuildOnUsefulLands.map(({Building:{AfterPriceDepreciate}})=>
                                    AfterPriceDepreciate
                                )
                                .reduce((pre,cur)=>pre+cur,0);
                                TotalNexto += totalPriceUseful
                                
                            return TotalNexto   
                            }
                    }
                })
            return Seperate(TotalNexto,TypeName,
                excepLive.length>0?
                        excepLive[0]?.Build_Tax_ID === uid_tax && UsefulLand_Tax_ID=== uid_tax?
                        50000000:10000000
                    :
                    Category_Tax ==="บุคคล" &&UsefulLand_Tax_ID=== uid_tax &&TypeName ==="เกษตร"?
                    50000000
                    :0,
                StartYears,EmptyAbsolutes).map((res,i)=>Special_Useful>0&&exceptEmergency===0?
                <p key={i}>{(res.price * res.percent) *((100-Special_Useful)/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                    maximumFractionDigits: 2})}</p>
                :
                <p key={i}>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                    maximumFractionDigits: 2})}</p>)

    }else{
            
        if (isNexto) {
             //กรณีแปลงติดกันหลังหลักกับหลังรอง จะต้องมีสิ่งปลูกสร้างที่มี Live_Status === false ต้องเอาราคาสิ่งปลูกสร้างมาคิด
            //ถ้าเป็นกรณีอื่นๆ ไม่ต้องเอามาคำนวณ AfterPriceDepreciate
           let buildLive = BuildOnUsefulLands.filter(({Building})=>Building?.LiveType?.Live_Status === false);
           return  buildLive.length>0 &&LiveTypes.length>0&& LiveTypes[0]?.Useful_live?.IntregateLive===false?
                Seperate(buildLive[0]?.Building?.AfterPriceDepreciate,"อยู่อาศัย")
                .map((res,i) =><p key={i}>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                    maximumFractionDigits: 2})}</p>)                   
            :  
            UsefulLand_Tax_ID=== uid_tax?
            <p>0</p> 
            : // สิ่งปลูกสร้างคนละเจ้าของ
            BuildOnUsefulLands.map(({Building})=>Seperate(Building?.AfterPriceDepreciate,TypeName,
                TypeName=== "เกษตร"?50000000:0
            )
            .map((res,i) =><p key={i}>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                maximumFractionDigits: 2})}</p>))
        }else{
            if (BuildOnUsefulLands.length >0) {      
                let totalPlace = BuildOnUsefulLands.map(({Building:{Width,Length}})=>Width * Length)
                                       .reduce((pre,cur)=>pre+cur,0)      
                return BuildOnUsefulLands.map(({Building},i)=>{
                    return <div key={i}>
                                {
                                    Building.LiveType?
                                            Building.LiveType.Live_Status&&Category_Tax ==="บุคคล"?Building.Build_Tax_ID=== uid_tax && UsefulLand_Tax_ID=== uid_tax?
                                            Seperate(Building.LiveType?.Percent_Live * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100,
                                            "อยู่อาศัย",50000000
                                            ).map((res,i)=>Special_Useful>0&&exceptEmergency===0?
                                            <p key={i}>{((res.price * res.percent) *((100-Special_Useful)/100)).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                maximumFractionDigits: 2})}</p>
                                            :
                                            <p key={i}>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                maximumFractionDigits: 2})}</p>)
                                            :Seperate(Building.LiveType?.Percent_Live *  Building.AfterPriceDepreciate/100,
                                            "อยู่อาศัย",10000000).map((res,i)=>Special_Useful>0&&exceptEmergency===0?
                                                <p key={i}>{((res.price * res.percent) *((100-Special_Useful)/100)).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2})}</p>
                                                :
                                                <p key={i}>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2})}</p>)
                                            :
                                            Seperate(
                                                UsefulLand_Tax_ID=== uid_tax?
                                                Building.LiveType?.Percent_Live * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                                :                                          
                                                Building.LiveType?.Percent_Live *  Building.AfterPriceDepreciate/100,
                                            "อยู่อาศัย").map((res,i)=>Special_Useful>0&&exceptEmergency===0?
                                                <p key={i}>{((res.price * res.percent) *((100-Special_Useful)/100)).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2})}</p>
                                                :
                                                <p key={i}>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
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
                                    .map((res,i)=>Special_Useful>0&&exceptEmergency===0?
                                        <p key={i}>{((res.price * res.percent)*((100-Special_Useful)/100))?.toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2})}</p>
                                        :
                                        <p key={i}>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2})}</p>)
                                }  
                                
                                {Building.FarmType?Category_Tax ==="บุคคล"?
                                        Seperate(
                                            UsefulLand_Tax_ID=== uid_tax?
                                                Building.FarmType?.Percent_Farm * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                                :Building.FarmType?.Percent_Farm *  Building.AfterPriceDepreciate/100,
                                        "เกษตร",50000000).map((res,i)=>Special_Useful>0&&exceptEmergency===0?
                                            <p key={i}>{((res.price * res.percent) *((100-Special_Useful)/100)).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                maximumFractionDigits: 2})}</p>
                                            :
                                            <p key={i}>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                maximumFractionDigits: 2})}</p>)
                                        :
                                        Seperate(
                                            UsefulLand_Tax_ID=== uid_tax?
                                                Building.FarmType?.Percent_Farm * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                                :Building.FarmType?.Percent_Farm *  Building.AfterPriceDepreciate/100,
                                        "เกษตร").map((res,i)=>Special_Useful>0&&exceptEmergency===0?
                                            <p key={i}>{((res.price * res.percent) *((100-Special_Useful)/100)).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                maximumFractionDigits: 2})}</p>
                                            :
                                            <p key={i}>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                maximumFractionDigits: 2})}</p>)
                                :null
                                }

                                {
                                    Building.EmptyType &&Building.EmptyType?.Percent_Empty &&
                                    Seperate(
                                        UsefulLand_Tax_ID=== uid_tax?
                                        Building.EmptyType?.Percent_Empty * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                        :Building.EmptyType?.Percent_Empty *  Building.AfterPriceDepreciate/100,
                                    'ว่างเปล่า',0, Building.EmptyType?.StartYear,Building.EmptyType?.EmptyAbsolute)
                                    .map((res,i)=>Special_Useful>0&&exceptEmergency===0?
                                        <p key={i}>{((res.price * res.percent) *((100-Special_Useful)/100)).toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2})}</p>
                                        :
                                        <p key={i}>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
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
                                    "เกษตร",50000000).map((res,i)=>Special_Useful>0&&exceptEmergency===0?
                                        <p key={i}>{(res.price * res.percent) *((100-Special_Useful)/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2})}</p>
                                        :
                                        <p key={i}>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2})}</p>)
                                    :Seperate(PriceUseful,
                                    "เกษตร").map((res,i)=>Special_Useful>0&&exceptEmergency===0?
                                        <p key={i}>{(res.price * res.percent) *((100-Special_Useful)/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2})}</p>
                                        :
                                        <p key={i}>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2})}</p>)
                                :Seperate(PriceUseful,
                                    TypeName,0,StartYears,EmptyAbsolutes
                                    ).map((res,i)=>Special_Useful>0&&exceptEmergency===0?
                                        <p key={i}>{(res.price * res.percent) *((100-Special_Useful)/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2})}</p>
                                        :
                                        <p key={i}>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2})}</p>)
                            }
                        </>
            }else{
                //กรณีที่ไม่มีสิ่งปลูกสร้าง แต่มีสัดส่วน ก็คือมีสิ่งปลูกสร้างคร่อมแปลงมาหรือว่าคนละเจ้าของกับแปลงที่ดิน Building.Build_Tax_ID
            
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

                                        {RateAccross.map((rate,i)=><p key={i}>{(rate.PriceOriginal * rate.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                             maximumFractionDigits: 2})}</p>)}

                                       </div> 
                                    }
                            )
                            
                        }
                      
                        return <p>Failed ExceptBalance 217</p>
                    })
                  :
                    live.Live_Status&&Category_Tax ==="บุคคล"?live.Building.Build_Tax_ID=== uid_tax && UsefulLand_Tax_ID=== uid_tax?
                        Seperate((live.Percent_Live * PriceUseful )/100 ,
                        "อยู่อาศัย",live.Useful_live.BalanceDiscount
                        ).map((res,i)=>Special_Useful>0&&exceptEmergency===0?
                            <p key={i}>{((res.price * res.percent) *((100-Special_Useful)/100)).toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2})}</p>
                        :
                        <p key={i}>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2})}</p>)
                            :Seperate((live.Percent_Live * PriceUseful )/100,
                            "อยู่อาศัย",live.Useful_live.BalanceDiscount).map((res,i)=>Special_Useful>0&&exceptEmergency===0?
                            <p key={i}>{((res.price * res.percent) *((100-Special_Useful)/100)).toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2})}</p>
                        :
                        <p key={i}>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2})}</p>)
                            :
                            Seperate(
                                (live.Percent_Live * PriceUseful )/100,
                            "อยู่อาศัย",).map((res,i)=>Special_Useful>0&&exceptEmergency===0?
                        <p key={i}>{((res.price * res.percent) *((100-Special_Useful)/100)).toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2})}</p>
                        :
                        <p key={i}>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2})}</p>)

                }
                
                </div>))}
                {OtherTypes.length>0&&OtherTypes.map((other,i)=>(<div key={i}>      
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
                                        {
                                        RateAccross.map((rate,i)=><p key={i}>{(rate.PriceOriginal * rate.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                maximumFractionDigits: 2})}</p>)
                                        }
                                       </div> 
                                    }
                                    
                            )
                            
                        }
                       
                        return <p>Failed AmountPriceTax 304</p>
                    })
                    :
                    Seperate((other.Percent_Other *  PriceUseful )/100,
                    "อื่นๆ")
                    .map((res,i)=>Special_Useful>0&&exceptEmergency===0?
                        <p key={i}>{(res.price * res.percent) *((100-Special_Useful)/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2})}</p>
                        :
                        <p key={i}>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2})}</p>)
                   
                }              
                    
                </div>))}    
                {FarmTypes.length>0&&FarmTypes.map((farm,i)=>(<div key = {i}>  
                    {
                        Category_Tax ==="บุคคล"?Seperate((farm.Percent_Farm * PriceUseful )/100,
                                    "เกษตร",50000000).map((res,i)=><p key={i}>{((res.price * res.percent) *((100-Special_Useful)/100)).toLocaleString(undefined,{minimumFractionDigits: 2,
                                        maximumFractionDigits: 2})} </p>)
                                    :
                                    Seperate((farm.Percent_Farm * PriceUseful )/100,
                                    "เกษตร").map((res,i)=><p key={i}>{((res.price * res.percent) *((100-Special_Useful)/100)).toLocaleString(undefined,{minimumFractionDigits: 2,
                                        maximumFractionDigits: 2})} </p>)
                    }
                </div>))}    
                {EmptyTypes.length>0&&EmptyTypes.map((empty,i)=><div key={i}>
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
                                        "ว่างเปล่า",0,empty.StartYear,empty.EmptyAbsolute).filter(rate => rate.price !== 0);//เพราะมันมีกรณี ค่าที่ส่งไปมันยังคำนวนไม่เสร็จและส่งกลับมาเลยมีค่าเท่ากับ ศูนย์
                                       let RateAccross = SeperateAccross(empty.Percent_Empty *  PriceUseful /100,"ว่างเปล่า",0,priceArray,empty.StartYear,empty.EmptyAbsolute);
                                       return <div key={index}> 
                                            {RateAccross.map((rate,i)=><p key={i}>{(rate.PriceOriginal * rate.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                                        maximumFractionDigits: 2})}</p>)}
                                           </div> 
                                        }
                                )
                                
                            }
                           
                            return <p>Failed AmountPriceTax 381</p>
                        })
                    :
                                Seperate((empty.Percent_Empty * PriceUseful )/100,'ว่างเปล่า',0,
                                empty.StartYear,empty.EmptyAbsolute
                                )
                                .map((res,i)=>Special_Useful>0&&exceptEmergency===0?
                                <p key={i}>{((res.price * res.percent) *((100-Special_Useful)/100)).toLocaleString(undefined,{minimumFractionDigits: 2,
                                    maximumFractionDigits: 2})}</p>
                                :
                                <p key={i}>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                    maximumFractionDigits: 2})}</p>)
                                
                    }
                        
                </div>)}
                {/* old version
                 {LiveTypes.length>0&&LiveTypes.map((live,i)=>(<>
                {
                    live.Live_Status&&Category_Tax ==="บุคคล"?live.Building.Build_Tax_ID=== uid_tax && UsefulLand_Tax_ID=== uid_tax?
                    Seperate((live.Percent_Live * PriceUseful )/100 ,
                    "อยู่อาศัย",live.Useful_live.BalanceDiscount
                    ).map(res=>Special_Useful>0&&exceptEmergency===0?
                (res.price * res.percent) *((100-Special_Useful)/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                    maximumFractionDigits: 2})
                :
                <p>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                    maximumFractionDigits: 2})}</p>)
                    :Seperate((live.Percent_Live * PriceUseful )/100,
                    "อยู่อาศัย",live.Useful_live.BalanceDiscount).map(res=>Special_Useful>0&&exceptEmergency===0?
                (res.price * res.percent) *((100-Special_Useful)/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                    maximumFractionDigits: 2})
                :
                <p>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                    maximumFractionDigits: 2})}</p>)
                    :
                    Seperate(
                        (live.Percent_Live * PriceUseful )/100,
                    "อยู่อาศัย",).map(res=>Special_Useful>0&&exceptEmergency===0?
                (res.price * res.percent) *((100-Special_Useful)/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                    maximumFractionDigits: 2})
                :
                <p>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                    maximumFractionDigits: 2})}</p>)
                }
                
                </>))}
                {OtherTypes.length>0&&OtherTypes.map((other,i)=>(<>      
                {
                    Seperate((other.Percent_Other *  PriceUseful )/100,
                    "อื่นๆ")
                    .map(res=>Special_Useful>0&&exceptEmergency===0?
                (res.price * res.percent) *((100-Special_Useful)/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                    maximumFractionDigits: 2})
                :
                <p>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                    maximumFractionDigits: 2})}</p>)
                }              
                    
                </>))}    
                {FarmTypes.length>0&&FarmTypes.map((farm,i)=>(<>  
                    {
                        Category_Tax ==="บุคคล"?Seperate((farm.Percent_Farm * PriceUseful )/100,
                                    "เกษตร",50000000).map(res=>Special_Useful>0&&exceptEmergency===0?
                (res.price * res.percent) *((100-Special_Useful)/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                    maximumFractionDigits: 2})
                :
                <p>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                    maximumFractionDigits: 2})}</p>)
                                    :
                                    Seperate((farm.Percent_Farm * PriceUseful )/100,
                                    "เกษตร").map(res=>Special_Useful>0&&exceptEmergency===0?
                (res.price * res.percent) *((100-Special_Useful)/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                    maximumFractionDigits: 2})
                :
                <p>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                    maximumFractionDigits: 2})}</p>)
                    }
                </>))}    
                {EmptyTypes.length>0&&EmptyTypes.map((empty,i)=><>
                    {  
                                Seperate((empty.Percent_Empty * PriceUseful )/100,'ว่างเปล่า',0,
                                empty.StartYear,empty.EmptyAbsolute
                                )
                                .map(res=>Special_Useful>0&&exceptEmergency===0?
                (res.price * res.percent) *((100-Special_Useful)/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                    maximumFractionDigits: 2})
                :
                <p>{(res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                    maximumFractionDigits: 2})}</p>)
                    }
                        
                </>)} */}
                </>
            }   
        }
        
    
    }
}