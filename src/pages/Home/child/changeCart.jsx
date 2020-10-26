import React from 'react'
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator'
import { connect } from 'react-redux'
function ScanAccount(props) {
    return (
        <div>
            扫码订单
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(ScanAccount)