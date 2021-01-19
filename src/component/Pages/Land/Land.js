import React,{useEffect} from 'react'
import Header from '../../Header'
import LandList from './LandList'
import {Divider} from 'antd'
import CodelandModal from '../../Modal/CodelandModal'
import {useDispatch,useSelector} from 'react-redux'
import {fetchs_land} from '../../../store/action/LandAction'
function Land(props) {
    const dispatch = useDispatch();
    const lands = useSelector(state => state.lands)
    useEffect(() => {
        dispatch(fetchs_land());
    }, [dispatch]);
    console.log(lands);
    return (
        <div style={{padding:10}}>
            <Header />
            <Divider />
            <CodelandModal />
            <LandList lands ={lands}/>
        </div>
    )
}

export default Land
