//定义接口函数请求模块
import ajax from "./ajax";
import  jsonp from 'jsonp'
import  {message} from 'antd'
const  BASE = ''
export const reqLogin = (username,password) =>{
    return ajax(BASE+'/login',{username,password},'POST')  //注意不能写pwd瞎写否则response没有数据的
}
export const addUser = (user) =>{
    return ajax('/manage/user/add',user,'POST')
}

//获取分类列表的请求
// export const  requestGetCategoryLists = (parentId)=> {
//     console.log('ajax',parentId)
//    return  ajax(BASE+'/manage/category/list',{parentId})
// }

// 获取一级/二级分类的列表
export const requestGetCategoryLists = (parentId) => ajax(BASE + `/manage/category/list?parentId=${parentId}`)
//添加分类接口
export const  requestAddCategory = ({parentId, categoryName})=> {
    return  ajax(BASE+'/manage/category/add',{parentId, categoryName},'POST')
}



//更新品类名称接口
export const  requestUpdateCategory = ({categoryId, categoryName})=> {
    return  ajax(BASE+'/manage/category/update',{categoryId, categoryName},'POST')
}
//后台分页接口,获取商品分页列表
export  const requestProductslist = (pageNum,pageSize)=>{
    return ajax(BASE+`/manage/product/list?pageNum=${pageNum}&pageSize=${pageSize}`)
}

//搜索产品分页列表 productName productDesc 2种搜索类型
export const requestSearchProductsList = ({pageNum,pageSize,searchName,searchType})=>{
    return ajax(BASE+'/manage/product/search',{
        pageNum:pageNum,
        pageSize:pageSize,
        [searchType]:searchName
    })
}
// 获取一个分类
export const reqCategory = (categoryId) => ajax(BASE + '/manage/category/info', {categoryId})

// 更新商品的状态(上架/下架)
export const reqUpdateStatus = (productId, status) => ajax(BASE + '/manage/product/updateStatus', {productId, status}, 'POST')
// 删除指定名称的图片
export const reqDeleteImg = (name) => ajax(BASE + '/manage/img/delete', {name}, 'POST')
// 添加/修改商品
export const reqAddOrUpdateProduct = (product) => ajax(BASE + '/manage/product/' + (product._id?'update':'add'), product, 'POST')
export const reqWeather=(city)=> {
    const url =`https://restapi.amap.com/v3/weather/weatherInfo?key=bb67814a374148ec902c6c3634292180&city=${city}`
    //const url = `http://api.map.baidu.com/weather/v1/?district_id=${id}&data_type=all&ak=qUVw1WV7iijT4OTwjRYf3pUtjm7uMEhw`
    return new Promise((resolve,reject)=>{
        jsonp(url, {}, (err, data) => {
            if(!err && data.status==='1'){
                //去除需要的数据
                const{city,reporttime,weather} = data.lives[0];
                resolve({city,reporttime,weather})
                //console.log("jsonp...", reporttime, weather)
            } else {
                //如果请求失败了
                message.error('fail')
            }

        })
    })
}

