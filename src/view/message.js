import React, { Component } from 'react'
// import '../assets/css/book.css'
import {
    Link, browserHistory
} from 'react-router-dom';
import { Table, Button, Dialog, Form, Input,Notification} from 'element-react';
import { resloveLend } from '../api/api'
export class Infos extends Component {

    constructor(props) {
        super(props)
        this.state = {
            meslist: [],
            dialogVisible: false,
            form: {
                desc: ''
            },
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
                        return <span>{data.user.name}</span>
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
                        return <span>{data.remask ? data.remark : '空或未回复'}</span>
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
                        let html;
                        if (data.status == 0) {
                            html = (
                                <Button type="primary" onClick={this.showDetail.bind(this, data)} size="small">审批</Button>
                            )
                        } else {
                            <Button plain={true} type="info" size="small">已处理</Button>
                        }
                        return (
                            <span>
                                {html}
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
        this.setState({
            detail:e,
            dialogVisible: true
        })
    }

    onSubmit(e) {
        e.preventDefault();
    }

    onChange(key, value) {
        this.state.form[key] = value;
        this.forceUpdate();
    }
    submit = () => {
        let data={
            status:5,
            book_id:this.state.detail.book_id,
            statusId:1,
            remark:this.state.form.desc
        }
        this.resloveLend(data)
        this.props.getLend()
    }
    refusLend=()=>{
        let data={
            status:2,
            book_id:this.state.detail.book_id,
            statusId:2,
            remark:this.state.form.desc
        }
        this.resloveLend(data)
        
    }
    resloveLend=(data)=>{
        resloveLend(data).then(res=>{
            this.setState({
                dialogVisible:false
            })
            Notification({
                title: '成功',
                message: '处理成功,请刷新页面',
                type: 'success'
              });
        })
    }
    render() {
        return (
            <div>
                <div>
                    <Table
                        style={{ width: '100%' }}
                        columns={this.state.columns}
                        data={this.props.myLends}
                        border={true}
                        height="70vh"
                        highlightCurrentRow={true}
                        onCurrentChange={item => { console.log(item) }}
                    />
                    <Dialog
                        title='审批申请'
                        size="small"
                        visible={this.state.dialogVisible}
                        onCancel={() => this.setState({ dialogVisible: false })}
                        lockScroll={false}
                    >
                        <Dialog.Body>
                            <Form model={this.state.form} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
                                <Form.Item label="备注">
                                    <Input type="textarea" placeholder="请输入备注" value={this.state.form.desc} onChange={this.onChange.bind(this, 'desc')}></Input>
                                    <div className="tips">提示：输入拒绝借出的理由或备注说明；输入邮费付款方式，联系方式，还书事项等</div>
                                </Form.Item>
                            </Form>
                        </Dialog.Body>
                        <Dialog.Footer className="dialog-footer">
                            <Button type="primary" onClick={this.submit}>同意借出</Button>
                            <Button type="danger" onClick={this.refusLend}>拒绝借出</Button>
                            <Button onClick={() => this.setState({ dialogVisible: false })}>关闭</Button>
                        </Dialog.Footer>
                    </Dialog>
                </div>
            </div>
        )
    }
}
