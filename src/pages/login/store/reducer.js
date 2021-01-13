import { fromJS } from 'immutable';
import * as constants from './constants';
//如果不用immutable库，会存在手动改state的风险

//通过fromJS将js对象转化成immutable对象
//内层数组也是immutable对象,更新传过来的的也应该是immutable对象，在actionCreators中处理
const defaultState = fromJS({
    login: false
});

const exportItem = (state = defaultState, action) => {
    switch (action.type) {
        case constants.CHANGE_LOGIN:
            return state.set('login', action.value);
        case constants.LOGOUT:
            return state.set('login', action.value);
        default:
            return state;
    }
};

export default exportItem;