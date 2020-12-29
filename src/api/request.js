import axios from 'axios'  //为他封装一下
// import { Toast } from "vant";

// 创建axios实例
let service = axios.create({
    timeout: 60000   // 没有得到响应超时限制
})

// 添加请求拦截器  req 请求  在前端通过 axios 请求的时候 做一些什么事
service.interceptors.request.use(
    (config) => {
        // cofig -> 请求头
        // 请求发送前进行处理  后端的接口 有的需要携带 token 验证
        // 用户在修改密码 购买商品 登陆会过期
        // config.headers = {'token': localStorage.getItem('token')}
        // Toast.loading({
        //     mask: true,
        //     message: '加载中...',
        //   });
          
        return config
    },
    (error) => {
        // 请求错误处理 如果发现你的请求有误 可以自己定义返回的错误
        // Toast.clear()
        // Toast('请求超时')
        return Promise.reject(error)
    }
)
 
// 添加响应拦截器  res 响应 在数据返回之前做一些什么操作
service.interceptors.response.use(
    (response) => {
        // Toast.clear()
        // let { data } = response;
        
        return response
    },
    (error) => {
        // Toast.clear()
        // Toast('请求超时')
        return Promise.reject(error.response);
    }
)

export default function() {
    return service
}