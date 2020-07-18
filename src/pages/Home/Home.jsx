import React from 'react'
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator'
import { connect } from 'react-redux'
function _Home(props) {
    return (
        <div>
            主页
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(_Home)