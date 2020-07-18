import axios from 'axios'
// import { getToken } from './tokenUtil'
// import { message } from 'antd';  

export function request(config) {
    const instance = axios.create({
        baseURL: '/',
        timeout: 5000
    })

    //! 直接全局拦截，把数据过滤一下
    instance.interceptors.response.use(res => {


        //统一处理错误
        // if (status !== 200 && status !== 201 && status2 !== 200) {
        //     message.error('出错了，' + res.data.meta.msg)
        //     console.log(res);

        // }      
        return res.data
    })

    //!拦截请求m
    instance.interceptors.request.use(function (res) {
        // console.log('请求信息',res);
        //1.获取token
        // var token = localStorage.getItem('token') || ''
        // //2.判断 
        // if (token) {
        //     //设置请求头（后期请求接口 http请求头携带Authorization参数）
        // }
        // let token = getToken();
        // res.headers['Authorization'] = token
        return res
    }, function (error) {
        // Do something with request error
        return Promise.reject(error)
    })

    // 返回的就是promise 对象，在调用的时候可以直接使用
    return instance(config);
}


//当地天气请求
export function requestWeather(config) {
    const instance = axios.create({
        baseURL: 'https://www.tianqiapi.com/free/day?appid=29147921&appsecret=ch6HicCE',
        timeout: 5000
    })
    //! 直接全局拦截，把数据过滤一下
    instance.interceptors.response.use(res => {
        // if(res.data.meta.status != 200){
        //     message.error('出错了，请重试')
        // }
        return res
    })
    return instance(config);
}



//使用
// import { request } from './request'

// export const POST =(data)=>{
//     return request({
//         url:'login',
//         method:'post',
//         data
//     })
// }

//get
// export const GET = params => {
//     return request({
//         url: `orders`,
//         params
//     })
// }