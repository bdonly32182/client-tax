import React,{useState} from 'react';
import {Modal,Button,Form,notification} from 'antd';
import RoomForm from '../Form/RoomForm';
import {useDispatch} from 'react-redux'
import {createRoom,onEdit_room} from '../../store/action/CondoAction'
import TabsRoom from '../Tabs/TabsRoom';
function RoomModal({titleButton,id_condo,titleModal,room}) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [visible,setVisible] = useState(false);
    const onOk = () => {
        form.validateFields().then((values) => {
            let date =new Date()
            let nowYear = date.getFullYear() + 543
            if (room) {
                dispatch(onEdit_room({...values,
                    AgeRoom:values.AgeRoom >2400?values.AgeRoom:nowYear - values.AgeRoom,
                },id_condo));
                setVisible(false);
                return ;
            }
            dispatch(createRoom({...values,
                AgeRoom:values.AgeRoom >2400?values.AgeRoom:nowYear - values.AgeRoom,
                Room_ID:`${id_condo}-${values.Room_no}`,
                Condo_no:id_condo},id_condo));
            setVisible(false);
        }).catch((err) => {
            notification.error({message:'สร้างห้องชุดล้มเหลว'})
        });
    }
    return (
        <div>
            <Button onClick={()=>setVisible(true)} style={{backgroundColor:'#F4C114'}}>{titleButton}</Button>
            <Modal
            visible={visible}
            onCancel={()=>setVisible(false)}
            onOk={onOk}
            width="50%"
            title={titleModal}
            >
                {room?
                <TabsRoom formModal={form} room={room}/>
                :
                <RoomForm formModal = {form} />
                }
            </Modal>
        </div>
    )
}

export default RoomModal
