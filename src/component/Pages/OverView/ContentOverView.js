import React from 'react'
import {Statistic , Card, Col, Row,Divider} from 'antd';
function ContentOverView({Income,Year,Headstatistic}) { 
    const {totalEmptyType,totalLiveType,totalOtherType,totalFarmType,RoomOtherType,RoomLiveType,RoomEmptyType} = Headstatistic;
    console.log(Headstatistic);
    return (
        <>
            <Row>
                <Col span={24}>
                    <Card 
                    hoverable
                    title={`สรุปผลการประเมินค่าภาษี (ข้อมูลยอดประเมินจากเอกสารทั้งหมดประจำปี พ.ศ. ${Year})`}
                    actions={[
                        ` หมายเหตุ ยอดที่แสดงทั้งหมด "เป็นยอดที่บันทึก ภ.ด.ส.6 ของปี ${Year}" เท่านั้น`
                        ]}

                    >
                        <Row >
                            <Col span={1}/>
                            <Col span={5}>
                                <b>ยอดภาษีที่คำนวณได้ทั้งสิ้น</b>
                                <Statistic
                                value={Income&&Income[0]?.totalPriceOfTax.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2})}
                                />  
                            </Col>
                            <Col span={1}/>
                             <Col span={5}>
                                 <b>ส่วนลดทั้งสิ้น</b>
                                <Statistic
                                value={Income&&Income[0]?.PriceExceptEmergency.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2})}
                                /> 
                             </Col>
                             <Col span={1}/>
                            <Col span={5}>
                                <b>ส่วนต่าง - บรรเทา</b>
                                <Statistic
                                value={Income&&Income[0]?.totalBuilaAndLandYear.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2})}
                                /> 
                            </Col>
                            <Col span={1}/>
                             <Col span={5}>
                                <b>ยอดภาษีที่ต้องจัดเก็บทั้งสิ้น</b>
                                <Statistic
                                value={Income&&Income[0]?.BriefTotal.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2})}
                                /> 
                             </Col> 
                              
                            
                        </Row>
                            
                    </Card>
               </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Card title="จำแนกค่าภาษีตามการใช้ประโยชน์ในแปลงที่ดินและสิ่งปลูกสร้าง">
                        <Row>

                            <Col span={1}/>
                            <Col span={5}>
                                    <b>ภาษีของประเภทอยู่อาศัย</b>
                                    <Statistic
                                    value={Income&&Income[0]?.PriceLiveUseful.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2})}
                                    /> 
                                    <Divider />
                                    <Statistic
                                    value={totalLiveType?.toLocaleString()}
                                    /> 
                            </Col> 
                            <Col span={1}/>
                            <Col span={5}>
                                    <b>ภาษีของประเภทอื่นๆ</b>
                                    <Statistic
                                    value={Income&&Income[0]?.PriceOtherUseful.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2})}
                                    /> 
                                    <Divider />
                                    <Statistic
                                    value={totalOtherType?.toLocaleString()}
                                    /> 
                            </Col>
                            <Col span={1}/>
                            <Col span={5}>
                                    <b>ภาษีของประเภทว่างเปล่า</b>
                                    <Statistic
                                    value={Income&&Income[0]?.PriceEmptyUseful.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2})}
                                    /> 
                                    <Divider />
                                    <Statistic
                                    value={totalEmptyType?.toLocaleString()}
                                    /> 
                                   
                            </Col>
                            <Col span={1}/>
                            <Col span={5}>
                                    <b>ภาษีของประเภทเกษตร</b>
                                    <Statistic
                                    value={Income&&Income[0]?.PriceFarmUseful.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2})}
                                    /> 
                                    <Divider />
                                    <Statistic
                                    value={totalFarmType?.toLocaleString()}
                                    /> 
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Card title="จำแนกค่าภาษีตามการใช้ประโยชน์ในห้องชุด">
                        <Row>

                            <Col span={1}/>
                            <Col span={5}>
                                    <b>ภาษีของประเภทอยู่อาศัย</b>
                                    <Statistic
                                    value={Income&&Income[0]?.PriceLiveRoom.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2})}
                                    /> 
                                     <Divider />
                                    <Statistic
                                    value={RoomLiveType?.toLocaleString()}
                                    /> 
                            </Col> 
                            <Col span={1}/>
                            <Col span={5}>
                                    <b>ภาษีของประเภทอื่นๆ</b>
                                    <Statistic
                                    value={Income&&Income[0]?.PriceOtherRoom.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2})}
                                    /> 
                                     <Divider />
                                    <Statistic
                                    value={RoomOtherType?.toLocaleString()}
                                    /> 
                                    
                            </Col>
                            <Col span={1}/>
                            <Col span={5}>
                                    <b>ภาษีของประเภทว่างเปล่า</b>
                                    <Statistic
                                    value={Income&&Income[0]?.PriceEmptyRoom.toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2})}
                                    /> 
                                     <Divider />
                                    <Statistic
                                    value={RoomEmptyType?.toLocaleString()}
                                    /> 
                            </Col>
                            
                        </Row>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ContentOverView
