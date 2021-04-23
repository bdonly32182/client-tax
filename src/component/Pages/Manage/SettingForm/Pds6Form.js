import React,{useState,useEffect} from 'react'
import {Row} from 'antd'
import jwtDecode from 'jwt-decode';
import LocalStorageService from '../../../../LocalStorage/LocalStorageSevice'
import axios from '../../../../config/axios';
import DistrictTable from '../../../Table/DistrictTable';
function Pds6Form() {
    let token  = LocalStorageService.getToken();
    let jwt = jwtDecode(token);
    const [district, setDistrict] = useState({});
    useEffect(() => {
        axios.get(`/api/readbyid/${jwt?.distict_id}`).then((result) => {
            setDistrict(result.data)
        }).catch((err) => {
        });
    }, [])
    return (
        <div >
            <Row >
              <b>{`เดือนที่ชำระภาษีประจำปีที่บันทึกในระบบ​ : ${district?.MonthPay}`} </b>
              
            </Row>
            <Row>
                <b>{`หัวหน้าฝ่ายรายได้รายเขต${district?.District_name} : ${district?.LeaderOfDistrict}`}</b>
            </Row>
            <Row>
                <b>{`เลขหนังสือส่งออกของเขต${district?.District_name} : ${district?.ExportBookNo}`}</b>
            </Row>
            <Row>
                <DistrictTable districts={[district]}/>
            </Row>
        </div>
    )
}

export default Pds6Form
