import React ,{useState} from 'react'
import {Modal,Input,Button} from 'antd'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {create_codeland,edit_land} from '../../store/action/LandAction'
function CodelandModal(props) {
    const dispatch = useDispatch();
    const [show,setShow] = useState(false);
    const history = useHistory();
    const [value,setValue] = useState('');
    const onClickOk =()=>{
        if (props.onEdit) {
            dispatch(edit_land(props.target,{code_land:value},value))
                setTimeout(() => {
                    history.push('/land/detial/'+value)
            }, 2000);
                setShow(false)
        }else{
            dispatch(create_codeland(value))
                setTimeout(() => {
                    history.push('/land/detial/'+value)
            }, 2000);
                setShow(false)
        }
        
    }
    const cancleClick =()=>{
        setShow(false)
    }
    return (
        <div>
            <Button style={{background:"#F3B80E"}} onClick={()=>setShow(true)}>{props.title}</Button>
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
