import React from 'react'
import { mapStateToProps, mapDispatchToProps } from './redux/actionCreator'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'


//路由
import router from './router/router'

//公共组件
import TabBar from './component/TabBar'

//组件
import Login from './pages/User/Login'
import Register from './pages/User/Register'

function _App(props) {
    return (
        <>
            <Router>
                <Switch>
                    <Route path='/' exact component={Login}></Route>
                    <Route path='/register' exact component={Register}></Route>
                    {
                        // 路由tab栏
                        Object.values(router).map(e => {
                            return (
                                <Route path={e.url} exact component={e.page} key={e.url} />
                            )
                        })
                    }
                    <Route path='/404' exact component={() => <h1>404</h1>}></Route>
                    <Redirect to="/404" />
                </Switch>
                <TabBar />
            </Router>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(_App)
