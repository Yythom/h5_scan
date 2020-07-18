let initState = {
    num: 0
}


export const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD':
            state.num++
            break;
        case "TAB":
            state.tabStatus = action.index
            break;
        default:
            return state
    }
    return { ...state }
}