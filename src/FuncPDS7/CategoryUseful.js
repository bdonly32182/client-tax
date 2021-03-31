
export const CategoryUseful =({BuildOnUsefulLands,PriceUseful,EmptyTypes,FarmTypes,OtherTypes,LiveTypes,TypeName}) => {
    
    if (BuildOnUsefulLands.length >0) {//กรณีมีสิ่งปลุกสร้าง
    
        return BuildOnUsefulLands.map(({Building},i)=>{
            return <>
                     <p key={i+1}>{Building.LiveType&&`อยู่อาศัย(${Building.LiveType?.Live_Status?"หลัก":"รอง"})`}</p>
                     
                     <p key={i+2}>{Building.OtherType&&"อื่นๆ"}</p>             
                    
                    <p key={i+3}>{Building.FarmType&&"เกษตร"}</p>
                    
                      <p key={i+4}>{Building.EmptyType&&"ว่างเปล่า"}</p>     
             </>
        })
        
    }
     if (LiveTypes.length === 0 &&OtherTypes.length === 0&&FarmTypes.length === 0&& EmptyTypes.length === 0) {
            //ไม่มีอะไรเลยทั้งสิ่งปลูกสร้าง บนแปลง และ คร่อมแปลง
            return (
                 <p>{TypeName}</p>
                 )
     }else{
         //กรณีที่ไม่มีสิ่งปลูกสร้าง แต่มีสัดส่วน ก็คือมีสิ่งปลูกสร้างคร่อมแปลงมา หรือ สิ่งปลูกสร้างกับที่ดินคนละเจ้าของ
         return <>
                 {LiveTypes.length>0&&LiveTypes.map((live,i)=>(<>
                        
                         <p key={i}>{`อยู่อาศัย(${live.Live_Status?"หลัก":"รอง"})`}</p>
                 </>))}
                 {OtherTypes.length>0&&OtherTypes.map((other,i)=>(<>
                         
                         <p key={i}>อื่นๆ</p>             
                 </>))}    
                 {FarmTypes.length>0&&FarmTypes.map((farm,i)=>(<>
                         
                         <p >เกษตร</p>
                 </>))}    
                 {EmptyTypes.length>0&&EmptyTypes.map((empty,i)=><>
                        
                         <p >ว่างเปล่า</p>     
                 </>)}    
                     
             </>
     }
     
    
     
 }
 