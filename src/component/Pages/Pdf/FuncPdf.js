import Seperate from '../../../FuncPDS7/Seperate' 
import {depreciate} from '../../Select/data'
export const CategoryUseful =({BuildOnUsefulLands,EmptyTypes,FarmTypes,OtherTypes,LiveTypes,TypeName}) => {
    
    if (BuildOnUsefulLands.length >0) {//กรณีมีสิ่งปลุกสร้าง
    
        return BuildOnUsefulLands.map(({Building},i)=>{
            return [
                {text:Building?.LiveType?.Live_Status?'อยู่อาศัย(หลัก)':'อยู่อาศัย(รอง)',style:'tableFontSize'},
                {text:Building?.OtherType&&"อื่นๆ",style:'tableFontSize'},
                {text:Building?.FarmType&&"เกษตร",style:'tableFontSize'},
                {text:Building?.EmptyType&&"ว่างเปล่า",style:'tableFontSize'},
            ]
        
        })
        
    }
     if (LiveTypes.length === 0 &&OtherTypes.length === 0&&FarmTypes.length === 0&& EmptyTypes.length === 0) {
            return [{text:TypeName,style:'tableFontSize'}]
     }else{
         return [[
            ...LiveTypes.map((live,i)=>(
                    {text:`อยู่อาศัย(${live.Live_Status?"หลัก":"รอง"})`,style:'tableFontSize'}
            )),
            ...OtherTypes.map((other,i)=>({text:'อื่นๆ',style:'tableFontSize'})) ,
            ...FarmTypes.map((farm,i)=>({text:'เกษตร',style:'tableFontSize'})),
            ...EmptyTypes.map((empty,i)=>({text:'ว่างเปล่า',style:'tableFontSize'})),]   
            ]
     }
     
    
     
 }
 export const SizeType =({BuildOnUsefulLands,EmptyTypes,FarmTypes,OtherTypes,LiveTypes,Place}) => {

    if (BuildOnUsefulLands.length >0) {//กรณีมีสิ่งปลุกสร้าง
    
        return BuildOnUsefulLands.map(({Building},i)=>{
            return [
                {text:Building?.LiveType&&Building.LiveType?.Live_Size,style:'tableFontSize'},
                {text:Building?.OtherType&&Building.OtherType?.Other_Size,style:'tableFontSize'},
                {text:Building?.FarmType&&Building.FarmType?.Farm_Size,style:'tableFontSize'},
                {text:Building?.EmptyType&&Building.EmptyType?.Empty_Size,style:'tableFontSize'},
            ]
        
        })
        
    }
     if (LiveTypes.length === 0 &&OtherTypes.length === 0&&FarmTypes.length === 0&& EmptyTypes.length === 0) {
            return [{text:Place,style:'tableFontSize'}]
     }else{
         return [[
            ...LiveTypes.map((live,i)=>(
                    {text:live.Live_Size,style:'tableFontSize'}
            )),
            ...OtherTypes.map((other,i)=>({text:other.Other_Size,style:'tableFontSize'})) ,
            ...FarmTypes.map((farm,i)=>({text:farm.Farm_Size,style:'tableFontSize'})),
            ...EmptyTypes.map((empty,i)=>({text:empty.Empty_Size,style:'tableFontSize'})),]   
            ]
     }
     
    
     
 }
 export const PercentType =({BuildOnUsefulLands,EmptyTypes,FarmTypes,OtherTypes,LiveTypes,Place}) => {

    if (BuildOnUsefulLands.length >0) {//กรณีมีสิ่งปลุกสร้าง
    
        return BuildOnUsefulLands.map(({Building},i)=>{
            return [
                {text:Building?.LiveType&&Building.LiveType?.Percent_Live,style:'tableFontSize'},
                {text:Building?.OtherType&&Building.OtherType?.Percent_Other,style:'tableFontSize'},
                {text:Building?.FarmType&&Building.FarmType?.Percent_Farm,style:'tableFontSize'},
                {text:Building?.EmptyType&&Building.EmptyType?.Percent_Empty,style:'tableFontSize'},
            ]
        
        })
        
    }
     if (LiveTypes.length === 0 &&OtherTypes.length === 0&&FarmTypes.length === 0&& EmptyTypes.length === 0) {
            return [{text:100,style:'tableFontSize'}]
     }else{
         return [[
            ...LiveTypes.map((live,i)=>(
                    {text:live.Percent_Live,style:'tableFontSize'}
            )),
            ...OtherTypes.map((other,i)=>({text:other.Percent_Other,style:'tableFontSize'})) ,
            ...FarmTypes.map((farm,i)=>({text:farm.Percent_Farm,style:'tableFontSize'})),
            ...EmptyTypes.map((empty,i)=>({text:empty.Percent_Empty,style:'tableFontSize'})),]   
            ]
     }
     
    
     
 }
 export const ProportionType =({BuildOnUsefulLands,UsefulLand_Tax_ID,PriceUseful,EmptyTypes,FarmTypes,OtherTypes,LiveTypes},uid_tax) => {

    if (BuildOnUsefulLands.length >0) {//กรณีมีสิ่งปลุกสร้าง
        let totalPlace = BuildOnUsefulLands.map(({Building:{Width,Length}})=>Width * Length)
                                           .reduce((pre,cur)=>pre+cur,0)
        return BuildOnUsefulLands.map(({Building},i)=>{
            return [
                {text:Building.LiveType&&UsefulLand_Tax_ID=== uid_tax?
                    (Building.LiveType.Percent_Live *(((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2})
                    :
                    Building.LiveType&&(Building.LiveType.Percent_Live *Building.AfterPriceDepreciate/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2}),
                    style:'tableFontSize'},
                {text:Building.OtherType&&UsefulLand_Tax_ID=== uid_tax?
                    (Building.OtherType.Percent_Other * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2})
                     :
                     Building.OtherType&&(Building.OtherType.Percent_Other *  Building.AfterPriceDepreciate/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2}),
                    style:'tableFontSize'},
                {text:Building.FarmType&&UsefulLand_Tax_ID=== uid_tax?
                    (Building.FarmType.Percent_Farm * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2})
                    :
                    Building.FarmType&&(Building.FarmType.Percent_Farm * Building.AfterPriceDepreciate/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2}),
                    style:'tableFontSize'},
                {text:Building.EmptyType&&UsefulLand_Tax_ID=== uid_tax?
                    (Building.EmptyType.Percent_Empty * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                             maximumFractionDigits: 2})
                    :
                    Building.EmptyType&&(Building?.EmptyType?.Percent_Empty *  Building.AfterPriceDepreciate/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2}),
                    style:'tableFontSize'},
            ]
        
        })
        
    }
     if (LiveTypes.length === 0 &&OtherTypes.length === 0&&FarmTypes.length === 0&& EmptyTypes.length === 0) {
            return [{text:PriceUseful.toLocaleString(undefined,{minimumFractionDigits: 2,
                maximumFractionDigits: 2}),style:'tableFontSize'}]
     }else{
         return [
                    [
                ...LiveTypes.map((live,i)=>(
                        {text:((live.Percent_Live * PriceUseful )/100 ).toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2})
                            ,style:'tableFontSize'}
                )),
                ...OtherTypes.map((other,i)=>({
                    text:((other.Percent_Other * PriceUseful) / 100).toLocaleString(undefined,{minimumFractionDigits: 2,
                    maximumFractionDigits: 2}),
                    style:'tableFontSize'})) ,
                ...FarmTypes.map((farm,i)=>({
                    text:((farm.Percent_Farm * PriceUseful) / 100).toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2}),
                    style:'tableFontSize'})),
                ...EmptyTypes.map((empty,i)=>({
                    text:((empty.Percent_Empty * PriceUseful) / 100).toLocaleString(undefined,{minimumFractionDigits: 2,
                    maximumFractionDigits: 2})
                    ,style:'tableFontSize'})),
                    ]   
            ]
     }
     
    
     
 }
 export const Except =({BuildOnUsefulLands,Special_Useful,LiveTypes,OtherTypes,FarmTypes,EmptyTypes,UsefulLand_Tax_ID,TypeName},Category_Tax,uid_tax) => {

    if (BuildOnUsefulLands.length >0) {//กรณีมีสิ่งปลุกสร้าง
    
        return BuildOnUsefulLands.map(({Building},i)=>{
            return [
                {text:Building.LiveType.Live_Status&&Category_Tax ==="บุคคล"?Building.Build_Tax_ID=== uid_tax && UsefulLand_Tax_ID=== uid_tax?
                            `50`:`10`:Special_Useful,
                            style:'tableFontSize'},
                {text:Building.OtherType&&Special_Useful,style:'tableFontSize'},
                {text:Building.FarmType&&Category_Tax ==="บุคคล"?`50`:Building.FarmType&&0,style:'tableFontSize'},
                {text:Building.EmptyType&&Special_Useful,style:'tableFontSize'},
            ]
        
        })
        
    }
     if (LiveTypes.length === 0 &&OtherTypes.length === 0&&FarmTypes.length === 0&& EmptyTypes.length === 0) {
            return [{text:TypeName ==="เกษตร"&&Category_Tax ==="บุคคล"?`50`:Special_Useful,style:'tableFontSize'}]
     }else{
         return [[
            ...LiveTypes.map((live,i)=>(
                    {text:live.Live_Status&&Category_Tax ==="บุคคล"?live.Building.Build_Tax_ID=== uid_tax && UsefulLand_Tax_ID=== uid_tax?
                    `${(live.Useful_live.BalanceDiscount/1000000).toFixed(2)}`:`${(live.Useful_live.BalanceDiscount/1000000).toFixed(2)}`
                    :Special_Useful
                 ,style:'tableFontSize'}
            )),
            ...OtherTypes.map((other,i)=>({text:Special_Useful,style:'tableFontSize'})) ,
            ...FarmTypes.map((farm,i)=>({text:Category_Tax ==="บุคคล"?`50`:0,style:'tableFontSize'})),
            ...EmptyTypes.map((empty,i)=>({text:Special_Useful,style:'tableFontSize'})),]   
            ]
     }
     
    
     
 }
 export const ExceptBalance =({BuildOnUsefulLands,LiveTypes,OtherTypes,
    FarmTypes,EmptyTypes,UsefulLand_Tax_ID,TypeName,StartYears,
    EmptyAbsolutes,Useful,isNexto,PriceUseful},Category_Tax,uid_tax) => {
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
                    return [{text:Seperate(TotalNexto,TypeName,0,StartYears,EmptyAbsolutes).map(res=>res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                        maximumFractionDigits: 2})),style:'tableFontSize'}]
        }else{
            if (isNexto) {
                return [{text:'แปลงติดกัน',style:'tableFontSize'}]
            }else{
                    if (BuildOnUsefulLands.length >0) {//กรณีมีสิ่งปลุกสร้าง
                    let totalPlace = BuildOnUsefulLands.map(({Building:{Width,Length}})=>Width * Length)
                                                    .reduce((pre,cur)=>pre+cur,0)   
                    return BuildOnUsefulLands.map(({Building},i)=>{
                        return [
                                    {text:Building.LiveType?
                                        Building.LiveType.Live_Status&&Category_Tax ==="บุคคล"?Building.Build_Tax_ID=== uid_tax && UsefulLand_Tax_ID=== uid_tax?
                                        //ได้รับ ห้าสิบล้าน เพราะเป็นเจ้าของที่และบ้านดังนั้นจึงจับ ที่ละบ้านบวกกันได้เลย
                                        Seperate(Building.LiveType?.Percent_Live * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                        ,
                                        "อยู่อาศัย",50000000
                                        ).map(res =>res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2}))
                                        :Seperate(Building.LiveType?.Percent_Live *  Building.AfterPriceDepreciate/100,
                                        "อยู่อาศัย",10000000).map(res =>res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2}))//เป็นบ้านหลังหลักอย่างเดียว
                                        :
                                        Seperate(
                                            UsefulLand_Tax_ID=== uid_tax?
                                            Building.LiveType?.Percent_Live * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                            :                                          
                                            Building.LiveType?.Percent_Live *  Building.AfterPriceDepreciate/100,
                                        "อยู่อาศัย").map(res =>res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2}))
                                    :null
                                        ,
                                        style:'tableFontSize'},
                            {text:Building.OtherType&&
                                Seperate(
                                    UsefulLand_Tax_ID=== uid_tax?
                                    Building.OtherType?.Percent_Other * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                    :Building.OtherType?.Percent_Other *  Building.AfterPriceDepreciate/100,
                                "อื่นๆ")
                                .map(res =>res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                        maximumFractionDigits: 2}))
                                ,
                                style:'tableFontSize'},
                            {text:Building.FarmType?Category_Tax ==="บุคคล"?
                            Seperate(
                                UsefulLand_Tax_ID=== uid_tax?
                                Building.FarmType?.Percent_Farm * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                :Building.FarmType?.Percent_Farm *  Building.AfterPriceDepreciate/100,
                            "เกษตร",50000000).map(res=>res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2}))
                            :
                            Seperate(
                                UsefulLand_Tax_ID=== uid_tax?
                                    Building.FarmType?.Percent_Farm * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                    :Building.FarmType?.Percent_Farm *  Building.AfterPriceDepreciate/100,
                            "เกษตร").map(res=>res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2}))
                            :null
                            ,style:'tableFontSize'},
                            {text:Building.EmptyType &&Building.EmptyType?.Percent_Empty &&
                                Seperate(
                                    UsefulLand_Tax_ID=== uid_tax?
                                    Building.EmptyType?.Percent_Empty * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                    :Building.EmptyType?.Percent_Empty *  Building.AfterPriceDepreciate/100,
                                'ว่างเปล่า')
                                .map(res=>res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                        maximumFractionDigits: 2}))
                                ,style:'tableFontSize'},
                        ]
                    
                    })
                    
                }
                if (LiveTypes.length === 0 &&OtherTypes.length === 0&&FarmTypes.length === 0&& EmptyTypes.length === 0) {
                        return [{text: TypeName ==="เกษตร"?
                        Category_Tax ==="บุคคล"?
                        Seperate(PriceUseful,
                        "เกษตร",50000000).map(res=>res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2}))
                        :Seperate(PriceUseful,
                        "เกษตร").map(res=>res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2}))
                    :Seperate(PriceUseful,
                        TypeName).map(res=>res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2}))
                        ,style:'tableFontSize'}]
                }else{
                    return [[
                        ...LiveTypes.map((live,i)=>(
                                {text:live.Live_Status&&Category_Tax ==="บุคคล"?live.Building.Build_Tax_ID=== uid_tax && UsefulLand_Tax_ID=== uid_tax?
                                Seperate((live.Percent_Live * PriceUseful )/100 ,
                                "อยู่อาศัย",live.Useful_live.BalanceDiscount
                                ).map(res =>res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                        maximumFractionDigits: 2}))
                                :Seperate((live.Percent_Live * PriceUseful )/100,
                                "อยู่อาศัย",live.Useful_live.BalanceDiscount).map(res =>res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                        maximumFractionDigits: 2}))
                                :
                                Seperate(
                                    (live.Percent_Live * PriceUseful )/100,
                                "อยู่อาศัย").map(res =>res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                        maximumFractionDigits: 2}))
                            ,style:'tableFontSize'}
                        )),
                        ...OtherTypes.map((other,i)=>({text:Seperate((other.Percent_Other *  PriceUseful )/100,
                            "อื่นๆ")
                            .map(res =>res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2}))
                                ,style:'tableFontSize'})) ,
                        ...FarmTypes.map((farm,i)=>({text:
                            Category_Tax ==="บุคคล"?Seperate((farm.Percent_Farm * PriceUseful )/100,
                                            "เกษตร",50000000).map(res=>res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2}))
                                            :
                                            Seperate((farm.Percent_Farm * PriceUseful )/100,
                                            "เกษตร").map(res=>res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2}))
                            ,style:'tableFontSize'})),
                        ...EmptyTypes.map((empty,i)=>({text:Seperate((empty.Percent_Empty * PriceUseful )/100,'ว่างเปล่า')
                        .map(res=>res.price.toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2}))
                                ,style:'tableFontSize'})),]   
                        ]
                } 
            }
            
        }

 }
 export const RateTax =({BuildOnUsefulLands,LiveTypes,OtherTypes,
    FarmTypes,EmptyTypes,UsefulLand_Tax_ID,TypeName,StartYears,
    EmptyAbsolutes,Useful,isNexto,PriceUseful},Category_Tax,uid_tax) => {
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
                    return [{text:Seperate(TotalNexto,TypeName,0,StartYears,EmptyAbsolutes).map(res=>res.percent),style:'tableFontSize'}]
        }else{
            if (isNexto) {
                return [{text:'แปลงติดกัน',style:'tableFontSize'}]
            }else{
                    if (BuildOnUsefulLands.length >0) {//กรณีมีสิ่งปลุกสร้าง
                    let totalPlace = BuildOnUsefulLands.map(({Building:{Width,Length}})=>Width * Length)
                                                    .reduce((pre,cur)=>pre+cur,0)   
                    return BuildOnUsefulLands.map(({Building},i)=>{
                        return [
                                    {text:Building.LiveType?
                                        Building.LiveType.Live_Status&&Category_Tax ==="บุคคล"?Building.Build_Tax_ID=== uid_tax && UsefulLand_Tax_ID=== uid_tax?
                                        //ได้รับ ห้าสิบล้าน เพราะเป็นเจ้าของที่และบ้านดังนั้นจึงจับ ที่ละบ้านบวกกันได้เลย
                                        Seperate(Building.LiveType?.Percent_Live * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                        ,
                                        "อยู่อาศัย",50000000
                                        ).map(res =>res.percent)
                                        :Seperate(Building.LiveType?.Percent_Live *  Building.AfterPriceDepreciate/100,
                                        "อยู่อาศัย",10000000).map(res =>res.percent)//เป็นบ้านหลังหลักอย่างเดียว
                                        :
                                        Seperate(
                                            UsefulLand_Tax_ID=== uid_tax?
                                            Building.LiveType?.Percent_Live * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                            :                                          
                                            Building.LiveType?.Percent_Live *  Building.AfterPriceDepreciate/100,
                                        "อยู่อาศัย").map(res =>res.percent)
                                    :null
                                        ,
                                        style:'tableFontSize'},
                            {text:Building.OtherType&&
                                Seperate(
                                    UsefulLand_Tax_ID=== uid_tax?
                                    Building.OtherType?.Percent_Other * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                    :Building.OtherType?.Percent_Other *  Building.AfterPriceDepreciate/100,
                                "อื่นๆ")
                                .map(res =>res.percent)
                                ,
                                style:'tableFontSize'},
                            {text:Building.FarmType?Category_Tax ==="บุคคล"?
                            Seperate(
                                UsefulLand_Tax_ID=== uid_tax?
                                Building.FarmType?.Percent_Farm * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                :Building.FarmType?.Percent_Farm *  Building.AfterPriceDepreciate/100,
                            "เกษตร",50000000).map(res=>res.percent)
                            :
                            Seperate(
                                UsefulLand_Tax_ID=== uid_tax?
                                    Building.FarmType?.Percent_Farm * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                    :Building.FarmType?.Percent_Farm *  Building.AfterPriceDepreciate/100,
                            "เกษตร").map(res=>res.percent)
                            :null
                            ,style:'tableFontSize'},
                            {text:Building.EmptyType &&Building.EmptyType?.Percent_Empty &&
                                Seperate(
                                    UsefulLand_Tax_ID=== uid_tax?
                                    Building.EmptyType?.Percent_Empty * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                    :Building.EmptyType?.Percent_Empty *  Building.AfterPriceDepreciate/100,
                                'ว่างเปล่า',0, Building.EmptyType?.StartYear,Building.EmptyType?.EmptyAbsolute)
                                .map(res=>res.percent)
                                ,style:'tableFontSize'},
                        ]
                    
                    })
                    
                }
                if (LiveTypes.length === 0 &&OtherTypes.length === 0&&FarmTypes.length === 0&& EmptyTypes.length === 0) {
                        return [{text: TypeName ==="เกษตร"?
                        Category_Tax ==="บุคคล"?
                        Seperate(PriceUseful,
                        "เกษตร",50000000).map(res=>res.percent)
                        :Seperate(PriceUseful,
                        "เกษตร").map(res=>res.percent)
                    :Seperate(PriceUseful,
                        TypeName).map(res=>res.percent)
                        ,style:'tableFontSize'}]
                }else{
                    return [[
                        ...LiveTypes.map((live,i)=>(
                                {text:live.Live_Status&&Category_Tax ==="บุคคล"?live.Building.Build_Tax_ID=== uid_tax && UsefulLand_Tax_ID=== uid_tax?
                                Seperate((live.Percent_Live * PriceUseful )/100 ,
                                "อยู่อาศัย",live.Useful_live.BalanceDiscount
                                ).map(res =>res.percent)
                                :Seperate((live.Percent_Live * PriceUseful )/100,
                                "อยู่อาศัย",live.Useful_live.BalanceDiscount).map(res =>res.percent)
                                :
                                Seperate(
                                    (live.Percent_Live * PriceUseful )/100,
                                "อยู่อาศัย").map(res =>res.percent)
                            ,style:'tableFontSize'}
                        )),
                        ...OtherTypes.map((other,i)=>({text:Seperate((other.Percent_Other *  PriceUseful )/100,
                            "อื่นๆ")
                            .map(res =>res.percent)
                                ,style:'tableFontSize'})) ,
                        ...FarmTypes.map((farm,i)=>({text:
                            Category_Tax ==="บุคคล"?Seperate((farm.Percent_Farm * PriceUseful )/100,
                                            "เกษตร",50000000).map(res=>res.percent)
                                            :
                                            Seperate((farm.Percent_Farm * PriceUseful )/100,
                                            "เกษตร").map(res=>res.percent)
                            ,style:'tableFontSize'})),
                        ...EmptyTypes.map((empty,i)=>({text:Seperate((empty.Percent_Empty * PriceUseful )/100,'ว่างเปล่า',
                                        0, empty.StartYear,empty.EmptyAbsolute).map(res=>res.percent)
                                ,style:'tableFontSize'})),]   
                        ]
                } 
            }
            
        }

 }
 export const AmountPriceTax =({BuildOnUsefulLands,LiveTypes,OtherTypes,
    FarmTypes,EmptyTypes,UsefulLand_Tax_ID,TypeName,StartYears,
    EmptyAbsolutes,Useful,isNexto,PriceUseful,Special_Useful
},
    Category_Tax,uid_tax,exceptEmergency) => {
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
                    return [{text:Seperate(TotalNexto,TypeName,0,StartYears,EmptyAbsolutes).map(res=>Special_Useful>0&&exceptEmergency===0?
                            (res.price * res.percent) *(Special_Useful/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2})
                            :
                            (res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2}))
                        ,style:'tableFontSize'}]
        }else{
            if (isNexto) {
                return [{text:'0.00',style:'tableFontSize'}]
            }else{
                    if (BuildOnUsefulLands.length >0) {//กรณีมีสิ่งปลุกสร้าง
                    let totalPlace = BuildOnUsefulLands.map(({Building:{Width,Length}})=>Width * Length)
                                                    .reduce((pre,cur)=>pre+cur,0)   
                    return BuildOnUsefulLands.map(({Building},i)=>{
                        return [
                                    {text:Building.LiveType?
                                        Building.LiveType.Live_Status&&Category_Tax ==="บุคคล"?Building.Build_Tax_ID=== uid_tax && UsefulLand_Tax_ID=== uid_tax?
                                        Seperate(Building.LiveType?.Percent_Live * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100,
                                        "อยู่อาศัย",50000000
                                        ).map(res=>Special_Useful>0&&exceptEmergency===0?
                                        (res.price * res.percent) *(Special_Useful/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2})
                                        :
                                        (res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2}))
                                        :Seperate(Building.LiveType?.Percent_Live *  Building.AfterPriceDepreciate/100,
                                        "อยู่อาศัย",10000000).map(res=>Special_Useful>0&&exceptEmergency===0?
                                            (res.price * res.percent) *(Special_Useful/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                maximumFractionDigits: 2})
                                            :
                                            (res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                maximumFractionDigits: 2}))
                                        :
                                        Seperate(
                                            UsefulLand_Tax_ID=== uid_tax?
                                            Building.LiveType?.Percent_Live * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                            :                                          
                                            Building.LiveType?.Percent_Live *  Building.AfterPriceDepreciate/100,
                                        "อยู่อาศัย").map(res=>Special_Useful>0&&exceptEmergency===0?
                                            (res.price * res.percent) *(Special_Useful/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                maximumFractionDigits: 2})
                                            :
                                            (res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                                maximumFractionDigits: 2}))
                                        :null
                                        ,
                                        style:'tableFontSize'},
                            {text:Building.OtherType&&
                                Seperate(
                                    UsefulLand_Tax_ID=== uid_tax?
                                    Building.OtherType?.Percent_Other * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                    :Building.OtherType?.Percent_Other *  Building.AfterPriceDepreciate/100,
                                "อื่นๆ")
                                .map(res=>Special_Useful>0&&exceptEmergency===0?
                                    (res.price * res.percent) *(Special_Useful/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                        maximumFractionDigits: 2})
                                    :
                                    (res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                        maximumFractionDigits: 2}))
                                ,
                                style:'tableFontSize'},

                            {text:Building.FarmType?Category_Tax ==="บุคคล"?
                                    Seperate(
                                        UsefulLand_Tax_ID=== uid_tax?
                                            Building.FarmType?.Percent_Farm * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                            :Building.FarmType?.Percent_Farm *  Building.AfterPriceDepreciate/100,
                                    "เกษตร",50000000).map(res=>Special_Useful>0&&exceptEmergency===0?
                                        (res.price * res.percent) *(Special_Useful/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2})
                                        :
                                        (res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2}))
                                    :
                                    Seperate(
                                        UsefulLand_Tax_ID=== uid_tax?
                                            Building.FarmType?.Percent_Farm * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                            :Building.FarmType?.Percent_Farm *  Building.AfterPriceDepreciate/100,
                                    "เกษตร").map(res=>Special_Useful>0&&exceptEmergency===0?
                                        (res.price * res.percent) *(Special_Useful/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2})
                                        :
                                        (res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2}))
                                :null
                            ,style:'tableFontSize'},
                            {text: Building.EmptyType &&Building.EmptyType?.Percent_Empty &&
                                Seperate(
                                    UsefulLand_Tax_ID=== uid_tax?
                                    Building.EmptyType?.Percent_Empty * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                    :Building.EmptyType?.Percent_Empty *  Building.AfterPriceDepreciate/100,
                                'ว่างเปล่า',0, Building.EmptyType?.StartYear,Building.EmptyType?.EmptyAbsolute)
                                .map(res=>Special_Useful>0&&exceptEmergency===0?
                                    (res.price * res.percent) *(Special_Useful/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                        maximumFractionDigits: 2})
                                    :
                                    (res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                        maximumFractionDigits: 2}))
                                ,style:'tableFontSize'},
                        ]
                    
                    })
                    
                }
                if (LiveTypes.length === 0 &&OtherTypes.length === 0&&FarmTypes.length === 0&& EmptyTypes.length === 0) {
                        return [{text: TypeName ==="เกษตร"?
                        Category_Tax ==="บุคคล"?
                        Seperate(PriceUseful,
                        "เกษตร",50000000).map(res=>Special_Useful>0&&exceptEmergency===0?
                            (res.price * res.percent) *(Special_Useful/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2})
                            :
                            (res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2}))
                        :Seperate(PriceUseful,
                        "เกษตร").map(res=>Special_Useful>0&&exceptEmergency===0?
                            (res.price * res.percent) *(Special_Useful/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2})
                            :
                           (res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2}))
                    :Seperate(PriceUseful,
                        TypeName,0,StartYears,EmptyAbsolutes
                        ).map(res=>Special_Useful>0&&exceptEmergency===0?
                            (res.price * res.percent) *(Special_Useful/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2})
                            :
                            (res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2}))
                        ,style:'tableFontSize'}]
                }else{
                    return [[
                        ...LiveTypes.map((live,i)=>(
                                {text:live.Live_Status&&Category_Tax ==="บุคคล"?live.Building.Build_Tax_ID=== uid_tax && UsefulLand_Tax_ID=== uid_tax?
                                Seperate((live.Percent_Live * PriceUseful )/100 ,
                                "อยู่อาศัย",live.Useful_live.BalanceDiscount
                                ).map(res=>Special_Useful>0&&exceptEmergency===0?
                            (res.price * res.percent) *(Special_Useful/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2})
                            :
                            (res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2}))
                                :Seperate((live.Percent_Live * PriceUseful )/100,
                                "อยู่อาศัย",live.Useful_live.BalanceDiscount).map(res=>Special_Useful>0&&exceptEmergency===0?
                            (res.price * res.percent) *(Special_Useful/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2})
                            :
                            (res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2}))
                                :
                                Seperate(
                                    (live.Percent_Live * PriceUseful )/100,
                                "อยู่อาศัย").map(res=>Special_Useful>0&&exceptEmergency===0?
                            (res.price * res.percent) *(Special_Useful/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2})
                            :
                            (res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2}))
                            ,style:'tableFontSize'}
                        )),

                        ...OtherTypes.map((other,i)=>({text: Seperate((other.Percent_Other *  PriceUseful )/100,
                            "อื่นๆ")
                            .map(res=>Special_Useful>0&&exceptEmergency===0?
                        (res.price * res.percent) *(Special_Useful/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2})
                        :
                        (res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2}))
                                ,style:'tableFontSize'})) ,

                        ...FarmTypes.map((farm,i)=>({text:
                             Category_Tax ==="บุคคล"?Seperate((farm.Percent_Farm * PriceUseful )/100,
                                "เกษตร",50000000).map(res=>Special_Useful>0&&exceptEmergency===0?
                        (res.price * res.percent) *(Special_Useful/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2})
                        :
                        (res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2}))
                                            :
                                            Seperate((farm.Percent_Farm * PriceUseful )/100,
                                            "เกษตร").map(res=>Special_Useful>0&&exceptEmergency===0?
                        (res.price * res.percent) *(Special_Useful/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2})
                        :
                        (res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2}))
                            ,style:'tableFontSize'})),

                        ...EmptyTypes.map((empty,i)=>({text:Seperate((empty.Percent_Empty * PriceUseful )/100,'ว่างเปล่า',
                            empty.StartYear,empty.EmptyAbsolute
                            )
                            .map(res=>Special_Useful>0&&exceptEmergency===0?
                        (res.price * res.percent) *(Special_Useful/100).toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2})
                        :
                        (res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                            maximumFractionDigits: 2}))
                                ,style:'tableFontSize'})),]   
                        ]
                } 
            }
            
        }

 }
 export const AmountPriceTaxCate =({BuildOnUsefulLands,LiveTypes,OtherTypes,
    FarmTypes,EmptyTypes,UsefulLand_Tax_ID,TypeName,StartYears,
    EmptyAbsolutes,Useful,isNexto,PriceUseful,Special_Useful
},
    Category_Tax,uid_tax,exceptEmergency) => {
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
                    return [{text:Seperate(TotalNexto,TypeName,0,StartYears,EmptyAbsolutes).map(res=>Special_Useful>0&&exceptEmergency===0?
                            (res.price * res.percent) *(Special_Useful/100)
                            :
                            (res.price * res.percent))
                        ,category:TypeName,style:'tableFontSize'}]
        }else{
            if (isNexto) {
                return [{text:['0.00'],category:`${TypeName}`,style:'tableFontSize'}]
            }else{
                    if (BuildOnUsefulLands.length >0) {//กรณีมีสิ่งปลุกสร้าง
                    let totalPlace = BuildOnUsefulLands.map(({Building:{Width,Length}})=>Width * Length)
                                                    .reduce((pre,cur)=>pre+cur,0)   
                    return BuildOnUsefulLands.map(({Building},i)=>{
                        return [
                                    {text:Building.LiveType?
                                        Building.LiveType.Live_Status&&Category_Tax ==="บุคคล"?Building.Build_Tax_ID=== uid_tax && UsefulLand_Tax_ID=== uid_tax?
                                        Seperate(Building.LiveType?.Percent_Live * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100,
                                        "อยู่อาศัย",50000000
                                        ).map(res=>Special_Useful>0&&exceptEmergency===0?
                                        (res.price * res.percent) *(Special_Useful/100)
                                        :
                                        (res.price * res.percent).toLocaleString(undefined,{minimumFractionDigits: 2,
                                            maximumFractionDigits: 2}))
                                        :Seperate(Building.LiveType?.Percent_Live *  Building.AfterPriceDepreciate/100,
                                        "อยู่อาศัย",10000000).map(res=>Special_Useful>0&&exceptEmergency===0?
                                            (res.price * res.percent) *(Special_Useful/100)
                                            :
                                            (res.price * res.percent)
                                                )
                                        :
                                        Seperate(
                                            UsefulLand_Tax_ID=== uid_tax?
                                            Building.LiveType?.Percent_Live * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                            :                                          
                                            Building.LiveType?.Percent_Live *  Building.AfterPriceDepreciate/100,
                                        "อยู่อาศัย").map(res=>Special_Useful>0&&exceptEmergency===0?
                                            (res.price * res.percent) *(Special_Useful/100)
                                            :
                                            (res.price * res.percent))
                                        :null
                                        ,category:'อยู่อาศัย',
                                        style:'tableFontSize'},
                            {text:Building.OtherType&&
                                Seperate(
                                    UsefulLand_Tax_ID=== uid_tax?
                                    Building.OtherType?.Percent_Other * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                    :Building.OtherType?.Percent_Other *  Building.AfterPriceDepreciate/100,
                                "อื่นๆ")
                                .map(res=>Special_Useful>0&&exceptEmergency===0?
                                    (res.price * res.percent) *(Special_Useful/100)
                                    :
                                    (res.price * res.percent))
                                ,category:'อื่นๆ',
                                style:'tableFontSize'},

                            {text:Building.FarmType?Category_Tax ==="บุคคล"?
                                    Seperate(
                                        UsefulLand_Tax_ID=== uid_tax?
                                            Building.FarmType?.Percent_Farm * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                            :Building.FarmType?.Percent_Farm *  Building.AfterPriceDepreciate/100,
                                    "เกษตร",50000000).map(res=>Special_Useful>0&&exceptEmergency===0?
                                        (res.price * res.percent) *(Special_Useful/100)
                                        :
                                        (res.price * res.percent))
                                    :
                                    Seperate(
                                        UsefulLand_Tax_ID=== uid_tax?
                                            Building.FarmType?.Percent_Farm * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                            :Building.FarmType?.Percent_Farm *  Building.AfterPriceDepreciate/100,
                                    "เกษตร").map(res=>Special_Useful>0&&exceptEmergency===0?
                                        (res.price * res.percent) *(Special_Useful/100)
                                        :
                                        (res.price * res.percent))
                                :null
                            ,category:'เกษตร',style:'tableFontSize'
                            },
                            {text: Building.EmptyType &&Building.EmptyType?.Percent_Empty &&
                                Seperate(
                                    UsefulLand_Tax_ID=== uid_tax?
                                    Building.EmptyType?.Percent_Empty * (((Building.Width * Building.Length)/totalPlace)*PriceUseful + Building.AfterPriceDepreciate)/100
                                    :Building.EmptyType?.Percent_Empty *  Building.AfterPriceDepreciate/100,
                                'ว่างเปล่า',0, Building.EmptyType?.StartYear,Building.EmptyType?.EmptyAbsolute)
                                .map(res=>Special_Useful>0&&exceptEmergency===0?
                                    (res.price * res.percent) *(Special_Useful/100)
                                    :
                                    (res.price * res.percent))
                                ,category:'ว่างเปล่า',style:'tableFontSize'},
                        ]
                    
                    })
                    
                }
                if (LiveTypes.length === 0 &&OtherTypes.length === 0&&FarmTypes.length === 0&& EmptyTypes.length === 0) {
                        return [{text: TypeName ==="เกษตร"?
                        Category_Tax ==="บุคคล"?
                        Seperate(PriceUseful,
                        "เกษตร",50000000).map(res=>Special_Useful>0&&exceptEmergency===0?
                            (res.price * res.percent) *(Special_Useful/100)
                            :
                            (res.price * res.percent))
                        :Seperate(PriceUseful,
                        "เกษตร").map(res=>Special_Useful>0&&exceptEmergency===0?
                            (res.price * res.percent) *(Special_Useful/100)
                            :
                           (res.price * res.percent))
                    :Seperate(PriceUseful,
                        TypeName,0,StartYears,EmptyAbsolutes
                        ).map(res=>Special_Useful>0&&exceptEmergency===0?
                            (res.price * res.percent) *(Special_Useful/100)
                            :
                            (res.price * res.percent))
                        ,
                        category:`${TypeName}`,style:'tableFontSize'}]
                }else{
                    return [[
                        ...LiveTypes.map((live,i)=>(
                                {text:live.Live_Status&&Category_Tax ==="บุคคล"?live.Building.Build_Tax_ID=== uid_tax && UsefulLand_Tax_ID=== uid_tax?
                                Seperate((live.Percent_Live * PriceUseful )/100 ,
                                "อยู่อาศัย",live.Useful_live.BalanceDiscount
                                ).map(res=>Special_Useful>0&&exceptEmergency===0?
                            (res.price * res.percent) *(Special_Useful/100)
                            :
                            (res.price * res.percent))
                                :Seperate((live.Percent_Live * PriceUseful )/100,
                                "อยู่อาศัย",live.Useful_live.BalanceDiscount).map(res=>Special_Useful>0&&exceptEmergency===0?
                            (res.price * res.percent) *(Special_Useful/100)
                            :
                            (res.price * res.percent))
                                :
                                Seperate(
                                    (live.Percent_Live * PriceUseful )/100,
                                "อยู่อาศัย").map(res=>Special_Useful>0&&exceptEmergency===0?
                            (res.price * res.percent) *(Special_Useful/100)
                            :
                            (res.price * res.percent))
                            ,category:'อยู่อาศัย',style:'tableFontSize'}
                        )),

                        ...OtherTypes.map((other,i)=>({text: Seperate((other.Percent_Other *  PriceUseful )/100,
                            "อื่นๆ")
                            .map(res=>Special_Useful>0&&exceptEmergency===0?
                        (res.price * res.percent) *(Special_Useful/100)
                        :
                        (res.price * res.percent))
                                ,category:'อื่นๆ',style:'tableFontSize'})) ,

                        ...FarmTypes.map((farm,i)=>({text:
                             Category_Tax ==="บุคคล"?Seperate((farm.Percent_Farm * PriceUseful )/100,
                                "เกษตร",50000000).map(res=>Special_Useful>0&&exceptEmergency===0?
                        (res.price * res.percent) *(Special_Useful/100)
                        :
                        (res.price * res.percent))
                                            :
                                            Seperate((farm.Percent_Farm * PriceUseful )/100,
                                            "เกษตร").map(res=>Special_Useful>0&&exceptEmergency===0?
                        (res.price * res.percent) *(Special_Useful/100)
                        :
                        (res.price * res.percent))
                            ,category:'เกษตร',style:'tableFontSize'})),

                        ...EmptyTypes.map((empty,i)=>({text:Seperate((empty.Percent_Empty * PriceUseful )/100,'ว่างเปล่า',
                            empty.StartYear,empty.EmptyAbsolute
                            )
                            .map(res=>Special_Useful>0&&exceptEmergency===0?
                        (res.price * res.percent) *(Special_Useful/100)
                        :
                        (res.price * res.percent))
                                ,category:'ว่างเปล่า',style:'tableFontSize'})),]   
                        ]
                } 
            }
            
        }

 }
 export const SummaryCondo =(condo=[])=>{
    let total = 0;
    condo.forEach((record)=>{
        let Price =   record.LiveStatus?(record.Price_Room * record.Amount_Place)- 50000000 <0?0:
        (record.Price_Room * record.Amount_Place)- 50000000:
        record.Price_Room * record.Amount_Place
      let totalPrice = Seperate(Price,record.Category_use,0,record.StartYearEmpty).map(res=>res.percent * res.price)
                        .reduce((pre,cur)=>pre+cur);
    total += totalPrice
    
    }) 
    return total
 }
 export const TotalPrice = (PricePds7=0,PricePds8=0,exceptEmergency=0,customers=[])=>{
    let NowDate = new Date() ;
    let DateThai = NowDate.toDateString().split(" ");
    let DateBhut = +DateThai[3]+543;
     let totalBuilaAndLandYear = DateBhut<= 2565? customers.map(customer => customer.Land_years + customer.Build_years)
                            .reduce((pre,cur)=>pre+cur,0):0;//รวมราคาทั้งหมด พรบ.เดิมปี หกสองของทุกคน
    let totalPriceOfTax = PricePds7 + PricePds8; //ราคาเต็มทั้งหมด
    if (exceptEmergency > 0) {
        let PriceExceptEmergency = ((PricePds7 * exceptEmergency) /100) + ((PricePds8 * exceptEmergency) /100); // ราคาส่วนลดฉุกเฉิน
        let PriceDiscount =   totalPriceOfTax - PriceExceptEmergency //ราคาหลังหักส่วนลด
        let valueDifference =totalBuilaAndLandYear>0?(PriceDiscount -totalBuilaAndLandYear):0;//ส่วนต่าง
        let Relive = valueDifference>0?(valueDifference *0.75) + totalBuilaAndLandYear:0;
        let BriefTotal = valueDifference>0?(valueDifference*0.75) + totalBuilaAndLandYear:PriceDiscount;
        
       return {PriceExceptEmergency,totalPriceOfTax,PriceDiscount,totalBuilaAndLandYear,valueDifference,Relive,BriefTotal}
    }
    let valueDifference = totalBuilaAndLandYear>0?(totalPriceOfTax -totalBuilaAndLandYear)*0.75:0;
    let BriefTotal = valueDifference>0?valueDifference + totalBuilaAndLandYear:totalPriceOfTax;
    let Relive = valueDifference>0?valueDifference + totalBuilaAndLandYear:0;

   return {PriceExceptEmergency:0,totalPriceOfTax,PriceDiscount:totalPriceOfTax,totalBuilaAndLandYear,valueDifference,Relive,BriefTotal}
 }
 export const YearsDoc = () => {
     let date = new Date();
     let Year = date.toDateString().split(" ");;
     let dateThai = +Year[3]+543
     let YearStart = 2563;
     let totalYears = [2563]
     for (let index = 0; index < dateThai - YearStart; index++) {
         totalYears.push(YearStart + index +1)
     }
     return totalYears;
 }
 export const BuildUpdateYear  = (land = [] ,YearSave) => {
     let buildUpdate = [];
     let NowDate = new Date() ;
    let DateThai = NowDate.toDateString().split(" ");
    let NowDateThai = +DateThai[3]+543
    if (NowDateThai === YearSave) {
            for (const data of land) {
            let buildNewYear = data.BuildOnUsefulLands.map(({Building:{Age_Build,StyleBuilding,Build_Id,Percent_Age,YearBuild}})=>{
                let findPercent = depreciate.find(element=>element.Age === Age_Build+1 && element.category === StyleBuilding)
                let FindPercent_Age = (findPercent&& findPercent?.percent) || 0;
                
                return {
                    Build_Id,
                    Age_Build:YearBuild - YearSave === Age_Build?Age_Build:Age_Build+1,
                    Percent_Age:YearBuild - YearSave === Age_Build?Percent_Age:FindPercent_Age
                    }
            });
            buildUpdate = [...buildUpdate,...buildNewYear]
        }
    }
     return buildUpdate
 }