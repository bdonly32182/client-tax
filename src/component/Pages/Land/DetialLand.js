import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {fetch_land} from '../../../store/action/LandAction'
import {useParams} from 'react-router-dom'
import {Row,Col,Divider} from 'antd'
import LandForm from '../../Form/LandForm'
function DetialLand(props) {
    const dispatch = useDispatch();
    const {id} = useParams();
    const land = useSelector(state => state.lands)
    useEffect(() => {
       dispatch(fetch_land(id))
    }, [dispatch,id])
    console.log(land);
    return (
        <div>
            <Row >
                <Col span={1} >
                </Col>
                <Col xs={2} sm={4} md={8} lg={10} xl={12}>
                    <h1>{land.Tax_ID}</h1>
                    <LandForm land={land}/>
                </Col>
                <Col span={1} >     
                </Col>
                <Col  xs={9} sm={4} md={20} lg={10} xl={10} >
                {/* <OwnerLand customer ={props.lands.Customers} onCreate={props.select_owner_land} codeland={props.lands.code_land} history={history} cancle_owner={props.cancle_owner} Payment_Cus={props.lands.Payment_Cus} Tax_ID={props.lands.Tax_ID}/> */}
                <Divider />
                {/* <NextToLand customer ={props.lands.Customers}  codeland={props.lands.code_land} land={props.nextlands} onSelect={props.save_next_land} Tax_ID={props.lands.Tax_ID} /> */}
                
                </Col>
                
            </Row>
            <Divider />
            <Row>
                <Col span={1}></Col>
                <Col >
                 {/* <Useful create_useful={props.create_useful} codeland={props.lands.code_land} usefuls={props.lands.UsefulLands} customer ={props.lands.Customers} onDelete={props.delete_building} Tax_ID={props.lands.Tax_ID}/> */}
                </Col>
                
            </Row>
        </div>
    )
}

export default DetialLand
