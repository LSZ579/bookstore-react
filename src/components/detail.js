import React, { Component } from 'react'
import {
    Link
} from 'react-router-dom';
import { RowLayout } from './row'
import img from '../assets/img.jpg'
import { Card, Button, Breadcrumb,Radio, Dialog,MessageBox, Form, Input, Notification, Select } from 'element-react';
import '../assets/css/detail.css';
import { addOrders, getUserAddress } from '../api/api'
export class BookDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {
                name: '',
                tell: '',
                sex: 1,
                address: '',
                lend_remark: ''
            },
            sex:1,
            addressList: [],
            dialogVisible: false
        }
    }
    componentDidMount = () => {
      
    }
    lendBook = () => {
        let user = localStorage.getItem('userInfo')
        if(!user){
            MessageBox.confirm('您还没登录，请先登录?', '提示', {
                cancelButtonText: '返回',
                confirmButtonText: '确定',
                type: 'warning'
            }).then(() => {
               
            }).catch(() => {
               
            });
            return
        }
        this.getList()
        this.setState({
            dialogVisible: true
        })
    }
    getList() {
        let user = JSON.parse(localStorage.getItem('userInfo'))
        getUserAddress({
            userID: user.user.id
        }).then(res => {
            console.log(res)
            this.setState({
                addressList: res.data
            })
        })
    }
    submit = () => {
        if( JSON.parse(localStorage.getItem('userInfo')).user.id==this.props.detail.user_id){
            Notification({
                title: '警告',
                message: '不能借自己发布的书',
                type: 'warning'
            });
            return
        }
        let temp = Object.assign({}, this.state.form),
            user = this.props.detail;
        temp.user_id = user.user_id;
        temp.book_name = user.book_name;
        temp.lend_userId = JSON.parse(localStorage.getItem('userInfo')).user.id;
        temp.book_id = user.id;
        temp.status = 0;
        addOrders(temp).then(res => {
            if (res) {
                Notification({
                    title: '成功',
                    message: '提交成功，待图书主人审核通过',
                    type: 'success'
                });
                this.setState({
                    dialogVisible: false
                })
            }
        })
    }
    selectChange=(e)=>{
        this.state.form.address = e;
        console.log(e)
    }
    onSubmit(e) {
        e.preventDefault();
    }
    onChanges(value) {
        this.setState({ 
            sex:value
         });
        this.state.form.sex = value;

      }
    // 更新表单的值
    onChange(key, value) {
        this.state.form[key] = value;
        this.forceUpdate();
    }
    render() {
        let btn;
        if (this.props.detail.status == 2) {
            btn = (<Button type="danger" className="h30" onClick={this.lendBook}>借阅</Button>)
        } else {
            btn = (<Button type="primary" plain className="h30" >该图书已被其他用户锁定</Button>)
        }
        return (
            <div>
                <RowLayout>
                    <div className="breadcrumbs">     <Breadcrumb separator="/">
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>图书详情</Breadcrumb.Item>
                        <Breadcrumb.Item>{this.props.detail.book_name}</Breadcrumb.Item>
                    </Breadcrumb></div>
                    <Card
                        className="box-card"
                        header={
                            <div className="clearfix">
                                <span style={{ "lineHeight": "25px" }}>图书详情</span>
                                <span style={{ "float": "right" }}>
                                    <Link to='/'> <Button type="primary" size="small" plain>返回</Button></Link>
                                </span>
                            </div>
                        }
                    >
                        <div className="book-detail">
                            <div className="detail-book-info">
                                <div>
                                    <img className="detail-book-img" alt="加载失败" src={'http://localhost:3000' + this.props.detail.img_url}></img>
                                </div>
                                <div className="detail-info">
                                    <div>图书名称：{this.props.detail.book_name}</div>
                                    <div>图书作者：{this.props.detail.author}</div>
                                    <div>出版社：{this.props.detail.author}</div>
                                    <div>ISBN：{this.props.detail.ISBN}</div>
                                    <div className="details">
                                        图书介绍：{this.props.detail.desc}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-row">
                            <div className="flex-row avatar-info">
                                <img className="avatar" src={this.props.user.avatar}></img>
                                <span>{this.props.user.name}</span>
                                <span className="ml10 fs14">上传</span>
                            </div>

                            <div className="lend-btn">{btn}</div>
                        </div>
                    </Card>
                </RowLayout>
                <Dialog
                    title={this.state.type ? '添加地址' : '编辑地址'}
                    size="small"
                    visible={this.state.dialogVisible}
                    onCancel={() => this.setState({ dialogVisible: false })}
                    lockScroll={false}
                >
                    <Dialog.Body>
                        <Form model={this.state.form} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
                            <Form.Item label="姓名">
                                <Input value={this.state.form.name} placeholder="请输入姓名" onChange={this.onChange.bind(this, 'name')}></Input>
                            </Form.Item>
                            <Form.Item label="手机号">
                                <Input value={this.state.form.tell} placeholder="请输入手机号" onChange={this.onChange.bind(this, 'tell')}></Input>
                            </Form.Item>
                            <Form.Item label="性别">
                                {/* <Input value={this.state.form.sex} onChange={this.onChange.bind(this, 'sex')}></Input> */}
                                <Radio value="1" checked={this.state.sex === 1} onChange={this.onChanges.bind(this)}>男</Radio>
                                <Radio value="2" checked={this.state.sex === 2} onChange={this.onChanges.bind(this)}>女</Radio>
                            </Form.Item>
                            <Form.Item label="邮寄地址">
                                <div className="flex-row">
                                <Select value={this.state.form.address} onChange={this.selectChange.bind(this)} className="w100" placeholder="请选择">
                                    {
                                        this.state.addressList.map(el => {
                                            return (<Select.Option key={el.about} label={el.name+' '+el.about+' '+el.phone} value={el.about} />)
                                        })
                                    }
                                </Select>
                                <Link to="/About/3"><Button>添加地址</Button></Link>
                                </div>
                            </Form.Item>
                            <Form.Item label="借书说明">
                                <Input type="textarea" placeholder="请输入借书说明" value={this.state.form.lend_remark} onChange={this.onChange.bind(this, 'lend_remark')}></Input>
                            </Form.Item>
                        </Form>
                    </Dialog.Body>
                    <Dialog.Footer className="dialog-footer">
                        <Button onClick={() => this.setState({ dialogVisible: false })}>取消</Button>
                        <Button type="primary" onClick={this.submit}>确定</Button>
                    </Dialog.Footer>
                </Dialog>
            </div>
        )
    }

    inputChange = (e) => {
        this.setState({
            msg: e.target.value
        })
    }
}
