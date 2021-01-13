import { GlobalStyleIcon } from '../../statics/iconfont/iconfont.js';
import React, { Fragment } from 'react';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { actionCreators } from './store';
import { actionCreators as loginActionCreators } from '../../pages/login/store'
import { Link } from 'react-router-dom';
import {
    HeaderWrapper,
    Logo,
    Nav,
    NavItem,
    NavSearch,
    SearchWrapper,
    Addition,
    Button,
    SearchInfo,
    SearchInfoTitle,
    SearchInfoSwitch,
    SearchInfoList,
    SearchInfoItem
} from './style'; //引入style中定义的组件


//用redux实现了数据和组件的分离，组件是无状态的
class Header extends PureComponent {
    getListArea() {
        const { focused, list, page, mouseIn, totalPage, handleMouseEnter, handleMouseLeave, handleChangePage } = this.props;
        const jsList = list.toJS();
        const pageList = [];

        if (jsList.length) {
            for (let i = page * 6; i < (page + 1) * 6 && i < jsList.length; i++) {
                pageList.push(
                    <SearchInfoItem key={jsList[i]}>{jsList[i]}</SearchInfoItem>
                )
            }
        }

        if (focused || mouseIn) {
            return (
                <SearchInfo 
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwitch onClick={() => handleChangePage(page, totalPage, this.spinIcon)}>
                            <span ref={(icon) => { this.spinIcon = icon}} className='iconfont spin'>&#xe851;</span>
                            换一批
                        </SearchInfoSwitch>
                        </SearchInfoTitle>
                        <SearchInfoList>
                            {pageList}
                        </SearchInfoList>
                </SearchInfo>
            )
        } else {
            return null;
        }
    }
    render() {
        const { focused, handleInputFocus, handleInputBlur, list, login, logout } = this.props;
        return (
            <Fragment>
            <GlobalStyleIcon/>
            <HeaderWrapper>
                <Link to='/'>
                    <Logo />
                </Link>
                <Nav>
                    <NavItem className='left active'>首页</NavItem>
                    <NavItem className='left'>下载App</NavItem>
                    { login ? 
                        <NavItem onClick={logout} className='right'>退出</NavItem> : 
                        <Link to='/login'><NavItem className='right'>登录</NavItem></Link>
                    }
                    <NavItem className='right'>
                        <span className="iconfont">&#xe636;</span>
                    </NavItem>
                    <SearchWrapper>
                        <CSSTransition in={focused} timeout={200} classNames='slide'>
                            <NavSearch 
                                className={focused ? 'focused':''} 
                                onFocus={() => {handleInputFocus(list)}}
                                onBlur={handleInputBlur}
                            >
                            </NavSearch>
                        </CSSTransition>
                        <span className={focused ? 'focused iconfont zoom':'iconfont zoom'}>&#xe6cf;</span>
                        {this.getListArea()}
                    </SearchWrapper>
                </Nav>
                <Addition>
                    <Link to='/write'>
                        <Button className='writting'>
                            <span className="iconfont">&#xe77f;</span>
                            写文章
                        </Button>
                    </Link>
                    <Button className='reg'>注册</Button>
                </Addition>
            </HeaderWrapper>
        </Fragment>
        );
    }
}

//state指store创建出的所有数据，这个函数定义了这些数据映射到props的规则
const mapStateToProps = (state) => {
    return {
        //state.header.get数据获取行为不统一，前面js对象，后面immutable对象
        //通过在reducer.js里将state也变成immutable对象解决
        //focused:state.getIn(['header','focused'])
        focused: state.get('header').get('focused'),
        list: state.getIn(['header', 'list']),
        page: state.getIn(['header', 'page']),
        mouseIn: state.getIn(['header', 'mouseIn']),
        totalPage: state.getIn(['header', 'totalPage']),
        login: state.getIn(['login', 'login'])
    }
};

//组件改变store中的数据的方法，调用store的dispatch方法从而派发action给store
const mapDispatchToProps = (dispatch) => {
    return {
        handleInputFocus(list) {
            //只有在list长度是0的时候才派发action，避免多余的ajax请求
            (list.size === 0) && dispatch(actionCreators.getList()); //getList()返回的是一个对象
            dispatch(actionCreators.searchFocus());
        },
        handleInputBlur() {
            dispatch(actionCreators.searchBlur());
        },
        handleMouseEnter() {
            dispatch(actionCreators.mouseEnter());
        },
        handleMouseLeave() {
            dispatch(actionCreators.mouseLeave());
        },
        handleChangePage(page, totalPage, spin) {
            let originAngle = spin.style.transform.replace(/[^0-9]/ig, '');
            if (originAngle) {
                originAngle = parseInt(originAngle, 10);
            } else {
                originAngle = 0;
            }
            spin.style.transform = 'rotate(' + (originAngle + 360) + 'deg)';
            dispatch(actionCreators.changePage((page + 1) % totalPage));
        },
        logout() {
            //改变login数据内容为false，退出登录
            //header中的actionCreators只能改变header中定义的量，需要通过login下面的actionCreators才能改变
            dispatch(loginActionCreators.logout())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);