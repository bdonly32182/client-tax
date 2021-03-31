
export const PercentType =({BuildOnUsefulLands,PriceUseful,EmptyTypes,FarmTypes,OtherTypes,LiveTypes,TypeName}) => {
    
    if (BuildOnUsefulLands.length >0) {//กรณีมีสิ่งปลุกสร้าง
     
        return BuildOnUsefulLands.map(({Building},i)=>{
            return <>
                     <p key={i+1}>{Building.LiveType&&Building.LiveType?.Percent_Live}</p>
                     
                     <p key={i+2}>{Building.OtherType&&Building.OtherType?.Percent_Other}</p>             
                    
                    <p key={i+3}>{Building.FarmType&&Building.FarmType?.Percent_Farm}</p>
                    
                      <p key={i+4}>{Building.EmptyType&&Building.EmptyType?.Percent_Empty}</p>     
             </>
        })
        
    }
     if (LiveTypes.length === 0 &&OtherTypes.length === 0&&FarmTypes.length === 0&& EmptyTypes.length === 0) {
            //ไม่มีอะไรเลยทั้งสิ่งปลูกสร้าง บนแปลง และ คร่อมแปลง
            return (
                 <p>100</p>
                 )
     }else{
         //กรณีที่ไม่มีสิ่งปลูกสร้าง แต่มีสัดส่วน ก็คือมีสิ่งปลูกสร้างคร่อมแปลงมา หรือ สิ่งปลูกสร้างกับที่ดินคนละเจ้าของ
         return <>
                 {LiveTypes.length>0&&LiveTypes.map((live,i)=>(<>
                        
                         <p key={i}>{live.Percent_Live}</p>
                 </>))}
                 {OtherTypes.length>0&&OtherTypes.map((other,i)=>(<>
                         
                         <p key={i}>{other.Percent_Other}</p>             
                 </>))}    
                 {FarmTypes.length>0&&FarmTypes.map((farm,i)=>(<>
                         
                         <p >{farm.Percent_Farm}</p>
                 </>))}    
                 {EmptyTypes.length>0&&EmptyTypes.map((empty,i)=><>
                        
                         <p >{empty.Percent_Empty}</p>     
                 </>)}    
                     
             </>
     }
     
    
     
 }
 