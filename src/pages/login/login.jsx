import React, {Component} from 'react';
import logo from  './images/logo.png'
import { Form, Input, Button ,message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import memeoryUtils from '../../utils/memeoryUtils'
import storageUtils from '../../utils/storageUtils.js'
import {Redirect} from 'react-router-dom'
import './login.less'
import {reqLogin} from '../../api/index'
/*
用户登录的路由组件
 */


export  default   class Login extends Component {
     onFinish = async (values) => {
        //解构取值
        const  {username,password} = values;
        //发送请求
        // reqLogin(username,password).then(response=>{
        //     console.log('ok')
        // }).catch(err=>{
        //     console.log('fail')
        // })
        //使用async和await简化promise的回调写法
        try {
            const rps = await reqLogin(username,password)
            const result = rps.data;
            if (result.status===0) {
                message.success('恭喜你登录成功了')
                memeoryUtils.user = result.data  //保存到内存中
                storageUtils.setUser(result.data) //保存到local中
                this.props.history.replace('/')
            } else {
                message.error(result.msg)
            }
        }
        catch (e) {
            console.log("请求出错了！",e)
        }

    }


    validator = (rule, value, callback) => {
        const length = value && value.length
        const pwdReg = /^[0-9a-zA-Z-]+$/
            if (!value) {
                //callback('必须输入密码')
                return Promise.reject("必须输入密码");
            }
            else if (length < 4) {
                //callback('密码必须大于 4 位')
                return Promise.reject("密码必须大于 4 位");
            }
            else if (length > 12) {
                //callback('密码必须小于 12 位')
                return Promise.reject("密码必须小于 12 位");
            }
            else if (!pwdReg.test(value)) {
                //callback('密码必须是英文、数组或下划线组成')
                return Promise.reject("密码必须是英文、数组或下划线组成");
            }
            else {
                // callback()
                return Promise.resolve();
            }

    }



    validatorusername = (rule, value , callback) => {
        const length = value && value.length
        const pwdReg = /^[0-9a-zA-Z-]+$/
        if (!value) {
            //callback('必须输入密码')
            return Promise.reject("必须输入用户名");
        }
        else if (length < 4) {
            //callback('密码必须大于 4 位')
            return Promise.reject("用户名必须大于 4 位");
        }
        else if (length > 12) {
            //callback('密码必须小于 12 位')
            return Promise.reject("用户名必须小于 12 位");
        }
        else if (!pwdReg.test(value)) {
            //callback('密码必须是英文、数组或下划线组成')
            return Promise.reject("用户名必须是英文、数组或下划线组成");
        }
        else {
            // callback()
            return Promise.resolve();
        }


    }


        render() {
            const user= memeoryUtils.user
            if(user && user._id){
              return <Redirect to='/'/>
            }
                return (
                    <div className='login'>
                        <header className='login-header'>
                            <img src={logo} alt=""/>
                            <h1>React项目: 后台管理系统</h1>
                        </header>
                        <section className='login-content'>
                            <h2>用户登录</h2>
                            <Form
                                name="normal_login"
                                className="login-form"
                                onFinish={this.onFinish}
                                // onValuesChange = {onValuesChange}
                            >
                                <Form.Item name="username"
                                    rules={
                                        [
                                            // {required:true,whitespace:true,message:'必须输入用户名'},
                                            // {min:4,message:'用户名必须大于四位'},
                                            // {max:12,message:'用户名必须小于12位'},
                                            // {pattern:/[a-zA-Z0-9_]{1,}$/,message:'用户名必须是英文、数组或下划线组成'}
                                            {validator: this.validatorusername}

                                        ]
                                    }
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                                           placeholder="Username"/>
                                </Form.Item>

                                <Form.Item name="password"
                                           rules={[
                                               {
                                                   validator: this.validator
                                               },
                                           ]}
                                >
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon"/>}
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Log in
                                    </Button>
                                </Form.Item>

                            </Form>

                        </section>
                    </div>

                );
        }

    }



