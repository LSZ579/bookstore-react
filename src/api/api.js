import api from './index'
import qs from 'qs'
const baseURL = "http://localhost:3000"
const type={
    'Content-Type': 'application/json' 
}
export function login(data){
    return api.post(`${baseURL}/login`, data,type)
}
export function registered(data){
    return api.post(`${baseURL}/login/registered`, data,type)
}
// 获取首页图书
export function getBook(data){
    return api.post(`${baseURL}/book/bookList`, data,type)
}
// 上传图片
export function uploadImg(data){
    return api.post(`${baseURL}/upload/img`, qs.stringify(data))
}
// 添加图书
export function addBook(data){
    return api.post(`${baseURL}/book/addBook`, data,type)
}
// 编辑图书
export function editBook(data){
    return api.post(`${baseURL}/book/editBook`, data,type)
}
// 图书详情
export function getBookDetail(data){
    return api.post(`${baseURL}/book/getBookDetail`, data,type)
}
// 获取我的图书
export function getMyBook(data){
    return api.post(`${baseURL}/book/getMyBook`, data,type)
}
// 删除图书
export function deleteBook(data){
    return api.post(`${baseURL}/book/deleteBook`, data,type)
}
// 更改状态
export function changBookStatus(data){
    return api.post(`${baseURL}/book/changBookStatus`, data,type)
}
// 标记所有不可借
export function allBookStatus(data){
    return api.post(`${baseURL}/book/allBookStatus`, data,type)
}

// 获取地址
export function getUserAddress(data){
    return api.get(`${baseURL}/address/getUserAddress`, data,type)
}
// deleteAddress删除地址
export function deleteAddress(data){
    return api.get(`${baseURL}/address/deleteAddress`, data,type)
}
// 编辑地址
export function setAddress(data){
    return api.post(`${baseURL}/address/setAddress`, data,type)
}
// 添加地址
export function addAddress(data){
    return api.post(`${baseURL}/address/addAddress`, data,type)
}
//添加借阅
export function addOrders(data){
    return api.post(`${baseURL}/orders/addOrders`, data,type)
}
// 我借阅的图书
export function mylend(data){
    return api.get(`${baseURL}/orders/getOrders`,data,type)
}
// 获取消息
export function getmessage(data){
    return api.get(`${baseURL}/orders/message`,data,type)
}
// 审批借书
export function resloveLend(data){
    return api.post(`${baseURL}/orders/resloveLend`,data,type)
}
//搜索图书searchBook
export function searchBook(data){
    return api.post(`${baseURL}/book/searchBook`,data,type)
}
// 我借出的
export function getlendBook(data){
    return api.post(`${baseURL}/orders/getlendBook`,data,type)
}
export function getComments(data){
    return api.get('http://book.feelyou.top/isbn/'+data.isbn)
}
// isbn
export function isbn(data){
    return api.get(`${baseURL}/book/api/exportexcel`,data,type)
}
// 还书
export function backBook(data){
    return api.post(`${baseURL}/orders/backBook`,data,type)
}