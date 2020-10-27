import React from 'react'
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator'
import { connect } from 'react-redux'

import Header from '../../component/header/header'
import './ScanAccount.scss'

function ScanAccount(props) {
    return (
        <div className='wrap'>
            <Header />
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(ScanAccount)