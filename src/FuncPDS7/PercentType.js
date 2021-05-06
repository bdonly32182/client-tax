
export const PercentType =({BuildOnUsefulLands,PriceUseful,EmptyTypes,FarmTypes,OtherTypes,LiveTypes,TypeName}) => {
    
    if (BuildOnUsefulLands.length >0) {//กรณีมีสิ่งปลุกสร้าง
     
        return BuildOnUsefulLands.map(({Building},i)=>{
            return <div key={i}>
                     <p >{Building.LiveType&&Building.LiveType?.Percent_Live}</p>
                     
                     <p>{Building.OtherType&&Building.OtherType?.Percent_Other}</p>             
                    
                    <p >{Building.FarmType&&Building.FarmType?.Percent_Farm}</p>
                    
                      <p >{Building.EmptyType&&Building.EmptyType?.Percent_Empty}</p>     
             </div>
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
                 {LiveTypes.length>0&&LiveTypes.map((live,i)=>(<p key={i}>{live.Percent_Live}</p>))}
                 {OtherTypes.length>0&&OtherTypes.map((other,i)=>(<p key={i}>{other.Percent_Other}</p>))}    
                 {FarmTypes.length>0&&FarmTypes.map((farm,i)=>(<p key={i}>{farm.Percent_Farm}</p>))}    
                 {EmptyTypes.length>0&&EmptyTypes.map((empty,i)=><p key={i}>{empty.Percent_Empty}</p>)}    
                     
             </>
     }
     
    
     
 }
 