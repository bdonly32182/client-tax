import React,{useEffect,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {Input,Button, Table , Switch} from 'antd'
import {FetchsCostDocumentEmployee,FetchsCostDocumentDistrict} from '../../../../store/action/ConstDocAction';
import {Link, useParams} from 'react-router-dom';
import Header from '../../../Header'
function CostDoc() {
    const dispatch = useDispatch();
    const {Column}  = Table;
    const {year} = useParams();
    const costs = useSelector(state => state.Costs);
    const [onSwitch, setSwitch] = useState(true)
    useEffect(() => {
       onSwitch&& dispatch(FetchsCostDocumentEmployee(year));
       !onSwitch&& dispatch(FetchsCostDocumentDistrict(year));
    }, [dispatch,year,onSwitch])
    const ChangeSwitch = value => {
        setSwitch(value)
    }
    console.log('CostDoc',year);
    console.log('CostDoc',onSwitch);
    return (
        <div>
            <Header />

            <div style={{border:'groove',width:"100%",height:220,paddingBottom:'15px'}}>
                <p>search</p>
                <Input placeholder="search"/>
                <p>search</p>
                <Input placeholder="search"/>
                <p>search</p>
                <Input placeholder="search"/>
                <Button>Search</Button>
            </div>
            <Switch checkedChildren="พนักงาน" 
            onChange={ChangeSwitch}
            unCheckedChildren="เขต" defaultChecked
            ></Switch>
            <Table dataSource={Array.isArray(costs)&&costs}>
                <Column title="ลำดับ"
                render={(text,_,index)=>index+1}
                >
                </Column>
                <Column title="รหัสหนังสือ" dataIndex="CostBookNo">
                </Column>
                <Column title="รหัสผู้เสียภาษี" dataIndex="TaxCostBook">
                </Column>
                <Column title="ยอดภาษีทั้งสิ้น" dataIndex="BriefTotal"
                render={(text)=>text.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2})}
                >
                </Column>
                <Column title="ภาษีที่คำนวณ" dataIndex="totalPriceOfTax"
                render={(text)=>text.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2})}
                >
                </Column>
                <Column title="ลด %" dataIndex="PriceExceptEmergency"
                render={(text)=>text.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2})}
                >
                </Column>
                <Column title="ภาษีคงเหลือ" dataIndex="BriefTotal"
                render={(text)=>text.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2})}
                >
                </Column>
                <Column title="ภาษี ปี62" dataIndex="totalBuilaAndLandYear"
                render={(text)=>text.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2})}
                >
                </Column>
                <Column title="ผลยต่าง" dataIndex="valueDifference"
                render={(text)=>text.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2})}
                >
                </Column>
                <Column title="บรรเทา" dataIndex="Relive"
                render={(text)=>text.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2})}
                >
                </Column>
                <Column title="เรียกดูหนังสือ" dataIndex="CostBookNo"
                render={(text)=><Link to={`/edit/costdocument/${text}`}>เรียกดูหนังสือ</Link>}
                >
                </Column>
                <Column title="หน้าข้อมูลเจ้าของทรัพย์สิน" dataIndex="TaxCostBook"
                render={(text)=><Link to={`/tax/${text}`}>ข้อมูลเจ้าของทรัพย์สิน</Link>}
                >
                </Column>
            </Table>
        </div>
    )
}

export default CostDoc
