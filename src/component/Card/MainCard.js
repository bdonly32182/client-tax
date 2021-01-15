import React from 'react'
import {Card,Col} from 'antd'
import {useHistory} from 'react-router-dom'
function MainCard(props) {
    const {Meta} = Card
    const history = useHistory()
    return (
        <div onClick={()=>history.push(props.path)}>
         <Col className="gutter-row" span={5} style={{padding:20}}>
            <Card
            hoverable
            style={{ width: 240 ,textAlign:'center'}}
            cover={props.card.icon}
            bordered={false}
            >
            <Meta title={props.card.title} description={props.card.description} />
            </Card> 
        </Col>   
        </div>
        
       
        
       
    )
}

export default MainCard
