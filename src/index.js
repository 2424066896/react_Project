/**
入口文件
*/

import React from  'react'
import ReactDOM from 'react-dom'
import storageUtils from './utils/storageUtils.js'
import memeoryUtils from './utils/memeoryUtils.js'
// import  'antd/dist/antd.css'

import App from "./App";
const user = storageUtils.getUser('userky')
memeoryUtils.user = user;
// 将app组件渲染到页面
ReactDOM.render(<App/>,document.getElementById('root'))