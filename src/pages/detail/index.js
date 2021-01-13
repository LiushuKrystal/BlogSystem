import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DetailWrapper, Header, Content } from './style';
import { actionCreators } from './store';

class Detail extends PureComponent {
    render() {
        return (
            <DetailWrapper>
                <Header>{this.props.title}</Header>
                <Content dangerouslySetInnerHTML={{__html:this.props.content}} />
            </DetailWrapper>
        )
    }

    componentDidMount() {
        this.props.getDetail(this.props.match.params.id);
    }
}

const mapState = (state) => ({
    id: state.getIn(['detail', 'id']),
    title: state.getIn(['detail', 'title']),
    content: state.getIn(['detail', 'content'])
});

const mapDispatch = (dispatch) => ({
    getDetail(articleID) {
        dispatch(actionCreators.getDetail(articleID));
    }
});

//APP.js中加了loadable.js后，loadable.js成为了直接引用的组件，这里让Detail组件可以获取到路由中所有的内容
export default connect(mapState, mapDispatch)(withRouter(Detail));