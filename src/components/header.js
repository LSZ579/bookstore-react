import React, { Component } from 'react'
import { Menu, MessageBox, Button } from 'element-react';
import './header.css'
import {
    browserHistory,
    Link
} from 'react-router-dom';

import { getmessage } from '../api/api'
import { SearchInput } from './searchInput'
export class Headers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            meslist: [],
            flag:false
        }
    }
    componentDidMount = () => {
        if(localStorage.getItem('userInfo')){
            let user = JSON.parse(localStorage.getItem('userInfo')).user;
            getmessage({ uid: user.id }).then(res => {
                this.setState({
                    meslist: res.data.a.concat(res.data.b)
                })
            })
        }
    }
    toMes=()=>{
        // this.props.history.push({pathname: '/'})
        this.props.mes()
    }
    getKeyWord=()=>{

    }
    logouts(e){
        e.stopPropagation()
        localStorage.clear()
        this.forceUpdate();
    }
    outLog=()=>{
        
        this.setState({
            flag:true
        })
    }
    onSelect = (e) => {

    }
    closebgm(e){
        // stoppropagation()
        e.stopPropagation()
        this.setState({
            flag:false
        })
    }
    render() {
        let user = localStorage.getItem('userInfo'), html,logout;
        if(this.state.flag){
            logout=(
                <div className="showout" onClick={this.closebgm.bind(this)}> <Link to="/"><Button className="showout-btn" onClick={this.logouts.bind(this)}>退出登录</Button></Link></div>
            )
        }else{
            logout=(<div></div>)
        }
        if (user) {
            let info = JSON.parse(user)
            html = (
                <span>
                    <span className="log" onClick={this.toMes}>
                    <Link to='/About/5' className="flex-row">
                   <svg t="1608539531946" class="icon-mes" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1223" width="35" height="35"><path d="M799.9 681.3c7-0.2 14 1.2 20.7 5.6-24.3-15.6-40.3-42.8-40.3-73.9V439.5c0-127.1-91.9-233.2-214.7-259.3V174c0-32.4-26.2-58.5-58.5-58.5s-58.5 26.2-58.5 58.5v6.2c-122.8 26.1-214.7 132.1-214.7 259.3V613c0 31.1-16.1 58.3-40.3 73.9 6.8-4.4 13.7-5.9 20.7-5.6-21.5 0.1-38.9 17.4-38.9 39s17.4 39 39 39h585.3c21.6 0 39-17.4 39-39 0.1-21.4-17.3-38.9-38.8-39zM507.2 896c53.9 0 97.6-43.7 97.6-97.6H409.6c0 53.9 43.6 97.6 97.6 97.6z" p-id="1224" fill="#ffffff"></path></svg>
                        <div className="mes-num">
                         {this.state.meslist.length}
                        </div>
                    </Link>
                     &nbsp;&nbsp;&nbsp; </span>
                    <span className="reg" onClick={this.outLog}>
                        {info.user.name}</span>
                        {logout}
                </span>
            )
        } else {
            html = (
                <span>
                    <span className="log">
                        <Link to={this.changeRoute('/login')}>登录</Link> &nbsp;&nbsp;&nbsp;| </span>
                    <span className="reg">
                        <Link to={this.changeRoute('/login')}>注册</Link></span>
                </span>
            )
        }
        return (
            <div>
                <div className="el-menu-demo">
                    <Menu theme="dark" defaultActive={this.props.index} mode="horizontal" onSelect={this.onSelect.bind(this)}>
                        <Link to={this.changeRoute('/')}> <Menu.Item index="1" className="name">首页</Menu.Item></Link>
                        <Link to={this.changeRoute('/About/1')}> <Menu.Item index="3" className="mybook">个人中心</Menu.Item></Link>
                        <div className="search-inputs">
                            <SearchInput  parentFn={this.getKeyWord}></SearchInput>
                        </div>
                        <div className="login-text">
                            {html}
                        </div>
                    </Menu>
                </div>
                <div className="h60"></div>
            </div>
        )
    }

    changeRoute(path) {
        // if(path=='/About'&&!localStorage.getItem('userInfo')){
        //     MessageBox.confirm('您还没登录，是否去登录?', '提示', {
        //         type: 'warning'
        //       }).then(() => {

        //       }).catch(() => {

        //       });
        // }
        return path
    }
}
