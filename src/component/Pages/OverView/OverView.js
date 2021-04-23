import React,{useState,useEffect} from 'react'
import {Statistic , Card, Row , Col, notification} from 'antd';
import Header from '../../Header'
import axios from '../../../config/axios';
import HeadOverView from './HeadOverView';
import ContentOverView from './ContentOverView';
function OverView() {
    let NowDate = new Date() ;
    let DateThai = NowDate.toDateString().split(" ");
    const [initialYear,setInitialYear] = useState(+DateThai[3]+543)
    const [Headstatistic,setHeadStatistic] = useState([]);
    const [YearStatistic,setYearStatistic] = useState([]);
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
    
    const {Income} = YearStatistic
    return (
        <div >
                <Header />
                <div style={{paddingBottom:'40px'}}>
                    <HeadOverView Headstatistic={Headstatistic}/>
                </div>
                <div style={{height:400}}>
                    <ContentOverView Income={Income} Year={initialYear} Headstatistic={Headstatistic}/>
                </div>
                
                
        </div>
    )
}

export default OverView
