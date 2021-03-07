import React,{useState,useEffect} from 'react'
import {Button, Layout, Menu,notification, Row,Modal,Select} from 'antd'
import {ProfileOutlined,AlertOutlined,MenuUnfoldOutlined,MenuFoldOutlined,NotificationOutlined} from '@ant-design/icons'
import Header from '../../Header';
import MemberTable from '../../Table/MemberTable';
import axios from '../../../config/axios'
import Tax from '../Tax/Tax';
function Manage(props) {
    const {  Content, Footer,Sider } = Layout;
    const [collapsed,setCollapsed] = useState(false)
    const [keys,setKeys] =useState("1")
    const [employee,setEmployee] = useState([]);
    const [visible,setVisible] = useState(false);
    const [exceptEmegency,setExceptEmegency] = useState('0');
    const {Option} = Select;
    useEffect(() => {
        axios.get('/api/emplist').then((result) => {
            setEmployee(result.data)
        }).catch((err) => {
            notification.error({message:'เรียกดูข้อมูลพนักงานล้มเหลว'})
        });
    }, [])
   const toggle = () => {
       setCollapsed(!collapsed)
      };
    const onClickMenu =(value)=>{
        setKeys(value.key)
        if (value.key === "1" && !employee) {
            axios.get('/api/emplist').then((result) => {
                setEmployee(result.data)
            }).catch((err) => {
                notification.error({message:'เรียกดูข้อมูลพนักงานล้มเหลว'})
            });
        }
    }
    const confirmEmployee =(value) =>{
        axios.post('/api/confirm',value).then((result) => {
            let filterEmp = employee.filter(emp => emp.Pers_no !== value.Pers_no)
            notification.success({message:result.data.msg})
            setEmployee(filterEmp)
        }).catch((err) => {
            notification.error({message:"CONFIRM MEMBER FAILED"})
        });
    }
    const deleteEmployee =(id) =>{
        axios.delete('/api/deletemember/'+id).then((result) => {
            let filterEmp = employee.filter(emp => emp.id !== id)
            setEmployee(filterEmp)
        }).catch((err) => {
            notification.error({message:"DELETE MEMBER ERROR"})
        });
    }
    const onChange =(value)=>{
        setExceptEmegency(value)
    }
    const onOk =()=>{
        console.log(exceptEmegency);
        axios.post('/api/exceptEmegency',{exceptEmegency}).then((result) => {
            notification.success({message:'แก้ไขการยกเว้นฉุกเฉินของรหัสผู้เสียภาษีเรียบร้อยแล้ว'})
        }).catch((err) => {
            notification.error({message:'แก้ไขการยกเว้นฉุกเฉินของรหัสผู้เสียภาษีล้มเหลว'})
        });
    }
    return (
        <Layout style={{height:"100vh"}}>
            <Sider
            trigger={null} collapsible collapsed={collapsed}
            >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={onClickMenu}>
                <Menu.Item key="1" icon={<ProfileOutlined />}>
                อนุมัติพนักงาน
                </Menu.Item>
                <Menu.Item key="2" icon={<NotificationOutlined />}>
                อนุมัติลบเอกสาร
                </Menu.Item>
                <Menu.Item key="3" icon={<AlertOutlined />}>
                ฉุกเฉิน
                </Menu.Item>
                
            </Menu>
            </Sider>
            <Layout>
            <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
            </Header>
            <Content style={{ margin: '24px 16px 0' }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    {keys === "1"&&employee&&<MemberTable employee={employee} onConfirm ={confirmEmployee} onDelete={deleteEmployee}/>
                    }
                    {keys === "3"&&<>
                    <Row>
                        <Button onClick={()=>setVisible(true)}>ภาษีได้รับการยกเว้นฉุกเฉิน</Button>
                        <Modal visible={visible}
                         onCancel={()=>setVisible(false)}
                         onOk={onOk}
                         title="เลือกเปอร์เซ็นต์ยกเว้นภาษี"
                         >
                            <Select placeholder="เลือกการยกเว้นภาษี" onChange={onChange} >
                                <Option value="0">สถานการณ์ปกติ</Option>
                                <Option value="100">ยกเว้นภาษี 100 %</Option>
                                <Option value="90">ยกเว้นภาษี 90 %</Option>
                                <Option value="50">ยกเว้นภาษี 50 % </Option>                                          
                            </Select>
                        </Modal>
                    </Row>
                    <Tax  manage={true} size="small"/>
                    </>
                    }
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    )
}

export default Manage
