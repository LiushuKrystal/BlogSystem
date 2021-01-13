import React, { PureComponent } from 'react';
import { WriterWrapper, WriterItem, WriterInfo } from '../style';
import { connect } from 'react-redux';

class Writer extends PureComponent {
    render() {
        const { writerList } = this.props;
        return (
            <WriterWrapper>
            	{
            		writerList.map((item) => {
            			return (
            				<WriterItem key={item.get('id')}>
            					<img className="pic" src={item.get('imgUrl')} alt="" />
            					<WriterInfo>
	            					<div className="name" >{item.get('name')}</div>
	            					<p className="desc" >{item.get('desc')}</p>
            					</WriterInfo>
            				</WriterItem>
            			)
            		})
            	}
            </WriterWrapper>
        )
    }
}

const mapState = (state) => ({
    writerList: state.getIn(['home', 'writerList'])
});

export default connect(mapState, null)(Writer);