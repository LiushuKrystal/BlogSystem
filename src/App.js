import Header from './common/header/index.js';
import { GlobalStyle } from './style.js';
import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/home';
import Detail from './pages/detail/loadable.js';
import Login from './pages/login';
import Write from './pages/write';
import store from './store';

function App() {
    return (
        <Provider store={store}>
	        <Fragment>
	    		<GlobalStyle />
	    		<BrowserRouter>
	    			<div>
	    				<Header />
	    				<Route path="/" exact component = {Home}></Route>
	    				<Route path="/login" exact component = {Login}></Route>
	    				<Route path="/write" exact component = {Write}></Route>
	    				<Route path="/detail/:id" exact component = {Detail}></Route>
	    			</div>
	    		</BrowserRouter>
	    	</Fragment>
    	</Provider>
    );
}

export default App;