// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line
import { useHistory, Route } from 'react-router-dom';
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator'
import { connect } from 'react-redux'
import TabBar from '../../component/TabBar'
import './BaseLayout.scss'
//路由
import router from '../../router/router'
function _Layout(props) {
    return (
        <div className='layout'>
            { // 路由tab栏
                Object.values(router).map(e => {
                    return (
                        <Route path={e.url} exact component={e.page} key={e.url} />
                    )
                })
            }

            <TabBar />
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(_Layout)