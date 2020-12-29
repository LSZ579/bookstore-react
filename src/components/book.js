import React, { Component } from 'react'
import '../assets/css/book.css'
import img from '../assets/img.jpg'
import {
    Link
} from 'react-router-dom';


import { Layout, Card,Breadcrumb } from 'element-react';
import { BOOLEAN_BINARY_OPERATORS } from '@babel/types';
export class Book extends Component {
    constructor(props) {
        super(props)
        this.state = {
            msg: '',
          
        }
    }
    render() {
        let bookList;
        if(this.props.list.length>0){
            bookList=(
                this.props.list.map((item) => {
                    return (
                        <Link to={'/Details/'+item.id}>
                        <div className="book-list-item">
                            <Card bodyStyle={{ padding: 0 }}>
                                <img src={'http://localhost:3000'+item.img_url} alt="加载失败" className="book-img" />
                                <div style={{ padding: 14 }}>
                                    <span>{item.book_name}</span>
                                    <div className="bottom clearfix">
                                      <time className="time">作者：{item.author}</time>
                                        {/* <Button type="text" className="button">操作按钮</Button> */}
                                    </div>
                                </div>
                            </Card>
                        </div>
                        </Link>
                    )
                })
            )
        }
        return (
            <div className="container">
                        <div className="book">
                            <div className="book-list">
                                {
                                   bookList
                                }
                                <i className="null"></i>
                                <i className="null"></i>
                                <i className="null"></i>  
                                <i className="null"></i>
                                <i className="null"></i>
                                <i className="null"></i>
                            </div>
                        </div>
            </div>
          
        )
    }

    inputChange = (e) => {
        this.setState({
            msg: e.target.value
        })
    }
}
