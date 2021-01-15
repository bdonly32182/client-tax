import React,{useState} from 'react'
import {BrowserRouter} from 'react-router-dom'
import PrivateRoute from './component/Pages/PrivateRoute/PrivateRoute';
import LocalStorageService from './LocalStorage/LocalStorageSevice'
function App() {
  //เมื่อไหร่ที่ใช้ route จะเซ็ท role เสมอ จึงต้องให้ค่า defualt state คือการเรียก getRole ที่ return role มาให้
  const [role,setRole] = useState(LocalStorageService.getRole())
  return (
      <BrowserRouter>
      <PrivateRoute role={role} setRole={setRole}/>
      </BrowserRouter>
    
  );
}

export default App;
