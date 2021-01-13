import axios from 'axios';
import * as constants from './constants';

const makeDetail = (title, content, author, date) => ({
    type: constants.GET_DETAIL,
    title,
    author,
    date,
    content
});

export const getDetail = (articleID) => {
    return (dispatch) => {
        axios.get('/api/detail.json?articleID=' + articleID).then((res) => {
            console.log(res);
            const result = res.data.data;
            const action = makeDetail(result.title, result.content, result.author, result.date);
            console.log(action);
            dispatch(action);
        }).catch((error) => {
            console.log(error);
        })
    }
};