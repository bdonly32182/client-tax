import React,{useEffect,useState} from 'react'
import { Button, Layout, Menu,notification,Upload,message} from 'antd';
import {ProfileOutlined,MenuUnfoldOutlined,MenuFoldOutlined,NotificationOutlined,UploadOutlined} from '@ant-design/icons'
import Header from '../Header'
import axios from '../../config/axios'
import MemberTable from '../Table/MemberTable';
import DistrictTable from '../Table/DistrictTable';
import RateTable from '../Table/RateTable';
function AdminPage(props) {
    const [employee,setEmp]=useState([]);
    const {  Content, Footer,Sider } = Layout;
    const [collapsed,setCollapsed] = useState(false)
    const [keys,setKeys] =useState("1");
    const [distict,setDistict] = useState([]);
    const [uploading,setUploading] = useState(false);
    const [fileList,setFileList] = useState([]);
    const [rate,setRate] = useState(null);
    const [rateBuild,setRateBuild] = useState([]);
    useEffect(() => {
       axios.get('/api/leaderlist').then((result) => {
           setEmp(result.data)
       }).catch((err) => {
           notification.error({message:'เรียกดูข้อมูลสมาชิกที่เป็นหัวหน้าฝ่ายล้มเหลว'})
       });
    },[])
    const toggle = () => {
        setCollapsed(!collapsed)
       };
    const confirmEmployee =(value) =>{
        axios.post('/api/confirm',value).then((result) => {
            let filterEmp = employee.filter(emp => emp.Pers_no !== value.Pers_no)
            notification.success({message:result.data.msg})
            setEmp(filterEmp)
        }).catch((err) => {
            notification.error({message:"CONFIRM MEMBER FAILED"})
        });
    }
    const deleteEmployee =(id) =>{
        axios.delete('/api/deletemember/'+id).then((result) => {
            let filterEmp = employee.filter(emp => emp.id !== id)
            setEmp(filterEmp)
        }).catch((err) => {
            notification.error({message:"DELETE MEMBER ERROR"})
        });
    }
    const onClickMenu =(value)=>{
        setKeys(value.key)
        if (value.key === "1" && !employee) {
            axios.get('/api/leaderlist').then((result) => {
                setEmp(result.data)
            }).catch((err) => {
                notification.error({message:'เรียกดูข้อมูลสมาชิกที่เป็นหัวหน้าฝ่ายล้มเหลว'})
            });
        }
        if (value.key ==="2") {
            axios.get('/api/allDistrict').then((result) => {
                setDistict(result.data)
            }).catch((err) => {
                notification.error({message:'เรียกดูข้อมูลเขตทั้งหมดล้มเหลว'})
            });
        }
        if (value.key ==="3") {
            axios.get('/api/rate/build').then((result) => {
                setRateBuild(result.data)
            }).catch((err) => {
                notification.error({message:'เรียกดูราคาประเมินสิ่งปลูกสร้างล้มเหลว'})
            });
        }
    }
    const propsUpload = {
        
        beforeUpload: file => {
         setFileList(file)
         return false
        },
      };
    const handleFile = () => {
        const formData = new FormData();
        formData.append('file', fileList);
        axios.post('/api/excel/district',formData).then((result) => {
            console.log(result.data);
            message.info(result.data.message);
            axios.get('/api/allDistrict').then((result) => {
                setDistict(result.data)
            }).catch((err) => {
                notification.error({message:'เรียกดูข้อมูลเขตทั้งหมดล้มเหลว'})
            });
        }).catch((err) => {
            message.error("ERROR, Please Check file need Excel only")
        });

    }
    const uploadRate ={
        beforeUpload:file=>{
            setRate(file);
            return false
        }
    }
    const handleFileRate = () => {
        const formData = new FormData();
        formData.append('file',rate);
        axios.post(`/api/excel/upload/rate`,formData).then((result) => {
            message.info(result.data.message);
            axios.get('/api/rate/build').then((result) => {
                setRateBuild(result.data)
            }).catch((err) => {
                notification.error({message:'เรียกดูราคาประเมินสิ่งปลูกสร้างล้มเหลว'})
            });
        }).catch((err) => {
            message.error("ERROR, Please Check file need Excel only")
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
            อนุมัติหัวหน้าฝ่าย
            </Menu.Item>
            <Menu.Item key="2" icon={<NotificationOutlined />}>
            จัดการเขต
            </Menu.Item>
            <Menu.Item key="3" icon={<NotificationOutlined />}>
            จัดการราคาประเมินสิ่งปลูกสร้าง
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
        
        <Content style={{ margin: '10px 16px 0' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                {keys === "1"&&employee&&<MemberTable employee={employee} onConfirm ={confirmEmployee} onDelete={deleteEmployee}/>
                }
                {keys==="2"&&
                
                <div>
                    <div style={{display:'inline-block'}}>
                     <Upload {...propsUpload}>
                    <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                     <Button
                        type="primary"
                        onClick={handleFile}
                        disabled={fileList.length === 0}
                        loading={uploading}
                        style={{ marginTop: 16 }}
                        >
                        {uploading ? 'Uploading' : 'Start Upload'}
                        </Button>   
                       
                     </div>
                     
                <DistrictTable districts={distict}/>    
                </div>
                
                }
                {keys ==="3"&&
                <div>
                     <Upload {...uploadRate}>
                    <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                     <Button
                        type="primary"
                        onClick={handleFileRate}
                        disabled={rate.length === 0}
                        loading={uploading}
                        style={{ marginTop: 16 }}
                        >
                        {uploading ? 'Uploading' : 'Start Upload'}
                        </Button> 
                        <RateTable rate={rateBuild}/>
                </div>
                }
            </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    </Layout>
        
    )
}

export default AdminPage
