import React,{useState} from 'react'
import {Input,Button,Row,Col} from 'antd'
import { useDispatch } from 'react-redux'
import {SearchCondo} from '../../store/action/CondoAction'
function FilterCondo() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const onSeach = ()=>{
        dispatch(SearchCondo(search));
    }
    return (
        <div >
            <Row >
                <Col xs={6} sm	={6} md={6} lg={6} xl={6} xxl={6}>
                        <p>ค้นหาชื่ออาคารชุด หรือ เลขที่ใบอนุญาต</p>
                        <Input onChange={(e)=>setSearch(e.target.value)} width={200}/>            
                </Col>
                <Col xs={6} sm	={6} md={6} lg={6} xl={6} xxl={6}>
                    <div style={{padding:'35px'}}>
                      <Button onClick={onSeach}>ค้นหา</Button>             
                    </div>
                   
                </Col>   
                     
            </Row>
                    
          
                   
               
        </div>
    )
}

export default FilterCondo
