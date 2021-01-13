import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

//用来在chrome开发者工具中查看数据
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//配置store使用redux-thunk中间件
const store = createStore(reducer, composeEnhancers(
	applyMiddleware(thunk)
	));

export default store;