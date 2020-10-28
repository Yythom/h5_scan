// eslint-disable-next-line
import React from 'react';
// eslint-disable-next-line
import { Route } from 'react-router-dom';
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator'
import { connect } from 'react-redux'
// eslint-disable-next-line
// import TabBar from '../../component/TabBar'
import './BaseLayout.scss'
import 'animate.css'
//路由
import router from '../../router/router'
function _Layout(props) {
    return (
        <div className='layout animate__fadeIn animate__animated'>
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