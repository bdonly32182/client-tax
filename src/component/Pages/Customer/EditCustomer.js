import React,{useEffect} from 'react'
import {useHistory,useParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import CustomerForm from '../../Form/CustomerForm'
import {fetch_customer,edit_customer,delete_customer} from '../../../store/action/CustomerAction'
import {Row,Col} from 'antd'
import TaxTable from '../../Table/TaxTable'
import Header from '../../Header'
function EditCustomer(props) {
    const history =useHistory();
    const {id} = useParams();
    const dispatch = useDispatch();
    const customer = useSelector(state=>state.customers)
    
    useEffect(() => {
        dispatch(fetch_customer(id,history))
    }, [dispatch,history,id])
    const editCustomer = (id,value) =>{
        dispatch(edit_customer(id,value))
    }
    const deleteCustomer =id=>{
        dispatch(delete_customer(id))
        history.push('/customer')
    }
    console.log(customer);
    return (
        <div>
            <Header />
            <Row style={{paddingLeft:15}}>
                <Col xs={2} sm={4} md={6} lg={8} xl={12} >
                        <h1 style={{color:'ThreeDDarkShadow',padding:10}}>ข้อมูลประชาชน</h1>
                <CustomerForm customer={customer} button ="แก้ไขข้อมูลประชาชน" onEdit={editCustomer} onDelete ={deleteCustomer}/>
                </Col>
                <Col span={1}/>
                <Col xs={2} sm={4} md={6} lg={8} xl={10} >
                    <h2 style={{color:'ThreeDDarkShadow',padding:15}}>รายการรหัสผู้เสียภาษี</h2>
                <TaxTable tax ={customer.Tax_Groups}/>
                </Col>
            </Row>
            
        </div>
    )
}

export default EditCustomer
