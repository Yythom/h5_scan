import React from 'react'
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator'
import { connect } from 'react-redux'
function _Register(props) {
    return (
        <div>
            注册
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(_Register)