import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {readNumber} from '../../../FuncPDS7/ReadNumber'
import {Summary} from '../../../FuncPDS7/Summary'
import {CategoryUseful,SizeType,ProportionType,PercentType,Except,ExceptBalance,
         RateTax,AmountPriceTax,SummaryCondo,TotalPrice} from './FuncPdf'
import Seperate from '../../../FuncPDS7/Seperate';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
export function DefinitionPdf(land,tax,condo,
    leader,amountCustomer,customers,jwt,yearDoc,imageKrut,logoBkk,Sendto
) {
    pdfMake.fonts={
        Sarabun:{
            normal:'Sarabun-Regular.ttf',
            bold:'Sarabun-Bold.ttf',
            italics:'Sarabun-Italic.ttf',
            bolditalics:'Sarabun-BoldItalic.ttf'
        }
    }
   
    let NowDate = new Date() ;
    let DateThai = NowDate.toDateString().split(" ");
    const sumPDS7 = (land = [],tax) => {
        let total = 0;
        land.forEach((record)=>{
            let result = Summary(record,tax.Category_Tax,tax.uid_tax,tax.exceptEmergency,land)
            if (result[0]?.length>0) {
            let array2D = result[0].reduce((pre,cur)=>pre+cur,0)
            return total += array2D
            }
            let reducerResult = result.reduce((pre,cur)=>pre+cur,0)
            total += reducerResult
        })
        return total
    }
    let PricePds7 = sumPDS7(land,tax);
    let PricePds8 = SummaryCondo(condo);
    let {PriceExceptEmergency,totalPriceOfTax,PriceDiscount,totalBuilaAndLandYear,
        valueDifference,Relive,BriefTotal} = TotalPrice(PricePds7,PricePds8,tax.exceptEmergency,customers);
        const DocDifinition = () => {
            let HavePds7 = land.length>0
            let HavePds8 = condo.length > 0
           let docDifinition ={
                pageSize:'A3',
                info: {
                    title: `${tax.uid_tax}-${yearDoc}`
                },
               content:[
                    
                   {text:'ภ.ด.ส.๖',fontSize:12,alignment:'right'},
                   {image:imageKrut,width: 80,height: 60,alignment: 'center'},
                   {text:'หนังสือเเจ้งการประเมินที่ดินและสิ่งปลูกสร้าง',style:'boldStyle',alignment:'center'},
                   {text:`ประจำปี พ.ศ.${+DateThai[3] + 543}`,style:'boldStyle',alignment:'center'},
                   {text:`ที่ ${jwt.distict_id}.........`,style:'boldStyle',alignment:'left'},
                   {text:`สำนักงานเขต${jwt?.District_name}`,style:['boldStyle','alignItemDistrict']},   
                   {text:`วันที่ .......... ${NowDate?.toLocaleDateString('th-TH', { year: 'numeric',month: 'long'})}`,margin: [300, 5, 20, 5]},  
                   'เรื่อง แจ้งการประเมินเพื่อเสียภาษีที่ดินและสิ่งปลูกสร้าง',
                   {text:`เรียน ${Sendto}`},
                   {text:` บ้านเลขที่ ${tax?.Address?.Num_House||" - "} ถนน ${tax?.Address?.Road_Name||"-"} ซอย ${tax?.Address?.Soi||"-"} หมู่ ${tax?.Address?.Moo||"-"} แขวง ${tax.Address?.Tambol||"-"} 
                    เขต ${tax.Address?.district_name||"-"} จังหวัด ${tax.Address?.Changwat||"-"}  ${tax.Address?.Post_No||"-"} เบอร์ติดต่อ ${tax.Address?.Phone_no||"-"}`},
                   {text:'ตามที่ท่านเป็นเจ้าของทรัพย์สิน ประกอบด้วย',style:'marginText'},
                   {text: `1.ที่ดิน จำนวน ${leader.Land?.length>0?leader.Land[0]?.totalLand:0} แปลง`,style:'marginText' },
                   {text:`2.สิ่งปลูกสร้าง จำนวน ${leader.Building?.length>0?leader.Building[0]?.totalBuild:0} หลัง`,style:'marginText'},
                   {text:`3.อาคารชุด/ห้องชุด จำนวน ${leader.Room?.length>0?leader.Room[0]?.totalRoom:0} หลัง`,style:'marginText'},
                  {text:`พนักงานประเมินได้ทําการประเมินภาษีที่ดินและสิ่งปลูกสร้างแล้ว เป็นจํานวนเงิน ${BriefTotal.toLocaleString(undefined,{minimumFractionDigits: 2,
                    maximumFractionDigits: 2})} บาท (${readNumber(`${BriefTotal.toFixed(2)}`)})`,style:'marginText'} ,
                  {text:`ตามรายการที่ปรากฏในแบบแสดงรายการคํานวณภาษีที่ดิน และสิ่งปลูกสร้าง แนบท้ายหนังสือฉบับนี้`},
                  {text:`ฉะนั้น ขอให้ท่านนําเงินภาษีที่ดินและสิ่งปลูกสร้างไปชําระ ณ สํานักงานเขต${jwt?.District_name} ภายในเดือน ${new Date(jwt?.MonthPay)?.toLocaleDateString('th-TH', { year: 'numeric',month: 'long'})}`,style:['sizeFonts','marginText']},
                  {text:`ถ้าไม่ชําระภาษีภายในกําหนดจะต้องเสียเบี้ยปรับและเงินเพิ่มตามมาตรา ๖๘ มาตรา ๖๙ และ มาตรา ๗๐ แห่งพระราชบัญญัติ`,style:['sizeFonts','marginText']},
                  {text:`ภาษีที่ดินและสิ่งปลูกสร้าง พ.ศ. ๒๕๖๒`,style:'sizeFonts'},
                  {text:`อนึ่ง หากท่านได้รับแจ้งการประเมินภาษีที่ดินและสิ่งปลูกสร้างแล้ว เห็นว่าการประเมินไม่ถูกต้องมีสิทธิยื่นคําร้องคัดค้านต่อผู้บริหารท้องถิ่น`,style:['sizeFonts','marginText']},
                  {text:`เพื่อพิจารณาทบทวนตามแบบ ภ.ด.ส.๑๐ ภายในสามสิบวัน นับแต่วันที่ได้รับแจ้งการประเมิน และหากผู้บริหารท้องถิ่นไม่เห็นชอบกับคําร้องคัดค้านนี้`,style:'sizeFonts'},
                  {text:` ให้มีสิทธิอุทธรณ์ต่อคณะกรรมการพิจารณาอุทธรณ์การประเมินภาษี โดยยื่นอุทธรณ์ต่อผู้บริหารท้องถิ่นภายในสามสิบวัน แต่วันที่ได้รับหนังสือแจ้ง`,style:'sizeFonts'},
                  {text:` และกรณีไม่เห็นด้วยกับคําวินิจฉัยอุทธรณ์ มีสิทธิฟ้องเป็นคดีต่อศาลในสามสิบวันนับแต่วันที่ได้รับแจ้งคําวินิจฉัยอุทธรณ์ทั้งนี้ ตาม มาตรา ๗๓ และ `,style:'sizeFonts'},
                  {text:` มาตรา ๘๒ แห่งพระราชบัญญัติภาษีที่ดินและสิ่งปลูกสร้าง พ.ศ. ๒๕๖๒`,style:'sizeFonts'},
                   {text:`ขอแสดงความนับถือ`,style:['alignCenter','marginTopText']},
                   {text:`( ${jwt?.district_leader} )`,style:['alignCenter','MarginNameLeader']},
                   {text:`นักวิชาการจัดเก็บรายได้ชำนาญการพิเศษ`,style:'alignCenter'},
                   {text:`หัวหน้าฝ่ายรายได้ สำนักงานเขต${jwt?.District_name}`,style:'alignCenter'},
                   {text:`พนักงานประเมิน`,style:'alignCenter'},
                   {text:'คำอธิบายเพิ่มเติมประกอบหนังสือแจ้งการประเมินภาษีที่ดินและสิ่งปลูกสร้าง',style:'header'},
                   {text:'และแบบแสดงรายการคำนวณภาษีที่ดินและสิ่งปลูกสร้าง อาคารชุด (แบบ ภ.ด.ส.๖-๘)',style:'subheader'},
                   {text:`1 ภาษีทั้งหมดที่คำนวณได้(ตามแบบ ภ.ด.ส.๗-๘)           จำนวน  ${totalPriceOfTax.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2})} บาท`,margin:[0,8,0,0]},
                   {text:`2 ได้รับการลดภาษีตาม พรก.ฉุกเฉิน(${tax.exceptEmergency} % )                    จำนวน  ${PriceExceptEmergency.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2})} บาท`,margin:[0,4,0,0]},
                   {text:`3 ภาษีที่คำนวณได้หลังจากการลดภาษีตามข้อ 2           จำนวน   ${PriceDiscount.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2})} บาท`,margin:[0,4,0,0]},
                   {text:`4 ภาษีที่ต้องชำระหรือพึงชำระในปี พ.ศ.2562              จำนวน   ${totalBuilaAndLandYear.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2})}  บาท`,margin:[0,4,0,0]},
                   {text:`5 ภาษีตามข้อ 3 ลบ 4 (ส่วนต่าง)                จำนวน ${valueDifference.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2})} บาท`,margin:[0,4,0,0]},
                   {text:`5.1 หากจำนวนน้อยกว่าศูนย์หรือเท่ากับศูนย์ จะไม่ได้รับการบรรเทาภาระภาษี                `,margin:[20,4,0,0]},
                   {text:`5.2 ส่วนต่างมากกว่าศูนย์จะได้รับการบรรเทาภาษีในปี พ.ศ.2565 ร้อยละ 75 ของส่วนต่าง       จำนวน   ${Relive.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2})}   บาท`,margin:[20,4,0,0]},
                   {text:`6 รวมค่าภาษีที่ต้องชำระตามหนังสือแจ้งประเมินภาษีที่ดินและสิ่งปลูกสร้าง (ภ.ด.ส.๖)            จำนวน  ${BriefTotal.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2})} บาท`,margin:[0,4,0,0]},
               ],
               defaultStyle:{
                   font:'Sarabun'
               },
               styles: {
                   boldStyle: {
                       fontSize: 12,
                       bold: true
                   },
                   alignItemDistrict:{
                    //    alignment:'right'
                    margin:[500,0,0,0]
                   },
                   marginText:{
                       margin: [60, 5, 0, 0]
                       //[left, top, right, bottom]
                   },
                   sizeFonts:{
                       fontSize: 12, 
                   },
                   alignCenter:{
                       alignment:'center'
                   },
                   marginTopText:{
                       margin:[0,20,0,0]
                   },
                   MarginNameLeader:{
                       margin:[0,60,0,0]
                   },
                   header: {
                    fontSize: 12,
                    bold: true,
                    margin: [200, 40, 0, 0]
                },
                subheader: {
                    fontSize: 12,
                    bold: true,
                    margin: [170, 0, 0, 0]
                },
                tableExample: {
                    margin: [0, 10, 0, 15]
                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                },
                tableFontSize:{
                    fontSize:8
                },
                totalPrice:{
                    fontSize: 9,
                    bold: true,
                    color:'#ce1212'
                },
                tableFontSizePds8:{
                    fontSize:10
                }
                   
               }
           }
           if (HavePds7) {
            let result = land.map(record=>{
               let category = CategoryUseful(record);
               let sizeType = SizeType(record);
               let percentType = PercentType(record);
               let proportionType = ProportionType(record,tax.uid_tax);
               let except = Except(record,tax.Category_Tax,tax.uid_tax);
               let exceptBalance = ExceptBalance(record,tax.Category_Tax,tax.uid_tax,land);
               let rateTax = RateTax(record,tax.Category_Tax,tax.uid_tax,land);
               let amountPriceTax = AmountPriceTax(record,tax.Category_Tax,tax.uid_tax,tax.exceptEmergency,land)
               let totalPlace = record.BuildOnUsefulLands.map(({Building:{Width,Length}})=>Width * Length)
                                                        .reduce((pre,cur)=>pre+cur,0)
                return [
                {text:record.Land.Serial_code_land,style:'tableFontSize'},
                {text:`${record.Land.Category_doc}/${record.Land.Parcel_No}`,style:'tableFontSize'},
                {text:record.TypeName,style:'tableFontSize'},
                {text:record.UsefulLand_Tax_ID===tax.uid_tax?record.Useful_RAI:'',style:'tableFontSize'},
                {text:record.UsefulLand_Tax_ID===tax.uid_tax?record.Useful_GNAN:'',style:'tableFontSize'},
                {text:record.UsefulLand_Tax_ID===tax.uid_tax?record.Useful_WA:'',style:'tableFontSize'},
                {text:record.UsefulLand_Tax_ID===tax.uid_tax?record.Place:'',style:'tableFontSize'},
                {text:record.UsefulLand_Tax_ID===tax.uid_tax?record.Land.Price.toLocaleString():'',style:'tableFontSize'},
                {text:record.UsefulLand_Tax_ID===tax.uid_tax?record.PriceUseful.toLocaleString():'',style:'tableFontSize'},
                record.BuildOnUsefulLands.map((build,index)=> {return {text:index+1,style:'tableFontSize'}}),
                record.BuildOnUsefulLands.map(({Building:{Sub_Category}})=> {return {text:Sub_Category,fontSize:7}}),
                record.BuildOnUsefulLands.map(({Building:{Build_Total_Place}})=> {return {text:Build_Total_Place.toLocaleString(),style:'tableFontSize'}}),
                record.BuildOnUsefulLands.map(({Building:{RateOfBuilding:{Rate_Price}}})=> {return {text:Rate_Price.toLocaleString(),style:'tableFontSize'}}),
                record.BuildOnUsefulLands.map(({Building:{Rate_Price_Build}})=> {return {text:Rate_Price_Build.toLocaleString(),style:'tableFontSize'}}),
                record.BuildOnUsefulLands.map(({Building:{Age_Build}})=> {return {text:Age_Build.toLocaleString(),style:'tableFontSize'}}),
                record.BuildOnUsefulLands.map(({Building:{PriceDepreciation}})=> {return {text:PriceDepreciation.toLocaleString(),style:'tableFontSize'}}),
                record.BuildOnUsefulLands.map(({Building:{AfterPriceDepreciate}})=> {return {text:AfterPriceDepreciate.toLocaleString(),style:'tableFontSize'}}),
                record.BuildOnUsefulLands?.length>0?
                record.UsefulLand_Tax_ID===tax.uid_tax? record.BuildOnUsefulLands.map(({Building:{Width,Length,AfterPriceDepreciate}}) =>
                {return {text:(((Width * Length)/totalPlace)*record.PriceUseful +AfterPriceDepreciate )
                    .toLocaleString(undefined,{minimumFractionDigits: 2,
                                    maximumFractionDigits: 2}),style:'tableFontSize'}}
                ):
                record.BuildOnUsefulLands.map(({Building:{AfterPriceDepreciate}}) =>
                        {return{text:AfterPriceDepreciate.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2}),style:'tableFontSize'}}
                )
                :{text:record.PriceUseful.toLocaleString(),style:'tableFontSize'},
                
                category?.map(arrcategory=>Array.isArray(arrcategory)?arrcategory.map(cate=>{return {text:cate.text,style:'tableFontSize'}})
                :{text:arrcategory.text,style:'tableFontSize'}
                ),
                sizeType?.map(arrsizeType=>Array.isArray(arrsizeType)?arrsizeType.map(size=>{return {text:size.text,style:'tableFontSize'}})
                :{text:arrsizeType.text,style:'tableFontSize'}
                ),
                percentType?.map(arrpercentType=>Array.isArray(arrpercentType)?arrpercentType.map(percent=>{return {text:percent.text,style:'tableFontSize'}})
                :{text:arrpercentType.text,style:'tableFontSize'}
                ),
                proportionType?.map(ArrproportionType=>Array.isArray(ArrproportionType)?ArrproportionType.map(type=>{return {text:type.text,style:'tableFontSize'}})
                :{text:ArrproportionType.text,style:'tableFontSize'}
                ),
                except?.map(arrexcept=>Array.isArray(arrexcept)?arrexcept.map(Newexcept=>{return {text:Newexcept.text,style:'tableFontSize'}})
                :{text:arrexcept.text,style:'tableFontSize'}
                ),
                
                exceptBalance?.map(ArrexceptBalance=>Array.isArray(ArrexceptBalance)?
                    ArrexceptBalance.map(balance=>balance.text?
                                        Array.isArray(balance.text)?
                                            balance.text.map(textOld=>{return {text:textOld,style:'tableFontSize'}})
                                            :
                                            {text:balance.text,style:'tableFontSize'}
                                        :
                                        //กรณีสิ่งปลูกสร้างคร่อมแปลงและมีการไต่อันดับ
                                        Array.isArray(balance)?
                                            balance?.map(arr3d=> arr3d.map(arr4d=> arr4d.map(arr5d=>{return {text:arr5d,style:'tableFontSize'}})))
                                        :null // ไม่งั้นมันจะ รีเทิน false ออกมาแสดง
                            )
                            
                :
                    Array.isArray(ArrexceptBalance.text)?ArrexceptBalance.text.map(textOld=>{return{text:textOld,style:'tableFontSize'}}):{text:ArrexceptBalance.text,style:'tableFontSize'}
                ),
                rateTax?.map(ArrrateTax=>Array.isArray(ArrrateTax)?ArrrateTax.map(rate=>rate.text?
                            Array.isArray(rate.text)?
                                rate.text.map(textOld=>{return{text:textOld,style:'tableFontSize'}})
                            :
                                {text:rate.text,style:'tableFontSize'}
                        :
                        Array.isArray(rate)?
                            rate.map(arr3d=> arr3d.map(arr4d=> arr4d.map(arr5d=>{return {text:arr5d,style:'tableFontSize'}})))
                            :null
                    )
                :
                Array.isArray(ArrrateTax.text)?ArrrateTax.text.map(textOld=>{return{text:textOld,style:'tableFontSize'}}):{text:ArrrateTax.text,style:'tableFontSize'}
                ),
                amountPriceTax?.map(ArramountPriceTax=>Array.isArray(ArramountPriceTax)?ArramountPriceTax.map(amount=>
                    amount.text?
                                Array.isArray(amount.text)?amount.text.map(textOld=>{return{text:textOld,style:'tableFontSize'}})   
                            : 
                                {text:amount.text,style:'tableFontSize'}
                        :
                            Array.isArray(amount)?
                                    amount.map(arr3d=> arr3d.map(arr4d=> arr4d.map(arr5d=>{return {text:arr5d,style:'tableFontSize'}})))
                                    :null
                    )
                :
                Array.isArray(ArramountPriceTax.text)?ArramountPriceTax.text.map(textOld=>{return{text:textOld,style:'tableFontSize'}}):{text:ArramountPriceTax.text,style:'tableFontSize'}
                )
            ]
            })
               docDifinition.content = [...docDifinition.content,
            
                {text: 'ภ.ด.ส.๗', pageOrientation: 'landscape', pageBreak: 'before',alignment:'right'},
                {image:logoBkk,width: 80,height: 80,alignment: 'center'},
                {text:'แบบแสดงรายการคำนวณภาษีที่ดินและสิ่งปลูกสร้าง',alignment:'center',style:'boldStyle'},
                {text:`รหัสผู้เสียภาษีที่ดินและสิ่งปลูกสร้าง ${tax.uid_tax} (${tax.Category_Tax})`,style:'tableExample'},
                {
                    color: '#444',//เส้นขอบคอลัมน์
                    table: {
                        widths: [15, 22,35,15,15,15
                                ,23,28,53,'auto',90,28,
                                 28,40,14,31,52,70,
                                 30,27,30,62,30,52,38,60],//width ต้อทำทุกคอลัมน์
                        headerRows: 2,//headerRowsอย่างน้อยต้องตาม คอลัมน์
                        keepWithHeaderRows: 1,
                        body: [
                            [
                            {text:'ที่',style:'tableFontSize'},{text:'ประเภทที่ดิน',style:'tableFontSize'},{text:'ลักษณะการใช้ประโยชน์ที่ดิน',style:'tableFontSize'},
                            {text:'ไร่',style:'tableFontSize'},{text:'งาน',style:'tableFontSize'},{text:'วา',style:'tableFontSize'},
                            {text:'คำนวณเป็น ตรว.',style:'tableFontSize'},{text:'ราคาประเมินต่อ ตรว.',style:'tableFontSize'},
                            {text:'รวมราคาประเมิณของที่ดิน',style:'tableFontSize'},{text:'ที่',style:'tableFontSize'},{text:'ประเภทสิ่งปลูกสร้าง',style:'tableFontSize'},
                            {text:'ขนาดพื้นที่รวม (ตร.ม)',style:'tableFontSize'},{text:'ราคาประเมินต่อ ตรม.',style:'tableFontSize'},
                            {text:'รวมราคาสิ่งปลูกสร้าง',style:'tableFontSize'},{text:'อายุสิ่งปลูกสร้าง',style:'tableFontSize'},{text:'คิดเป็นค่าเสื่อม',style:'tableFontSize'},
                            {text:'ราคาประเมินสิ่งปลูกสร้างหลังหักค่าเสื่อม(บาท)',style:'tableFontSize'},{text:'รวมราคาประเมิณที่ดินและสิ่งปลูกสร้าง',style:'tableFontSize'},
                            {text:'ลักษณะการใช้ประโยชน์',style:'tableFontSize'},{text:'ขนาดพื้นที่(ตร.ม)',style:'tableFontSize'},
                            {text:'คิดเป็นสัดส่วน',style:'tableFontSize'},{text:'รวมราคาประเมินที่ดินและสิ่งปลูกสร้างตามสัดส่วน',style:'tableFontSize'},
                            {text:'หักมูลค่าภาษีที่ได้รับยกเว้น',style:'tableFontSize'},{text:'คงเหลือราคาประเมินทุนทรัพย์ที่ต้องชำระ',style:'tableFontSize'},
                            {text:'อัตราภาษี',style:'tableFontSize'},{text:'จำนวนที่ต้องชำระ',style:'tableFontSize'}
                            ],
                        ...result,
                            [
                            {text:'ยอดรวมทั้งหมด',colSpan:24,alignment:'right',style:'totalPrice'},
                            '','','','','','','','','','','','','','','','','','','','','','','',//need 23 success
                            {text:PricePds7.toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2})
                                ,colSpan:2,style:'totalPrice'}
                            ],
                            tax.exceptEmergency>0?
                            [
                                {text:`สรุปยอดรวม (ได้รับส่วนลดกรณีฉุกเฉิน ${tax.exceptEmergency} %)`,colSpan:24,alignment:'right',style:'totalPrice'},
                                '','','','','','','','','','','','','','','','','','','','','','','',
                                {text:((PricePds7*(100 - tax.exceptEmergency)) /100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                    maximumFractionDigits: 2})
                                    ,colSpan:2,style:'totalPrice'}
                            ] 
                            :
                            [
                                {text:`สรุปยอดรวม (ได้รับส่วนลดกรณีฉุกเฉิน ${tax.exceptEmergency} %)`,colSpan:24,alignment:'right',style:'totalPrice'},
                                '','','','','','','','','','','','','','','','','','','','','','','',//need 23 success
                                {text:PricePds7.toLocaleString(undefined,{minimumFractionDigits: 2,
                                    maximumFractionDigits: 2})
                                    ,colSpan:2,style:'totalPrice'}
                            ]
                                
                        ],
                       
                    }
                }
            ]
           }
           if (HavePds8) {
               let rowResult = condo.map(record=>{
                   return [
                       {text:record.Room.Condo.id,style:'tableFontSizePds8'},
                       {text:record.Room.Condo.Condo_name,style:'tableFontSizePds8'},
                       {text:record.Room.Condo.Register_no,style:'tableFontSizePds8'},
                       {text:record.Room.Condo.District_name,style:'tableFontSizePds8'},
                       {text:record.Category_use,style:'tableFontSizePds8'},
                       {text:record.Room.Room_no,style:'tableFontSizePds8'},
                       {text:record.Amount_Place,style:'tableFontSizePds8'},
                       {text:record.Price_Room.toLocaleString(),style:'tableFontSizePds8'},
                       {text:(record.Price_Room * record.Amount_Place).toLocaleString(),style:'tableFontSizePds8'},
                       {text:record.Room.LiveStatus?50:0,style:'tableFontSizePds8'},
                       {text:record.Room.LiveStatus?(record.Price_Room * record.Amount_Place)- 50000000 <0?0:
                        ((record.Price_Room * record.Amount_Place)- 50000000).toLocaleString()
                        :
                        (record.Price_Room * record.Amount_Place).toLocaleString(),style:'tableFontSizePds8'},
                       {text:Seperate(record.Room.LiveStatus?(record.Price_Room * record.Amount_Place)- 50000000 <0?0:
                        ((record.Price_Room * record.Amount_Place)- 50000000)
                        :record.Price_Room * record.Amount_Place,
                        record.Category_use,0,record.StartYearEmpty).map(res=>res.percent),
                       style:'tableFontSizePds8'},
                       {text:Seperate(record.Room.LiveStatus?(record.Price_Room * record.Amount_Place)- 50000000 <0?0:
                        ((record.Price_Room * record.Amount_Place)- 50000000)
                        :record.Price_Room * record.Amount_Place,
                        record.Category_use,0,record.StartYearEmpty).map(res=>(res.percent * res.price).toLocaleString()),
                       style:'tableFontSizePds8'},
                    ]
               })
            docDifinition.content = [...docDifinition.content,
                {text: 'ภ.ด.ส.๘', pageOrientation: 'landscape', pageBreak: 'before',alignment:'right'},
                {image:logoBkk,width: 80,height: 80,alignment: 'center'},
                {text:'แบบแสดงรายการคำนวณภาษีที่ดินและสิ่งปลูกสร้าง',alignment:'center',style:'boldStyle'},
                {text:`รหัสผู้เสียภาษีที่ดินและสิ่งปลูกสร้าง ${tax.uid_tax} (${tax.Category_Tax})`,style:'tableExample'},
                {
                    color: '#444',
                    table: {
                        widths: ['auto',
                                'auto','auto','auto','auto','auto','auto',  
                                'auto','auto','auto','auto','auto','auto',
                                ],
                        body: [
                            [
                            {text:'ที่',style:'tableFontSizePds8'},
                            {text:'ชื่ออาคารชุด',style:'tableFontSizePds8'},{text:'เลขทะเบียนอาคารชุด',style:'tableFontSizePds8'},
                            {text:'ที่ตั้งอาคารชุด',style:'tableFontSizePds8'},{text:'ลักษณะการทำประโยชน์',style:'tableFontSizePds8'},
                            {text:'เลขที่ห้องชุด',style:'tableFontSizePds8'},{text:'ขนาดพื้นที่รวม(ตร.ม)',style:'tableFontSizePds8'},
                            {text:'ราคาประเมินต่อ(ตร.ม)',style:'tableFontSizePds8'},{text:'ราคาประเมินห้องชุด',style:'tableFontSizePds8'},
                            {text:'หักมูลค่าที่ได้รับยกเว้น',style:'tableFontSizePds8'},{text:'คงเหลือราคาประเมินทุนทรัพย์ที่ต้องชำระ',style:'tableFontSizePds8'},
                            {text:'อัตราภาษี',style:'tableFontSizePds8'},{text:'จำนวนที่ต้องชำระ',style:'tableFontSizePds8'},
                            ],
                            ...rowResult,
                            [
                                {text:`ยอดรวมทั้งหมด`,colSpan:11,alignment:'right',style:'totalPrice'},
                                '','','','','','','','','','',
                                {text:PricePds8.toLocaleString(undefined,{minimumFractionDigits: 2,
                                    maximumFractionDigits: 2})
                                    ,colSpan:2,style:'totalPrice'}
                            ] ,
                            tax.exceptEmergency>0?
                            [
                                    {text:`สรุปยอดรวม (ได้รับส่วนลดกรณีฉุกเฉิน ${tax.exceptEmergency} %)`,colSpan:11,alignment:'right',style:'totalPrice'},
                                '','','','','','','','','','',
                                {text:((PricePds8*tax.exceptEmergency) /100).toLocaleString(undefined,{minimumFractionDigits: 2,
                                    maximumFractionDigits: 2})
                                    ,colSpan:2,style:'totalPrice'}
                            ] 
                            :
                            [
                                {text:`สรุปยอดรวม (ได้รับส่วนลดกรณีฉุกเฉิน ${tax.exceptEmergency} %)`,colSpan:11,alignment:'right',style:'totalPrice'},
                            '','','','','','','','','','',
                            {text:PricePds8.toLocaleString(undefined,{minimumFractionDigits: 2,
                                maximumFractionDigits: 2})
                                ,colSpan:2,style:'totalPrice'}
                        ] 
                        ],
                       
                    }
                }
            ]
           }
           return docDifinition        
        }
        let PdfFile = DocDifinition()
       return PdfFile       
    
}

