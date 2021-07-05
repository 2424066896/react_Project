import React, {Component} from 'react';
import {
    Button,
    Card, List


} from "antd";
import {LeftCircleOutlined} from '@ant-design/icons'
import {reqCategory} from "../../api";

const {Item} = List
class Detail extends Component {
    state = {
        cName1: '', // 一级分类名称
        cName2: '', // 二级分类名称
    }

    async componentDidMount() {
        // 得到当前商品的分类ID
        const {pCategoryId, categoryId} = this.props.location.state
        if (pCategoryId === '0') { // 一级分类下的商品
            const result = await reqCategory(categoryId)
            const cName1 = result.data.name
            this.setState({cName1})
        } else { // 二级分类下的商品
            /*
            //通过多个await方式发多个请求: 后面一个请求是在前一个请求成功返回之后才发送
            const result1 = await reqCategory(pCategoryId) // 获取一级分类列表
            const result2 = await reqCategory(categoryId) // 获取二级分类
            const cName1 = result1.data.name
            const cName2 = result2.data.name
            */

            // 一次性发送多个请求, 只有都成功了, 才正常处理
            const results = await Promise.all([reqCategory(pCategoryId), reqCategory(categoryId)])
            const cName1 = results[0].data.name
            const cName2 = results[1].data.name
            this.setState({
                cName1,
                cName2
            })
        }

    }

    render() {
        const {name, desc, price, detail, imgs} = this.props.location.state
        const {cName1,cName2}= this.state
        const title = (
            <span>
                <Button icon={<LeftCircleOutlined/>} type='link' style={{marginRight: 10, fontSize: 20,width:50}} onClick={() => this.props.history.goBack()}>

                </Button>

                <span>商品详情</span>
            </span>
        )

        return (
            <Card title={title} className='product-detail'>
                <List>
                    <Item>
                        <span className="left">商品名称:</span>
                        {name}
                    </Item>
                    <Item>
                        <span className="left">商品描述:</span>
                        {desc}
                    </Item>
                    <Item>
                        <span className="left">商品价格:</span>
                        {price}元
                    </Item>
                    <Item style={{ justifyContent:'left'}}>
                        <span className="left">所属分类:</span>
                        <span>{cName1}{cName2 ? '-->'+cName2:''}</span>
                    </Item>
                    <Item className='item'>
                        <span className="left">商品图片: </span>
                        <span>
                             {
                                 imgs.map(img => (
                                     <img
                                         key={img}
                                         src={'http://localhost:5000/upload/'+img}
                                         className="product-img"
                                         alt="img"
                                     />
                                 ))
                             }
                        </span>


                    </Item>
                    <Item className='item'>
                        <div className="left">商品详情:</div>
                        <span style={{ justifyContent: 'left'}} dangerouslySetInnerHTML={{__html:detail}}>
                        </span>
                    </Item>

                </List>
            </Card>
        );
    }
}

export default Detail;