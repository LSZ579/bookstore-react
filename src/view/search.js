import React, { Component } from 'react'
import { RowLayout } from '../components/row'
import { SearchBook } from '../components/search'
import { Book } from '../components/book'
import {searchBook} from '../api/api'
export class SearchBooklist extends Component {
    constructor(props){
        super(props)
        this.state={
            list:[],
            key:this.props.match.params.key
        }
    }
    componentDidMount=()=>{
        this.searchBooks()
    }
    searchBooks=()=>{
        searchBook({search:this.state.key}).then(res=>{
            this.setState({
                list:res.data
            })
        })
    }
    getKeyWord=(e)=>{
        console.log('===',e)
        this.setState({
            key:e
        })
        this.searchBooks()
    }
    render(){
        return(
            <div>
                <RowLayout>
                     <SearchBook plach={this.props.match.params.key} getKey={this.getKeyWord}></SearchBook>
                     <div>搜索结果</div>
                     <Book list={this.state.list}></Book>
                </RowLayout>
            </div>
        )
    }
}