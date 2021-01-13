import { fromJS } from 'immutable';
import * as constants from './constants';
//如果不用immutable库，会存在手动改state的风险

//通过fromJS将js对象转化成immutable对象
//内层数组也是immutable对象,更新传过来的的也应该是immutable对象，在actionCreators中处理

const defaultState = fromJS({
    id: "",
    title: "",
    author: "",
    date: "",
    content: "",
});

const changeDetail = (state, action) => {
    return state.merge({
        title: fromJS(action.title),
        author: fromJS(action.author),
        date: fromJS(action.date),
        content: fromJS(action.content)
    });
};

const exportItem = (state = defaultState, action) => {
    switch (action.type) {
        case constants.GET_DETAIL:
            return changeDetail(state, action);
        default:
            return state;
    }
};

export default exportItem;