import React,{useState,useEffect} from 'react'
import {Button,Modal,Table,notification, Row, Tabs,Select, Col,Progress} from 'antd';
import pdfMake from "pdfmake/build/pdfmake";
import {YearsDoc} from '../Pages/Pdf/FuncPdf'
import axios from '../../config/axios';
import {DefinitionPdf} from '../Pages/Pdf/DefinitionPdf'
import jwtDecode from 'jwt-decode';
import LocalStorageService from '../../LocalStorage/LocalStorageSevice';
import {Summary} from '../../FuncPDS7/Summary';
import Seperate from '../../FuncPDS7/Seperate';
import {AmountPriceTaxCate,SummaryCondo,BuildUpdateYear,TotalPrice} from '../Pages/Pdf/FuncPdf'
function CartSaveCost() {
    let uniqueId = 0
    const {Column} = Table
    const {Option} = Select
    const [visible,setVisible] = useState(false);
    const [imageKrut,setImageKrut] = useState(null);
    const [logoBkk,setLogoBkk] = useState(null);
    const [selectRows,setSelectRows] = useState([]);
    const [taxs, setTaxs] = useState([]);
    const [statusButton , setStatusButton]  = useState(false);
    const [amountSuccess,setAmountSuccess] = useState(0);
    let NowDate = new Date() ;
    let DateThai = NowDate.toDateString().split(" ");
    const [yearDoc,setYearDoc] = useState(+DateThai[3]+543);
    let token  = LocalStorageService.getToken();
    let jwt = jwtDecode(token);
    let live =[];
    let other = [];
    let farm = [];
    let empty =[];
    useEffect(() => {
        fetch_image()
    }, [])
    const fetch_image =()=>{
        Promise.all(['/krut.jpeg','/logobkk.jpeg'].map(index=>{
            return new Promise((resolve,reject)=>{
               let xhr =  new XMLHttpRequest();
               xhr.open('GET',index,true);
               xhr.responseType = 'arraybuffer'
               xhr.onload = function (e) {
                   if (xhr.readyState === 4) {
                       if(xhr.status === 200) {
                         resolve(this.response)
                       } else {
                         reject(xhr.statusText)
                       }
                   }
               };
               xhr.send()
            })
        })).then(arrImage => {
           let imageKrut = new Buffer(arrImage[0],'base64');
           setImageKrut(imageKrut)
           let imageLogo = new Buffer(arrImage[1],'base64');
           setLogoBkk(imageLogo);
       }).catch(e=>console.log(e))
     }

     const onSearchTaxPds6 = async() => {
        
        let result =  await axios.get(`/api/cart/taxcostbook`)
        setTaxs(result.data)
       
     }
     let years = YearsDoc();
     const onChangeYear = value => {
        setYearDoc(value)
    }
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          setSelectRows(selectedRows)
        },
      
      };
    const sumPDS7 = (land = [],tax) => {
        let total = 0;
        land.forEach((record)=>{
            let result = Summary(record,tax.Category_Tax,tax.uid_tax,tax.exceptEmergency)
            if (result[0]?.length>0) {
            let array2D = result[0].reduce((pre,cur)=>pre+cur,0)
            return total += array2D
            }
            let reducerResult = result.reduce((pre,cur)=>pre+cur,0)
            total += reducerResult
        })
        return total
    }
    const FuncSpreadMap =(array=[])=>{
            
        let liveFilter = array.filter(item=>item.category ==="อยู่อาศัย" && Array.isArray(item.text))
        live =[...live,...liveFilter];
        let otherFilter =array.filter(item=>item.category ==="อื่นๆ"&& Array.isArray(item.text))
        other = [...other,...otherFilter];
        let farmFilter = array.filter(item=>item.category ==="เกษตร"&& Array.isArray(item.text))
        farm = [...farm,...farmFilter];
        let emptyFilter = array.filter(item=>item.category ==="ว่างเปล่า"&& Array.isArray(item.text))
        empty = [...empty,...emptyFilter]
    }
    const FilterRoomPrice = (room = []) => {

        let LiveType = room.filter(type => type.Category_use === "อยู่อาศัย")
                            .map(record =>
                                Seperate(record.Room.LiveStatus?(record.Price_Room * record.Amount_Place)- 50000000 <0?0:
                                ((record.Price_Room * record.Amount_Place)- 50000000)
                                :record.Price_Room * record.Amount_Place,
                                record.Category_use,0,record.StartYearEmpty).map(res=>(res.percent * res.price))
                                ).reduce((pre,cur)=>pre + cur[0],0);
        let OtherType = room.filter(type=> type.Category_use === "อื่นๆ")
                            .map(record =>
                                Seperate(record.Room.LiveStatus?(record.Price_Room * record.Amount_Place)- 50000000 <0?0:
                            ((record.Price_Room * record.Amount_Place)- 50000000)
                            :record.Price_Room * record.Amount_Place,
                            record.Category_use,0,record.StartYearEmpty).map(res=>res.percent * res.price)
                            ).reduce((pre,cur)=>pre + cur[0],0);
        let EmptyType = room.filter(type=> type.Category_use === "ว่างเปล่า")
                            .map(record =>
                                Seperate(record.Room.LiveStatus?(record.Price_Room * record.Amount_Place)- 50000000 <0?0:
                            ((record.Price_Room * record.Amount_Place)- 50000000)
                            :record.Price_Room * record.Amount_Place,
                            record.Category_use,0,record.StartYearEmpty).map(res=>(res.percent * res.price))
                            ).reduce((pre,cur)=>pre + cur[0],0);
        return {
            LiveRoom : LiveType,
            OtherRoom : OtherType,
            EmptyRoom:EmptyType
        }
    }
    const onImportTax =async ()=>{
         if (!statusButton) {
             for (const row of selectRows) {
                let taxResult = await axios.get(`/api/tax/${row.uid_tax}`);
                let tax = taxResult.data
                let landResult = await axios.get(`/api/pds7/${row.uid_tax}`);
                let land = landResult.data
                let condoResult = await axios.get(`/api/pds8/${row.uid_tax}`);
                let condo = condoResult.data
                let leaderResult = await axios.get(`/api/pds6/${row.uid_tax}`);
                let leader = leaderResult.data
                let EmpTakeCare = land[0]?.Land?.Employee?.Pers_no||condo[0]?.Room?.Condo?.Employee?.Pers_no||jwt?.Pers_no;
                let amountCustomer = tax?.Customers?.length           
                let Sendto = `${tax?.Customers[0].title}${tax?.Customers[0].Cus_Fname} ${tax?.Customers[0].Cus_Lname} ${amountCustomer>1?"และผู้ที่เป็นเจ้าของทรัพย์สินร่วม":''}` 
                let employeeTable = land[0]?.Land?.Employee?.TableNo||condo[0]?.Room?.Condo?.Employee?.TableNo||jwt?.TableNo;
                let PricePds7 = sumPDS7(land,tax);
                let PricePds8 = SummaryCondo(condo);
                let {PriceExceptEmergency,totalPriceOfTax,PriceDiscount,totalBuilaAndLandYear,
                    valueDifference,Relive,BriefTotal} = TotalPrice(PricePds7,PricePds8,tax.exceptEmergency,tax?.Customers);
                let result = land.map(record=>{
                    let amountPriceTax = AmountPriceTaxCate(record,tax.Category_Tax,tax.uid_tax,tax.exceptEmergency)
                    return amountPriceTax
                })
                result.map(type=>Array.isArray(type[0])? FuncSpreadMap(type[0]):FuncSpreadMap([type[0]]))
            
                let {EmptyRoom,LiveRoom,OtherRoom} = FilterRoomPrice(condo)
        
                let PriceLive = live.reduce((pre,{text})=>pre + parseFloat(text[0]),0)
                                live.length =0;
                let PriceOther = other.reduce((pre,{text})=>pre +parseFloat(text[0]),0)
                                other.length=0;
                let PriceFarm = farm.reduce((pre,{text})=>pre +parseFloat(text[0]),0)
                                farm.length=0;
                let PriceEmpty = empty.reduce((pre,{text})=>pre +parseFloat(text[0]),0)
                                empty.length=0; 
                
                let SaveDoc = DefinitionPdf(land,tax,condo,leader,amountCustomer,tax?.Customers,jwt,yearDoc,imageKrut,logoBkk,Sendto);
                const GeneratePDF = pdfMake.createPdf(SaveDoc);
                     GeneratePDF.getBlob(async(data)=>{
                    console.log(tax.uid_tax);
                    const formData =new FormData();
                    let buildUpdate = BuildUpdateYear(land,yearDoc)
                    formData.append('file',data,`${tax.uid_tax}-${yearDoc}`);
                    formData.append('PriceEmptyRoom',EmptyRoom);
                    formData.append('PriceLiveRoom',LiveRoom);
                    formData.append('PriceOtherRoom',OtherRoom);
                    formData.append('PriceLiveUseful',PriceLive);
                    formData.append('PriceOtherUseful',PriceOther);
                    formData.append('PriceFarmUseful',PriceFarm);
                    formData.append('PriceEmptyUseful',PriceEmpty);
                    formData.append('totalPricePds7',PricePds7);
                    formData.append('totalPricePds8',PricePds8);
                    formData.append('BriefTotal',BriefTotal);
                    formData.append('employeeTable',employeeTable);
                    formData.append('Year',yearDoc);
                    formData.append('TaxCostBook',tax.uid_tax);
                    formData.append('PathPDF',`/Document/${tax.uid_tax}-${yearDoc}`);
                    formData.append('districtNo',jwt.distict_id);
                    formData.append('Employee_No',EmpTakeCare)
                    formData.append('PriceExceptEmergency',PriceExceptEmergency);
                    formData.append('valueDifference',valueDifference);
                    formData.append('Relive',Relive);
                    formData.append('totalPriceOfTax',totalPriceOfTax);
                    formData.append('totalBuilaAndLandYear',totalBuilaAndLandYear);
                    formData.append('SendTo',Sendto);
                    formData.append('FinishMonth',jwt?.MonthPay);
                    buildUpdate.map(build =>formData.append(`buildUpdateID`,build.Build_Id))
                    buildUpdate.map(build =>formData.append(`buildUpdateAge_Build`,build.Age_Build))
                    buildUpdate.map(build =>formData.append(`buildUpdatePercent_Age`,build.Percent_Age))
                    let body ={
                        PriceEmptyRoom:EmptyRoom,
                        PriceLiveRoom:LiveRoom,
                        PriceOtherRoom:OtherRoom,
                        PriceLiveUseful:PriceLive,
                        PriceOtherUseful:PriceOther,
                        PriceFarmUseful:PriceFarm,
                        PriceEmptyUseful:PriceEmpty,
                        totalPricePds7:PricePds7,
                        totalPricePds8:PricePds8,
                        BriefTotal:BriefTotal,
                        employeeTable:employeeTable,
                        Year:yearDoc,
                        TaxCostBook:tax.uid_tax,
                        PathPDF:`/Document/${tax.uid_tax}-${yearDoc}`,
                        districtNo:jwt.distict_id,
                        Employee_No:EmpTakeCare,
                        PriceExceptEmergency:PriceExceptEmergency,
                        valueDifference:valueDifference,
                        Relive:Relive,
                        totalPriceOfTax:totalPriceOfTax,
                        totalBuilaAndLandYear:totalBuilaAndLandYear,
                        SendTo:Sendto,
                        FinishMonth:jwt?.MonthPay,
                        buildUpdate
                    }
                    axios.post(`/api/generatePdf`,formData).then((result) => {
                        setAmountSuccess(amountSuccess + 1)
                        live.length = 0;
                        empty.length =0;
                        farm.length =0;
                        other.length =0  
                    }).catch((err) => {
                        notification.error({message:'บันทึกไฟล์ล้มเหลว'})
                    });  
        
                }) 
             }
             setStatusButton(!statusButton)
            statusButton&&setTaxs([]);
         }
        
         
    }
    const onCancel = () =>{
        
       !statusButton&& setVisible(false)
    }
    const hasSelected = selectRows.length > 0;
    return (
        <div>
            <Button onClick={()=>setVisible(true)}>Cart</Button>
            <Modal visible={visible}
                width="70%"
                onCancel={onCancel}
            >
               <Tabs>
                    <Tabs.TabPane key="1" tab="นำเข้าคลังเอกสาร ภ.ด.ส.๓" disabled={statusButton}>

                    </Tabs.TabPane>
                    <Tabs.TabPane key="2" tab="นำเข้าคลังเอกสาร ภ.ด.ส.๖" disabled={statusButton}>
                    
                    <Row style={{padding:'20px'}}>
                        <Col>
                            <Select style={{width:200}} defaultValue={yearDoc} onChange={onChangeYear} disabled={statusButton}>
                            {years.map(year=><Option value={year} key={year} >{year}</Option>)}
                            </Select>
                        </Col>
                        <Col>
                            <Button disabled={taxs.length >0} onClick={onSearchTaxPds6}>{'เริ่มการค้นหา'}</Button>
                        </Col>
                        <Col>
                            <Button onClick={()=>onImportTax()} disabled={!hasSelected}>{statusButton?'ยกเลิกการนำเข้า':'เริ่มต้นนำเข้าคลัง'}</Button>
                        </Col>
                    </Row>
                    <Row>
                        {taxs.length >0&&
                        <Progress
                            strokeColor={{
                                '0%': '#108ee9',
                                '100%': '#87d068',
                            }}
                            percent={100 * (amountSuccess/taxs.length)}
                        />}
                    </Row>
                    <div style={{padding:'20px'}}>
                        <Row>
                            <Col>
                            <b>หมายเหตุ</b>
                            </Col>
                        <Col>
                            <p> - ค้นหารหัสผู้เสียภาษีเฉพาะที่พนักงานแต่ละคนดูแล</p>
                        </Col>
                        </Row>
                            <p> - อย่างน้อยต้องมีข้อมูลที่อยู่ บ้านเลขที่ แขวง เขต จังหวัด รหัสไปรษณีย์</p>
                    </div>
                    
                    <Row>
                            <Table dataSource={taxs}
                                rowSelection={{
                                    ...rowSelection,
                                }}
                                rowKey={(record)=>{
                                    if (!record.__uniqueId)
                                record.__uniqueId = ++uniqueId;
                                return record.__uniqueId;
                                }}
                                pagination={false}
                            >
                                <Column title="รหัสผู้เสียภาษี" dataIndex="uid_tax" />
                                <Column title="จำนวนที่ดิน" dataIndex="amountLand" />
                                <Column title="จำนวนสิ่งปลูกสร้าง" dataIndex="amountBuild" />
                                <Column title="จำนวนห้องชุด" dataIndex="amountRoom" />
                                <Column title="ที่อยู่" 
                                render={(_,{Num_House,Moo,Soi,Road_Name,Tambol,district_name,Changwat,Post_No})=>
                                <p>{`บ้านเลขที่ ${Num_House} หมู่ ${Moo||'-'} ซอย ${Soi||'-'} ถนน ${Road_Name||'-'} แขวง ${Tambol} เขต ${district_name} จังหวัด ${Changwat} รหัสไปรษณีย์ ${Post_No}`}</p>}
                                />
                            </Table>
                    </Row>
                    </Tabs.TabPane>
               </Tabs>

            </Modal>
        </div>
    )
}

export default CartSaveCost
