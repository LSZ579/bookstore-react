import React, { Component } from 'react'
// import '../assets/css/book.css'
import {
    Link, browserHistory
} from 'react-router-dom';
import { Table, Button, Dialog, Form, Input } from 'element-react';
import { getlendBook } from '../api/api'
export class MyLendBook extends Component {

    constructor(props) {
        super(props)
        this.state = {
            list: [],
            detail:{},
            user: JSON.parse(localStorage.getItem('userInfo')).user,
            columns: [
                {
                    type: 'index'
                },
                {
                    label: "图书名称",
                    prop: "book_name",
                    align: 'center',
                    width: 160,
                    render: function (data) {
                        return <span>{data.book_name}</span>
                    }
                },
                {
                    label: "借书申请人",
                    prop: "user",
                    align: 'center',
                    width: 160,
                    render: function (data) {
                        return <span>{data.name}</span>
                    }
                },
                {
                    label: "电话号码",
                    prop: "user",
                    align: 'center',
                    width: 160,
                    render: function (data) {
                        return <span>{data.tell}</span>
                    }
                },
                {
                    label: "邮寄的地址",
                    prop: "address",
                    align: 'center',
                    render: function (data) {
                        return <span>{data.address}</span>
                    }
                },
                {
                    label: "申请人留言",
                    prop: "remask",
                    align: 'center',
                    width: 160,
                    render: function (data) {
                        return <span>{data.lend_remark}</span>
                    }
                },
                {
                    label: "我的备注",
                    prop: "lend_remark",
                    align: 'center',
                    render: function (data) {
                        return <span>{data.remask ? data.remark : '-'}</span>
                    }
                },
                {
                    label: "借出日期",
                    prop: "lend_remark",
                    align: 'center',
                    render: function (data) {
                        return <span>{data.review_time}</span>
                    }
                },
                {
                    label: "还书日期",
                    prop: "lend_remark",
                    align: 'center',
                    render: function (data) {
                        return <span>{data.back_time||'-'}</span>
                    }
                },
                {
                    label: "状态",
                    prop: "lend_remark",
                    align: 'center',
                    render: function (data) {
                        let btn;
                        if(data.isback==1){
                            btn=(<Button>已还书</Button>)
                        }else{
                            btn=(
                                <Button>未归还</Button>
                            )
                        }
                    return <span>{btn}</span>
                    }
                },
            ],
        }
    }
    componentDidMount = () => {
        getlendBook({uid:this.state.user.id}).then(e=>{
            this.setState({
                list:e.data
            })
        })
    }

    render() {
        return (
            <div>
                <div>
                    <Table
                        style={{ width: '100%' }}
                        columns={this.state.columns}
                        data={this.state.list}
                        border={true}
                        height="70vh"
                        highlightCurrentRow={true}
                        onCurrentChange={item => { console.log(item) }}
                    />
                </div>
            </div>
        )
    }
}
