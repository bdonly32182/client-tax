import React from 'react'
import {Card ,List} from 'antd'
import {useHistory} from 'react-router-dom'
function MainCard({card}) {
    const {Meta} = Card
    const history = useHistory()
    return (
        
        
            <List
                grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 3,
                lg: 4,
                xl: 4,
                xxl: 4,
                }}
                dataSource={card}
                size='large'
                renderItem={item => (
                <List.Item
                >
                    <div onClick={()=>history.push(item.path)} style={{textAlign:'center',marginTop:'90px'}}>
                    <Card title={item.icon} hoverable bordered={false}
                    style={{borderRadius:'15px'}}
                    >
                    <Meta title={item.title} description={item.description} /> 
                    </Card>
                    </div> 
                </List.Item>
                )}
            />
        
       
        
       
    )
}

export default MainCard
