import React, {Component} from 'react';
import { Form, Input, Select } from 'antd';
import PropTypes  from 'prop-types'
import { FormInstance } from 'antd/lib/form';
const Item = Form.Item
const  Option= Select.Option
class UpdateForm extends Component {
    static  propTypes = {
        categoryName:PropTypes.string.isRequired,
        saveForm:PropTypes.func.isRequired
    }



    formRef = React.createRef()


    componentDidMount() {
        this.props.saveForm(this.formRef)
    }

    render() {


        const  { categoryName}  = this.props
        return (
            <>
                <Form ref={this.formRef}
                    initialValues={{
                        categoryName: categoryName
                    }}

                >
                    <Item name='categoryName'>
                        <Input></Input>
                    </Item>

                </Form>
            </>
        );
    }
}

export default UpdateForm;