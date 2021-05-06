import React from 'react'
import {Col, Collapse, Row} from 'antd'
import {Link} from 'react-router-dom'
import {YearsDoc} from '../Pdf/FuncPdf'
import CartSaveCost from '../../Modal/CartSaveCost';
function Document() {
    let years = YearsDoc();
    const {Panel} = Collapse;
    return (
        <div>
            <Row>
                <Col span={24}>
                    <CartSaveCost />
                </Col>
                 
            </Row>
            <Row>
                <Col span={24}>
                    <Collapse>
                        {years.map((year,index) =>
                            <Panel key={index} header={`ประจำปี${year}`}>
                                <Link to={`/checkdocument/${year}`}><p>ภ.ด.ส.๓,๔</p></Link>
                                <Link to={`/costdocument/${year}`}><p>ภ.ด.ส.๖,๗,๘</p></Link>
                                <Link to={`/warning/${year}`}>ใบแจ้งให้มาชำระภาษี</Link>
                            </Panel>
                                        
                        )}
                    </Collapse>  
                </Col>
                
            </Row>
            
        </div>
        
    )
}

export default Document
