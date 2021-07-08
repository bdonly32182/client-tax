import React,{useEffect,useState} from 'react'
import Header from '../../Header'
import LandList from './LandList'
import CodelandModal from '../../Modal/CodelandModal'
import {useDispatch,useSelector} from 'react-redux'
import {fetchs_land} from '../../../store/action/LandAction'
import FilterLand from '../../SearchFilter/FilterLand'
function Land(props) {
    const dispatch = useDispatch();
    const lands = useSelector(state => state.lands);
    useEffect(() => {
        dispatch(fetchs_land());
    }, [dispatch]);
    return (
        <div >
            <Header />
            <div style={{padding:10}}>                
                <CodelandModal title="สร้างรหัสแปลงที่ดิน"/>
                <FilterLand />
                <LandList lands ={lands}  />
            </div>
            
        </div>
    )
}

export default Land
