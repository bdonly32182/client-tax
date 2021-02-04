import React,{useState,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import CustomerList from '../Land/CustomerList';
function OwnerBuilding(props) {
    const dispatch = useDispatch();
    const [customers,setCustomers] = useState([]);//คือลูกภาษีที่ได้รับการเลือกแล้ว
    const [created,setCreated] = useState([]);//คือลูกภาษีที่สร้างขึ้นมาเพื่อเลือก
    const [statusTax,setStatusTax] = useState(true);
    useEffect(() => {
        if (props.customers) {
            setCustomers([...props.customers])
        }
    }, [props.customers])
    const customer_list = customers =>{
        return Array.isArray(customers)&&customers.map((customer,i) =>(
            <CustomerList customer={customer} key={i} onRemove = {remove_customer}/>
        ));
    }
    const remove_customer =(id) => {
        let removeCustomer = customers.filter(customer =>customer.id_customer !== id);
        setCustomers([...removeCustomer]);
        setStatusTax(false);
    }
    console.log(customers);
    return (
        <div>
            {customer_list(customers)}
        </div>
    )
}

export default OwnerBuilding
