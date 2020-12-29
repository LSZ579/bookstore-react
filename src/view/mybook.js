import React, { Component } from 'react'
// import './header.css'
import {
    Link
} from 'react-router-dom';
import '../assets/css/MyBook.css'
import { Button, MessageBox, Dialog, Notification,Form, Table, Tag, Icon, Switch, Input, Checkbox, Radio, Upload, Message, Tabs } from 'element-react';
import { Book } from '../components/book'
import ReactFileReader from "react-file-reader";
import { Headers } from '../components/header'
import { RowLayout } from '../components/row'
import {Address} from './address'
import {Infos} from './message'
import {Mylend} from './myLend'
import {MyLendBook} from './lendBook'
import {MgrMes} from './mesMgr'
import { uploadImg, addBook, getMyBook,editBook,deleteBook,changBookStatus,allBookStatus,getmessage} from '../api/api.js'
export class MyBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            myLends:[],
            allMes:[],
            list: [],
            activeName:'1',
            userInfo: localStorage.getItem('userInfo'),
            form: {
                book_name: '',
                author: '',
                ISBN: '',
                status: '',
                desc: ''
            },
            status:false,
            type: false,//true为添加
            imageUrl: '',
            columns: [
                {
                    type: 'index'
                },
                {
                    label: "图书封面",
                    align: 'center',
                    prop: "img_url",
                    width: 120,
                    render: function (data) {
                        return (
                            <span>
                                <img className="table-book-img" src={'http://localhost:3000' + data.img_url} alt="暂无图片"></img>
                            </span>)
                    }
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
                    label: "图书作者",
                    prop: "author",
                    align: 'center',
                    width: 160,
                    render: function (data) {
                        return <span>{data.author}</span>
                    }
                },
                {
                    label: "ISBN",
                    prop: "ISBN",
                    align: 'center',
                    width: 160,
                    render: function (data) {
                        return <span>{data.ISBN}</span>
                    }
                },
                {
                    label: "简介",
                    prop: "desc",
                    align: 'center',
                    render: function (data) {
                        return <span>{data.desc}</span>
                    }
                },
                {
                    label: "简介",
                    prop: "status",
                    align: 'center',
                    render: function (data) {
                        return <span>{data.status==2?'正常':data.status==3?'不可借出':'已借出'}</span>
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
                        if (data.status !== 1) {
                            btn = (
                                <Button type="primary" onClick={this.changBookStatuss.bind(this,data)} size="small">标记为{data.status == 2 ? '不可借阅' : '可借阅'}</Button>
                            )
                        } else {
                            btn = (
                                <Button type="info" size="small">图书已借出</Button>
                            )
                        }
                        return (
                            <span>
                                <Button plain={true} type="info" onClick={this.showEdit.bind(this, data)} size="small">编辑</Button>
                                {
                                    btn
                                }
                                <Button type="danger" onClick={this.deleteBook.bind(this,data)} size="small">删除</Button>
                            </span>
                        )
                    }
                }
            ],
        };
    }
    componentDidMount = () => {
        if(this.props.match.params.status){
            this.setState({
                activeName:this.props.match.params.status.toString()
            })
        }
        let info = JSON.parse(this.state.userInfo)
        if (!this.state.userInfo) {
            MessageBox.confirm('您还没登录，是否去登录?', '提示', {
                cancelButtonText: '返回首页',
                confirmButtonText: '去登陆',
                type: 'warning'
            }).then(() => {
                this.props.history.push({ pathname: '/login' })
            }).catch(() => {
                this.props.history.push({ pathname: '/' })
            });
            return
        }
        this.getData()
        this.getBook()
    
    }
    getStatus=(e)=>{
        this.setState({
            status:e
        })
    }
    getData=()=>{
        let user = JSON.parse(localStorage.getItem('userInfo')).user;
        getmessage({ uid: user.id }).then(res => {
            this.setState({
                myLends: res.data.a,
                allMes:res.data.a.concat(res.data.b)
            })
        })
    }
    toMesage=()=>{
        console.log(this.state.activeName)
        this.setState({
            activeName:"5"
        })
    }
    changeTab=(i)=>{
        this.setState({
            activeName:i
        })
    }
    // 获取我的图书
    getBook=()=>{
        let info = JSON.parse(this.state.userInfo)
        getMyBook({ id: info.user.id }).then(res => {
            this.setState({
                list: res.data
            })
        })
    }
    // 打开编辑
    showEdit = (e) => {
        let status=e.status==2?true:false
        this.setState({
            type: true,
            status,
            dialogVisible: true,
            form: Object.assign({}, e),
            imageUrl: e.img_url,
            
        })
        

    }
    // 删除图书
    deleteBook=(e)=>{
        if(e.status==1){
            Notification({
                title: '警告',
                message: '该图书已经借出，不可删除',
                type: 'warning'
              });
              return
        }
        deleteBook(e).then(res=>{
            if(res.data==1){
                Notification({
                    title: '成功',
                    message: '删除成功',
                    type: 'success'
                  });
                  this.getBook()
            }else{
                Notification({
                    title: '失败',
                    message: '删除失败',
                    type: 'warning'
                  });
            }
        })
    }
    onSubmit(e) {
        e.preventDefault();
    }
    changeAll=(e)=>{
        allBookStatus({
            type:e,
            list:this.state.list
        }).then(res=>{
            this.getBook()
        })
    }
    changBookStatuss=(e)=>{
        let status=e.status==2?3:2
        changBookStatus({
            status,
            id:e.id,
            user_id:e.user_id
        }).then(res=>{
            this.getBook()
        })
    }
    onChange(key, value) {
        console.log(key, value)
        this.state.form[key] = value;
        this.forceUpdate();
    }
    // 获取上传的图片的base64地址
    handleFiles = (files) => {
        let base = files.base64.replace(/^data:image\/\w+;base64,/, '')
        uploadImg({ content: base }).then(res => {
            console.log(res.data.path, 8888)
            this.setState({ imageUrl: res.data.path.slice(8, 99999) });
        })
    }
    submit = () => {
        console.log(this.state.form)
        let temp = Object.assign({}, this.state.form)
        temp.img_url = this.state.imageUrl;
        temp.user_id = JSON.parse(this.state.userInfo).user.id;
        temp.status = this.state.status ? 2 : 3
        if(this.state.type){
            this.editBooks(temp)
        }else{
            this.addBooks(temp)
        }
    }
    // 添加
    addBooks=(temp)=>{
        addBook(temp).then((res) => {
                Notification({
                    title: '成功',
                    message: '添加成功',
                    type: 'success'
                  });
                  this.setState({ dialogVisible: false })
                  this.getBook()
        })
    }
    // 编辑
    editBooks=(temp)=>{
        editBook(temp).then(res=>{
            console.log(res)
                Notification({
                    title: '成功',
                    message: '编辑成功',
                    type: 'success'
                  });
                  this.setState({ dialogVisible: false })
                  this.getBook()
        })
    }
    render() {
        if (!this.state.userInfo) {
            return (<div>
                还没登录
            </div>)
        }
        let upload, book;
        if (this.state.imageUrl) {
            upload = (
                <img alt="加载失败" className="upload-book-img" src={'http://localhost:3000' + this.state.imageUrl}></img>
            )
        } else {
            upload = (
                <i className="el-icon-picture  up-icon"></i>
            )
        }
        if (this.state.list.length > 0) {
            book = (<div> <Book list={this.state.list}></Book></div>)
        } else {
            book = (<div className="nulls">这里空空如也</div>)
        }
        return (
            <div>
                <Headers index="3" mes={this.toMesage}></Headers>

                <RowLayout>
                    <Tabs activeName={this.state.activeName} onTabClick={(tab) => this.setState({
                        activeName:tab.props.name
                    })}>
                        <Tabs.Pane label="我上传的图书" name="1">
                            <div className="m10">
                                <Button onClick={() => this.setState({
                                    dialogVisible: true, type: false, form: {
                                        book_name: '',
                                        author: '',
                                        ISBN: '',
                                        status: '',
                                        desc: ''
                                    }, imageUrl: ''
                                })}>添加图书</Button>
                                   <Button onClick={this.changeAll.bind(this,true)}>标记所有图书状态为不可借阅</Button>
                                   <Button onClick={this.changeAll.bind(this,false)}>标记所有图书状态为可借</Button>
                            </div>

                            <Table
                                style={{ width: '100%' }}
                                columns={this.state.columns}
                                data={this.state.list}
                                border={true}
                                height="70vh"
                                highlightCurrentRow={true}
                                onCurrentChange={item => { console.log(item) }}
                            />
                        </Tabs.Pane>
                            <Tabs.Pane label="我借阅的图书" name="2"><Mylend></Mylend></Tabs.Pane>
                            <Tabs.Pane label="审批管理" name="mes">
                                <Infos getLend={this.getData} myLends={this.state.myLends}></Infos>
                            </Tabs.Pane>
                        <Tabs.Pane label="地址管理" name="3"><Address></Address></Tabs.Pane>
                        <Tabs.Pane label="消息管理" name="5">
                            <MgrMes changeTab={this.changeTab} allMes={this.state.allMes}></MgrMes>
                        </Tabs.Pane>
                        <Tabs.Pane label="我借出的书" name="6">
                           <MyLendBook></MyLendBook>
                        </Tabs.Pane>
                    </Tabs>


                    {/* {book} */}
                </RowLayout>

                <Dialog
                    title={this.state.type ? '编辑图书' : '添加图书'}
                    size="small"

                    visible={this.state.dialogVisible}
                    onCancel={() => this.setState({ dialogVisible: false })}
                    lockScroll={false}
                >
                    <Dialog.Body>
                        <Form model={this.state.form} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
                            <Form.Item label="图书名称">
                                <Input value={this.state.form.book_name} onChange={this.onChange.bind(this, 'book_name')}></Input>
                            </Form.Item>
                            <Form.Item label="图书作者">
                                <Input value={this.state.form.author} onChange={this.onChange.bind(this, 'author')}></Input>
                            </Form.Item>
                            <Form.Item label="上传封面">
                                <ReactFileReader
                                    fileTypes={[".png", ".jpg", ".gif", "jpeg"]}
                                    base64
                                    multipleFiles={!1}
                                    handleFiles={this.handleFiles}>
                                    <div className="flex-row">
                                        {upload}
                                    </div>
                                </ReactFileReader>
                            </Form.Item>
                            <Form.Item label="ISBN">
                                <Input value={this.state.form.ISBN} onChange={this.onChange.bind(this, 'ISBN')}></Input>
                            </Form.Item>

                            <Form.Item label="是否可借出">
                                <Switch
                                    onText=""
                                    offText=""
                                    value={this.state.status}
                                    onChange={this.getStatus.bind(this)}
                                />
                            </Form.Item>
                            <Form.Item label="图书简介">
                                <Input type="textarea" rows="6" className="text-h" value={this.state.form.desc} onChange={this.onChange.bind(this, 'desc')}></Input>
                            </Form.Item>
                        </Form>
                    </Dialog.Body>
                    <Dialog.Footer className="dialog-footer">
                        <Button onClick={() => this.setState({ dialogVisible: false })}>取消</Button>
                        <Button type="primary" onClick={this.submit}>确定</Button>
                    </Dialog.Footer>
                </Dialog>
            </div >
        )
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
