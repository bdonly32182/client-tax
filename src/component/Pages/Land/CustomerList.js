import React from 'react'
import { Button,Card} from 'antd';
import {Link} from 'react-router-dom'
function customerList(props) {
    const {customer,onRemove} = props
    return (
        <Card size="small" title={`${customer.title}${customer.Cus_Fname} ${customer.Cus_Lname}`} extra={<Button style={{backgroundColor:'red'}} onClick={()=>onRemove(customer.id_customer)}>X</Button>} style={{ width: 530 }}>
             <p>เลขบัตรประชาชน: <Link to={`/customer/${customer.id_customer}`}>{customer.Cus_No}</Link></p>  <p>  ประเภท : <a>{customer.category_Cus}</a></p>
            <p>ที่อยู่ : <a>{`บ้านเลขที่ ${customer.Num_House} หมู่ที่ ${customer.Moo} ซอย ${customer.Soi} ตำบล/แขวง ${customer.Tambol} อำเภอ/เขต ${customer.district_name} จังหวัด ${customer.Changwat} รหัสไปรษณีย์ ${customer.Post_No} เบอร์ติดต่อ ${customer.Phone_no}`}</a></p> 

        </Card>
       
    )
}

export default customerList
