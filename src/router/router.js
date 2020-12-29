import React, { Component } from 'react'
import {
    Route
} from 'react-router-dom';
import { Details } from '../view/detail'
import { MyBook } from '../view/mybook';
import { Index } from '../view/index';
import { Login } from '../view/login';
import {Infos} from '../view/message'
import {SearchBooklist} from '../view/search'
export class RouterView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    render() {
        return (
            <div>
                <Route exact path="/" component={Index} />
                <Route path="/About/:status" component={MyBook} />
                <Route path="/Details/:id" component={Details} />
                <Route path="/login" component={Login} />
                <Route path="/Infos" component={Infos} />
                <Route path="/SearchBook/:key" component={SearchBooklist} />
            </div>
        )
    }
}
