import React,{useEffect, useState} from 'react'
import {Tabs,Col,Row,Divider ,notification,Layout} from 'antd'
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
import Header from '../../Header'

function EditTax(props) {
    const dispatch = useDispatch();
    const {id} = useParams();
    const tax = useSelector(state => state.taxs);
    const [pds3,setPds3] = useState([]);
    const [pds7,setPds7] = useState([]);
    const [loading3,setLoading3] = useState(true);
    const {TabPane} = Tabs
    useEffect(() => {
        dispatch(fetch_tax(id))
    }, [dispatch,id]);
    const onTabClick =(value)=>{
        if (value === "3") {
           pds3.length===0&& axios.get('/api/pds3/'+tax.uid_tax).then((result) => {
                setPds3(result.data);
                result.data&& setLoading3(false);
            }).catch((err) => {
                notification.error({message:"ร้องขอ ภ.ด.ส. 3 ล้มเหลว"})
            });  
        }
        if (value === "4") {
            pds7.length===0&& axios.get('/api/pds7/'+tax.uid_tax).then((result) => {
                console.log(result.data);
                setPds7(result.data)
            }).catch((err) => {
                notification.error({message:"ร้องขอ ภ.ด.ส. 7 ล้มเหลว"})
            }); 
        }
       
    }
    return (
        <div>
            <Header />
            <Tabs type="card" onTabClick={onTabClick} onTabScroll={{direction:"top"}}>
                <TabPane key="1" tab="จัดการข้อมูลเจ้าของทรัพย์สิน">
                    <Row style={{padding:50}}>
                        
                        <Col xs={2} sm={4} md={6} lg={8} xl={20}>
                        <Layout>
                            <CustomerTable customer = {tax.Customers} isEdit={true}/>
                        </Layout>
                        <Divider />
                        <Layout>
                            <LandTable lands={tax.Lands} isEdit={true}/>
                        </Layout>
                        <Divider />
                        <Layout>
                            <BuildInTaxTable building={tax.Buildings} isEdit={true}/>
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
                            {/* <CustomerPds3 customer ={pds3.Customers} Tax_ID={pds3.Tax_ID}/> */}
                           
                             <PDS3Table land={pds3} uid_tax={tax.uid_tax} loading={loading3}/>
                            </>
                        )}
                    </Layout>
                
                </TabPane>
                
                {/* <TabPane key="4" tab="ภ.ด.ส.7 ">
                    {pds7 &&(
                        <>
                           
                           <PDS7Table dataSource = {pds7}/>
                           </> 
                    )}
                           
                </TabPane> */}
            </Tabs>
        </div>
    )
}

export default EditTax
