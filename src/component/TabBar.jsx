import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom'
import router from '../router/router'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../redux/actionCreator'
function TabBar(props) {
    let { tabStatus } = props
    useEffect(() => {
        let path = props.location.pathname.split('/')[1]
        if (path === 'chat') props.activeTab(0)
    }, [])
    return (
        <div className="tabBox">
            <ul
            // style={localStorage.getItem('token') ? { visibility: 'visible' } : { visibility: 'hidden' }}
            >
                {
                    Object.values(router).map((e, i) => {
                        return (
                            <Link onClick={() => { props.activeTab(i) }} to={e.url} key={e.desc}>
                                <li >
                                    <p className={tabStatus === i ? 'iconBox activeIcon' : 'iconBox'}> {tabStatus === i ? e.activeIcon : e.icon}</p>
                                    <p style={tabStatus === i ? { color: 'red' } : { color: 'rgb(110, 110, 110)' }}>{e.desc}</p>
                                </li>
                            </Link>
                        )
                    })
                }
            </ul>
        </div>
    );
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TabBar));
