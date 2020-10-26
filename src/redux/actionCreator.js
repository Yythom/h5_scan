// import { } from '../api/api'


export const mapStateToProps = (state, ownProps) => {
    return {
        tabStatus: state.tabStatus,//tab路由状态
        cart: state.cart,
        cartNum: state.cartNum,
    }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        activeTab: (index) => {  //tab路由状态
            dispatch({ type: 'TAB', index: index })
        },
        addCart: (food, shop_id, current) => {
            dispatch({ type: 'ADDCART', food, shop_id, current })
        },
        setAllNum: (allNum) => {
            dispatch({ type: 'SETNUM', allNum })
        }
    }
}
