import React,{useState} from 'react';
import {Modal,Button,Form,notification} from 'antd';
import RoomForm from '../Form/RoomForm';
import {useDispatch} from 'react-redux'
import {createRoom,onEdit_room} from '../../store/action/RoomAction'
import TabsRoom from '../Tabs/TabsRoom';
function RoomModal({titleButton,id_condo,titleModal,room,Floor,Condo_no,Price,Useful}) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [visible,setVisible] = useState(false);
    
    const onOk = () => {
        form.validateFields().then((values) => {
            if (room) {
                dispatch(onEdit_room({...values,
                    AgeRoom:values.AgeRoom >2400?values.AgeRoom:543 +parseInt(values.AgeRoom),
                },Floor,Condo_no,Price,Useful));
                setVisible(false);
                return ;
            }
            dispatch(createRoom({...values,
                AgeRoom:values.AgeRoom >2400?values.AgeRoom:543 +parseInt(values.AgeRoom),
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
            destroyOnClose={true}
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
