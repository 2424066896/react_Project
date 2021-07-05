import React, {Component} from 'react';
import {
    Card,
    Form,
    Input,
    Cascader,
    Button,
    message,
} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import {reqAddOrUpdateProduct, requestGetCategoryLists} from "../../api";
import PicturesWall from "./pictures-wall";
import RichTextEditor from "./rich-text-editor";
const {Item} = Form
const {TextArea} = Input
class AddUpdate extends Component {
    state = {
        optionLists : []
    }
    constructor (props) {
        super(props)

        // 创建用来保存ref标识的标签对象的容器
        this.pw = React.createRef()
        this.editor = React.createRef()
    }
    onFinish = async (values) => {
        // const imgs = this.pw.current.getImgs()
        // console.log('Received values from form: ', values,imgs);
        // 1. 收集数据, 并封装成product对象
        const {name, desc, price, categoryIds} = values
        let pCategoryId, categoryId
        if (categoryIds.length===1) {
            pCategoryId = '0'
            categoryId = categoryIds[0]
        } else {
            pCategoryId = categoryIds[0]
            categoryId = categoryIds[1]
        }
        const imgs = this.pw.current.getImgs()
        const detail = this.editor.current.getDetail()

        const product = {name, desc, price, imgs, pCategoryId, categoryId,detail}

        // 如果是更新, 需要添加_id
        if(this.isUpdate) {
            product._id = this.product._id
        }

        // 2. 调用接口请求函数去添加/更新
        const result = await reqAddOrUpdateProduct(product)

        // 3. 根据结果提示
        if (result.status===0) {
            message.success(`${this.isUpdate ? '更新' : '添加'}商品成功!`)
            this.props.history.goBack()
        } else {
            message.error(`${this.isUpdate ? '更新' : '添加'}商品失败!`)
        }
    }


    initOptions = async (categorys)=> {
        // 根据categorys生成options数组
        const options = categorys.map(c => ({
            value: c._id,
            label: c.name,
            isLeaf: false, // 不是叶子

        }))

        // 如果是一个二级分类商品的更新
        const {isUpdate, product} = this
        const {pCategoryId} = product
        if(isUpdate && pCategoryId!=='0') {
            // 获取对应的二级分类列表
            const subCategorys = await this.getCategorys(pCategoryId)
            // 生成二级下拉列表的options
            const childOptions = subCategorys.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true
            }))

            // 找到当前商品对应的一级option对象
            const targetOption = options.find(option => option.value===pCategoryId)

            // 关联对应的一级option上
            if(targetOption){
                targetOption.children = childOptions
            }

        }


        this.setState({optionLists :options})

    }

    getCategorys = async (parentId)=> {
        const result = await requestGetCategoryLists(parentId)
        if(result.status===0){
            const categorys = result.data
            // 如果是一级分类列表
            if (parentId==='0') {
                this.initOptions(categorys)
            } else { // 二级列表
                return categorys  // 返回二级列表 ==> 当前async函数返回的promsie就会成功且value为categorys
            }
        }
    }
    componentDidMount() {
        //console.log(this.product)
        this.getCategorys('0')

    }
    // componentWillUnmount() {
    //     console.log('died')
    // }


    loadData = selectedOptions => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        // load options lazily
        setTimeout(async () => {
            // 根据选中的分类, 请求获取二级分类列表
            const subCategorys = await this.getCategorys(targetOption.value)
            // 隐藏loading
            targetOption.loading = false
            // 二级分类数组有数据
            if (subCategorys && subCategorys.length>0) {
                // 生成一个二级列表的options
                const childOptions = subCategorys.map(c => ({
                    value: c._id,
                    label: c.name,
                    isLeaf: true
                }))
                // 关联到当前option上
                targetOption.children = childOptions
            } else { // 当前选中的分类没有二级分类
                targetOption.isLeaf = true
            }
            // targetOption.children = [
            //     {
            //         label: `${targetOption.label} Dynamic 1`,
            //         value: 'dynamic1',
            //     },
            //     {
            //         label: `${targetOption.label} Dynamic 2`,
            //         value: 'dynamic2',
            //     },
            // ];


            this.setState({optionLists :[...this.state.optionLists]})
        }, 100);
    };
    onChange = (value, selectedOptions) => {
        //console.log(value, selectedOptions);
    };
    componentWillMount() {
        const product = this.props.location.state || null
        // 保存是否是更新的标识
        this.isUpdate = !!product
        // 保存商品(如果没有, 保存是{})
        this.product = product || {}
    }

    render() {
        const {pCategoryId, categoryId,imgs,detail} = this.product
        // 用来接收级联分类ID的数组
        const categoryIds = []
        if(this.isUpdate) {
            // 商品是一个一级分类的商品
            if(pCategoryId==='0') {
                categoryIds.push(categoryId)
            } else {
                // 商品是一个二级分类的商品
                categoryIds.push(pCategoryId)
                categoryIds.push(categoryId)
            }
        }


        const title = (
           <div>
               <Button onClick={()=>{this.props.history.goBack()}} type='link' icon={<ArrowLeftOutlined/>}></Button>
               <span>{this.isUpdate ? '修改商品' :'添加商品'}</span>
           </div>
        )

        const validatePrice = (_, value) => {
            if (value*1 > 0) {
                return Promise.resolve();
            }

            return Promise.reject(new Error('Price must be greater than zero!'));
        };

        // 指定Item布局的配置对象
        const formItemLayout = {
            labelCol: { span: 1.3 },  // 左侧label的宽度
            wrapperCol: { span: 8 }, // 右侧包裹的宽度
        }

        return (
           <Card title={title}>
               <Form {...formItemLayout}
                     onFinish={this.onFinish}
                     initialValues={{ name: this.product.name ,
                     desc:this.product.desc,
                     price:this.product.price,
                     categoryIds:categoryIds
                     }}
               >
                   <Item name = 'name' label="商品名称"
                         rules={[{ required: true, message: '请输入商品名称！' }]}
                   >
                       <Input placeholder='请输入商品名称'/>
                   </Item>
                   <Item name = 'desc' label="商品描述"
                         rules={[{ required: true, message: '请输入商品描述！' }]}
                   >
                       <TextArea placeholder="请输入商品描述" autosize={{ minRows: 2, maxRows: 6 }} />
                   </Item>
                   <Item name = 'price' label="商品价格"
                         rules={[{ required: true, message: '请输入商品价格！' }
                            , {validator: validatePrice}
                         ]}
                   >
                       <Input type='number' placeholder='请输入商品价格' addonAfter='元'/>
                   </Item>

                   <Item label="商品分类" name='categoryIds'>
                       <Cascader   placeholder='请指定商品分类'
                           options={this.state.optionLists}
                           loadData={this.loadData}
                           onChange={this.onChange} changeOnSelect
                       />
                   </Item>
                   <Item label="商品图片">
                       <PicturesWall imgs={imgs} ref={this.pw}></PicturesWall>
                   </Item>
                   <Item label="商品详情"  wrapperCol={{span: 20}}>
                       <RichTextEditor ref={this.editor} detail={detail}/>
                   </Item>
                   <Item>
                       <Button htmlType="submit" type='primary'>提交</Button>
                   </Item>
               </Form>


           </Card>
        );
    }
}

export default AddUpdate;