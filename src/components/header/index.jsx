import React, {Component} from 'react';
import './index.less'
import weather from  '../../assets/images/weather.jpg'
import memeoryUtils from '../../utils/memeoryUtils'
import {formateDate,srcc} from '../../utils/dateUtils'
import {reqWeather}  from '../../api/index'
import {withRouter} from 'react-router-dom'
import menuList from "../../config/menuConfig";
import storageUtils from "../../utils/storageUtils";
import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

//头部
class Header extends Component {

    state={
        reporttime:formateDate(new Date()),
        weather1:''
    }

    getWeather=async ()=>{
        const{weather} = await reqWeather('惠州')
        this.w=weather
    }
    UNSAFE_componentWillMount () {
        this.getDate()
        this.getWeather()
    }

    getDate=()=>{
       this.interverId = setInterval(()=>{
            const t = formateDate(new Date())
            const  {reporttime} = this.state
            this.setState({reporttime:t})
            }
        ,1000)
    }
    componentWillUnmount() {
        clearInterval(this.interverId)
    }


    getTitle = (path)=>{
        let title;
        menuList.forEach((item)=>{
            if(path===item.key){
                title = item.title
            } else if(item.children){
               const found = item.children.find(citem=>path.indexOf(citem.key)===0)
                //const found = item.children.find(citem=>citem.key.indexOf(path)===0)
                if(found){
                    title = found.title;
                }
            }
        })
        return title
    }

    handleLoginOut = ()=>{

        Modal. confirm({
            title: '你想退出登录吗?',
            icon: <ExclamationCircleOutlined />,
            onOk:()=> {
               // memeoryUtils.user={}
                //移除用户登录信息
                //storageUtils.RemoveUser();
                //this.props.history.replace('/login')
                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve({a:memeoryUtils.user={},b:storageUtils.RemoveUser(),c:this.props.history.replace('/login')}) : reject, 1000);

                }).catch(() => console.log('Oops errors!'));
            },
            onCancel:()=> {},
        });
        //实现跳转到登录页面
    }

    render() {

        const username = memeoryUtils.user.username
        //获取当前的请求路径
        const  path = this.props.location.pathname
        const title =  this.getTitle(path)
        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎,{username}</span>
                    {/*<a onClick={this.handleLoginOut} href='javascript:'>退出</a>*/}
                    <Button onClick={this.handleLoginOut} type="link">退出</Button>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>
                        {title}
                    </div>
                    <div className='header-bottom-right'>
                        <span>{this.state.reporttime}</span>
                        <img src={srcc} alt=""/>
                        <span>{this.w}</span>
                    </div>
                </div>

            </div>
        );
    }

}

export default  withRouter(Header);