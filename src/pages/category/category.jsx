import React, {Component} from 'react';
import {Button, Card, Space, Table, message, Pagination,Modal} from 'antd';

import
{PlusOutlined
,SendOutlined
}
 from '@ant-design/icons';
import {requestGetCategoryLists ,requestUpdateCategory,requestAddCategory} from "../../api";
import AddForm from "./add-form";
import UpdateForm from "./update-form";
const { Column } = Table;
// const dataSource = [
//     {
//         "parentId": "0",
//         "_id": "5e12b8bce31bb727e4b0e348",
//         "name": "家用电器",
//         "__v": 0
//     },
//     {
//         "parentId": "0",
//         "_id": "5e130e60e31bb727e4b0e34b",
//         "name": "手机",
//         "__v": 0
//     },
//     {
//         "parentId": "0",
//         "_id": "5e130ec7e31bb727e4b0e34c",
//         "name": "洗衣机",
//         "__v": 0
//     },
//     {
//         "parentId": "0",
//         "_id": "5e1346533ed02518b4db0cd7",
//         "name": "图书",
//         "__v": 0
//     },
//     {
//         "parentId": "0",
//         "_id": "5e13467e3ed02518b4db0cd8",
//         "name": "杯具",
//         "__v": 0
//     },
//     {
//         "parentId": "0",
//         "_id": "5e1346c83ed02518b4db0cd9",
//         "name": "纸",
//         "__v": 0
//     },
//     {
//         "parentId": "0",
//         "_id": "5e144dc7297c1138787e96ab",
//         "name": "服装",
//         "__v": 0
//     },
//     {
//         "parentId": "0",
//         "_id": "5e144de1297c1138787e96ac",
//         "name": "玩具",
//         "__v": 0
//     },
//     {
//         "parentId": "0",
//         "_id": "5e16e37e49dc6b38d018fe28",
//         "name": "手机",
//         "__v": 0
//     },
//     {
//         "parentId": "0",
//         "_id": "5e16e38949dc6b38d018fe29",
//         "name": "三星",
//         "__v": 0
//     },
//     {
//         "parentId": "0",
//         "_id": "5fc0bf33eb957f1b94f4a959",
//         "name": "医药",
//         "__v": 0
//     }
// ]
class Category extends Component {

    state={
        categories:[],//一级分类
        subCategories:[],//子分类
        loading:false,
        parentId:'0',
        parentName:'',
        showStates:0
    }

    //异步获取分类列表显示
    getCategoryLists =async(parentId)=>{
        //发异步ajax请求获取数据

        //const {parentId}= this.state

        const {loading} = this.state
        parentId = parentId || this.state.parentId
        this.setState({loading:true})
        //console.log('a')
        const  result = await requestGetCategoryLists(parentId)
        //console.log('result',result)
        //console.log('b')
        this.setState({loading:false})

        if(result.status===0){
            const categories = result.data
            //跟新一级分类列表
            if(parentId==='0'){
                this.setState({categories})
            } else {
                this.setState({subCategories:categories})
            }

        } else {
            message.error('获取分类列表数据失败')
        }

    }

    componentDidMount() {
        this.getCategoryLists()
    }

    showSubCategoryLists = (categoryItem)=>{

        this.setState({parentId:categoryItem._id,parentName:categoryItem.name},()=>{
            const {parentId} = this.state
            this.getCategoryLists(parentId)
        })

    }
    //显示一级分类列表
    showFirstCateGoryList = ()=>{
        this.setState({
            parentId:'0',
            subCategories:[],
            parentName:''
        })
    }
    //添加分类的方法--------------------
     handleOkAdd = () => {
         //表单验证
         this.form.current.validateFields().then(
            async (values) => {
                 const {select1, input} = values
                    const categoryName = input
                    const parentId = select1
                 const result = await requestAddCategory({parentId, categoryName})
                 if(result.status===0){  //请求ok
                     if(parentId===this.state.parentId){
                         this.getCategoryLists()
                     }else if(parentId==='0'){  //在二级分类里面添加一级分类，不改变状态的情况下获取一级分类列表
                         this.getCategoryLists('0')
                     }

                 }
                 this.setState({showStates:0})

             }
         ).catch(err=>{

         })

     }


    //点击ok后修改，注意不能在updateCategory方法中处理业务逻辑，因为此时还没有form对象，setstate是异步更新的
    handleOkUpdate =async () => {
        //义务逻辑
        //获取用户输入的值

        const categoryId = this.id
        const  categoryName = this.form.current.getFieldValue('categoryName')
        //发送请求更新分类
        const result =  await requestUpdateCategory({categoryId,categoryName})

        if(result.status===0) {
            //重新显示列表
            this.getCategoryLists()
        }else {
            message.error('请求失败！')
        }



        this.setState({showStates:0})
    };

     handleCancel = () => {
         this.setState({showStates:0})
    };
     //添加分类
    addCategory = ()=>{
        //
       // this.form.current.getFieldsValue
        this.setState({showStates:1})
    }

    updateCategory = (categoryItem)=>{
        this.name = categoryItem.name
        this.id = categoryItem._id
        //console.log('a')
        this.setState({showStates:2},()=>{
            //
            // setTimeout(()=>{
            //     console.log(this.form.current.getFieldValue('categoryName'))   //这样就可以不报错了啊哈哈
            // },500)
        })
        //console.log('c')


    }



    render() {
        const {loading,categories,parentId,subCategories,parentName,showStates} = this.state
        const title = parentId==='0' ? '一级分类列表' : (
            <>
            <Button onClick={this.showFirstCateGoryList} type="link">一级分类列表</Button>
                <SendOutlined style={{marginRight:10}} />
            <span>{parentName}</span>
                </>
        )
        const extra = (<Button onClick={this.addCategory} icon={ <PlusOutlined />} type='primary'>
            {/*<PlusOutlined />*/}
            添加</Button>)



        return (
            <>
                <Card  title={title} extra={extra} style={{}} >
                    <Table rowKey='_id' bordered dataSource={parentId==='0' ? categories : subCategories} pagination={{defaultPageSize:5}}
                           loading={loading}

                    >
                        <Column title="分类的名称" dataIndex="name"/>
                        <Column width={300}
                                title="操作"
                                key="action"
                                render={(categoryItem) => (
                                    <Space size="middle">
                                        <a onClick={()=>{this.updateCategory(categoryItem)}}>修改分类</a>
                                        <a onClick={()=>{this.showSubCategoryLists(categoryItem)}}>查看子分类</a>
                                    </Space>
                                )}
                        />



                    </Table>

                </Card>

                <Modal destroyOnClose={true} title="添加分类" visible={showStates==1} onOk={this.handleOkAdd} onCancel={this.handleCancel}>
                    <AddForm saveForm={(form)=>{this.form=form}} parentId = {parentId} categories = {categories}></AddForm>
                </Modal>
                <Modal destroyOnClose={true} title="更新分类" visible={showStates==2} onOk={this.handleOkUpdate} onCancel={this.handleCancel}>
                    <UpdateForm  saveForm={(form)=>{this.form=form;console.log('diaoyongle')}} categoryName = {this.name || ''}></UpdateForm>
                </Modal>




            </>


        );
    }
}

export default Category;