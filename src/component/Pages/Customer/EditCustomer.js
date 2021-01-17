import React,{useEffect} from 'react'
import {useHistory,useParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import CustomerForm from '../../Form/CustomerForm'
import {fetch_customer,edit_customer,delete_customer} from '../../../store/action/CustomerAction'
import {Row,Col} from 'antd'
function EditCustomer(props) {
    const history =useHistory();
    const {id} = useParams();
    const dispatch = useDispatch();
    const customer = useSelector(state=>state.customers)
    
    useEffect(() => {
        dispatch(fetch_customer(id,history))
    }, [dispatch,history,id,customer])
    const editCustomer = (id,value) =>{
        dispatch(edit_customer(id,value))
    }
    const deleteCustomer =id=>{
        dispatch(delete_customer(id))
        history.push('/customer')
    }
    return (
        <div>
            <Row>
                <Col>
                <CustomerForm customer={customer} button ="แก้ไขข้อมูลประชาชน" onEdit={editCustomer} onDelete ={deleteCustomer}/>
                </Col>
                <Col>
                
                </Col>
            </Row>
            
        </div>
    )
}

export default EditCustomer
