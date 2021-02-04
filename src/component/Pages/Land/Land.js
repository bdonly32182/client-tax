import React,{useEffect,useState} from 'react'
import Header from '../../Header'
import LandList from './LandList'
import {Divider,Select} from 'antd'
import CodelandModal from '../../Modal/CodelandModal'
import {useDispatch,useSelector} from 'react-redux'
import {fetchs_land} from '../../../store/action/LandAction'
function Land(props) {
    const dispatch = useDispatch();
    const lands = useSelector(state => state.lands)
    const [size,setSize] = useState("10")
    const {Option} = Select
    useEffect(() => {
        dispatch(fetchs_land());
    }, [dispatch]);
    const changeSelect = value =>{
        setSize(value)
    }
    return (
        <div style={{padding:10}}>
            <Header />
            <Divider />
            <Select onChange={changeSelect} defaultValue="10">
                    <Option value="10">10</Option>
                    <Option value="20">20</Option>
                    <Option value="50">50</Option>
                    <Option value="100">100</Option>
            </Select>
            <CodelandModal title="สร้างรหัสแปลงที่ดิน"/>
            <LandList lands ={lands} size={size}/>
        </div>
    )
}

export default Land
