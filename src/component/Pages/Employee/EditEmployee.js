import React,{useEffect,useState} from 'react'
import {useDispatch} from 'react-redux'
import {Tabs} from 'antd'
import jwtDecode from 'jwt-decode'
import LocalStorageService from '../../../LocalStorage/LocalStorageSevice'
import ChangePassword from './ChangePassword';
import ChangeProfile from './ChangeProfile';
import {change_profile} from '../../../store/action/UserAction'
function EditEmployee(props) {
    const dispatch = useDispatch();
    const {TabPane} = Tabs;
    let [user,setUser] = useState(null);
    useEffect(() => {
      let token =  LocalStorageService.getToken()
        setUser(jwtDecode(token))
    },[]);
    const submitForm =(value)=>{
        console.log(value);
        dispatch(change_profile(value))
    }
    return (
        <div >
            <Tabs  type="card" size="large">
                <TabPane tab="แก้ไขข้อมูลส่วนตัว" key="1">
                    <ChangeProfile user={user} onSubmit ={submitForm}/>
                </TabPane>
                <TabPane tab="เปลี่ยนรหัสผ่าน" key="2">
                    <ChangePassword onSubmit ={submitForm}/>
                </TabPane>
        
            </Tabs>  
         
        </div>
        
    )
}

export default EditEmployee
