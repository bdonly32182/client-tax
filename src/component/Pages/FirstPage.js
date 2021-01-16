import React from 'react'
import Header from '../Header'
import {Row,Avatar,Image} from 'antd'
import MainCard from '../Card/MainCard'
import AdminPage from './AdminPage'
function FirstPage(props) {
    const card =[
        {icon:<Avatar size={70} icon={<Image src="/folder.png" width={40}preview={false}/>} style={{ backgroundColor: '#27A7B2' }}/>,
        title:'เอกสาร',
        description:'จัดการเกี่ยวกับเอกสาร',
        path:'/folder'
        },
        {icon:<Avatar size={70} icon={<Image src="/plant.png" width={40}preview={false}/>} style={{ backgroundColor: '#27A7B2' }}/>,
        title:'ทะเบียนที่ดิน',
        description:'รายการที่ดินทั้งหมดในระบบ',
        path:'/land'

        },
        {icon:<Avatar size={70} icon={<Image src="/home.png" width={40}preview={false}/>} style={{ backgroundColor: '#27A7B2' }}/>,
        title:'ทะเบียนสิ่งปลูกสร้าง',
        description:'รายการสิ่งปลูกสร้างทั้งหมดในระบบ',
        path:'/building'

        },
        {icon:<Avatar size={70} icon={<Image src="/appartment.png" width={40}preview={false}/>} style={{ backgroundColor: '#27A7B2' }}/>,
        title:'ทะเบียนอาคารชุด',
        description:'รายการอาคารชุดทั้งหมดในระบบ',
        path:'/condo'

        },
        {icon:<Avatar size={70} icon={<Image src="/user.png" width={40}preview={false} />} style={{ backgroundColor: '#27A7B2' }}/>,
        title:'ประชาชน',
        description:'รายชื่อประชาชนของแต่ละเขต',
        path:'/customer'

        },
        {icon:<Avatar size={70} icon={<Image src="/money.png" width={50}preview={false}/>} style={{ backgroundColor: '#27A7B2' }}/>,
        title:'ราคาประเมินที่ดิน',
        description:'ข้อมูลล่าสุดจากกรมธนารักษ์',
        path:'/rate/land'

        },
        {icon:<Avatar size={70} icon={<Image src="/building-land.png" width={40}preview={false}/>} style={{ backgroundColor: '#27A7B2' }}/>,
        title:'ราคาประเมิณสิ่งปลูกสร้าง',
        description:'ข้อมูลล่าสุดจากกรมธนารักษ์',
        path:'/rate/build'

        },
        {icon:<Avatar size={70} icon={<Image src="/group.png" width={40}preview={false}/>} style={{ backgroundColor: '#27A7B2' }}/>,
        title:'กลุ่มเจ้าของทรัพย์สิน',
        description:'กลุ่มเจ้าของทรัพย์สินทั้งหมดในแต่ละเขต',
        path:'/tax'

        }
        

    ]
   
    const cardfunc = (cards)=>{
        return cards.map(card =><MainCard card ={card} key={card.title} path={card.path}/>)
    }
    return (
        <div >
            
            
            {props.role === 'employee' ||props.role === 'leader'?
            <>
            <Header />
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{paddingLeft:160}}>
                    {cardfunc(card)}
                
            </Row>
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
