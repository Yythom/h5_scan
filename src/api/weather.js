//当地天气请求
function requestWeather(config) {
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
export default requestWeather