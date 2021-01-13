import { fromJS } from 'immutable';
import * as constants from './constants';
//如果不用immutable库，会存在手动改state的风险

//通过fromJS将js对象转化成immutable对象
//内层数组也是immutable对象,更新传过来的的也应该是immutable对象，在actionCreators中处理
const defaultState = fromJS({
    articleList: [],
    recommendList: [],
    writerList: [],
    articlePage: 1,
    showScroll: false
});

const changeHomeData = (state, action) => {
    return state.merge({
        articleList: fromJS(action.articleList),
        recommendList: fromJS(action.recommendList),
        writerList: fromJS(action.writerList)
    });
};

const getMoreList = (state, action) => {
    return state.merge({
        'articleList': state.get('articleList').concat(action.list),
        'articlePage': action.nextPage
    });
};

const exportItem = (state = defaultState, action) => {
    switch (action.type) {
        case constants.CHANGE_HOME_DATA:
            return changeHomeData(state, action);
        case constants.GET_MORE_LIST:
            return getMoreList(state, action);
        case constants.TOGGLE_SCROLL_TOP:
            return state.set('showScroll', action.show);
        default:
            return state;
    }
};

export default exportItem;