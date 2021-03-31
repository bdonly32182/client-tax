import React,{useState} from 'react'
import {Form,Modal,Button,notification} from 'antd'
import CondoForm from '../Form/CondoForm';
import {useDispatch} from 'react-redux';
import {create_condo,onEdit_condo} from '../../store/action/CondoAction'
function CondoModal({titleButton,condo,color}) {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [visible,setVisible] = useState(false);
    const onOk = () => {
        form.validateFields().then((values) => {
            if (condo) {
                dispatch(onEdit_condo(condo.id,values));    
                setVisible(false);  
             return  ;
            }
            
         dispatch(create_condo(values))
        
        }).catch((err) => {
            notification.error({message:err})
        });
    }
    return (
        <div>
            <Button onClick={()=>setVisible(true)} style={{borderRadius:'5px',backgroundColor:color}}>{titleButton}</Button>
            <Modal
            visible={visible}
            onCancel={()=>setVisible(false)}
            onOk={onOk}
            width="50%"
            title="เพิ่มรายการอาคารชุด"
            >
                <CondoForm formModal={form} condo={condo}/>
            </Modal>
        </div>
    )
}

export default CondoModal
