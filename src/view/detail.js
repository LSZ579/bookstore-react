import React, { Component } from 'react'
// import '../assets/css/book.css'
// import {
//     Link
// } from 'react-router-dom';
import { BookDetail } from '../components/detail'
import { SearchBook } from '../components/search'
import { Breadcrumb } from 'element-react';
import { Headers } from '../components/header'
import { getBookDetail } from '../api/api'
export class Details extends Component {

    constructor(props) {
        super(props)
        this.state = {
            msg: '',
            id:this.props.match.params.id,
            detail:{},
            user:{}
        }
    }
    componentDidMount=()=>{
        this.getDetail()
    }
    getDetail=()=>{
        getBookDetail({id:this.state.id}).then(res=>{
            this.setState({
                detail:res.data,
                user:res.data.user
            })
        })
    }
    // 点击搜索
    getKey = (e) => {
        console.log(e)
    }
    render() {
        return (
            <div>
                <Headers mes={()=>{console.log(666)}}></Headers>
                <SearchBook getKey={this.getKey}></SearchBook>
                <BookDetail detail={this.state.detail} user={this.state.user}></BookDetail>
            </div>
        )
    }
}
