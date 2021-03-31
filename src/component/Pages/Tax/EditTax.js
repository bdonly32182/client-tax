import React,{useEffect, useState} from 'react'
import {Tabs,Col,Row,Divider ,notification,Layout,Checkbox,Image, Popover} from 'antd'
import axios from '../../../config/axios'
import {useDispatch,useSelector} from 'react-redux'
import {fetch_tax} from '../../../store/action/TaxAction'
import {useParams} from 'react-router-dom'
import CondoTable from '../../Table/CondoTable'
import CustomerTable from '../../Table/CustomerTable'
import LandTable from '../../Table/LandTable'
import BuildInTaxTable from '../../Table/BuildInTaxTable'
import AddressForm from '../../Form/AddressForm'
import PDS3Table from '../../Table/PDS3Table'
import PDS7Table from '../../Table/PDS7Table'
import Header from '../../Header'
import PDS8Table from '../../Table/PDS8Table'
import PDS4Table from '../../Table/PDS4Table'
import NewPDS7 from '../../Table/NewPDS7'
import PDS6 from './PDS6'

function EditTax(props) {
    const dispatch = useDispatch();
    const {id} = useParams();
    const tax = useSelector(state => state.taxs);
    const [pds3,setPds3] = useState([]);
    const [pds7,setPds7] = useState([]);
    const [pds4,setPds4] = useState([]);
    const [pds8,setPds8] = useState([]);
    const [leader,setLeader] = useState([]);
    const [showCol,setShowCol] = useState(true)
    const [loading3,setLoading3] = useState(true);
    const [loading7,setLoading7] = useState(true);
    const [loading8 , setLoading8] = useState(true);
    const {TabPane} = Tabs
    useEffect(() => {
        dispatch(fetch_tax(id))
    }, [dispatch,id]);
    const onTabClick =(value)=>{
        if (value === "3") {
           pds3.length===0&& axios.get('/api/pds3/'+tax.uid_tax).then((result) => {
               console.log(result.data);
                setPds3(result.data);
                result.data&& setLoading3(false);
            }).catch((err) => {
                notification.error({message:"ร้องขอ ภ.ด.ส. 3 ล้มเหลว"})
            });  
        }
        if (value === "4") {
            pds7.length===0&& axios.get('/api/pds7/'+tax.uid_tax).then((result) => {
                setPds7(result.data)
                result.data&&setLoading7(false)
            }).catch((err) => {
                notification.error({message:"ร้องขอ ภ.ด.ส. 7 ล้มเหลว"})
            }); 
        }
        if (value === "5"||value === "6") {
            pds4.length===0&&
            axios.get(`/api/pds4/${tax.uid_tax}`).then((result) => {
                console.log(result.data);
                setPds4(result.data)
                result.data&&setLoading8(false);
            }).catch((err) => {
                notification.error({message:'เรียกดู ภ.ด.ส.8 ล้มเหลว'})
            });
        }
        if (value === "6") {
            pds8.length===0&&
            axios.get(`/api/pds8/${tax.uid_tax}`).then((result) => {
                console.log(result.data);
                setPds8(result.data)
                result.data&&setLoading8(false);
            }).catch((err) => {
                notification.error({message:'เรียกดู ภ.ด.ส.8 ล้มเหลว'})
            });
        }
        if (value === "7") {
            pds8.length===0&&
            axios.get(`/api/pds8/${tax.uid_tax}`).then((result) => {
                setPds8(result.data)
                result.data&&setLoading8(false);
            }).catch((err) => {
                notification.error({message:'เรียกดู ภ.ด.ส.8 ล้มเหลว'})
            });
            pds7.length===0&& axios.get('/api/pds7/'+tax.uid_tax).then((result) => {
                setPds7(result.data)
                result.data&&setLoading7(false)
            }).catch((err) => {
                notification.error({message:"ร้องขอ ภ.ด.ส. 7 ล้มเหลว"})
            }); 
            leader.length===0&&axios.get(`/api/pds6/${tax.uid_tax}`).then((result) => {
                setLeader(result.data)
            }).catch((err) => {
                notification.error({message:'ERROR DISTRICT'})
            });
        }
       
    }
   const content = (customers=[]) => {
       return customers.map(({Cus_No,title,Cus_Fname,Cus_Lname})=><div>
           <p>เลขบัตรประชาชน :{Cus_No}</p>
           <p>ชื่อ-นามสกุล :{`${title} ${Cus_Fname} ${Cus_Lname}`}</p>
       </div>)
   }
    return (
        <div>
            <Header />
            <Tabs type="card" onTabClick={onTabClick} onTabScroll={{direction:"top"}}>
                <TabPane key="1" tab="จัดการข้อมูลเจ้าของทรัพย์สิน">
                    <Row style={{padding:'60px',textAlign:'center'}}>
                        
                        <Col xs={24} sm={24} md={20} lg={20} xl={20}>
                        <Layout>
                            <CustomerTable customer = {tax.Customers} isEdit={true}/>
                        </Layout>
                        <Divider />
                        <Layout>
                            <LandTable lands={tax.Lands} isEdit={true}/>
                        </Layout>
                        <Divider />
                        <Layout>
                            <BuildInTaxTable building={tax.Buildings} isEdit={true} />
                        </Layout>
                        <Layout>
                            <CondoTable condos={tax.Rooms} isEdit={true}/>
                        </Layout>
                        <Divider />
                       
                        </Col>
                    
                    </Row>
                </TabPane>
                <TabPane key="2" tab="จัดการที่อยู่ในการส่ง">
                    <Row style={{padding:20}}>
                        <Col>
                            <h2 style={{color:'red'}}>* ที่อยู่เริ่มต้นในระบบ </h2>
                            <h3><strong style={{color:'royalblue'}}>{tax.Address&&`บ้านเลขที่ ${tax.Address.Num_House} ถนน ${tax.Address.Road_Name} ซอย ${tax.Address.Soi} หมู่ ${tax.Address.Moo} 
                            แขวง ${tax.Address.Tambol} เขต ${tax.Address.district_name} จังหวัด ${tax.Address.Changwat} รหัสไปรษณีย์ ${tax.Address.Post_No} 
                            เบอร์ติดต่อ ${tax.Address.Phone_no}`}</strong></h3>
                            <Divider />
                        </Col>
                    </Row>
                    
                    <AddressForm />
                </TabPane>
                <TabPane key="3" tab="ภ.ด.ส.3 " >
                    <Layout>
                        
                        
                        {pds3 && (
                            <>                           
                             <PDS3Table land={pds3} uid_tax={tax.uid_tax} loading={loading3}/>
                            </>
                        )}
                    </Layout>
                
                </TabPane>
                <TabPane key="5" tab="ภ.ด.ส.4 ">
                    {pds4 &&(
                        <>
                        <PDS4Table condo={pds4} loading={loading8}/>
                           </> 
                    )}
                           
                </TabPane>
                <TabPane key="4" tab="ภ.ด.ส.7 ">
                    {pds7 &&(
                        <div style={{margin:'15px'}}>
                            <div style={{textAlign:'right'}}>
                                <Checkbox onChange={()=>setShowCol(!showCol)} checked={showCol}>แสดงคอลัมน์ทั้งหมด</Checkbox>

                            </div>
                            <div style={{display:'block',paddingLeft:'750px'}}>
                                <Image src="/logobkk.jpeg" width={90} alt="logo"  preview={false}/>
                                
                            </div>
                            <div style={{padding:'20px'}}>
                            <Popover content={content(tax.Customers)}>
                                    <p>รหัสผู้เสียภาษีที่ดินและสิ่งปลูกสร้าง : <b>{`${tax?.uid_tax} (${tax?.Category_Tax})`}</b></p>
                            </Popover>
                            </div>
                           <NewPDS7 land = {pds7} tax={tax} loading={loading7} show={showCol}/>
                           </div> 
                    )}
                           
                </TabPane>
                <TabPane key="6" tab="ภ.ด.ส.8 ">
                    <div style={{padding:'30px'}}>
                        {pds8 &&(
                            <>
                            <PDS8Table condo={pds8} loading={loading8} tax={tax}/>
                            </> 
                        )}
                    </div>
                    
                           
                </TabPane>
                <TabPane key="7" tab="ภ.ด.ส.6,7,8 ">
                    <div style={{padding:'30px'}}>
                        <PDS6 land = {pds7} tax={tax} leader={leader} condo={pds8} amountCustomer={tax?.Customers?.length} tax={tax}/>
                        
                        {pds7.length>0 &&(
                        <div style={{margin:'15px'}}>
                            <Divider />
                            <div style={{textAlign:'right',paddingRight:'60px'}}>
                                <p>ภ.ด.ส.๗</p>

                            </div>
                            <div style={{display:'block',paddingLeft:'650px'}}>
                                <Image src="/logobkk.jpeg" width={90} alt="logo"  preview={false}/>
                                
                            </div>
                            <div style={{padding:'20px'}}>
                            <Popover content={content(tax.Customers)}>
                                    <p>รหัสผู้เสียภาษีที่ดินและสิ่งปลูกสร้าง : <b>{`${tax?.uid_tax} (${tax?.Category_Tax})`}</b></p>
                            </Popover>
                            </div>
                           <NewPDS7 land = {pds7} tax={tax} loading={loading7} show={showCol}/>
                           </div> 
                    )}
                        {pds8.length>0 &&(
                            <>
                            <Divider />
                            <PDS8Table condo={pds8} loading={loading8} tax={tax}/>
                            </> 
                        )}
                    </div>
                    
                           
                </TabPane>
            </Tabs>
        </div>
    )
}

export default EditTax
