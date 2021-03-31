import React,{useState} from 'react';
import {Input,Button,Select,Radio, Row, Col} from 'antd';
import {useDispatch} from 'react-redux'
import {onSearch} from '../../store/action/LandAction'
import jwtDecode from 'jwt-decode'
import LocalStorageService from '../../LocalStorage/LocalStorageSevice'
function FilterLand() {
    const dispatch = useDispatch();
    let token = LocalStorageService.getToken();
    let jwt = jwtDecode(token)
    console.log(jwt);
    const {Option} = Select;
    const [CodeLand, setCodeLand] = useState('')
    const [ParcelNo, setParcelNo] = useState('')
    const [LandNo, setLandNo] = useState('')
    const [SurveyNo, setSurveyNo] = useState('')
    const [TaxId, setTaxId] = useState('')
    const [Operator, setOperator] = useState('or')
    const [special,setSpecial] = useState(null);
    const SearchLand = () => {
        dispatch(onSearch(ParcelNo,SurveyNo,LandNo,CodeLand,TaxId,Operator,special));
    }
    return (
        <div style={{backgroundColor:'#9ddfd3',padding:'60px',paddingLeft:'200px',margin:'10px'}}>
           <Row >
               <Col >
                <p>คำค้นหารหัสแปลงที่ดิน</p>
                <Input onChange={(e)=>setCodeLand(e.target.value)} />
               </Col>
               <Col>
               <div style={{paddingLeft:'30px',textAlign:'center'}}>
                    <p>คำค้นหาเลขที่หนังสือกรรมสิทธิ์</p>
                    <Input onChange={(e)=>setParcelNo(e.target.value)}/> 
               </div>

                
               </Col>
               <Col>
               <div style={{paddingLeft:'30px',textAlign:'center'}}>
                    <p>คำค้นหาเลขที่ดิน</p>
                    <Input onChange={(e)=>setLandNo(e.target.value)}/>
               </div>

                
               </Col>
               <Col>
               <div style={{paddingLeft:'30px',textAlign:'center'}}>
                    <p>คำค้นหาหน้าสำรวจ</p>
                    <Input onChange={(e)=>setSurveyNo(e.target.value)}/>
               </div>

                
               </Col>
           </Row>
           <Row  style={{paddingTop:'20px'}}>
               <Col>
                <p>คำค้นหารหัสผู้เสียภาษี</p>
                <Input onChange={(e)=>setTaxId(e.target.value)}/>
               </Col>
               <Col>
               <div style={{paddingLeft:'40px',textAlign:'center'}}>
                    <p>ตัวเลือกพิเศษ</p>
                    <Select onChange={(value)=>setSpecial(value)} style={{ width: 300 }}>
                        <Option value={null}></Option>
                        <Option value={`L left join  usefulLand UL on L.code_land = UL.Land_id
                                        where distict_id =${jwt.distict_id}
                                        group by L.code_land
                                        having count(UL.useful_id) >0`}>
                                            เฉพาะ "มีการลงการใช้ประโยชน์ที่ดินแล้ว"
                        </Option>
                        <Option value={`L left join  usefulLand UL on L.code_land = UL.Land_id
                                        where distict_id =${jwt.distict_id}
                                        group by L.code_land
                                        having count(UL.useful_id) =0`}>
                                        เฉพาะ "ยังไม่มีการลงการใช้ประโยชน์ที่ดินแล้ว"
                        </Option>
                        <Option value={`where Price = 0 and distict_id =${jwt.distict_id}`}>เฉพาะ ที่ดิน "ที่ยังไม่มี" ราคาประเมิน</Option>
                        <Option value={`where Price != 0 and distict_id =${jwt.distict_id}`}>เฉพาะ "ที่ดิน "ที่มี" ราคาประเมิน"</Option>
                        <Option value={`where Land_Tax_ID  IS NULL and distict_id =${jwt.distict_id}`}>เฉพาะ "ไม่มีการผูก" เจ้าของทรัพย์สิน</Option>
                        <Option value={`where Land_Tax_ID IS NOT NULL and distict_id =${jwt.distict_id}`}>เฉพาะ "มีการผูก" เจ้าของทรัพย์สิน</Option>
                    </Select>   
               </div>
                
               </Col>
               <Col>
               <div style={{paddingLeft:'40px' ,textAlign:'center'}}>
                 <p>ตัวเลือกคำค้นหา</p>
                <Radio.Group onChange={(e)=>setOperator(e.target.value)} value={Operator}>
                    <Radio value='or'>ตรงกันบางส่วน</Radio>
                    <Radio value='and'>ตรงกันทั้งหมด</Radio>
                    
                </Radio.Group>  
               </div>
                
               </Col>
               
               <Col>
               <div style={{padding:'30px'}}>
                <Button onClick={()=>SearchLand()}>ค้นหา</Button>
               </div>
               </Col>
           </Row>
          
        </div>
    )
}

export default FilterLand
