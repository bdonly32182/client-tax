import React,{useEffect,useState} from 'react'
import Header from '../../Header'
import LandList from './LandList'
import {Divider,Select} from 'antd'
import CodelandModal from '../../Modal/CodelandModal'
import {useDispatch,useSelector} from 'react-redux'
import {fetchs_land} from '../../../store/action/LandAction'
import FilterLand from '../../SearchFilter/FilterLand'
function Land(props) {
    const dispatch = useDispatch();
    const lands = useSelector(state => state.lands)
    const {Option} = Select
    useEffect(() => {
        dispatch(fetchs_land());
    }, [dispatch]);
    console.log(lands);
    return (
        <div style={{padding:10}}>
            <Header />
            <Divider />
            
            <CodelandModal title="สร้างรหัสแปลงที่ดิน"/>
            <FilterLand />
            <LandList lands ={lands} />
        </div>
    )
}

export default Land
