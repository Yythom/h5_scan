// import { } from '../api/api'


export const mapStateToProps = (state, ownProps) => {
    return {
        tabStatus: state.tabStatus,//tab路由状态
        cart: state.cart,
        cartSummary: state.cartSummary,
        scan: state.scan
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
        setAllNum: (allSummary) => {
            dispatch({ type: 'SETNUM', allSummary })
        },
        clearCart: () => {
            localStorage.removeItem('cart');
            dispatch({ type: 'CLEAR' })
        },
        setScan: (shopDesc) => {
            dispatch({ type: 'SCAN', shopDesc })
        }
    }
}
