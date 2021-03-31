export const Except=({BuildOnUsefulLands,Special_Useful,LiveTypes,OtherTypes,FarmTypes,EmptyTypes,UsefulLand_Tax_ID,TypeName},Category_Tax,uid_tax)=>{
    /* เงื่อนไขในการได้รับส่วนลด
   - กรณีการใช้ประโยชน์ที่ดินตาม {
        มาตร 3 50% อื่นๆ และ ที่อยู่อาศัยหลังหลักที่ได้รับมรดกก่อนมีการเปลี่ยน กฏหมายที่ดินและสิ่งปลูกสร้าง ลด50ล้านบาทแล้ว เอาส่วนที่เหลือมาลดอีก 50%
        มาตรา4 90% อื่นๆ
        มาตรา 8 100% อื่นๆ
    }
    -กรณีที่ดินและสิ่งปลูกสร้างเป็นเจ้าของบุคคล ลด 50 ล้านบาท
    -กรณีเป็นเจ้าของสิ่งปลูกสร้างที่อยู่อาศัยหลังหลัก ลด 10 ล้านบาท
    -กรณีเกษตรที่เป็นของยุคคล ลด 50 ล้าน    TypeName
    */ //   return  Building.LiveType?Building.LiveType.Live_Status?Building.LiveType.Live_Status&&Building.Build_Tax_ID===uid_tax&&useful.UsefulLand_Tax_ID===uid_tax?50000000:10000000:0:0

   if (BuildOnUsefulLands.length >0) {//กรณีมีสิ่งปลุกสร้าง
    return BuildOnUsefulLands.map(({Building},i)=>{
        return <>
                    {Building.LiveType&&
                    <p key={i+1}>{Building.LiveType.Live_Status&&Category_Tax ==="บุคคล"?Building.Build_Tax_ID=== uid_tax && UsefulLand_Tax_ID=== uid_tax?`50ล้าน`:`10ล้าน`:Special_Useful}
                    </p>
                    }
                   
                    {Building.OtherType&&
                    <p key={i+2}>{Special_Useful}</p> 
                    }  
                    {Building.FarmType&&
                        <p key={i+3}>{Category_Tax ==="บุคคล"?`50ล้าน`:0}</p>                            }
                    {Building.EmptyType&&<p key={i+4}>{Special_Useful}</p> }

                         
        </>
    })
    
}
 if (LiveTypes.length === 0 &&OtherTypes.length === 0&& FarmTypes.length === 0&& EmptyTypes.length === 0) {
        //ไม่มีอะไรเลยทั้งสิ่งปลูกสร้าง บนแปลง และ คร่อมแปลง เช่นเป็นเกษตรอย่างเดียว ไม่มีสิ่งปลูกสร้าง
        
        return <>
                <p>{TypeName ==="เกษตร"&&Category_Tax ==="บุคคล"?`50ล้าน`:Special_Useful}</p>
            </>
 }else{
     //กรณีที่ไม่มีสิ่งปลูกสร้าง แต่มีสัดส่วน ก็คือมีสิ่งปลูกสร้างคร่อมแปลงมาหรือว่าคนละเจ้าของกับแปลงที่ดิน Building.Build_Tax_ID
  
     return  <>
     {LiveTypes.length>0&&LiveTypes.map((live,i)=>(<>
             <p>{live.Live_Status&&Category_Tax ==="บุคคล"?live.Building.Build_Tax_ID=== uid_tax && UsefulLand_Tax_ID=== uid_tax?
                `${(live.Useful_live.BalanceDiscount/1000000).toFixed(2)}ล้าน`:`${(live.Useful_live.BalanceDiscount/1000000).toFixed(2)}ล้าน`
             :Special_Useful}</p>
             
     </>))}
     {OtherTypes.length>0&&OtherTypes.map((other,i)=>(<>
             
             <p>{Special_Useful}</p>
           
     </>))}    
     {FarmTypes.length>0&&FarmTypes.map((farm,i)=>(<>
           
        <p key={i+3}>{Category_Tax ==="บุคคล"?`50ล้าน`:0}</p>                   
     </>))}    
     {EmptyTypes.length>0&&EmptyTypes.map((empty,i)=><>
            
             <p>{Special_Useful}</p>
            
     </>)}
     </>
 }
}