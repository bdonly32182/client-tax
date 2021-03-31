
export const SizeType =({BuildOnUsefulLands,PriceUseful,EmptyTypes,FarmTypes,OtherTypes,LiveTypes,TypeName,Place}) => {
    
    if (BuildOnUsefulLands.length >0) {//กรณีมีสิ่งปลุกสร้าง
     
        return BuildOnUsefulLands.map(({Building},i)=>{
            return <>
                     <p key={i+1}>{Building.LiveType&&Building.LiveType?.Live_Size}</p>
                     
                     <p key={i+2}>{Building.OtherType&&Building.OtherType?.Other_Size}</p>             
                    
                    <p key={i+3}>{Building.FarmType&&Building.FarmType?.Farm_Size}</p>
                    
                      <p key={i+4}>{Building.EmptyType&&Building.EmptyType?.Empty_Size}</p>     
             </>
        })
        
    }
     if (LiveTypes.length === 0 &&OtherTypes.length === 0&&FarmTypes.length === 0&& EmptyTypes.length === 0) {
            //ไม่มีอะไรเลยทั้งสิ่งปลูกสร้าง บนแปลง และ คร่อมแปลง
            return (
                 <p>{Place}</p>
                 )
     }else{
         //กรณีที่ไม่มีสิ่งปลูกสร้าง แต่มีสัดส่วน ก็คือมีสิ่งปลูกสร้างคร่อมแปลงมา หรือ สิ่งปลูกสร้างกับที่ดินคนละเจ้าของ
         return <>
                 {LiveTypes.length>0&&LiveTypes.map((live,i)=>(<>
                        
                         <p key={i}>{live.Live_Size}</p>
                 </>))}
                 {OtherTypes.length>0&&OtherTypes.map((other,i)=>(<>
                         
                         <p key={i}>{other.Other_Size}</p>             
                 </>))}    
                 {FarmTypes.length>0&&FarmTypes.map((farm,i)=>(<>
                         
                         <p >{farm.Farm_Size}</p>
                 </>))}    
                 {EmptyTypes.length>0&&EmptyTypes.map((empty,i)=><>
                        
                         <p >{empty.Empty_Size}</p>     
                 </>)}    
                     
             </>
     }
     
    
     
 }
 