import React, { Component } from 'react'
import {
    Link
} from 'react-router-dom';
// import { BrowserRouter as Router } from 'react-router-dom'
import "../assets/css/index.css"

import { Menu, Input, Button, Breadcrumb, Carousel } from 'element-react';
// import { RouterView } from '../router/router';
import b1 from '../assets/img/banner1.jpg'
import b2 from '../assets/img/banner2.jpg'
import {getBook,getComments,isbn} from '../api/api.js'
import {Load} from '../components/load'
// import install from './api/install';
import jsonp from 'jsonp'
import { Headers } from '../components/header'
// import fetchJsonp from 'fetch-jsonp';

import { Book } from '../components/book'
import { RowLayout } from '../components/row'
import axios from 'axios'  
export class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list:[],
            page:1,
            limit:20,
            flag:true,
            banner: [b1, b2]
        }
    }
    componentDidMount=()=>{
        this.getList()
    }
    getData = () => {
        var api = 'http://book.feelyou.top/isbn/9787506380263'
      }
    downs=()=>{
        axios.get('http://localhost:3000/book/api/exportexcel', { //downloadFiles 接口请求地址
        responseType:'blob'
    }).then((rs) => {
        const blob = new Blob([rs.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
        const fileName = "站内所有可借阅的图书.xlsx";
        if ('download' in document.createElement('a')) { // 非IE下载
            const elink = document.createElement('a');
            elink.download = fileName;
            elink.style.display = 'none';
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href);// 释放 URL对象
            document.body.removeChild(elink);
        }
    }).catch((error) => {
        console.log('文件下载失败', error);
    });
    }
    getList=()=>{
        getBook({
            limit:this.state.limit,
            page:this.state.page
        }).then(res=>{
            if(res.data.length>0){
                if(res.data.length<this.state.limit){
                    this.setState({
                        flag:false
                    })
                }
                let page=this.state.page+1;
                let list=this.state.list.concat(res.data)
                this.setState({
                    page,
                    list
                })
                
            }
            else{
                this.setState({
                    flag:false
                })
            }
        })
    }
    getMore=()=>{
        this.getList()
    }
    // 点击搜索
    getKeyWord = (e) => {
        console.log(e)
    }
    render() {
        return (
            <div>
                <div>
                    <Headers index="1" mes={()=>{console.log(666)}}></Headers>
                    <RowLayout>
                        <Carousel interval="5000" height="500px" arrow="always">
                            {
                                this.state.banner.map((item, index) => {
                                    return (
                                        <Carousel.Item key={index}>
                                            <img className="banner-img" src={item}></img>
                                        </Carousel.Item>
                                    )
                                })
                            }
                        </Carousel>
                        <div className="title">最新图书
                        <Button type="primary" className="downBook" onClick={this.downs}>下载所有可借阅的图书</Button>
                        </div>
                    <Book list={this.state.list}></Book>
                    <Load status={this.state.flag} getMore={this.getMore}></Load>
                    </RowLayout>
                </div>
                        
            </div>
        )
    }
    // 注册
    register = () => {

    }
    login = () => {

    }
    changeRoute(path) {
        console.log(path)
        return path
    }
    inputChange = (e) => {
        this.setState({
            msg: e.target.value
        })
    }
}
