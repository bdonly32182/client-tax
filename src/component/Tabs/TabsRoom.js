import React from 'react'
import {Tabs,Row,Col,notification} from 'antd'
import RoomForm from '../Form/RoomForm';
import axios from '../../config/axios'
import OwnerRoom from '../Pages/Condo/OwnerRoom';
function TabsRoom({formModal,room}) {
    const {TabPane} = Tabs;   
    const onDelteUseful = (removeFunc,key) => {
        axios.delete(`/api/delete/usefulroom/${room.Useful_rooms[key]?.id}`).then((result) => {
            notification.success({message:'ลบพื้นที่เรียบร้อยแล้ว'})
        }).catch((err) => {
            notification.error({message:'ลบพื้นที่ล้มเหลว'})

        });
    }
    return (
        <>
            <Tabs>
                <TabPane tab="แก้ไขข้ออมูล" key="1">
                    <RoomForm formModal={formModal} room={room} onDelteUseful={onDelteUseful}/>
                </TabPane>
                <TabPane tab="จัดการเจ้าของทรัพย์สิน" key="2">
                        <Row> 
                            <OwnerRoom Room_ID={room.Room_ID} customers={room.Tax_Group?.Customers}/>
                        </Row> 
                </TabPane>
               
            </Tabs>
        </>
    )
}

export default TabsRoom
