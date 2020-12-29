import React, { Component } from 'react'
import { Button } from 'antd';

import {Notification,Dialog,Form,Input,Radio} from 'element-react'
import { getUserAddress,deleteAddress,setAddress,addAddress} from '../api/api'
import 'antd/dist/antd.css';
import '../assets/css/address.css'
export class Address extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            type:true,
            sex:1,
            userInfo:JSON.parse(localStorage.getItem('userInfo')).user,
            dialogVisible:false,
            form:{
                name:'',
                phone:'',
                about:'',
                sex:1
            }
        }
    }
    componentDidMount = () => {
        this.getList()
    }
    onChanges(value) {
        this.setState({ 
            sex:value
         });
        this.state.form.sex = value;

      }
    getList() {
        let user = JSON.parse(localStorage.getItem('userInfo'))
        getUserAddress({
            userID: user.user.id
        }).then(res => {
            console.log(res)
            this.setState({
                list: res.data
            })
        })
    }
    deleteAddress=(e)=>{
        let id=e.id;
        deleteAddress({id}).then(res=>{
            if(res.data==1){
                Notification({
                    title: '成功',
                    message: '删除成功',
                    type: 'success'
                  });
                  this.getList()
            }
        })
    }
    insertAddress=()=>{
        this.setState({ dialogVisible: true ,type:true,form:{
            name:'',
            phone:'',
            about:''
        }})
    }
    // 编辑按钮
    edit=(e)=>{
        this.setState({
            form:Object.assign({},e),
            sex:e.sex+''
        })
        console.log(this.state.sex)
        this.setState({ dialogVisible: true ,type:false})
    }
    // 确认提交编辑或添加
    submit=()=>{
        let temp={
            data:{}
        };
        temp.data=Object.assign({},this.state.form)
        temp.userID=this.state.userInfo.id;
        if(this.state.type){
            // 添加
            addAddress(temp).then(res=>{
                if(res){
                    Notification({
                        title: '成功',
                        message: '添加成功',
                        type: 'success'
                      });
                }
                this.setState({ dialogVisible: false})
                this.getList()
            })
        }else{
            temp.id= temp.data.id;
            // 编辑
            setAddress(temp).then(res=>{
                if(res){
                    Notification({
                        title: '成功',
                        message: '编辑成功',
                        type: 'success'
                      });
                      this.setState({ dialogVisible: false})
                this.getList()
                }
            })
        }
    }
    onSubmit(e) {
        e.preventDefault();
    }
    // 更新表单的值
    onChange(key, value) {
        console.log(key, value)
        this.state.form[key] = value;
        this.forceUpdate();
    }
    render() {
        return (
            <div>
                <Button onClick={this.insertAddress}>添加地址</Button>
                <div className="address-list">
                    {
                        this.state.list.map((item, index) => {
                            return (
                                <div className="address-list-item flex-row">
                                    <div>
                                    <div className="address-list-name">
                                        <span>{item.name}</span>&nbsp;&nbsp;&nbsp;
                                        <span>{item.phone}</span>&nbsp;&nbsp;
                                        <span>{item.sex == 1 ? '男生' : '女生'}</span>
                                    </div>
                                    <div  className="address-list-detail">
                                        {item.about}
                                    </div>
                                    </div>
                                   <div className="right-btn">
                                   <Button className="address-edit" onClick={this.edit.bind(this,item)}>编辑</Button>
                                    <Button danger onClick={this.deleteAddress.bind(this,item)}>删除</Button>
                                   </div>
                                </div>
                            )
                        })
                    }
                </div>
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
                                <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
                            </Form.Item>
                            <Form.Item label="手机号">
                                <Input value={this.state.form.phone} onChange={this.onChange.bind(this, 'phone')}></Input>
                            </Form.Item>
                            <Form.Item label="性别">
                            <Radio value="1" checked={this.state.sex === '1'} onChange={this.onChanges.bind(this)}>男</Radio>
                                <Radio value="2" checked={this.state.sex === '2'} onChange={this.onChanges.bind(this)}>女</Radio>
                            </Form.Item>
                            <Form.Item label="详细地址">
                                <Input type="textarea" value={this.state.form.about} onChange={this.onChange.bind(this, 'about')}></Input>
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
}