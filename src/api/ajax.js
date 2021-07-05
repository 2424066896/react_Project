import axios  from "axios";
import {message} from "antd";
//封装axios库，函数的返回值是promise对象
export  default function  ajax(url,data = {},type='GET') {  //指定默认值get请求哈哈,注意get是大写的否则报错404
    return  new Promise(
        ((resolve, reject) => {
            let  promise
            //get请求
            if (type==='GET') {
                promise =  axios.get(url, {
                    params: data   //是params不是param注意否则无法拼接参数
                })
            }else {
                promise =  axios.post(url, data)
            }
            promise.then(response=>{
                resolve(response.data)
            }).catch(e=>{
                message.error("请求出错了",e.message)
            })

        })

    )



}