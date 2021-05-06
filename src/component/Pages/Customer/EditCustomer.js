import React,{useEffect} from 'react'
import {useHistory,useParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import CustomerForm from '../../Form/CustomerForm'
import {fetch_customer,edit_customer,delete_customer} from '../../../store/action/CustomerAction'
import {Row,Col,Table,Button} from 'antd'
import {EditFilled} from '@ant-design/icons'
import Header from '../../Header'
function EditCustomer(props) {
    const history =useHistory();
    const {id} = useParams();
    const dispatch = useDispatch();
    const customer = useSelector(state=>state.customers)
    let uniqueId=0;
    const {Column,ColumnGroup} = Table
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
                    <Table  dataSource={Array.isArray(customer.Tax_Groups)&&customer.Tax_Groups}
                rowKey={(record)=>{
                    if (!record.__uniqueId)
                record.__uniqueId = ++uniqueId;
                return record.__uniqueId;
                }}
                bordered={true}
                size={props.tableSize||"middle"}
                pagination={{pageSize:props.size}}
                onChange={props.HandleChangePage}
                >
                <Column 
                title="รหัสผู้เสียภาษีประจำเขต"
                dataIndex="uid_tax"
                key="uid_tax"
                render={text=><p>{text}</p>}
                />
                
                <Column
                title="ประเภท"
                dataIndex="Category_Tax"
                key="Category_Tax"
                render={text=><p>{text}</p>}
                 />
                 <ColumnGroup title="ครอบครอง" >
                    <Column
                    title="สมาชิก"
                    dataIndex="Customers"
                    render={text=>text?.length}
                    />
                        <Column
                    title="ที่ดิน"
                    dataIndex="Lands"
                    render={text=>text?.length}
                    />
                        <Column
                    title="สิ่งปลูกสร้าง"
                    dataIndex="Buildings"
                    render={text=>text?.length}
                    />
                        <Column
                    title="ห้องชุด"
                    dataIndex="Rooms"
                    render={text=>text?.length}
                    />
                 </ColumnGroup>
                <Column 
                 title="จัดการ"
                 render={(text,record)=><Button onClick={()=>history.push(`/tax/${record.uid_tax}`)} style={{backgroundColor:'whitesmoke'}}><EditFilled /></Button>}
                />
                </Table>
                </Col>
            </Row>
            
        </div>
    )
}

export default EditCustomer
