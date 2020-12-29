import React, { Component } from 'react'
// import '../assets/css/book.css'
// import {
//     Link
// } from 'react-router-dom';
import { Table, Button,Dialog,Form,MessageBox,Message } from 'element-react';
import { mylend ,backBook} from '../api/api'
export class Mylend extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            detail:{
                book_name:'',
                name:'',
                address:'',
                tell:'',
                user:{
                    name:''
                }
            },
            dialogVisible:false,
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
                    label: "图书主人",
                    prop: "user",
                    align: 'center',
                    width: 160,
                    render: function (data) {
                        return <span>{data.user.name}</span>
                    }
                },
                {
                    label: "图书主人的备注",
                    prop: "remask",
                    align: 'center',
                    width: 160,
                    render: function (data) {
                        return <span>{data.remask}</span>
                    }
                },
                {
                    label: "我的备注",
                    prop: "lend_remark",
                    align: 'center',
                    render: function (data) {
                        return <span>{data.lend_remark}</span>
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
                        let btn;
                        if(data.isback==1){
                            btn=( <Button type="primary" plain  size="small">已归还</Button>)
                        }
                        else{
                            btn=(
<Button type="primary" onClick={this.backBooks.bind(this,data)} size="small">确认还书</Button>
                            )
                        }
                        return (
                            <span>
                                <Button plain={true} type="info" onClick={this.showDetail.bind(this, data)} size="small">查看详情</Button>
                                {btn}
                            </span>
                        )
                    }
                }
            ],
        }
    }
    componentDidMount = () => {
        this.getDetail()
    }
    getDetail = () => {
        mylend({ lend_userId: this.state.user.id }).then(res => {
            this.setState({
                list: res.data
            })
        })
    }
    backBooks=(e)=>{
        MessageBox.confirm('确认还书?', '提示', {
            type: 'warning'
          }).then(() => {
            backBook({book_id:e.book_id}).then(res=>{
               if(res.data[0]==1){
                Message({
                    type: 'success',
                    message: '发起还书成功!'
                  });    
            }
            this.getDetail()
            })
           
          }).catch(() => {
            Message({
              type: 'info',
              message: '已取消'
            });
          });
      
    }
    showDetail=(e)=>{
        console.log(e)
        this.setState({
            detail:e,
            dialogVisible:true
        })
    }

    onSubmit(e) {
        e.preventDefault();
    }
    onChange(key, value) {
        console.log(key, value)
        this.state.form[key] = value;
        this.forceUpdate();
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
                <Dialog
                    title='审批申请'
                    size="small"
                    visible={this.state.dialogVisible}
                    onCancel={() => this.setState({ dialogVisible: false })}
                    lockScroll={false}
                >
                    <Dialog.Body>
                        <Form model={this.state.form} labelWidth="110" onSubmit={this.onSubmit.bind(this)}>
                            <Form.Item label="书名：">
                                {this.state.detail.book_name}
                            </Form.Item>
                            <Form.Item label="申请时间：">
                                {this.state.detail.apply_time}
                            </Form.Item>
                            <Form.Item label="电话：">
                                {this.state.detail.tell}
                            </Form.Item>
                            <Form.Item label="邮寄地址：">
                                {this.state.detail.address}
                            </Form.Item>
                            <Form.Item label="审批人姓名：">
                             {this.state.detail.user.name}
                            </Form.Item>
                            <Form.Item label="审批时间：">
                                {this.state.detail.review_time||'未审批'}
                            </Form.Item>
                            <Form.Item label="审批人备注：">
                                {this.state.detail.remask||'-'}
                            </Form.Item>
                           
                        </Form>
                    </Dialog.Body>
                    <Dialog.Footer className="dialog-footer">
                        <Button onClick={() => this.setState({ dialogVisible: false })}>关闭</Button>
                    </Dialog.Footer>
                </Dialog>
            </div>
        )
    }
}
