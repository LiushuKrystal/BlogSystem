import * as constants from './constants';
import { fromJS } from 'immutable';
//如果不用immutable库，会存在手动改state的风险

//通过fromJS将js对象转化成immutable对象
//内层数组也是immutable对象,更新传过来的的也应该是immutable对象，在actionCreators中处理
const defaultState = fromJS({
    focused: false,
    mouseIn: false,
    list: [],
    page: 0,
    totalPage: 1
});

const dispatch = (state = defaultState, action) => {
    switch (action.type) {
        case constants.SEARCH_FOCUS:
            return state.set('focused', true);
        case constants.SEARCH_BLUR:
            return state.set('focused', false);
        case constants.CHANGE_LIST:
            return state.merge({
                list: action.data,
                totalPage: action.totalPage
            })
        case constants.MOUSE_ENTER:
            return state.set('mouseIn', true);
        case constants.MOUSE_LEAVE:
            return state.set('mouseIn', false);
        case constants.CHANGE_PAGE:
            return state.set('page', action.page);
        default:
            return state;
    }
};

export default dispatch;