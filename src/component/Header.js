import React ,{useState,useEffect}from 'react'
import {Row,Col,Avatar,Dropdown,Menu,Divider,Image} from 'antd'
import {UserOutlined,DownOutlined } from '@ant-design/icons'
import jwtDecode from 'jwt-decode'
import {Link} from 'react-router-dom'
import LocalStorageService from '../LocalStorage/LocalStorageSevice'
export default function Header(props) {
    let [user,setUser] = useState(null)
   
    useEffect(() => {
        let token = LocalStorageService.getToken();
        setUser(jwtDecode(token))
    },[])
     const log_out = ()=>{
        LocalStorageService.removeToken()
        window.location.reload()
    }
    const menu = (
        <Menu>
          <Menu.Item>
            <Link to={`/employee/${user?.Pers_no}`}>แก้ไขข้อมูลส่วนตัว</Link>
          </Menu.Item>
          <Menu.Item danger onClick={()=> log_out()}>ออกจากระบบ</Menu.Item>
        </Menu>
      );
    return (
        <div style={{width:"100%",paddingTop:10}}>
            <Row gutter={{xs:8,sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={17}/>
                <Col className="gutter-row" span={7}  >
                    <Link to="/main" style={{padding:20,color:'black'}}><Image src="/home.png" width={20}preview={false}/>  หน้าหลัก</Link>
                    <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        <Avatar size={40} icon={<UserOutlined />} style={{ backgroundColor: '#9EC1C4' }}/>
                                {user&& <b style={{padding:10,color:'black'}}>{`${user.Fname} ${user.name}`}</b>}<DownOutlined />               
                    </a>
                    </Dropdown>
                </Col>
            </Row>
            <Divider />
            
        </div>
    )
}
