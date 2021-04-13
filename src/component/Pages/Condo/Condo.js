import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Col, Row } from 'antd'
import CondoModal from '../../Modal/CondoModal';
import CondosAll from '../../Table/CondosAll';
import Header from '../../Header'
import {fetchs_condo} from '../../../store/action/CondoAction'
import FilterCondo from '../../SearchFilter/FilterCondo';
function Condo(props) {
    const dispatch = useDispatch();
    const condo = useSelector(state=>state.condo)
    useEffect(() => {
        dispatch(fetchs_condo())
    }, [dispatch])
    return (
        <div >
            <Row>
                <Header />
            </Row>
            <Row style={{padding:'20px'}}>
            <Col xs={17} sm	={14} md={12} lg={10} xl={8} xxl={6}>
                ทะเบียนชุด
            </Col>
            <Col span={12}/>
            <Col xs={7} sm	={5} md={4} lg={3} xl={2} xxl={1}>
                <CondoModal titleButton="สร้างอาคารชุดใหม่" color="#37B889"/>
            </Col>
            </Row>
            <Row style={{padding:'20px'}}>
            <Col xs={24} sm	={24} md={24} lg={24} xl={24} xxl={24}>
                 <FilterCondo />
            </Col>
               
            </Row>
            <Row style={{padding:'20px'}}>
                <Col xs={24} sm	={24} md={24} lg={24} xl={24} xxl={24}>
                    <CondosAll condo ={condo}/>
                </Col>
            </Row>    
        </div>
       
    )
}

export default Condo
