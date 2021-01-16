import React,{useState} from 'react'
import {Layout, Menu,notification} from 'antd'
import {ProfileOutlined,AlertOutlined,MenuUnfoldOutlined,MenuFoldOutlined} from '@ant-design/icons'
import Header from '../../Header';
import MemberTable from '../../Table/MemberTable';
import axios from '../../../config/axios'
function Manage(props) {
    const {  Content, Footer,Sider } = Layout;
    const [collapsed,setCollapsed] = useState(false)
    const [keys,setKeys] =useState("1")
    const [employee,setEmployee] = useState([])
   const toggle = () => {
       setCollapsed(!collapsed)
      };
    const onClickMenu =(value)=>{
        setKeys(value.key)
        if (value.key === "1") {
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
                <Menu.Item key="2" icon={<AlertOutlined />}>
                อนุมัติลบเอกสาร
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
                
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    )
}

export default Manage
