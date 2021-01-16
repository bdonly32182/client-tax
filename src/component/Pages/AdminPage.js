import React,{useEffect,useState} from 'react'
import { notification} from 'antd';
import Header from '../Header'
import axios from '../../config/axios'
import MemberTable from '../Table/MemberTable';
function AdminPage(props) {
    const [employee,setEmp]=useState([]);
    useEffect(() => {
       axios.get('/api/leaderlist').then((result) => {
           console.log(result.data);
           setEmp(result.data)
       }).catch((err) => {
           notification.error({message:'เรียกดูข้อมูลสมาชิกที่เป็นหัวหน้าฝ่ายล้มเหลว'})
       });
    },[])
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
            console.log(result);
            setEmp(filterEmp)
        }).catch((err) => {
            notification.error({message:"DELETE MEMBER ERROR"})
        });
    }
    return (
        <div >
            <Header />
            <MemberTable employee={employee} onConfirm ={confirmEmployee} onDelete={deleteEmployee}/>
        </div>
    )
}

export default AdminPage
