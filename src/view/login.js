import React, { Component } from 'react'
import { Form, Input, Button ,Message} from 'element-react';
import '../assets/css/login.css'
import {login,registered} from '../api/api'
import {
    browserHistory
} from 'react-router-dom';
export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                pass: '',
                checkPass: '',
                status:1,
                email: '',
                account:'',
                password:''
            },
            rules: {
                account:[  { required: true, message: '请输入账户', trigger: 'blur' }],
                password:[  { required: true, message: '请输入密码', trigger: 'blur' }],
                pass: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请输入密码'));
                            } else {
                                if (this.state.form.checkPass !== '') {
                                    this.refs.form.validateField('checkPass');
                                }
                                callback();
                            }
                        }
                    }
                ],
                checkPass: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请再次输入密码'));
                            } else if (value !== this.state.form.pass) {
                                callback(new Error('两次输入密码不一致!'));
                            } else {
                                callback();
                            }
                        }
                    }
                ],
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
                  ],
                age: [
                    { required: true, message: '请填写年龄', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            var age = parseInt(value, 10);

                            setTimeout(() => {
                                if (!Number.isInteger(age)) {
                                    callback(new Error('请输入数字值'));
                                } else {
                                    if (age < 18) {
                                        callback(new Error('必须年满18岁'));
                                    } else {
                                        callback();
                                    }
                                }
                            }, 1000);
                        }, trigger: 'change'
                    }
                ]
            }
        };
    }
    onEmailChange(value) {
        this.setState({
          form: Object.assign({}, this.state.form, { email: value})
        });
      }

    handleSubmit(e) {
        e.preventDefault();
        this.refs.form.validate((valid) => {
            if (valid) {
                console.log(this.state.form)
                login(this.state.form).then(res=>{
                    console.log(res)
                    if(res.data.code==0){
                        Message({
                            message: '登录成功',
                            type: 'success'
                          });
                        localStorage.setItem('userInfo',JSON.stringify(res.data))
                        this.props.history.push({pathname: '/'})

                    }else{
                        Message.error(res.data.message);
                    }
                })
                // alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
        });
    }

    handleReset(e) {
        e.preventDefault();

        this.refs.form.resetFields();
    }
    handleRegirest(e) {
        e.preventDefault();
        this.refs.form.validate((valid) => {
            if (valid) {
                let form=Object.assign({},this.state.form);
                let temp={
                    user_name:form.name,
                    account:form.email,
                    password:form.pass
                }
                registered(temp).then(res=>{
                   
                        Message({
                            message: '注册成功',
                            type: 'success'
                          });
                          this.setState({
                            status:1
                          })

                    // }else{
                    //     Message.error(res.data.message);
                    // }
                })
                // alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
        });
    }
    onChange(key, value) {
        this.setState({
            form: Object.assign({}, this.state.form, { [key]: value })
        });
    }
    activeTab=(e)=>{
        this.setState({
            status:e
        })

    }
    render() {
        var html,form;
        if(this.state.status===2){
            html=(
                <div className="tab-line"></div>
            )
            form=(
                <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="100" className="demo-ruleForm">
                 <Form.Item prop="email" label="邮箱">
                      <Input value={this.state.form.email} onChange={this.onEmailChange.bind(this)}></Input>
                </Form.Item>
                <Form.Item prop="name" label="昵称">
                      <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
                </Form.Item>
                <Form.Item label="密码" prop="pass">
                    <Input type="password" value={this.state.form.pass} onChange={this.onChange.bind(this, 'pass')} autoComplete="off" />
                </Form.Item>
                <Form.Item label="确认密码" prop="checkPass">
                    <Input type="password" value={this.state.form.checkPass} onChange={this.onChange.bind(this, 'checkPass')} autoComplete="off" />
                </Form.Item>
                <div className="login-btn">
                <Form.Item>
                    <Button type="primary" onClick={this.handleRegirest.bind(this)}>注册</Button>
                    <Button onClick={this.handleReset.bind(this)}>重置</Button>
                </Form.Item>
                </div>
            </Form>
            )
        }else{
            html=(
                <div className="active"></div>
            )
            form=(
                <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="100" className="demo-ruleForm">
                  <Form.Item label="账户/邮箱" prop="account">
                    <Input  value={this.state.form.account} onChange={this.onChange.bind(this, 'account')} autoComplete="off" />
                 </Form.Item>
                <Form.Item label="密码" prop="password">
                    <Input type="password" value={this.state.form.password} onChange={this.onChange.bind(this, 'password')} autoComplete="off" />
                </Form.Item>
                <div className="login-btn">
                <Form.Item>
                    <Button type="primary" onClick={this.handleSubmit.bind(this)}>登录</Button>
                    <Button onClick={this.handleReset.bind(this)}>重置</Button>
                </Form.Item>
                </div>
            </Form>
            )
        }
        return (
            <div className="login">
                <div className="login-w">
                    <div className="tab-list">
                        <div className="tab1" onClick={this.activeTab.bind(this,1)}>
                            登录
                        </div>
                        <div className="tab2"  onClick={this.activeTab.bind(this,2)}>注册</div>
                       {html}
                    </div>
                   {form}
                </div>
            </div>
        )
    }
}
