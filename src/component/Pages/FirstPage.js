import React from 'react'
import Header from '../Header'
import {Row,Avatar,Image} from 'antd'
import {FolderOpenFilled,BarChartOutlined,AreaChartOutlined}from '@ant-design/icons'
import MainCard from '../Card/MainCard'
import AdminPage from './AdminPage'
function FirstPage(props) {
    const card =[
        {icon:<Avatar size={70} icon={<AreaChartOutlined />} style={{ backgroundColor: '#9FC1E3' }}/>,
        title:'ภาพรวม',
        description:'ภาพรวมและสถิติของทั้งเขต',
        path:`/overview`
        },
        {icon:<Avatar size={70} icon={<FolderOpenFilled/>} style={{ backgroundColor: '#9FC1E3' }}/>,
        title:'เอกสาร',
        description:'จัดการเกี่ยวกับเอกสาร',
        path:'/document'
        },
        {icon:<Avatar size={70} icon={<Image src="/treee.png" width={35}preview={false}/>} style={{ backgroundColor: '#9FC1E3' }}/>,
        title:'ทะเบียนที่ดิน',
        description:'รายการที่ดินทั้งหมดในระบบ',
        path:'/land'

        },
        {icon:<Avatar size={70} icon={<Image src="/homes.png" width={35}preview={false}/>} style={{ backgroundColor: '#9FC1E3'}}/>,
        title:'ทะเบียนสิ่งปลูกสร้าง',
        description:'รายการสิ่งปลูกสร้างทั้งหมดในระบบ',
        path:'/building'

        },
        {icon:<Avatar size={70} icon={<Image src="/building.png" width={35}preview={false}/>} style={{ backgroundColor: '#9FC1E3' }}/>,
        title:'ทะเบียนอาคารชุด',
        description:'รายการอาคารชุดทั้งหมดในระบบ',
        path:'/condo'

        },
        {icon:<Avatar size={70} icon={<Image src="/users.png" width={35}preview={false}/>} style={{ backgroundColor: '#9FC1E3' }}/>,
        title:'ประชาชน',
        description:'รายชื่อประชาชนของแต่ละเขต',
        path:'/customer'

        },
        {icon:<Avatar size={70} icon={<Image src="/rate.png" width={35}preview={false}/>} style={{ backgroundColor: '#9FC1E3' }}/>,
        title:'ราคาประเมินที่ดิน',
        description:'ข้อมูลล่าสุดจากกรมธนารักษ์',
        path:'/rate/land'

        },
        {icon:<Avatar size={70} icon={<BarChartOutlined/>} style={{ backgroundColor: '#9FC1E3' }}/>,
        title:'ราคาประเมินสิ่งปลูกสร้าง',
        description:'ข้อมูลล่าสุดจากกรมธนารักษ์',
        path:'/rate/build'

        },
        {icon:<Avatar size={70} icon={<Image src="/taxs.png" width={35}preview={false}/>} style={{ backgroundColor: '#9FC1E3' }}/>,
        title:'กลุ่มเจ้าของทรัพย์สิน',
        description:'กลุ่มเจ้าของทรัพย์สินทั้งหมดในแต่ละเขต',
        path:'/tax'

        }
        

    ]  
    return (
        <div style={{backgroundColor:'whitesmoke',height:"100%",width:'100%'}}>
            
            
            {props.role === 'employee' ||props.role === 'leader'?
            <>
            <Header />
            <div style={{padding:'50px',marginTop:'20px'}}>
                <Row >
                    {<MainCard card ={card}/>}
                    
                </Row>   
            </div>
            
            </>
            :null
            }
            {props.role ==='admin'&&
                <div >
                    <AdminPage />
                </div>
            }
        </div>
    )
}

export default FirstPage
