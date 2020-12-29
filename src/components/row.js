import React, { Component } from 'react'
import '../assets/css/row.css'

import { Layout} from 'element-react';
export class RowLayout extends Component {

    render() {
        const {  children } = this.props;
        return (
            <div>
                <Layout.Row gutter="10x">
                    <Layout.Col xs="1" sm="3" md="4" lg="4"><div className="grid-content"></div></Layout.Col>
                    <Layout.Col xs="22" sm="18" md="16" lg="16">
                        {children}
                    </Layout.Col>
                    <Layout.Col xs="1" sm="3" md="4" lg="4"><div className="grid-content"></div></Layout.Col>
                </Layout.Row>
            </div>
        )
    }

}
