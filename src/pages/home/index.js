import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Topic from './components/Topic';
import List from './components/List';
import Recommend from './components/Recommend';
import Writer from './components/Writer';
import { actionCreators } from './store';
import { BackTop } from './style';

import {
    HomeWrapper,
    HomeLeft,
    HomeRight,
} from './style';

class Home extends PureComponent {


    handleScrollTop() {
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <HomeWrapper>
                <HomeLeft>
                    <img className="banner-img" alt="" />
                    <Topic />
                    <List />
                </HomeLeft>
                <HomeRight>
                    <Recommend />
                    <Writer />
                </HomeRight>

                { this.props.showScroll ? <BackTop onClick={this.handleScrollTop} >顶部</BackTop> : null}
            </HomeWrapper>
        )
    }
    //先让上面静态的部分渲染出来，然后发ajax请求请求数据
    componentDidMount() {
        this.props.changeHomeData();
        this.bindEvents();
    }

    //组件挂载完成后往window上绑定一个事件监听
    bindEvents() {
        window.addEventListener('scroll', this.props.changeScrollTopShow)
    }

    //当前组件即将从页面移除的时候需要把绑定在全局的window上的事件移除，才不会影响其他组件
    componentWillUnmount(){
        window.removeEventListener('scroll', this.props.changeScrollTopShow)
    }

}

const mapState = (state) => ({
    showScroll: state.getIn(['home', 'showScroll'])
});

const mapDispatch = (dispatch) => ({
    changeHomeData() {
        const action = actionCreators.getHomeInfo();
        //action是一个函数，会顺序执行
        dispatch(action);
    },
    changeScrollTopShow() {
        if (document.documentElement.scrollTop > 200) {
            dispatch(actionCreators.toggleTopShow(true));
        } else {
            dispatch(actionCreators.toggleTopShow(false));
        }
    }
});

export default connect(mapState, mapDispatch)(Home);