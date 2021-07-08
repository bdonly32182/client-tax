import React,{useState,useEffect} from 'react'
import {Button,Modal,Table,notification, Row, Tabs,Select, Col,Progress} from 'antd';
import pdfMake from "pdfmake/build/pdfmake";
import {YearsDoc} from '../Pages/Pdf/FuncPdf'
import axios from '../../config/axios';
import {DefinitionPdf} from '../Pages/Pdf/DefinitionPdf'
import {SurveyDoc} from '../Pages/Pdf/SurveyDoc'
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
    const [jwt,setJwt] = useState(null);
    let NowDate = new Date() ;
    let DateThai = NowDate.toDateString().split(" ");
    const [yearDoc,setYearDoc] = useState(+DateThai[3]+543);
    let token  = LocalStorageService.getToken();
    let live =[];
    let other = [];
    let farm = [];
    let empty =[];
    useEffect(() => {
        try {
           fetch_image() 
           setJwt(jwtDecode(token)) 
        } catch (error) {
            window.location.reload()
        }
       
    }, [token])
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
     const onSearchTaxPds3 = async()=>{
         let result = await axios.get('/api/cart/taxcheckbook')
         setTaxs(result.data);
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
    const FuncSpreadMap =(array=[])=>{
            
        let liveFilter = array.filter(item=>item.category ==="อยู่อาศัย" && item.text)
        live =[...live,...liveFilter];
        let otherFilter =array.filter(item=>item.category ==="อื่นๆ"&& item.text)
        other = [...other,...otherFilter];
        let farmFilter = array.filter(item=>item.category ==="เกษตร"&& item.text)
        farm = [...farm,...farmFilter];
        let emptyFilter = array.filter(item=>item.category ==="ว่างเปล่า"&& item.text)
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
             for (const [key,row] of selectRows.entries()) {
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
                let Sendto = `${tax?.Customers[0].title}${tax?.Customers[0].Cus_Fname||""} ${tax?.Customers[0].Cus_Lname||""} ${amountCustomer>1?"และผู้ที่เป็นเจ้าของทรัพย์สินร่วม":''}` 
                let employeeTable = land[0]?.Land?.Employee?.TableNo||condo[0]?.Room?.Condo?.Employee?.TableNo||jwt?.TableNo;
                let PricePds7 = sumPDS7(land,tax);
                let PricePds8 = SummaryCondo(condo);
                let {PriceExceptEmergency,totalPriceOfTax,totalBuilaAndLandYear,
                    valueDifference,Relive,BriefTotal} = TotalPrice(PricePds7,PricePds8,tax.exceptEmergency,tax?.Customers);
                let result = land.map(record=>{
                    let amountPriceTax = AmountPriceTaxCate(record,tax.Category_Tax,tax.uid_tax,tax.exceptEmergency,land)
                    return amountPriceTax
                })
                result.map(type=>type[0][0]&&type[0][0][0]?
                    type[0][0][0]?.filter(arr=>arr.length>0).map(arr4d=>FuncSpreadMap(arr4d))
                :type.map(type2=>Array.isArray(type2)? FuncSpreadMap(type2):FuncSpreadMap([type2])));   

                let PriceLive =0;
                    PriceLive = 0;//พอวนลูปใหม่ก็จะเซ็ทค่าเป็นศูนย์
                for (const arr of live) {  
                    if (Array.isArray(arr.text)) {
                       let totalLive = arr.text.map(number=>number).reduce((pre,cur)=>pre+cur,0) 
                       PriceLive += totalLive        
                    }else{
                     PriceLive += arr.text  
                    }
                }
                live.length = 0;

                let PriceOther =0;
                PriceOther = 0;
                for (const arr of other) {  
                    if (Array.isArray(arr.text)) {
                       let totalLive = arr.text.map(number=>number).reduce((pre,cur)=>pre+cur,0) 
                       PriceOther += totalLive        
                    }else{
                     PriceOther += arr.text  
                    }
                }
                other.length =0 

                let PriceFarm =0;
                PriceFarm = 0;
                for (const arr of farm) {  
                    if (Array.isArray(arr.text)) {
                       let totalLive = arr.text.map(number=>number).reduce((pre,cur)=>pre+cur,0) 
                       PriceFarm += totalLive        
                    }else{
                     PriceFarm += arr.text  
                    }
                }
                farm.length =0;

                let PriceEmpty =0;
                PriceEmpty = 0;
                for (const arr of empty) {  
                    if (Array.isArray(arr.text)) {
                       let totalLive = arr.text.map(number=>number).reduce((pre,cur)=>pre+cur,0) 
                       PriceEmpty += totalLive        
                    }else{
                     PriceEmpty += arr.text  
                    }
                }
                empty.length =0;

                let {EmptyRoom,LiveRoom,OtherRoom} = FilterRoomPrice(condo)
                let SaveDoc = DefinitionPdf(land,tax,condo,leader,amountCustomer,tax?.Customers,jwt,yearDoc,imageKrut,logoBkk,Sendto);
                const GeneratePDF = pdfMake.createPdf(SaveDoc);
                     GeneratePDF.getBlob(async(data)=>{
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
                             
                    axios.post(`/api/generatePdf`,formData).then((result) => {
                       
                    }).catch((err) => {
                        notification.error({message:'บันทึกไฟล์ล้มเหลว'})
                    });  
        
                }) 
                setAmountSuccess(amountSuccess + key+1);
             }
             
         }
            setStatusButton(!statusButton)
            statusButton&&setTaxs([]);
         
    }
    const onImportTax3 = async() => {
        if (!statusButton) {
            for (const [key,row] of selectRows.entries()) {
                let taxResult = await axios.get(`/api/tax/${row.uid_tax}`);
                let tax = taxResult.data
                let landResult = await axios.get(`/api/pds3/${row.uid_tax}`);
                let land = landResult.data
                let condoResult = await axios.get(`/api/pds8/${row.uid_tax}`);
                let condo = condoResult.data
                let amountCustomer = tax?.Customers?.length   
                let Sendto = `${tax?.Customers[0].title}${tax?.Customers[0].Cus_Fname||""} ${tax?.Customers[0].Cus_Lname||""} ${amountCustomer>1?"และผู้ที่เป็นเจ้าของทรัพย์สินร่วม":''}` 
                let EmpTakeCare = land[0]?.Land?.Employee?.Pers_no||condo[0]?.Room?.Condo?.Employee?.Pers_no||jwt?.Pers_no;
                let employeeTable = land[0]?.Land?.Employee?.TableNo||condo[0]?.Room?.Condo?.Employee?.TableNo||jwt?.TableNo;
                let SaveDocument = SurveyDoc(land,tax,condo,jwt,imageKrut,logoBkk,Sendto)
                const GeneratePDF = pdfMake.createPdf(SaveDocument);
                     GeneratePDF.getBlob(async(data)=>{
                    const formData =new FormData();
                    
                    formData.append('file',data,`${tax.uid_tax}-${yearDoc}-pds3`);
                    formData.append('Year',yearDoc);
                    formData.append('TaxCheckBook',tax.uid_tax);
                    formData.append('PathPDF',`/Document/${tax.uid_tax}-${yearDoc}-pds3`);
                    formData.append('employeeTable',employeeTable);
                    formData.append('districtNo',jwt?.distict_id);
                    formData.append('Employee_No',EmpTakeCare);
                    axios.post(`/api/generateCheckDoc`,formData).then((result) => {
                       
                    }).catch((err) => {
                        notification.error({message:'บันทึกไฟล์ล้มเหลว'})
                    });
        
                }) 
                setAmountSuccess(amountSuccess + key+1);
            }
        }
    }
    const onCancel = () =>{
        
       !statusButton&& setVisible(false)
       setTaxs([])
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
                    <Tabs.TabPane key="1" tab="นำเข้าคลังเอกสาร ภ.ด.ส.๓" disabled={taxs.length>0}>
                        <Row style={{padding:'20px'}}>
                            <Col>
                                <Select style={{width:200}} defaultValue={yearDoc} onChange={onChangeYear} disabled={statusButton}>
                                {years.map(year=><Option value={year} key={year} >{year}</Option>)}
                                </Select>
                            </Col>
                            <Col>
                                <Button disabled={taxs.length >0} onClick={onSearchTaxPds3}>{'เริ่มการค้นหา'}</Button>
                            </Col>
                            <Col>
                                <Button onClick={()=>onImportTax3()} disabled={!hasSelected}>{statusButton?'ยกเลิกการนำเข้า':'เริ่มต้นนำเข้าคลัง'}</Button>
                            </Col>
                        </Row>
                        <Row>
                            {taxs.length >0&&<>
                            <div>
                                    <b>{`ที่เลือกอยู่ทั้งสิ้น ${selectRows.length} `}</b>
                                
                                    <b style={{paddingLeft:'780px'}}>{`${amountSuccess}/${taxs.length}`} </b>
                                
                            </div>
                            
                            <Progress
                                strokeColor={{
                                    '0%': '#108ee9',
                                    '100%': '#87d068',
                                }}
                                percent={100 * (amountSuccess/taxs.length)}
                            />
                            </>
                            }
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


                    <Tabs.TabPane key="2" tab="นำเข้าคลังเอกสาร ภ.ด.ส.๖" disabled={taxs.length>0}>
                    
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
                        {taxs.length >0&&<>
                        <div>
                                <b>{`ที่เลือกอยู่ทั้งสิ้น ${selectRows.length} `}</b>
                            
                                <b style={{paddingLeft:'780px'}}>{`${amountSuccess}/${taxs.length}`} </b>
                            
                        </div>
                        
                        <Progress
                            strokeColor={{
                                '0%': '#108ee9',
                                '100%': '#87d068',
                            }}
                            percent={100 * (amountSuccess/taxs.length)}
                        />
                        </>
                        }
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
