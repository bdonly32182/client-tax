import React,{useEffect} from 'react'
import BuildInTaxTable from '../../Table/BuildInTaxTable'
import {useDispatch,useSelector} from 'react-redux'
import {fetchs_building} from '../../../store/action/BuildingAction'
function Build(props) {
    const dispatch = useDispatch();
    const buildings = useSelector(state=>state.buildings)
    useEffect(() => {
        dispatch(fetchs_building())
    }, [dispatch])
    return (
        <div style={{padding:'15px'}}>
           <BuildInTaxTable building = {buildings} size="large"/>
        </div>
    )
}

export default Build
