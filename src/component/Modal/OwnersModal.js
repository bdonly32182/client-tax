import React,{useState} from 'react'
import {Button,Modal,Row,Input} from 'antd'
import CustomerModal from './CustomerModal'
import CustomerTable from '../Table/CustomerTable'
function OwnersModal(props) {
    const [show,setShow] = useState(false)
    const [value,setValue] = useState('')
    return (
        <div>
            <Button onClick={()=>setShow(true)} type="primary">สร้างสมาชิกผู้เสียภาษีเพิ่มเติม</Button>
            <Modal
            title="สร้างเจ้าของทรัพย์สิน"
            visible={show}
            onCancel={()=>setShow(false)}
            width="60%"
            >
                
                <Row>
                <Input.Search onChange={(e)=>setValue(e.target.value)}  enterButton onSearch={()=>props.onSearch(value)} placeholder="ค้นหาชื่อ นามสกุล"></Input.Search>
                </Row>
                <Row style={{padding:10}}>
                     <CustomerModal title="สร้างข้อมูลประชาชน" onCreated={props.onCreated}/>
                     {props.onPull&&<Button onClick={()=>props.onPull()}>ดึงข้อมูลเจ้าของที่ดินจากในระบบ</Button>  
                     }
                      
 
                </Row>
                <CustomerTable isSelect={true} customer={props.created} onSelect={props.onSelect}/>
             
                
            </Modal>
        </div>
    )
}

export default OwnersModal
