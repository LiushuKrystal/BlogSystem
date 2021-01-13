import axios from 'axios';
import * as constants from './constants';
import { fromJS } from 'immutable';

const changeHomeData = (result) => ({
    type: constants.CHANGE_HOME_DATA,
    articleList: result.articleList,
    recommendList: result.recommendList,
    writerList: result.writerList
});

//这里如果用List转化是不行的，因为List只会转化数组的一层为immutable的
//数组里面放的对象依然是JS对象不会被转化，所以要用fromJS
const addMoreList = (result, nextPage) => ({
    type: constants.GET_MORE_LIST,
    list: fromJS(result),
    nextPage
});

export const getHomeInfo = () => {
    return (dispatch) => {
        axios.get('/api/home.json').then((res) => {
            const result = res.data.data;
            const action = changeHomeData(result);
            dispatch(action);
        }).catch(() => {
            console.log('error');
        })
    }
};

export const getMoreList = (page) => {
    return (dispatch) => {
        axios.get('/api/homeList.json?page=' + page).then((res) => {
            const result = res.data.data;
            const action = addMoreList(result, page + 1);
            dispatch(action);
        }).catch(() => {
            console.log('error');
        })
    }
};

export const toggleTopShow = (show) => ({
    type: constants.TOGGLE_SCROLL_TOP,
    show
});