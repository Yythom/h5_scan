import React from 'react'
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator'
import { connect } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
function Carbar(props) {
    const [allNumber, setAllNumber] = useState(0)
    let { food_item, addCart, shopid, cart } = props
    function allFn() {

    }
    console.log(props.cartNum);
    return (
        <div className='carbar'>

        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Carbar)