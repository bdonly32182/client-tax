import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {fetch_land} from '../../../store/action/LandAction'
import {useParams} from 'react-router-dom'
import {Row,Col,Divider,Popover} from 'antd'
import LandForm from '../../Form/LandForm'
import OwnerLand from './OwnerLand'
import UsefulLand from './UsefulLand'
import Header from '../../Header'
function DetialLand(props) {
    const dispatch = useDispatch();
    const {id} = useParams();
    const land = useSelector(state => state.lands);
    useEffect(() => {
       dispatch(fetch_land(id))
    }, [dispatch,id,land.totalPlace])
    const content = (rate=[],createdAt,updatedAt)=>{
        let DateLand = createdAt?.split("-");
        let updateLand = updatedAt?.split("-");
        return (<div style={{width:"100%"}}>
            {DateLand&&<p>วันที่สร้าง:{`${DateLand[2].substring(0,2)}/${DateLand[1]}/${DateLand[0]}`}</p>}
           {updateLand&& <p>วันที่แก้ไข:{`${updateLand[2].substring(0,2)}/${updateLand[1]}/${updateLand[0]}`}</p>}
            <p>ราคาประเมินของกรรมธนารักษ์</p>
            <ul>{rate.map((rate,i)=>{
                // let date = new Date(rate.createdAt)
                let splitDate = rate.createdAt.split("-")
                return <li key={i}>วันที่ {`${splitDate[2].substring(0,2)}/${splitDate[1]}/${splitDate[0]}`} ราคา:{rate.Price_thanaruk} ฿</li>
            })}</ul>
        </div>)
    }
    console.log(land);
    return (
        <div >
            <Header /> 
            <Row>
                <Popover content={content(land?.RateLands,land?.createdAt,land?.updatedAt)}>
                 <h2>ประวัติของที่ดินแปลง {land?.code_land} </h2>   
                </Popover>
                
            </Row>    
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
