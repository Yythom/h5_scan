import React from 'react'
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator'
import { connect } from 'react-redux'
function ComponentName(props) {
    return (
        <div>
            这是一个测试组件
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(ComponentName)