import Loadable from 'react-loadable';
import React from 'react';

const LoadableComponent = Loadable({
    //异步加载组件，组件是当前目录下的index.js对应的组件，这里import和上面Import不一样
    loader: () => import('./'),
    loading() {
        return <div>正在加载</div>
    },
});

export default () => <LoadableComponent/>;