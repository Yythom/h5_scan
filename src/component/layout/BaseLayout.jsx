// eslint-disable-next-line
import React from 'react';
// eslint-disable-next-line
import { Route, useHistory } from 'react-router-dom';
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator'
import { connect } from 'react-redux'
// eslint-disable-next-line
// import TabBar from '../../component/TabBar'
import Header from '../header/header'
import './BaseLayout.scss'
import 'animate.css'
//路由
import router from '../../router/router'
function _Layout(props) {
    const history = useHistory();
    return (
        <div className='layout animate__fadeIn animate__animated'>
            {props.scan && <Header scan={props.scan} isAddProduct={history.location.pathname.indexOf('qrcode') === -1} />}
            { // 路由tab栏
                Object.values(router).map(e => {
                    return (
                        <Route path={e.url} exact={e.desc !== '主页'} component={e.page} key={e.url} />
                    )
                })
            }
            {/* <TabBar /> */}
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(_Layout)