import React, {Component} from 'react';
import {Card, Select, Input, Button, Table, Pagination,message} from 'antd'
import {FolderAddFilled } from '@ant-design/icons'
import {requestProductslist,requestSearchProductsList,reqUpdateStatus} from "../../api";
import {PAGE_SIZE} from "../../utils/constants";
import './product.less'
const {Option} = Select
class ProductHome extends Component {
    state = {
        productes:[],
        total:0,
        searchType:'productName',
        searchName:''

    }
    initialize = () => {
          this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                  title: '价格',
                  dataIndex: 'price',
                  render:(price)=>{
                      return '￥'+price
                  }
            },
            {
                  title: '状态',
                  //dataIndex: 'status',
                  width:100,
                  render:(product)=> {
                      const {status, _id} = product
                      const newStatus = status===1 ? 2 : 1
                      return (
                          <div>
                              <Button onClick={() => this.updateStatus(_id, newStatus)}   type='primary'>  {status===1 ? '下架' : '上架'}</Button>
                              <span>{status===1 ? '在售' : '已下架'}</span>
                          </div>
                      )
                  }

            },
            {
                  title: '操作',
                  width:100,
                  render:(product)=> {
                    return (
                        <div>
                            <Button onClick={()=>{this.props.history.push('/product/detail',product)}} type='link'>详情</Button>
                            <Button onClick={()=>{this.props.history.push('/product/addUpdate',product)}} type='link'>修改</Button>
                        </div>
                    )
                }

            },
        ]
    }
    componentWillMount() {
        this.initialize()
    }
    //获取商品分页列表
    getProductsListPage = async (pageNum)=>{
        this.pageNum = pageNum
      const {searchType,searchName} = this.state
        let result;
        if(searchName){
            result = await requestSearchProductsList({pageNum:pageNum,pageSize:PAGE_SIZE,searchName,searchType})
        }else {
            result = await requestProductslist(pageNum,PAGE_SIZE)
        }

        if(result.status===0){
            //取出数据
            const {total,list} = result.data
            this.setState({
                total,
                productes:list
            })
        }
    }
    componentDidMount() {
        this.getProductsListPage(1)
    }
    onPaginationChange = (pageNumber)=>{
        this.getProductsListPage(pageNumber)
    }
    /*
    更新指定商品的状态
     */
    updateStatus = async (productId, status) => {
        const result = await reqUpdateStatus(productId, status)
        if(result.status===0) {
            message.success('更新商品成功')
            this.getProductsListPage(this.pageNum)
        }
    }

    render() {
        const {productes,total,searchType,searchName} = this.state
        const title = (
            <>
                <Select style={{width:150}} value={searchType}
                        onChange={(value)=>{this.setState({searchType: value})}}
                >
                    <Option value='productName'>按名称搜索</Option>
                    <Option value='productDesc'>按描述搜索</Option>
                </Select>
                <Input value={searchName} style={{width: 150, margin: '0 15px'}} placeholder='关键字'
                       onChange={(e)=>{this.setState({searchName:e.target.value})}}
                />
                <Button onClick={()=>{this.getProductsListPage(1)}} type='primary'>搜索</Button>
            </>
        )
        const extra = (
       <div>

           <Button onClick={()=>{this.props.history.push('/product/addUpdate')}} style={{fontSize:15}} icon={<FolderAddFilled />} type='primary' >添加商品</Button>
       </div>
        )
        return (
           <Card title={title} extra={extra}>
               <Table rowKey='_id'
                   bordered
                   dataSource={productes}
                   columns={this.columns}
                      pagination={{
                          total,
                          defaultPageSize: PAGE_SIZE,
                          showQuickJumper: true,
                          onChange: pageNumber=>this.onPaginationChange(pageNumber)
                          //onChange:this.getProductsListPage   千万不要写（）否则无限循环直接多次调用
                      }}

               >
                   </Table>
           </Card>
        );
    }
}

export default ProductHome;