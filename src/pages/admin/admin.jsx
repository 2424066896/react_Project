import React, {Component} from 'react';
import util from '../../utils/memeoryUtils'
import {Redirect,Route,Switch} from 'react-router-dom'
import { Layout } from 'antd';
import LeftNav from "../../components/left-nav";
import Header from "../../components/header";
import Home from "../home/home";
import Category from "../category/category";
import Product from "../product/product";
import Role from "../role/role";
import Bar from "../charts/bar";
import User from "../user/user";
import Line from "../charts/line";
import Pie from "../charts/pie";

/*
后台管理主路由组件
* */
const { Footer, Sider, Content } = Layout;
export default class Admin extends Component {
    render() {
        const {user} = util
        if (!user || !user._id) {
           return <Redirect to='/login'></Redirect>
        }else{
        return (
            <div style={{height:'100%'}}>
                {/*
                    写minHeight的话，高度不会占满剩余空间，而是会根据内容自动
                    调整高度。。。。
                */}
                <Layout style={{minHeght:'100%'}}>
                    <Sider>
                        <LeftNav></LeftNav>
                    </Sider>
                    <Layout>
                        <Header></Header>
                        <Content style={{backgroundColor:'#fff',margin:20}}>
                            <Switch>
                                <Route path='/home' component={Home}/>
                                <Route path='/category' component={Category}/>
                                <Route path='/product' component={Product}/>
                                <Route path='/role' component={Role}/>
                                <Route path='/user' component={User}/>
                                <Route path='/charts/bar' component={Bar}/>
                                <Route path='/charts/line' component={Line}/>
                                <Route path='/charts/pie' component={Pie}/>
                                <Redirect to='/home'/>
                            </Switch>
                        </Content>
                        <Footer style={{textAlign:'center',color:'#aaa'}}>
                            推荐使用谷歌浏览器， 可以获得更佳页面操作体验
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        );}
    }
}
