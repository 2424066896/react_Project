import  React,{Component} from 'react'
import  {BrowserRouter,Route,Switch} from 'react-router-dom'
import login from "./pages/login/login";
import Admin from "./pages/admin/admin";
import jsonp from "jsonp";
import {message} from "antd";
// import  {Button,message} from  'antd'
/**
 * 应用的根组件
 */
const  wrapper ={
    width:'100%',height:'100%'
}

export default class  App extends  Component{
    // componentDidMount() {
    //     //const url =`https://restapi.amap.com/v3/weather/weatherInfo?key=bb67814a374148ec902c6c3634292180&city=惠州`
    //     const url =`http://localhost:54449/poem.json`
    //     jsonp(url, {}, (err, data) => {
    //         console.log("jsonp...", data)
    //     }
    //     )
    // }

    render() {
        //console.log('new FormData()',new FormData())
        return(
            <div style={wrapper}>
                <BrowserRouter>
                    <Switch>  //表示值匹配其中一个
                        <Route path='/login'component={login}></Route>  //注意不要写。/否则页面啥也不输出
                        <Route path='/'component={Admin}></Route>
                    </Switch>
                </BrowserRouter>
            </div>


            )
    }
}