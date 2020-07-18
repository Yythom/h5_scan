// import { } from '../api/api'


export const mapStateToProps = (state, ownProps) => {
    return {
        num: state.num,
        tabStatus: state.tabStatus,//tab路由状态
    }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        add: () => {
            dispatch({ type: 'ADD' })
        },
        activeTab: (index) => {  //tab路由状态
            dispatch({ type: 'TAB', index: index })
        },
    }
}
