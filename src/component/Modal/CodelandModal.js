import React ,{useState} from 'react'
import {Modal,Input,Button} from 'antd'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {create_codeland} from '../../store/action/LandAction'
function CodelandModal(props) {
    const dispatch = useDispatch();
    const [show,setShow] = useState(false);
    const history = useHistory();
    const [value,setValue] = useState('');
    const onClickOk =()=>{
        dispatch(create_codeland(value))
        setTimeout(() => {
            history.push('/land/detial/'+value)
       }, 2000);
        setShow(false)
    }
    const cancleClick =()=>{
        setShow(false)
    }
    return (
        <div>
            <Button onClick={()=>setShow(true)}>สร้างรหัสแปลงที่ดิน</Button>
            <Modal
            visible={show}
            onOk={onClickOk}
            onCancel={cancleClick}
            width="20%"
            title="สร้างรหัสแปลงที่ดิน"
            >
                <Input onChange={(e)=> setValue(e.target.value)}></Input>
            </Modal>
        </div>
    )
}

export default CodelandModal
