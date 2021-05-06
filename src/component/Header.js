import React ,{useState,useEffect}from 'react'
import {Row,Col,Avatar,Dropdown,Menu,Divider,Image} from 'antd'
import {UserOutlined,DownOutlined } from '@ant-design/icons'
import jwtDecode from 'jwt-decode'
import {Link} from 'react-router-dom'
import LocalStorageService from '../LocalStorage/LocalStorageSevice'
export default function Header(props) {
    let [user,setUser] = useState(null)
   
    useEffect(() => {
        try {
          let token = LocalStorageService.getToken();
             setUser(jwtDecode(token))   
        } catch (error) {
            window.location.reload()
        }
       
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
        <div style={{width:"100%",paddingTop:5 ,backgroundColor:'whitesmoke',paddingLeft:'20px'}}>
            <Row >
                <Col xs={7}sm= {10} md= {12} lg= {15} xl={17} xxl={18} style={{paddingTop:'15px'}}>
                     <Link to="/main" style={{color:'black'}}><Image src="/home.png" width={20}preview={false}/>  หน้าหลัก</Link>  
                </Col>
                <Col xs={17}sm= {14} md= {12} lg= {9} xl={7} xxl={6} style={{paddingTop:'15px'}} >
                    {user?.role ==="leader"&&
                        <Link to="/manage" style={{backgroundColor:'seashell',color:'steelblue',paddingRight:'10px'}}><b>*ในส่วนของหัวหน้า</b></Link>
                    }
                    <Dropdown overlay={menu} >
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()} style={{paddingLeft:'25px'}}>
                        <Avatar size={40} icon={user?.picture?<Image src={'http://localhost:3001/Image/Profile/'+user?.picture} preview={false}/>:<UserOutlined />} style={{ backgroundColor: '#9FC1E3' }}/>
                                {user&& <b style={{padding:10,color:'steelblue',fontSize:18}}>{`${user.Fname} ${user.Lname}`}</b>}<DownOutlined />               
                    </a>
                    </Dropdown>
                </Col>
            </Row>
            <Divider />
            
        </div>
    )
}
