import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import TaxTable from '../../Table/TaxTable'
import {fetchs_taxs} from '../../../store/action/TaxAction'
import Header from '../../Header' 
import {Select} from 'antd'
function Tax(props) {
    const dispatch =useDispatch()
    const [size,setSize] = useState("10");
    const {Option} = Select
    const taxs = useSelector(state=>state.taxs)
    useEffect(() => {
        dispatch(fetchs_taxs(size,0))
    }, [dispatch,size])
    console.log(taxs);
    const HandleChangePage =(pagination, filters, sorter) =>{
        console.log(pagination);
    }
    const changeSelect = value =>{
        console.log(value);
        setSize(value)
    }
    return (
        <div style={{padding:10}}>
            <Header />
            <Select onChange={changeSelect} defaultValue="10">
                    <Option value="10">10</Option>
                    <Option value="20">20</Option>
                    <Option value="50">50</Option>
                    <Option value="100">100</Option>


            </Select>
            <TaxTable tax={taxs} HandleChangePage={HandleChangePage} changeSelect={changeSelect} size={size}/>
        </div>
    )
}

export default Tax
