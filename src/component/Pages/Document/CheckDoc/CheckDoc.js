import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {FetchsCheckDocumentEmployee,FetchsCheckDocumentDistrict} from '../../../../store/action/CheckDocAction'
import {Link, useParams} from 'react-router-dom';
import {Input,Button,Table,Switch} from 'antd'
import Header from '../../../Header'
function CheckDoc() {
    const dispatch = useDispatch();
    const {year} = useParams();
    const { Column } = Table;
    const [onSwitch, setSwitch] = useState(true)
    const checks = useSelector(state=>state.Checks)
    useEffect(() => {
      onSwitch&&dispatch(FetchsCheckDocumentEmployee(year));
      !onSwitch&& dispatch(FetchsCheckDocumentDistrict(year));
    }, [dispatch,year,onSwitch])
    const ChangeSwitch = value => {
      setSwitch(value)
  }
 console.log('checkdoc',year);
 console.log('checkdoc',onSwitch);
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
            <Table  dataSource={Array.isArray(checks)&&checks}
            >
              <Column  title="ลำดับ" 
              render={(text,_,index)=>index+1}
              />
              <Column dataIndex="CheckBookNo" title="เลขหนังสือ"
              />
              <Column dataIndex="TaxCheckBook" title="รหัสผู้เสียภาษี"/>
              <Column dataIndex="Tax_Group" title="แปลงที่ดิน"
              render={(tax)=>tax?.Lands?.length}
              />
              <Column dataIndex="Tax_Group" title="สิ่งปลูกสร้าง"
              render={(tax)=>tax?.Buildings?.length}
              />
              <Column dataIndex="Tax_Group" title="ห้องชุด"
              render={(tax)=>tax?.Rooms?.length}
              />
              <Column dataIndex="CheckBookNo" title="เรียกดูหนังสือ"
              render={(text)=><Link to={`/edit/checkdocument/${text}`}>เรียกดูหนังสือ</Link>}
              />
              <Column dataIndex="TaxCheckBook" title="ไปที่เจ้าของทรัพย์สิน"
              render={(text)=><Link to={`/tax/${text}`}>เรียกดูหนังสือ</Link>}
              />

            </Table>
        </div>
    )
}

export default CheckDoc
