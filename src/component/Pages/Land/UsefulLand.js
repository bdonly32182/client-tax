// import React,{useState,useEffect} from 'react'
// import { Divider, Input, Layout, Menu ,notification} from 'antd';
// import {useSelector} from 'react-redux'
// import UsefulModal from '../../Modal/UsefulModal'
// import UsefulTable from '../../Table/UsefulTable';
// import BuildingTable from '../../Table/BuildingTable';
// import BuildingModal from '../../Modal/BuildingModal'
// import axios from '../../../config/axios';
// import {useDispatch} from 'react-redux'
// import {FETCHS_BUILD_IN_USEFULLAND} from '../../../store/action/ActionType'
// import {edit_useful} from '../../../store/action/UsefulLandAction'
// const {  Content, Sider } = Layout;

// function UsefulLand(props) {
//     const dispatch = useDispatch();
//     const usefullands = useSelector(state => state.usefullands); //คือการใช้ประโยชน์ที่ดินทั้งหมด
//     const buildings = useSelector(state=>state.buildings)
//     const [useful,setUseful] = useState([]);
//     const [menukey,setMenukey] = useState(null);
//     const [balancePlace,setBalancePlace] = useState(0);
//     useEffect(() => {
//         if (usefullands) {
//             //sum place is used  for will know totalUsePlace
//             if (usefullands.length !== 0) {
//               let totalUseplace = usefullands.reduce((pre,{Place})=>pre + Place,0)//รวมผลของพื้นที่ทั้งหมด
//                 setBalancePlace(props.totalPlace - totalUseplace)
//             }
//             if (usefullands.length === 0) {
//                 setBalancePlace(props.totalPlace)
//             }       
//         }
//     }, [usefullands,props.totalPlace])
//     const onClickMenu =(menu)=>{
//         setMenukey(menu.key);
//         if (menu.key !== menukey) {
//                 axios.get(`/api/read/usefuls?useful_id=${menu.key}&Land_id=${props.code_land}`).then((result) => {
//                 setUseful(result.data);
//                 dispatch({type:FETCHS_BUILD_IN_USEFULLAND,payload:result.data.BuildOnUsefulLands})

//             }).catch((err) => {
//                 notification.error({message:'การเรียกดูข้อมูลการใช้ประโยชน์ของที่ดินล้มเหลว'})
//             });
//         };
        
//     }
//   const EditUseful = (id,body) => {
//     setUseful(body)
//   }
//     console.log(useful);
//     console.log(buildings);
//     return (
//         <>
//             <Layout style={{height:"100vh" , width:'180vh',margin:'4px 26px 0'}}>
//                 <UsefulModal button ="สร้าง" code_land={props.code_land} useful = {usefullands} balancePlace={balancePlace} tax_id_land={props.tax_id_land}/>
//                 <Sider
//                 breakpoint="lg"
//                 collapsedWidth="0"
               
//                 >
                
//                 <Input.Search></Input.Search>
                
//                 <Menu theme="light" mode="inline">
//                     {Array.isArray(usefullands)&&usefullands.map((useful,i)=>
                    
//                         <Menu.Item key={useful.useful_id}
//                         onClick={onClickMenu}
//                         >
//                             {useful.useful_id}
//                         </Menu.Item>
                        
//                     )}
                    
                   
//                 </Menu>
                
//                 </Sider>
//                 <Layout>
//                     <Content style={{ margin: '14px 16px 0' }}>
//                         <div  >
//                             {menukey?
//                             <>
//                             <UsefulTable ListUseful={useful} />
//                             <Divider />
//                             <BuildingModal button="สร้างสิ่งปลูกสร้าง" uid_tax={useful.UsefulLand_Tax_ID} TypeName={useful.TypeName} 
//                                     useful_id={useful.useful_id} buildings ={buildings}
//                                     code_land={props.code_land}
//                             />
//                             <BuildingTable buildings={buildings} TypeName={useful.TypeName} useful_id={useful.useful_id} code_land={props.code_land}/>
//                             </>
//                             :
//                             <>
//                             <UsefulTable />
//                             <Divider />
//                             <BuildingTable />
//                             </>
//                             }
//                         </div>
//                     </Content> 
//                 </Layout>
               
