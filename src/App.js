import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
// import RouterComp from './RouterComp.jsx';

// import routerList from './router/router.js';
import { RouterView } from './router/router';
// import { MyBook } from './view/mybook';
// import { Index } from './view/index';
// import { Book } from './components/book'
class App extends Component {
	constructor(props) {
        super(props)
		console.log(this)
		// this.props.history.push('/index')
    }
	render() {
		return (
			<div className="app">
				 <Router>
				{/* <Index></Index> */}
				<RouterView></RouterView>
				</Router>
			</div>
		);
	}
}

export default App;
