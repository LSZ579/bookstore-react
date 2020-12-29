import React, { Component } from 'react'
// import '../assets/css/book.css'
// import {
//     Link
// } from 'react-router-dom';

import { Breadcrumb, Tag, Button, Table } from 'element-react';


export class MgrMes extends Component {

    constructor(props) {
        super(props)
        this.state = {
            uid: JSON.parse(localStorage.getItem('userInfo')).user.id,
            columns: [
                {
                    type: 'index'
                },
                {
                    label: "类型",
                    prop: "status",
                    align: 'center',
                    width: 100,
                    render: function (e) {
                        var btn;
                        if (e.user_id === JSON.parse(localStorage.getItem('userInfo')).user.id) {
                            btn = (
                                <Tag type="danger">借书申请</Tag>
                            )
                        } else {
                            btn = (
                                <Tag type="primary">我的申请</Tag>
                            )
                        }
                        return <span>{btn}</span>
                    }
                },
                {
                    label: "图书名字",
                    prop: "book_name",
                    align: 'center',
                    width: 160,
                    render: function (data) {
                        return <span>{data.book_name}</span>
                    }
                },
                {
                    label: "申请人备注",
                    prop: "lend_remark",
                    align: 'center',
                    width: 160,
                    render: function (data) {
                        return <span>{data.lend_remark}</span>
                    }
                },
                {
                    label: "审批者备注",
                    prop: "remask",
                    align: 'center',
                    width: 160,
                    render: function (data) {
                        return <span>{data.remask}</span>
                    }
                },
                {
                    label: "申请时间",
                    prop: "apply_time",
                    align: 'center',
                    width: 160,
                    render: function (data) {
                        return <span>{data.apply_time}</span>
                    }
                },
                {
                    label: "审批时间",
                    prop: "review_time",
                    align: 'center',
                    width: 160,
                    render: function (data) {
                        return <span>{data.review_time}</span>
                    }
                },
                {
                    label: "申请人",
                    prop: "address",
                    align: 'center',
                    render: function (data) {
                        let content;
                        if (data.lend_userId === JSON.parse(localStorage.getItem('userInfo')).user.id) {
                            content = '-'
                        } else {
                            content = data.name
                        }
                        return <span>{content}</span>
                    }
                },
                {
                    label: "审批人",
                    prop: "status",
                    align: 'center',
                    render: function (data) {
                        let content;
                        if (data.user_id === JSON.parse(localStorage.getItem('userInfo')).user.id) {
                            content = '-'
                        } else {
                            content = data.user.name
                        }
                        return <span>{content}</span>
                    }
                },
                {
                    label: "状态",
                    prop: "status",
                    align: 'center',
                    render: function (data) {
                        return <span>{data.status == 0 ? '待审核' : data.status == 1 ? '审核通过' : '拒绝借书'}</span>
                    }
                },
                {
                    label: "操作",
                    prop: "address",
                    align: 'center',
                    fixed: 'right',
                    width: 260,
                    render: (data) => {
                        let content;
                        if (data.user_id === JSON.parse(localStorage.getItem('userInfo')).user.id) {
                            content = (
                                <Button  type="primary" onClick={this.toReview.bind(this, data)} size="small">去审批</Button>
                            )
                        } else {
                            content = ( <Button plain={true} type="info" onClick={this.showDetail.bind(this, data)} size="small">查看申请</Button>)
                        }
                        return (
                            <span>
                               {content}
                            </span>
                        )
                    }
                }
            ],
        }
    }
    componentDidMount = () => {

    }
    showDetail = (e) => {
        console.log(e)
        this.props.changeTab('2')

    }
    toReview=()=>{
        this.props.changeTab('mes')
    }
    render() {
        return (
            <div>
                <Table
                    style={{ width: '100%' }}
                    columns={this.state.columns}
                    data={this.props.allMes}
                    border={true}
                    height="70vh"
                    highlightCurrentRow={true}
                    onCurrentChange={item => { console.log(item) }}
                />
            </div>
        )
    }
}