//          </Layout>
        
//         </>
//     )
// }

// export default UsefulLand

import React,{useState,useEffect} from 'react'
import { Divider, Input, Layout, Menu ,notification} from 'antd';
import {useSelector} from 'react-redux'
import UsefulModal from '../../Modal/UsefulModal'
import UsefulTable from '../../Table/UsefulTable';
import BuildingTable from '../../Table/BuildingTable';
import BuildingModal from '../../Modal/BuildingModal'
import axios from '../../../config/axios';
import {useDispatch} from 'react-redux'
import {FETCHS_BUILD_IN_USEFULLAND,FETCH_USEFUL_LAND} from '../../../store/action/ActionType'
const {  Content, Sider } = Layout;

function UsefulLand(props) {
    const dispatch = useDispatch();
    const useful = useSelector(state => state.usefullands); //คือการใช้ประโยชน์ที่ดินทั้งหมด
    const buildings = useSelector(state=>state.buildings)
    const [menukey,setMenukey] = useState(null);
    const [balancePlace,setBalancePlace] = useState(0);
    useEffect(() => {
        if (props.usefullands) {
            //sum place is used  for will know totalUsePlace
            if (props.usefullands.length !== 0) {
              let totalUseplace = props.usefullands.reduce((pre,{Place})=>pre + Place,0)//รวมผลของพื้นที่ทั้งหมด
                setBalancePlace(props.totalPlace - totalUseplace)
            }
            if (props.usefullands.length === 0) {
                setBalancePlace(props.totalPlace)
            }       
        }
    }, [props.usefullands,props.totalPlace])
    const onClickMenu =(menu)=>{
        setMenukey(menu.key);
        if (menu.key !== menukey) {
                axios.get(`/api/read/usefuls?useful_id=${menu.key}&Land_id=${props.code_land}`).then((result) => {
                dispatch({type:FETCH_USEFUL_LAND,payload:result.data})
                dispatch({type:FETCHS_BUILD_IN_USEFULLAND,payload:result.data.BuildOnUsefulLands})

            }).catch((err) => {
                notification.error({message:'การเรียกดูข้อมูลการใช้ประโยชน์ของที่ดินล้มเหลว'})
            });
        };
        
    }
    return (
        <>
            <Layout style={{height:"100vh" , width:'180vh',margin:'4px 26px 0'}}>
                <UsefulModal button ="สร้าง" code_land={props.code_land} useful = {props.usefullands} balancePlace={balancePlace} tax_id_land={props.tax_id_land}/>
                <Sider
                breakpoint="lg"
                collapsedWidth="0"
               
                >
                
                <Input.Search></Input.Search>
                
                <Menu theme="light" mode="inline">
                    {Array.isArray(props.usefullands)&&props.usefullands.map((useful,i)=>
                    
                        <Menu.Item key={useful.useful_id}
                        onClick={onClickMenu}
                        >
                            {useful.useful_id}
                        </Menu.Item>
                        
                    )}
                    
                   
                </Menu>
                
                </Sider>
                <Layout>
                    <Content style={{ margin: '14px 16px 0' }}>
                        <div  >
                            {menukey?
                            <>
                            <UsefulTable ListUseful={useful} />
                            <Divider />
                            <BuildingModal button="สร้างสิ่งปลูกสร้าง" uid_tax={useful.UsefulLand_Tax_ID} TypeName={useful.TypeName} 
                                    useful_id={useful.useful_id} buildings ={buildings}
                                    code_land={props.code_land}
                            />
                            <BuildingTable buildings={buildings} TypeName={useful.TypeName} useful_id={useful.useful_id} code_land={props.code_land}/>
                            </>
                            :
                            <>
                            <UsefulTable />
                            <Divider />
                            <BuildingTable />
                            </>
                            }
                        </div>
                    </Content> 
                </Layout>
               
         </Layout>
        
        </>
    )
}

export default UsefulLand

