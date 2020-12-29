import React, { Component } from 'react'
import '../assets/css/detail.css'
import { RowLayout } from './row'
import {SearchInput} from './searchInput'
export class SearchBook extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    getKeyword= (e)=>{
        this.props.getKey(e)
    }
    render() {
        return (
            <div className="searchTab">
                <RowLayout>
                    <SearchInput plach={this.props.plach} parentFn={this.getKeyword}></SearchInput>
                </RowLayout>
            </div>
        )
    }
}
