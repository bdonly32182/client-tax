import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Divider} from 'antd'
import Header from '../../Header'
import FilterCustomer from '../../SearchFilter/FilterCustomer'
import CustomerTable from '../../Table/CustomerTable'
import CustomerModal from '../../Modal/CustomerModal'
import {fetchs_customer,SearchFilter} from '../../../store/action/CustomerAction'
function CustomerPage(props) {
    const dispatch = useDispatch()
    let customers = useSelector(state=>state.customers)
    useEffect(() => {
        dispatch(fetchs_customer())
    }, [dispatch])
    const onSearch =(name,cusId)=>{
        dispatch(SearchFilter(name,cusId))
    }
    return (
        <div style={{padding:10}}>
              <Header />  
            
            <FilterCustomer onSearch={onSearch}/>
            <Divider />
            <CustomerModal title="สร้างข้อมูลประชาชน" style={{color:'red',backgroundColor:'#ED8C1E'}}/>
            <CustomerTable customer={customers.rows}/>
        </div>
    )
}

export default CustomerPage
