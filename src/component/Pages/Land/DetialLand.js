import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {fetch_land} from '../../../store/action/LandAction'
import {useParams} from 'react-router-dom'
import {Row,Col,Divider} from 'antd'
import LandForm from '../../Form/LandForm'
import OwnerLand from './OwnerLand'
import UsefulLand from './UsefulLand'
function DetialLand(props) {
    const dispatch = useDispatch();
    const {id} = useParams();
    const land = useSelector(state => state.lands);
    useEffect(() => {
       dispatch(fetch_land(id))
    }, [dispatch,id,land.totalPlace])
    console.log(land);
    return (
        <div >
            <Row gutter={12}>
                 <h2 style={{paddingLeft:555,color:'#5CC5D5'}}> รหัสผู้เสียภาษี : {land.Land_Tax_ID}</h2>
            </Row>
            <Row >
                <Col span={1} >
                </Col>
                <Col xs={2} sm={4} md={8} lg={10} xl={12}>
                    <LandForm land={land} />
                </Col>
                <Col span={1} >     
                </Col>
                <Col  xs={2} sm={4} md={6} lg={8} xl={10} >
                    <OwnerLand code_land={land.code_land} customers={land.Tax_Group&&land.Tax_Group.Customers}/>
                <Divider />                
                </Col>
                
            </Row>
            <Divider />
            <Row >
                <Col xs={2} sm={4} md={6} lg={8} xl={12}>
                    <UsefulLand  code_land={land.code_land} 
                    totalPlace ={land.totalPlace} tax_id_land ={land.Land_Tax_ID}
                     usefullands={land.UsefulLands}
                     PriceLand ={land.Price}
                     categoryTax={land.Tax_Group}
                     />
                </Col>
                
            </Row>
        </div>
    )
}

export default DetialLand
