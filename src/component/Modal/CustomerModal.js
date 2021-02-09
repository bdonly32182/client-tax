import React,{useState} from 'react'
import {Modal,Form,Button, notification} from 'antd'
import CustomerForm from '../Form/CustomerForm';
import {useDispatch} from 'react-redux'
import {create_customer} from '../../store/action/CustomerAction'
function CustomerModal(props) {
    const dispatch =useDispatch()
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(props.visible);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModal = () => {
        setVisible(true);

    };
    const handleOk = () => {
        setConfirmLoading(true);
        form.validateFields()
            .then((values)=>{
                // สร้างข้อมูลประชาชน ที่ Ownersmodal ของหน้า /land/detial/:id
                if (props.onCreated) {
                    return props.onCreated(values)
                }
                //สร้างข้อมูลประชาชน path /customer
                dispatch(create_customer(values))
            }).catch((info)=>{
                notification.error({message:"Validate Failed",info})
            })
        setTimeout(() => {
            
            setVisible(false);
            setConfirmLoading(false);
            // form.resetFields()
        }, 2000);
        
    };
    const handleCancel = () => {
        setVisible(false);
    };
    
    return (
        <div >
            <Button type="primary" onClick={showModal} style={props.style?props.style:null}>
                {props.title}
            </Button>
            <Modal
            title={props.button}
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            width="80%"
            wrapClassName="center"
            style={{justifyContent:"center"}}
            getContainer={false}
            >
                <CustomerForm formModal={form}/>
            </Modal>
        </div>
    )
}

export default CustomerModal
