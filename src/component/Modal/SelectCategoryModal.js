import React,{useState} from 'react'
import {Modal,Select,Button,Popover} from 'antd'
import {category_customer} from '../Select/data'
function SelectCategoryModal(props) {
    const {Option} = Select;
    const [visible ,setVisible] = useState(false);
    const [valueSelect,setValueSelect] = useState('บุคคล');
    const {generateClick,generate_tax_id} = props
    const onClickOk =()=> {
        generate_tax_id(valueSelect)
        setVisible(false)
    }
    const content = (
        <div>
            <p>{props.popover}</p>
        </div>
    );
    return (
        <div>
            <Popover content={content}  >
               <Button onClick={()=>setVisible(true)} disabled={generateClick||false} 
                style={props.style}
                >
                {props.titleButton}
            </Button> 
            </Popover>
            
            <Modal 
            visible={visible}
            onCancel={()=>setVisible(false)}
            onOk={onClickOk}
            >
                <Select defaultValue="บุคคล"
                        onChange={(value)=>setValueSelect(value)}
                >
                    {category_customer.map(category =><Option value={category} key={category}>{category}</Option>)}
                    
                </Select>
            </Modal>
        </div>
    )
}

export default SelectCategoryModal
