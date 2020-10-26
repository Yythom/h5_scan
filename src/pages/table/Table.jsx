import React from 'react'
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator'
import { connect } from 'react-redux'
function Table(props) {
    return (
        <div>
            桌详情
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Table)