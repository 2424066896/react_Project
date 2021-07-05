import React, {Component} from 'react';
import { Form, Input, Select } from 'antd';
import PropTypes from  'prop-types'
//const Item = Form.Item
const {Item}= Form
//const  Option= Select.Option
const {Option}= Select

class AddForm extends Component {
    state = {
        parentId:'',
        categories:[],
        subCategories:[],
        name:''
    }
    static propTypes = {
        parentId: PropTypes.string.isRequired,
        categories: PropTypes.array.isRequired,
        saveForm : PropTypes.func.isRequired
    }


    formRef = React.createRef()
    componentDidMount() {

        this.props.saveForm(this.formRef)
    }




    render() {

        const {parentId,categories,subCategories} = this.props


        return (
            <>
                <Form
                    initialValues={{
                    select1:parentId,
                        input:''
                    }}
                    ref={this.formRef}
                >
                   <Item name='select1'>
                       <Select  style={{width:'100%'}}>

                           <Option value={'0'}>一级分类</Option>


                           {

                           categories.map((cItem)=>{
                                   return (
                                       <Option key={cItem._id} value={cItem._id}>{cItem.name}</Option>
                                   )
                               })
                           }

                       </Select>
                   </Item>

                    <Item name='input'
                    rules={[
                        {required:true,message:'分类名是必须的'}
                    ]}
                    >
                        <Input></Input>
                    </Item>

                </Form>
            </>
        );
    }
}

export default AddForm;