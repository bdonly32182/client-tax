
export const ProportionType =({BuildOnUsefulLands,UsefulLand_Tax_ID,PriceUseful,EmptyTypes,FarmTypes,OtherTypes,LiveTypes},uid_tax) => {
    
   if (BuildOnUsefulLands.length >0) {//กรณีมีสิ่งปลุกสร้าง
    let totalPlace = BuildOnUsefulLands.map(({Building:{Width,Length}})=>Width * Length)
                                       .reduce((pre,cur)=>pre+cur,0)
       return BuildOnUsefulLands.map(({Building},i)=>{
           return <>
                    <p key={i+1}>{Building.LiveType&&UsefulLand_Tax_ID=== uid_tax?
                    (Building.LiveType.Percent_Live *(((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                    maximumFractionDigits: 2})
                    :
                    Building.LiveType&&(Building.LiveType.Percent_Live *Building.AfterPriceDepreciate/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                        maximumFractionDigits: 2})
                    }</p>
                    
                    <p key={i+2}>{Building.OtherType&&UsefulLand_Tax_ID=== uid_tax?
                    (Building.OtherType.Percent_Other * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                     maximumFractionDigits: 2})
                     :
                     Building.OtherType&&(Building.OtherType.Percent_Other *  Building.AfterPriceDepreciate/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                        maximumFractionDigits: 2})
                     }</p>             
                   
                   <p key={i+3}>{Building.FarmType&&UsefulLand_Tax_ID=== uid_tax?
                        (Building.FarmType.Percent_Farm * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                        maximumFractionDigits: 2})
                        :
                        Building.FarmType&&(Building.FarmType.Percent_Farm * Building.AfterPriceDepreciate/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2})
                        }</p>
                   
                     <p key={i+4}>{Building.EmptyType&&UsefulLand_Tax_ID=== uid_tax?
                        (Building.EmptyType.Percent_Empty * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                        maximumFractionDigits: 2})
                        :
                        Building.EmptyType&&(Building?.EmptyType?.Percent_Empty *  Building.AfterPriceDepreciate/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2})
                        }</p>     
            </>
       })
       
   }
    if (LiveTypes.length === 0 &&OtherTypes.length === 0&&FarmTypes.length === 0&& EmptyTypes.length === 0) {
           //ไม่มีอะไรเลยทั้งสิ่งปลูกสร้าง บนแปลง และ คร่อมแปลง
           return (
                <p>{PriceUseful.toLocaleString(undefined,{minimumFractionDigits: 2,
                                    maximumFractionDigits: 2})}</p>
                )
    }else{
        //กรณีที่ไม่มีสิ่งปลูกสร้าง แต่มีสัดส่วน ก็คือมีสิ่งปลูกสร้างคร่อมแปลงมา หรือ สิ่งปลูกสร้างกับที่ดินคนละเจ้าของ
        return <>
                {LiveTypes.length>0&&LiveTypes.map((live,i)=>(<>
                       
                        <p key={i}>{((live.Percent_Live * PriceUseful )/100 ).toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2})}</p>
                </>))}
                {OtherTypes.length>0&&OtherTypes.map((other,i)=>(<>
                        
                        <p key={i}>{((other.Percent_Other * PriceUseful) / 100).toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2})}</p>             
                </>))}    
                {FarmTypes.length>0&&FarmTypes.map((farm,i)=>(<>
                        
                        <p >{((farm.Percent_Farm * PriceUseful) / 100).toLocaleString(undefined,{minimumFractionDigits: 2,
                        maximumFractionDigits: 2})}</p>
                </>))}    
                {EmptyTypes.length>0&&EmptyTypes.map((empty,i)=><>
                       
                        <p >{((empty.Percent_Empty * PriceUseful) / 100).toLocaleString(undefined,{minimumFractionDigits: 2,
                        maximumFractionDigits: 2})}</p>     
                </>)}    
                    
            </>
    }
    
   
    
}
