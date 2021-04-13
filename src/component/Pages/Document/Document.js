import React from 'react'
import {Collapse} from 'antd'
import {Link} from 'react-router-dom'
import {YearsDoc} from '../Pdf/FuncPdf'
function Document() {
    let years = YearsDoc();
    const {Panel} = Collapse;
    console.log(years);
    return (
        <Collapse>
            {years.map((year,index) =>
                <Panel key={index} header={`ประจำปี${year}`}>
                    <Link to={`/checkdocument/${year}`}><p>ภ.ด.ส.๓,๔</p></Link>
                    <Link to={`/costdocument/${year}`}><p>ภ.ด.ส.๖,๗,๘</p></Link>
                </Panel>
                            
            )}
        </Collapse>
    )
}

export default Document
