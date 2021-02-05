import React,{useState} from 'react'
import {Modal,Button, Row, Col} from 'antd'
import {CheckCircleFilled,WarningOutlined} from '@ant-design/icons'
function ConfirmModal(props) {
    const [visible,setVisible] = useState(false);

    const onConfirm =()=>{
        props.confrimDelete();
    }
    return (
        <div>
            <Button onClick={()=>setVisible(true)} style={{backgroundColor:'#A7233F',color:'whitesmoke'}}>{props.titleButton}</Button>
            <Modal visible={visible}
            onCancel={()=>setVisible(false)}
            onOk={onConfirm}
            bodyStyle={{backgroundColor:"whitesmoke"}}
            >
                
                <Row>
                    <Col xs={5} sm={7} md={12} lg={15} xl={20}>
                        <div style={{textAlign:'center'}}>
                            <WarningOutlined style={{backgroundColor:'red',color:'white',fontSize:40}}/>
                            <h2 style={{padding:15 , color:'#191818',fontSize:15}}>{props.content}</h2>
                        </div>
                    </Col>
                    
                </Row>
                
                
            </Modal>
        </div>
    )
}

export default ConfirmModal
