import React from 'react'
import { Space, Table,Popconfirm,Modal,Button} from 'antd'
import {CheckOutlined,DeleteFilled,EditFilled,QuestionCircleOutlined} from '@ant-design/icons'
import BuildingModal from '../Modal/BuildingModal';
import {useDispatch} from 'react-redux'
import {delete_building} from '../../store/action/BuildingAction'
function BuildingTable(props) {
    const dispatch = useDispatch();
    const {Column,ColumnGroup} = Table;
    const [modal,contextHolder] = Modal.useModal();
    let uniqueId = 0 ;
    const onConfirm =(id)=>{
        dispatch(delete_building(id));
    }
    return (
        <>
        <Table dataSource={Array.isArray(props.buildings)&&props.buildings} bordered={true} size="small"
        rowKey={(record)=>{
            if (!record.__uniqueId)
        record.__uniqueId = ++uniqueId;
         return record.__uniqueId;
        }}
        pagination={false}
        >
            <Column 
            title="บ้านเลขที่"
            dataIndex="No_House"
            key="No_House"
            render={(text,record)=><p>{`${record.Building.No_House} `}</p>}
            />
            <Column 
            title="ประเภทสิ่งปลูกสร้าง(ตามกรมธนารักษ์)"
            dataIndex="RateOfBuilding"
            key="RateOfBuilding"
            render={(text,record)=><p>{record.Building.RateOfBuilding.Category_build}</p>}
            />
            <ColumnGroup title="ลักษณะสิ่งปลูกสร้าง">
                <Column 
                title="ตึก"
                dataIndex="Category"
                key="tuk"
                render={(text,record)=><p>{record.Building.StyleBuilding ==="ตึก" ? <CheckOutlined />:null}</p>}
                />
                <Column 
                title="ไม้"
                dataIndex="Category"
                key="Category"
                render={(text,record)=><p>{record.Building.StyleBuilding ==="ไม้" ? <CheckOutlined />:null}</p>}
                />
                <Column 
                title="ครึ่งตึกครึ่งไม้"
                dataIndex="Category"
                key="half"
                render={(text,record)=><p>{record.Building.StyleBuilding ==="ครึ่งตึกครึ่งไม้" ? <CheckOutlined />:null}</p>}
                />
            </ColumnGroup>
            <ColumnGroup title="จำนวน">
                <Column title="ชั้น" 
                render={(text,record)=><p>{record.Building.Amount_Floor}</p>}
                />
                <Column title="ห้อง" 
                render={(text,record)=><p>{record.Building.Amount_Room}</p>}
                />
            </ColumnGroup>
            <ColumnGroup title="ขนาด">
                <Column title="กว้าง" dataIndex="Width" key="Width"
                render={(text,record)=><p>{record.Building.Width}</p>}
                />
                <Column title="ยาว" dataIndex="Length" key="Length"
                render={(text,record)=><p>{record.Building.Length}</p>}
                />
            </ColumnGroup>
            <Column title="อายุ(ปี)"dataIndex="Age_Build" key="Age_Build"
            render={(text,record)=><p>{record.Building.Age_Build}</p>}
            />
            <ColumnGroup title="ลักษณะการใช้ประโยชน์ (ตรม.)">
                <ColumnGroup title="อยู่อาศัย">
                    <Column title="หลังหลัก" 
                    render={(text,record)=><p>{record.Building.LiveType && record.Building.LiveType.Live_Status === true && record.Building.LiveType.Live_Size}</p>}
                    />
                    <Column title="หลังรอง" dataIndex="Live_Size" key="second_live"
                    render={(text,record)=><p>{record.Building.LiveType && record.Building.LiveType.Live_Status === false && record.Building.LiveType.Live_Size}</p>}

                    />
                </ColumnGroup>
                <Column title="การเกษตร" 
                    render={(text,record)=><p>{record.Building.FarmType&&record.Building.FarmType.Farm_Size }</p>}

                />
                <Column title="ว่างเปล่า" 
                    render={(text,record)=><p>{record.Building.EmptyType&&record.Building.EmptyType.Empy_size }</p>}

                />
                <Column title="อื่นๆ" 
                    render={(text,record)=><p>{record.Building.OtherType&&record.Building.OtherType.Other_Size }</p>}

                />
            </ColumnGroup>
            <Column title="หมายเหตุ" dataIndex="Mark" key="Mark"
            render={(text,record)=><p>{record.Building.Mark}</p>}
            />
            <Column title="จัดการ" dataIndex="action" key="action" 
            render={(text,record)=>(
                <Space>
                    <BuildingModal button ={<EditFilled />} onEdit={true} building ={record.Building} TypeName={props.TypeName} 
                    useful_id={props.useful_id} code_land={props.code_land}
                    style={{color:'#008BFF' ,fontSize:18}}
                    />
                   
                    <Popconfirm title="คุณต้องการลบใช่หรือไม่"
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    onConfirm={()=>onConfirm(record.Building.Build_Id)}
                    >
                        <Button type="link">
                            <DeleteFilled style={{ color: 'red' ,fontSize:15}}/>
                        </Button>
                    </Popconfirm>
                    
                </Space>
            )}
            />
        </Table>
        </>
    )
}

export default BuildingTable
