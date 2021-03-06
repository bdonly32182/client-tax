import React,{useEffect,useState} from 'react'
import { notification,Row,Col} from 'antd';
import {useDispatch} from 'react-redux'
import jwtDecode from 'jwt-decode'
import CustomerList from '../Land/CustomerList';
import OwnersModal from '../../Modal/OwnersModal'
import axios from '../../../config/axios'
import {Select_customer} from '../../../store/action/LandAction'
import {generate_tax_room} from '../../../store/action/RoomAction'
import LocalStorageService from '../../../LocalStorage/LocalStorageSevice'
import SelectCategoryModal from '../../Modal/SelectCategoryModal';
import {RedoOutlined} from '@ant-design/icons'
function OwnerRoom({customers,Room_ID}) {
    const dispatch = useDispatch();
    let id_cus=[];
    let token = LocalStorageService.getToken();
    const [customer,setCustomer] = useState([]);
    const [generateClick,setGenerateClick] = useState(true); //ปุ่มสร้างรหัสจะไม่สามารถกดได้
    const [created,setCreate]  = useState([]);//คือลูกค้าที่สร้างมาเพื่อให้เลือกแต่ยังไม่ถูกเลือกเป็นเจ้าของที่ดิน
    useEffect(() => {
        if (generateClick && customers ) {
             setCustomer(customers) ;
        };
    },[created,customers,/*generateClick*/]); //มันจะตาม customers ให้ 
   
    const select_customer = value =>{
        //click select customer ที่สร้าง
        setCustomer([...customer,value]);
        let selectFilter = created.filter(created=> created.Cus_No !== value.Cus_No);
        setCreate(selectFilter);
        setGenerateClick(false);
        //ตอนกดเลือกเป้นเจ้าของให้สร้างข้อมูลประชาชนจึ้นมาถ้ายังไม่มีในระบบ
         dispatch(Select_customer(value));
    } 
    const create_customer = value =>{
        //สร้างประชาชน ส่งให้ CustomerModal เพื่อคลิ๊กสร้าง
        let filterCreated = created.filter(create => create.Cus_No === value.Cus_No)
        let filterCustomer = customer.filter(customer =>customer.Cus_No === value.Cus_No)
        if (filterCreated.length === 0 && filterCustomer.length === 0) {
            return setCreate([...created,value])
        }
        return notification.warning({message:'มีรายการซ้ำกัน'})
    }
    const search_customer =async(name)=>{
        let cusId = [];
        //เอาคนที่ไม่อยู่ใน cusId
        created&&created.length>0&& created.map(customer => cusId.push(customer.id_customer))
        customer&&customer.length>0&& customer.map(customer => cusId.push(customer.id_customer));//มีลูกภาษีอยู่แล้วทำการดึงข้อมูล
        //ค้นหาประชาชนในระบบ
        axios.post(`/api/search`,{name,cusId}).then(async(result) => {
            setCreate([...created,...result.data])
        }).catch((err) => {
            notification.error({message:'ค้นหาประชาชนล้มเหลว'})
        });
    }
 
    function compare(a, b) {
        const CusA = a.Cus_No;
        const CusB = b.Cus_No;
      
        let comparison = 0;
        if (CusA > CusB) {
          comparison = 1;
        } else if (CusA < CusB) {
          comparison = -1;
        }
        return comparison;
      }
    const generate_tax_id = (category)=>{
        try {
            let jwt = jwtDecode(token)
            if (customer.length >1) {
                customer.sort(compare);
                const id_tax =  customer.map(cus =>cus.Cus_No.substr(9,13)).reduce((pervious,current)=>pervious+current);
                
                customer.map(cus =>id_cus.push({Cus_No:cus.id_customer,Customer_Tax_ID:`${jwt.distict_id}_${id_tax}`}));//use table customer_has_tax
                dispatch(generate_tax_room(`${jwt.distict_id}_${id_tax}`,id_cus,customer[0],category,Room_ID));
                id_cus.length=0 
            }else{
                customer.map(cus =>id_cus.push({Cus_No:cus.id_customer,Customer_Tax_ID:customer[0].id_customer}));
                dispatch(generate_tax_room(`${jwt.distict_id}_${customer[0].Cus_No}`,id_cus,customer[0],category,Room_ID));
                id_cus.length=0 
            }
            setGenerateClick(true);   
        } catch (error) {
            window.location.reload()
        }
        
    }
    const customer_list = customers =>{
        return Array.isArray(customers)&&customers.map((customer,i) =>(
            <CustomerList customer={customer} key={i} onRemove = {remove_customer}/>
        ))
    }
    const remove_customer =(id_customer)=> {
        let removeCustomer = customer.filter(cus => cus.id_customer !== id_customer)
        setCustomer([...removeCustomer])
        setGenerateClick(false)
    }
    return (
        <div style={{textAlign:'center'}}>
            <Row >
                <Col>
                        <OwnersModal created={created} onSelect={select_customer} onCreated={create_customer} onSearch={search_customer}/>
                   
                </Col>
                <Col >
                    <SelectCategoryModal generate_tax_id={generate_tax_id} generateClick={generateClick} titleButton ="สร้างรหัสผู้เสียภาษี"
                    style={generateClick?{backgroundColor:'green',color:'black'}:{backgroundColor:'red',color:'white'}}
                    popover="สร้างรหัสผู้เสียภาษี"
                    />
                </Col>
                <Col >
                        <SelectCategoryModal generate_tax_id={generate_tax_id}  titleButton ={<RedoOutlined />}
                        style={{backgroundColor:'#FFC300'}}
                        popover ="เปลี่ยนประเภทของรหัสผู้เสียภาษี"
                        />
                    
                </Col>
            </Row>
            <Row style={{paddingTop:10}}>
            {customer_list(customer)}
            </Row>
        </div>
    )
}

export default OwnerRoom
