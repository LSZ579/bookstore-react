import React, { Component } from 'react'
import '../assets/css/detail.css'
import { Input, Button } from 'element-react';
import {
    browserHistory,
    Link
} from 'react-router-dom';
export class SearchInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            keyword: this.props.plach||''
        }
    }
    getKeyword = () => {
        this.props.parentFn(this.state.keyword)
    }
    render() {
        let btn;
        if(!this.props.plach){
            btn=( <div className="ml10" onClick={this.getKeyword}><Link to={'/SearchBook/'+this.state.keyword}><Button >搜索</Button></Link></div>)
        }else{
            btn=(<div className="ml10" onClick={this.getKeyword}><Button >搜索</Button></div>)
        }
        return (
            <div className="flex-row w100">
                <Input value={this.state.keyword} ref="search" placeholder="输入关键字搜索图书" onChange={this.onChange.bind(this, 'keyword')}></Input>
               {btn}
            </div>
        )
    }
    onChange = (key, value) => {
        this.setState({
            keyword: value
        })
    }
}
