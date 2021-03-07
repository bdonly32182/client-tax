import React,{useState} from 'react'
import {Button,Modal,notification} from 'antd'
import NextoTable from '../Table/NextoTable';
import axios from '../../config/axios'
import {FETCH_USEFUL_LAND,FETCHS_BUILD_IN_USEFULLAND} from '../../store/action/ActionType'
import {useDispatch} from 'react-redux'
function NextoModal({tax_id,useful_id,TypeName}) {
    const dispatch = useDispatch();
    const [visible , setVisible] = useState(false);
    const [nextos,setNexto] = useState([]);
    const PullUsefulLand = (id,useful_id) => {
        axios.get(`/nexto/${id}?useful_id=${useful_id}&TypeName=${TypeName}`).then((result) => {
            console.log(result.data);
            setNexto(result.data)
        }).catch((err) => {
            notification.error({message:'เรียกดูแปลงติดกันล้มเหลว'})
        });
    }
    const selectNexto = (nexto)=>{
        let body={
            Useful_ID:useful_id,
            UsefulUsefulId:nexto.useful_id
        }
    let filterNexto = nextos.filter(next => next.useful_id !== nexto.useful_id)
    setNexto(filterNexto);
      axios.post('/api/selectNexto',body)
      .then(result=>{
        notification.success({message:"เลือกการใช้ประโยชน์ที่ดินเรียบร้อยแล้ว"})
        
        }
        )
      .catch(e=>notification.error({message:"เลือกการใช้ประโยชน์ที่ดินล้มเหลว"}))
    }
    const onCancelAndOk =()=>{
        setVisible(false);
        axios.get(`/api/read/usefuls?useful_id=${useful_id}`).then((result) => {
            dispatch({type:FETCH_USEFUL_LAND,payload:result.data})
            dispatch({type:FETCHS_BUILD_IN_USEFULLAND,payload:result.data.BuildOnUsefulLands})

        }).catch((err) => {
            notification.error({message:'การเรียกดูข้อมูลการใช้ประโยชน์ของที่ดินล้มเหลว'})
        });
    }
    return (
        <div>
            <Button onClick={()=>setVisible(true)}>จัดการการใช้ประโยชน์ที่ติดกัน</Button>
            <Modal visible={visible} 
            onCancel={()=>onCancelAndOk()}
             width="50%"
             onOk={()=>onCancelAndOk()}
             >
             <Button onClick={()=>PullUsefulLand(tax_id,useful_id,TypeName)}>ดึงข้อมูลที่เป็นเจ้าของเดียวกันจากระบบ</Button>
               <NextoTable nextos ={nextos} selectNexto={selectNexto}/>
            </Modal>
        </div>
    )
}

export default NextoModal
