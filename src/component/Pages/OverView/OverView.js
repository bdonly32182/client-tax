import React,{useState,useEffect} from 'react'
import {Statistic , Card, Row , Col, notification} from 'antd';
import {SendOutlined} from '@ant-design/icons'
import Header from '../../Header'
import {Link} from 'react-router-dom'
import axios from '../../../config/axios';
function OverView() {
    let NowDate = new Date() ;
    let DateThai = NowDate.toDateString().split(" ");
    let initialYear = +DateThai[3]+543;
    let [Headstatistic,setHeadStatistic] = useState([]);
    let [YearStatistic,setYearStatistic] = useState([]);
    useEffect(() => {
       axios.get(`/api/statistic`)
       .then((result) => {
        setHeadStatistic(result.data)
       }).catch((err) => {
           notification.error({message:'เรียกดูสถิติล้มเหลว'})
       });
       axios.get(`/api/statisticyear/?year=${initialYear}`)
       .then((result) => {
           setYearStatistic(result.data)
       }).catch((err) => {
        notification.error({message:'เรียกดูสถิติล้มเหลว'})
       });
    }, [initialYear])
    const {landAllDistrict,buildAllDistrict,RoomAllDistrict,Owners,LandHaveUseful,
            EmptyType,LiveType,OtherType,FarmType} = Headstatistic;
    const {Income} = YearStatistic
    return (
        <div>
            <Header />
           <Row>
               <Col>
                    <Card title="แปลงที่ดิน"
                        actions={[
                        <Link to={`/land`}><SendOutlined /><b>ไปที่รายการ</b></Link>
                        ]}
                    >
                            <Statistic
                            value={landAllDistrict&&landAllDistrict[0]?.totalLandInDistrict}
                            />    
                    </Card>
               </Col>
                
               <Col>
                    <Card title="แปลงที่สำรวจแล้ว"
                        actions={[
                        <Link to={`/land`}><SendOutlined /><b>ไปที่รายการ</b></Link>
                        ]}
                    >
                            <Statistic
                            value={LandHaveUseful&&LandHaveUseful[0]?.totalLandHaveUseful}
                            />    
                    </Card>
               </Col>
               <Col>
                    <Card title="สิ่งปลูกสร้าง"
                        actions={[
                        <Link to={`/building`}><SendOutlined /><b>ไปที่รายการ</b></Link>
                        ]}
                    >
                            <Statistic
                            value={buildAllDistrict&&buildAllDistrict[0]?.totalBuilding}
                            />    
                    </Card>
               </Col>
               <Col>
                    <Card title="ห้องชุด"
                        actions={[
                        <Link to={'/condo'}><SendOutlined /><b>ไปที่รายการ</b></Link>
                        ]}
                    >
                            <Statistic
                            value={RoomAllDistrict&&RoomAllDistrict[0]?.totalRoom}
                            />    
                    </Card>
               </Col>
               <Col>
                    <Card title="เจ้าของทรัพย์สิน"
                        actions={[
                        <Link to='/tax'><SendOutlined /><b>ไปที่รายการ</b></Link>
                        ]}
                    >
                            <Statistic
                            value={Owners&&Owners[0]?.amountTax}
                            />    
                    </Card>
               </Col>
           </Row>
           <Row>
                <Col>
                    <Card title="ยอดภาษีที่คำนวณได้ทั้งสิ้น"
                    >
                            <Statistic
                            value={Income&&Income[0]?.totalPriceOfTax.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2})}
                            />    
                    </Card>
               </Col>
               <Col>
                    <Card title="ส่วนลดทั้งสิ้น"
                    >
                            <Statistic
                            value={Income&&Income[0]?.PriceExceptEmergency.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2})}
                            />    
                    </Card>
               </Col>
               <Col>
                    <Card title="บรรเทา - ส่วนต่าง"
                    >
                            <Statistic
                            value={Income&&Income[0]?.totalBuilaAndLandYear.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2})}
                            />    
                    </Card>
               </Col>
               <Col>
                    <Card title="ยอดภาษีต้องจัดเก็บทั้งสิ้น"
                    >
                            <Statistic
                            value={Income&&Income[0]?.BriefTotal.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2})}
                            />    
                    </Card>
               </Col>
           </Row>
        </div>
    )
}

export default OverView
