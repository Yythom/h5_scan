import React from 'react'
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator'
import { connect } from 'react-redux'
function _Login(props) {
    console.log(props);

    return (
        <div>
            登入----
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(_Login)

