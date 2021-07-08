import React,{useState} from 'react'
import {Col, Image, Upload,Row, Button, notification} from 'antd'
import axios from '../../../config/axios'
function ImportExcel() {
    const [thanaruk,setThanaruk] = useState(null);
    const [priceZero,setPriceZero] = useState(null);
    const [land, setLand] = useState(null)
    const [customers, setCustomers] = useState(null);
    const [condo,setCondo] = useState(null);
    const [room,setRoom] = useState(null); 
    const UploadThanaruk =  {
        beforeUpload:file=>{
            setThanaruk(file);
            return false
        }
    }
    const HandleThanaruk = () => {
        const formData = new FormData();
        formData.append('file',thanaruk)
        axios.post(`/api/excel/upload/land`,formData).then((result) => {
            notification.success({message:result.data.message})
        }).catch((err) => {
            notification.error({message:'อัพโหลดไฟล์ราคาประเมินที่ดินล้มเหลว'})
        });
    }
    const uploadPriceZero = {
        beforeUpload:file=>{
            setPriceZero(file);
            return false
        }
    }
    const uploadLand = {
        beforeUpload:file=>{
            setLand(file);
            return false
        }
    }
    const handleLand = () => {
        const formData = new FormData();
        formData.append('file',land);
        axios.post(`/api/excel/upload/relationland`,formData).then((result) => {
            notification.success({message:result.data.message})
        }).catch((err) => {
            notification.error({message:'อัพโหลดไฟล์จากกรมที่ดินล้มเหลว'})
        });
    }
    const handlePriceZero = ()=>{
        const formData = new FormData();
        formData.append('file',priceZero);
        axios.post(`/api/excel/upload/landpricezero`,formData).then((result) => {
            notification.success({message:result.data.message})
        }).catch((err) => {
            notification.error({message:'อัพโหลดไฟล์ราคาประเมินที่ดินล้มเหลว'})

        });
    }
    const uploadCustomer = {
        beforeUpload:file=>{
            setCustomers(file);
            return false
        }
    }
    const handleCustomer =()=>{
        const formData = new FormData();
        formData.append('file',customers);
        axios.post(`/api/excel/upload/customer`,formData).then((result) => {
            notification.success({message:result.data.message})

        }).catch((err) => {
            notification.error({message:'อัพโหลดไฟล์ลูกภาษีล้มเหลว'})

        });
    }
    const uploadRoom = {
        beforeUpload:file=>{
            setRoom(file);
            return false
        }
    }
    const handleRoom =()=>{
        const formData = new FormData();
        formData.append('file',room);
        axios.post(`/api/excel/upload/room`,formData).then((result) => {
            notification.success({message:result.data.message})
        }).catch((err) => {
            notification.error({message:'อัพโหลดไฟล์ห้องชุดล้มเหลว'})
        });
    }
    const uploadCondo = {
        beforeUpload:file=>{
            setCondo(file);
            return false
        }
    }
    const handleCondo =()=>{
        const formData = new FormData();
        formData.append('file',condo);
        axios.post(`/api/excel/upload/condo`,formData).then((result) => {
            notification.success({message:result.data.message})
        }).catch((err) => {
            notification.error({message:'อัพโหลดไฟล์ห้องชุดล้มเหลว'})
        });
    }
    return (
        <div>
            <h1 style={{color:'#DC2837'}}><u>ที่ดิน</u> </h1>
            <Row >
                <Col style={{paddingLeft:'16px'}}>
                <div style={{borderRadius:'10px',width:250}}>
                    <b>ไฟล์ข้อมูลแปลงที่ดินและผู้ครอบครอง</b>
                    <Image src="exampleThanaruk.png" style={{padding:'10px 0px 10px 0px',height:140}}/>
                    <Upload {...UploadThanaruk}>
                       <Button style={{width:250,backgroundColor:'green',color:'white'}}>เลือกไฟล์ excel ของกรมธนารักษ์</Button>
                    </Upload>
                    <Button 
                    onClick={HandleThanaruk}
                    style={{backgroundColor:'#F5C813',width:250}}>อัพโหลดไฟล์แปลงที่ดินและผู้ครอบครอง</Button>
                </div>
                </Col>
                {/* <Col style={{paddingLeft:'46px'}}>
                <div style={{borderRadius:'10px',width:250}}>
                    <b>ตัวอย่างคอลัมน์ไฟล์ที่ไม่มีราคาประเมิน </b>
                    <Image src="exampleRateLandZero.png" style={{padding:'10px 0px 10px 0px',height:140}}/>
                    <Upload {...uploadPriceZero}>
                    <Button style={{width:250,backgroundColor:'green',color:'white'}}>เลือกไฟล์ excel ของกรมธนารักษ์</Button>
                    </Upload>
                    <Button onClick={handlePriceZero}
                    style={{backgroundColor:'#F5C813',width:250}}>อัพโหลดไฟล์กรมธนารักษ์</Button>
                 </div>
                </Col>
                <Col style={{paddingLeft:'46px'}}>
                <div style={{borderRadius:'10px',width:250}}>
                    <b>ตัวอย่างคอลัมน์ไฟล์ของผู้เสียภาษี </b>
                    <Image src="ExampleCustomer.png" style={{padding:'10px 0px 10px 0px',height:140}}/>
                    <Upload {...uploadCustomer}>
                    <Button style={{width:250,backgroundColor:'green',color:'white'}}>เลือกไฟล์ excel ของกรมที่ดิน</Button>
                    </Upload>
                    <Button 
                    onClick={handleCustomer}
                    style={{backgroundColor:'#F5C813',width:250}}>อัพโหลดไฟล์ของกรมที่ดิน</Button>

                 </div>
                </Col>
                <Col style={{paddingLeft:'46px'}}>
                <div style={{borderRadius:'10px',width:250}}>
                    <b>ตัวอย่างคอลัมน์ไฟล์ของกรมที่ดิน </b>
                    <Image src="Relation.png" style={{padding:'10px 0px 10px 0px',height:140}}/>
                    <Upload {...uploadLand}>
                    <Button style={{width:250,backgroundColor:'green',color:'white'}}>เลือกไฟล์ excel ของกรมที่ดิน</Button>
                    </Upload>
                    <Button 
                    onClick={handleLand}
                    style={{backgroundColor:'#F5C813',width:250}}>อัพโหลดไฟล์ของกรมที่ดิน</Button>

                </div>
                </Col>
                 */}
                
            </Row>
            <h1 style={{paddingTop:'20px',color:'#175DB8'}}><u>อาคารชุด</u></h1>
            <Row >
                <Col style={{paddingLeft:'16px'}}>
                <div style={{borderRadius:'10px',width:250}}>
                    <b>ไฟล์ข้อมูลห้องชุดและผู้ครอบครอง </b>
                    <Image src="ExampleCustomer.png" style={{padding:'10px 0px 10px 0px',height:140}}/>
                    <Upload {...uploadCustomer}>
                    <Button style={{width:250,backgroundColor:'green',color:'white'}}>เลือกไฟล์ excel ของกรมที่ดิน</Button>
                    </Upload>
                    <Button 
                    onClick={handleCustomer}
                    style={{backgroundColor:'#F5C813',width:250}}>อัพโหลดไฟล์ของกรมที่ดิน</Button>

                 </div>
                </Col>
                {/* <Col style={{paddingLeft:'46px'}}>
                <div style={{borderRadius:'10px',width:250}}>
                    <b>ตัวอย่างคอลัมน์ไฟล์ของอาคารชุด </b>
                    <Image src="ExampleCondo.png" style={{padding:'10px 0px 10px 0px',height:140}}/>
                    <Upload {...uploadCondo}>
                    <Button style={{width:250,backgroundColor:'green',color:'white'}}>เลือกไฟล์ excel ของกรมที่ดิน</Button>
                    </Upload>
                    <Button 
                    onClick={handleCondo}
                    style={{backgroundColor:'#F5C813',width:250}}>อัพโหลดไฟล์ของกรมที่ดิน</Button>

                 </div>
                </Col>
                <Col style={{paddingLeft:'46px'}}>
                <div style={{borderRadius:'10px',width:250}}>
                    <b>ตัวอย่างคอลัมน์ไฟล์ของกรมที่ดินห้องชุด </b>
                    <Image src="ExampleRoom.png" style={{padding:'10px 0px 10px 0px',height:140}}/>
                    <Upload {...uploadRoom}>
                    <Button style={{width:250,backgroundColor:'green',color:'white'}}>เลือกไฟล์ excel ของกรมที่ดิน</Button>
                    </Upload>
                    <Button
                    onClick={handleRoom}
                     style={{backgroundColor:'#F5C813',width:250}}>อัพโหลดไฟล์ของกรมที่ดิน</Button>

                </div>
                </Col> */}
            </Row>
        </div>
    )
}

export default ImportExcel
