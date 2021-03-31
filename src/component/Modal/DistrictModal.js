import React,{useState} from 'react'
import {Modal,Button,Form, notification} from 'antd'
import {EditFilled} from '@ant-design/icons'
import DistrictForm from '../Form/DistrictForm';
import axios from '../../config/axios'
function DistrictModal({district}) {
    const [visible,setVisible] = useState(false);
    const [form] = Form.useForm();
    const onOk =()=>{
        form.validateFields().then((values) => {
            console.log(values);
            axios.put(`/api/update/${values.District_no}`,values).then((result) => {
                notification.success({message:'แก้ไขข้อมูลเขตเรียบร้อย'})
            }).catch((err) => {
                notification.error({message:'แก้ไขข้อมูลเขตล้มเหลว'})
            });
            setVisible(false);
        }).catch((err) => {
            
        });
    }
    return (
        <div>
            <Button onClick={()=>setVisible(true)} style={{backgroundColor:'yellowgreen'}}><EditFilled /></Button>
            <Modal 
            visible={visible}
            onCancel={()=>setVisible(false)}
            onOk={onOk}
            title="แก้ไขข้อมูลเขต"
            width="50%"
            >
                <DistrictForm formModal={form} district={district}/>
            </Modal>
        </div>
    )
}

export default DistrictModal
