import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import router from '../router/router'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../redux/actionCreator'
class TabBar extends Component {
    render() {
        let { tabStatus } = this.props
        return (
            <div className="tabBox">
                <ul
                // style={localStorage.getItem('token') ? { visibility: 'visible' } : { visibility: 'hidden' }}
                >
                    {
                        Object.values(router).map((e, i) => {
                            return (
                                <Link onClick={() => { this.props.activeTab(i) }} to={e.url} key={e.desc}>
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
}
export default connect(mapStateToProps, mapDispatchToProps)(TabBar)
