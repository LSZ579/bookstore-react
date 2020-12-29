import axios from './request'

let Axios = axios()

export default {
  get (url, params, headers) {
    let options = {}
    if (params) {
      options.params = params
    }
    if (headers) {
      options.headers = headers
    }
    return Axios.get(url, options)
  },
  // 如果要有可能是传data 有可能是跟在url后面
  post (url, data, headers, params) {
    let options = {};
    if (params) {
      options.params = params
    }

    if (headers) { 
      options.headers = headers 
    }
    return Axios.post(url, data, options)
  }
}
