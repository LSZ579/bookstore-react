import React, { Component } from 'react'
export class Load extends Component {
    render() {
        let html;
        if(this.props.status){
            html=(<div onClick={this.props.getMore} className="loadmore">加载更多</div>)
        }else{
            html=(
                <div className="nulls">没有了！！</div>
            )
        }
        return (
            <div>
                {html}
            </div>
        )
    }

}
