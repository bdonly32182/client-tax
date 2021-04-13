import React from 'react'
import {Table,Space} from 'antd'
import ConfirmModal from '../Modal/ConfirmModal';
import {DeleteFilled,EditFilled,CheckOutlined} from '@ant-design/icons'
import {useDispatch} from 'react-redux'
import {onDelete_room} from '../../store/action/RoomAction'
import RoomModal from '../Modal/RoomModal';
function RoomTable({rooms,id_condo,setSelectRows,Floor,Condo_no,Price,Useful}) {
    const dispatch = useDispatch();
    const {Column,ColumnGroup} = Table;
    let uniqueId = 0 ;
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          setSelectRows(selectedRows)
        },
      
      };
      const onDeleteRoom = id => {
          dispatch(onDelete_room(id,id_condo))
      }
    return (
        <Table rowSelection={{
            ...rowSelection,
          }}
          dataSource={rooms}
          pagination={{pageSize:20}}
          rowKey={(record)=>{
            if (!record.__uniqueId)
            record.__uniqueId = ++uniqueId;
            return record.__uniqueId;
            }}
            bordered={true}
            size="middle"
          >
            <Column title="เลขที่ห้องชุด" dataIndex="Room_no" />
            <Column title="ชั้นที่" dataIndex="Floor" />
            <ColumnGroup title="กรณีอยู่อาศัย">
                <Column title="หลัก" dataIndex="LiveStatus" 
                render={(text)=>text?<CheckOutlined />:null}
                />
                <Column title="รอง" dataIndex="LiveStatus"
                render={(text)=>!text?<CheckOutlined />:null}
                 />
            </ColumnGroup>
            <ColumnGroup title="ขนาดพื้นที่ (ตร.ม)">
                <Column title="อยู่อาศัย" dataIndex="Useful_rooms" 
                render={(array)=>array.map(type=>type.Category_use==="อยู่อาศัย"?type.Amount_Place:null)}
                />
                <Column title="อื่นๆ" dataIndex="Useful_rooms" 
                render={(array)=>array.map(type=>type.Category_use==="อื่นๆ"?type.Amount_Place:null)}
                />
                <Column title="ว่างเปล่า" dataIndex="Useful_rooms" 
                render={(array)=>array.map(type=>type.Category_use==="ว่างเปล่า"?type.Amount_Place:null)}
                />
                <Column title="รวม" dataIndex="Useful_rooms" 
                render={(array)=>array.reduce((pre,{Amount_Place})=>pre+Amount_Place,0)}
                />
            </ColumnGroup>
            <Column title="ราคาประเมิน" dataIndex="Useful_rooms" 
            render={(array)=>array.map(type=>type.Price_Room)}
            />
            <Column title="รหัสผู้เสียภาษี" dataIndex="Room_Tax_ID"/>
            <Column title="หมายเหตุ" dataIndex="Mark" />
            <Column title="จัดการ" render={(text,record)=>
                    <div style={{textAlign:'center'}}>
                      <Space >
                        <RoomModal titleButton={<EditFilled /> }
                        titleModal={`เลขที่ห้องชุด ${record.Room_no} (ชั้นที่ ${record.Floor})`}
                        id_condo={id_condo}  Floor={Floor}Condo_no={Condo_no}Price={Price} Useful={Useful}
                        room={record}/>
                        <ConfirmModal titleButton={<DeleteFilled />}
                        ConfirmRoom={onDeleteRoom}
                        Room_ID={record.id}
                        content="ห้องชุดจะถูกลบอย่างถาวรคุณแน่ใจหรือไม่ที่จะลบ"
                        />
                      </Space>
                    </div>
              
          } />
        </Table>
    )
}

export default RoomTable
